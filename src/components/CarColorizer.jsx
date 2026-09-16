import React, { useRef, useEffect } from 'react';

/**
 * CarColorizer (v2)
 * -------------------
 * Corrige deux problèmes de la v1 :
 *  1. Sans masque réel fourni, on n'applique PLUS AUCUN effet de couleur —
 *     jamais de teinte sur toute la photo (décor compris). La photo
 *     d'origine s'affiche telle quelle tant qu'aucun masque n'existe.
 *  2. Les blend modes canvas ('hue', 'screen'...) gardaient la luminosité
 *     de la peinture d'origine (blanc invisible, jaune olive). La teinte
 *     est maintenant recalculée pixel par pixel : couleur cible × ombrage
 *     relatif de la photo + reflets spéculaires.
 *
 * Props :
 * - imageSrc  : chemin de la photo de base (une seule photo par véhicule)
 * - maskSrc   : chemin du masque PNG noir/blanc, OBLIGATOIRE pour tout
 *               effet visuel (blanc = carrosserie peinte, noir = le reste)
 * - color     : couleur cible en hex, ex. "#7E8389"
 * - finish    : 'brillant' (defaut) | 'metallise' | 'mat'
 *               brillant  -> vernis miroir : reflets renforces, speculaire net
 *               metallise -> paillettes, reflets adoucis (lumiere diffusee)
 *               mat       -> contraste et hautes lumieres tasses (sans
 *                            flou), aucun speculaire
 * - className : classes CSS optionnelles
 */
// Bruit deterministe [0,1) par cellule : les paillettes ne scintillent pas
// d'un rendu a l'autre.
function flakeNoise(cx, cy) {
  let n = (cx * 374761393 + cy * 668265263) | 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

export default function CarColorizer({ imageSrc, maskSrc, color, finish = 'brillant', className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const canvas = canvasRef.current;
    if (!canvas || !imageSrc) return;
    const ctx = canvas.getContext('2d');

    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
      });

    // Convertit un hex en HSL pour choisir la bonne stratégie de teinte.
    function hexToHsl(hex) {
      const m = hex.replace('#', '');
      const r = parseInt(m.substring(0, 2), 16) / 255;
      const g = parseInt(m.substring(2, 4), 16) / 255;
      const b = parseInt(m.substring(4, 6), 16) / 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h = 0, s = 0;
      const l = (max + min) / 2;
      const d = max - min;
      if (d !== 0) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
          case g: h = ((b - r) / d + 2); break;
          case b: h = ((r - g) / d + 4); break;
        }
        h /= 6;
      }
      return { h, s, l };
    }

    async function render() {
      try {
        const baseImg = await loadImage(imageSrc);
        if (cancelled) return;

        const w = baseImg.naturalWidth;
        const h = baseImg.naturalHeight;
        canvas.width = w;
        canvas.height = h;

        // 1. Photo d'origine, intacte.
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(baseImg, 0, 0, w, h);

        // Pas de masque ou pas de couleur -> on s'arrete la. Jamais de
        // teinte appliquee a toute la photo par defaut.
        if (!maskSrc || !color) return;

        const maskImg = await loadImage(maskSrc).catch(() => null);
        if (cancelled || !maskImg) return; // masque introuvable -> photo intacte

        // 2. Lecture des pixels de la photo et du masque.
        const base = ctx.getImageData(0, 0, w, h);
        const px = base.data;
        const maskCanvas = document.createElement('canvas');
        maskCanvas.width = w;
        maskCanvas.height = h;
        const mctx = maskCanvas.getContext('2d');
        mctx.drawImage(maskImg, 0, 0, w, h);
        const mk = mctx.getImageData(0, 0, w, h).data;

        // 3. Luminosite moyenne de la carrosserie d'origine : sert de
        // reference pour transposer ombres et reflets sur la nouvelle teinte.
        // Contrairement a un blend 'hue', la luminosite de la peinture
        // d'origine (bleu fonce) n'est pas conservee : un blanc sort blanc,
        // un jaune sort jaune.
        const luma = (i) => 0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2];
        const maskAt = (i) => (mk[i + 3] / 255) * (mk[i] / 255);
        let sumL = 0, sumM = 0;
        for (let i = 0; i < px.length; i += 16) {
          const m = maskAt(i);
          if (m > 0.5) { sumL += luma(i) * m; sumM += m; }
        }
        if (!sumM) return;
        const refL = sumL / sumM;

        const hex = color.replace('#', '');
        const tr = parseInt(hex.substring(0, 2), 16);
        const tg = parseInt(hex.substring(2, 4), 16);
        const tb = parseInt(hex.substring(4, 6), 16);
        const { l } = hexToHsl(color);
        // Les teintes sombres gardent plus de contraste de reflets.
        const gamma = l < 0.2 ? 1.15 : 0.9;

        // 4. Recoloration pixel par pixel, decoupee au masque.
        for (let i = 0; i < px.length; i += 4) {
          const m = maskAt(i);
          if (m <= 0) continue;
          const L = luma(i);
          let shade;
          let spec;

          let haze = 0;
          if (finish === 'mat') {
            // Pas de flou : la texture reste nette, seules les amplitudes
            // sont tassees. Hautes lumieres ecrasees par une courbe douce
            // (plafond 1.22, sans cassure ni halo), ombres rapprochees du ton
            // moyen, aucun speculaire.
            const r = L / refL;
            shade = r > 1
              ? 1 + 0.22 * (1 - Math.exp(-(r - 1) * 0.8))
              : 1 - (1 - Math.pow(r, gamma)) * 0.4;
            spec = 0;
            // Voile diffus : une peinture mate diffuse la lumiere, les noirs
            // mats tirent vers l'anthracite.
            haze = 16 * shade;
          } else {
            shade = Math.pow(L / refL, gamma);
            // Reflets speculaires : on remonte vers le blanc au-dela de la reference.
            spec = Math.max(0, L / 255 - 0.55) * 1.6;

            if (finish === 'brillant') {
              // Vernis miroir : reflets de l'environnement plus contrastes et
              // speculaire plus franc, surface parfaitement lisse (pas de grain).
              if (shade > 1) shade = 1 + (shade - 1) * 1.3;
              spec *= 1.3;
            } else if (finish === 'metallise') {
              // Les paillettes diffusent la lumiere : reflets miroir adoucis,
              // la teinte "s'allume" dans les zones eclairees.
              if (shade > 1) shade = 1 + (shade - 1) * 0.75;
              else shade = 1 - (1 - shade) * 0.85;
              spec *= 0.7;
              // Paillettes : grain par cellules de 4 px, plus vif dans la lumiere.
              const p = i >> 2;
              const x = p % w;
              const y = (p - x) / w;
              const n = flakeNoise(x >> 2, y >> 2);
              const lit = Math.min(1, L / (refL * 2));
              shade *= 1 + (n - 0.5) * (0.1 + 0.2 * lit);
              if (n > 0.995) spec += 0.1 + 0.3 * lit;
            }
          }

          const nr = Math.min(255, tr * shade + 255 * spec + haze);
          const ng = Math.min(255, tg * shade + 255 * spec + haze);
          const nb = Math.min(255, tb * shade + 255 * spec + haze);
          px[i] = px[i] * (1 - m) + nr * m;
          px[i + 1] = px[i + 1] * (1 - m) + ng * m;
          px[i + 2] = px[i + 2] * (1 - m) + nb * m;
        }
        ctx.putImageData(base, 0, 0);
      } catch (e) {
        console.error('CarColorizer: echec du rendu', e);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [imageSrc, maskSrc, color, finish]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
