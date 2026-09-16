# Dossier des Masques de Carrosserie (Configurateur Almadies Prestige Motors)

Ce répertoire contient les masques de carrosserie en noir et blanc utilisés par le moteur de recoloration optique du configurateur officiel.

## Comment fonctionne la recoloration ?
Le configurateur charge la photo extérieure unique officielle de chaque véhicule et lui superpose un calque de teinte haute fidélité (`mix-blend-mode: color` & `multiply`).
Grâce au masque PNG, la couleur s'applique **exclusivement sur la carrosserie peinte** (ailes, capot, portières, toit), sans altérer :
- Les vitres et pare-brise
- Les jantes et étriers de freins
- Les pneus et le sol du studio
- Les optiques de phares avant et feux arrière
- Les calandres, diffuseurs et inserts en carbone ou chrome

---

## Convention de Nommage des Fichiers
Pour ajouter ou remplacer un masque haute précision pour un véhicule, déposez un fichier PNG portant le nom :

```bash
public/images/masks/<slug-du-vehicule>-mask.png
```

### Exemples par véhicule :
- **Rolls-Royce Cullinan** : `rolls-royce-cullinan-black-badge-mask.png`
- **Ferrari Purosangue** : `ferrari-purosangue-v12-mask.png`
- **Bentley Continental GT Speed** : `bentley-continental-gt-speed-mask.png`
- **Lamborghini Urus Performante** : `lamborghini-urus-performante-mask.png`
- **Mercedes-Maybach GLS 600** : `mercedes-maybach-gls-600-mask.png`
- **Range Rover SV** : `range-rover-sv-l460-mask.png`
- **Porsche 911 GT3 RS Weissach** : `porsche-911-gt3-rs-weissach-mask.png`

---

## Spécifications Techniques du Masque PNG
1. **Dimensions** : Doit correspondre à la résolution ou au ratio (16:9 ou 3:2) de la photo extérieure du véhicule (ex. 1920 × 1200 px ou 1920 × 1080 px).
2. **Couleurs du masque** :
   - **Blanc pur (`#FFFFFF`)** : Zone où la couleur sélectionnée sera appliquée (tôlerie, carrosserie).
   - **Noir pur (`#000000`) ou Transparent** : Zone protégée (vitres, jantes, pneus, phares, studio).
   - **Niveaux de gris (`#808080`)** : Zones de transition douce, biseaux d'arrêtes ou reflets semi-transparents.
3. **Format** : PNG standard 8-bit ou 24-bit.

---

## Masque de secours automatique (Fallback)
Si aucun fichier PNG dédié n'est présent dans ce dossier pour un modèle, le configurateur active automatiquement un **masque procédural automobile SVG/CSS** calculé sur la zone centrale de carrosserie du véhicule afin de garantir un rendu élégant en attendant le détourage manuel.
