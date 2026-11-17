// =========================================================
// LOGIQUE DU PORTFOLIO
// En JavaScript, on fait 3 choses : 1) repérer des éléments,
// 2) écouter les clics, 3) ajouter/enlever des classes CSS.
// Les animations elles-mêmes sont faites par le CSS.
// =========================================================

// --- 1) On récupère les éléments de la page ---
const boite       = document.getElementById('boite');
const outils      = document.getElementById('outils');
const modal       = document.getElementById('contact-modal');
const fermer      = document.getElementById('fermer-contact');
const piecesZone  = document.getElementById('pieces');
const livre       = document.getElementById('livre');

const ecrans = {
  accueil: document.getElementById('accueil'),
  carnet:  document.getElementById('carnet'),
  fin:     document.getElementById('fin'),
};

// Fonction utilitaire : afficher un seul écran à la fois
function montrerEcran(nom) {
  Object.values(ecrans).forEach(e => e.classList.remove('actif'));
  ecrans[nom].classList.add('actif');
}

// --- 2) Contact : la boîte à outils ouvre la fenêtre ---
outils.addEventListener('click', () => { modal.hidden = false; });
fermer.addEventListener('click', () => { modal.hidden = true; });
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.hidden = true;   // clic en dehors du papier = fermer
});

// --- 3) La grande boîte : animation puis transition vers le carnet ---
const PIECES = ['🔩', '🪛', '🪵', '🔧', '📐', '⚙️'];   // remplace plus tard par tes images

boite.addEventListener('click', () => {
  if (boite.classList.contains('ouverte')) return;   // évite de cliquer deux fois

  boite.classList.add('ouverte');                    // déclenche les rabats + le carnet (CSS)

  // On crée les pièces qui jaillissent de la boîte
  PIECES.forEach((emoji, i) => {
    const p = document.createElement('span');
    p.className = 'piece';
    p.textContent = emoji;
    // Chaque pièce va dans une direction un peu différente
    p.style.setProperty('--dx',  (i - 2.5) * 70 + 'px');
    p.style.setProperty('--dy',  (-120 - Math.random() * 80) + 'px');
    p.style.setProperty('--rot', (Math.random() * 360 - 180) + 'deg');
    p.style.animationDelay = (0.5 + i * 0.12) + 's';
    piecesZone.appendChild(p);
  });

  // Après l'animation (3 secondes), on passe au carnet
  setTimeout(() => montrerEcran('carnet'), 3000);
});

// --- 4) Le carnet : cliquer sur le coin tourne la page ---
const pages = Array.from(livre.querySelectorAll('.page'));

// On empile les pages : la première doit être au-dessus
pages.forEach((page, i) => { page.style.zIndex = pages.length - i; });

pages.forEach((page, i) => {
  const coin = page.querySelector('.coin');
  coin.addEventListener('click', () => {
    const estDerniere = (i === pages.length - 1);

    if (!estDerniere) {
      page.classList.add('tournee');                 // la page pivote (CSS)
    } else {
      // Dernière page : le carnet "se baisse", puis le meuble apparaît
      livre.classList.add('ferme');
      setTimeout(() => montrerEcran('fin'), 1000);
    }
  });
});
