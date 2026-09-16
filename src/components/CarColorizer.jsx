import React, { useRef, useEffect } from 'react';

/**
 * CarColorizer (v2)
 * -------------------
 * Corrige deux problèmes de la v1 :
 *  1. Sans masque réel fourni, on n'applique PLUS AUCUN effet de couleur —
 *     jamais de teinte sur toute la photo (décor compris). La photo
 *     d'origine s'affiche telle quelle tant qu'aucun masque n'existe.
 *  2. Le blend mode 'hue' ne fonctionne pas sur des couleurs sans
 *     saturation (noir, blanc, gris) : ces familles sont maintenant
 *     traitées séparément (éclaircissement / assombrissement /
 *     désaturation) au lieu d'un hue-shift qui n'a aucun effet visible.
 *
 * Props :
 * - imageSrc  : chemin de la photo de base (une seule photo par véhicule)
 * - maskSrc   : chemin du masque PNG noir/blanc, OBLIGATOIRE pour tout
 *               effet visuel (blanc = carrosserie peinte, noir = le reste)
 * - color     : couleur cible en hex, ex. "#7E8389"
 * - className : classes CSS optionnelles
 */
export default function CarColorizer({ imageSrc, maskSrc, color, className }) {
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

        const { s, l } = hexToHsl(color);

        // 2. Calque de teinte construit sur un canvas separe, en repartant
        // de la photo pour garder reflets et ombres.
        const tint = document.createElement('canvas');
        tint.width = w;
        tint.height = h;
        const tctx = tint.getContext('2d');
        tctx.drawImage(baseImg, 0, 0, w, h);

        let alpha;
        if (s < 0.12 && l > 0.82) {
          // Blanc / argent : eclaircir.
          tctx.globalCompositeOperation = 'screen';
          tctx.fillStyle = color;
          tctx.fillRect(0, 0, w, h);
          alpha = 0.55;
        } else if (s < 0.12 && l < 0.18) {
          // Noir : assombrir.
          tctx.globalCompositeOperation = 'multiply';
          tctx.fillStyle = color;
          tctx.fillRect(0, 0, w, h);
          alpha = 0.6;
        } else if (s < 0.12) {
          // Gris moyen : desaturer vers la luminosite de la photo.
          tctx.globalCompositeOperation = 'color';
          tctx.fillStyle = color;
          tctx.fillRect(0, 0, w, h);
          alpha = 0.8;
        } else {
          // Couleur saturee classique : hue-shift, preserve les reflets.
          tctx.globalCompositeOperation = 'hue';
          tctx.fillStyle = color;
          tctx.fillRect(0, 0, w, h);
          alpha = 0.85;
        }
        tctx.globalCompositeOperation = 'source-over';

        // 3. Decoupe stricte au masque - carrosserie uniquement.
        tctx.globalCompositeOperation = 'destination-in';
        tctx.drawImage(maskImg, 0, 0, w, h);
        tctx.globalCompositeOperation = 'source-over';

        // 4. Composite final.
        ctx.globalAlpha = alpha;
        ctx.drawImage(tint, 0, 0, w, h);
        ctx.globalAlpha = 1;
      } catch (e) {
        console.error('CarColorizer: echec du rendu', e);
      }
    }

    render();
    return () => { cancelled = true; };
  }, [imageSrc, maskSrc, color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}
