let currentImageIndex = 0;
let currentFilteredItems = []; // Variable pour stocker les éléments filtrés actuels

document.addEventListener("DOMContentLoaded", function() {
  addButtonClickListeners();
  addPictureClickListener();
  clickDefaultButton();

});

// Fonction pour cliquer le bouton "tous" par défaut
function clickDefaultButton() {
  const defaultButton = document.getElementById("js-tag-button-0");
  defaultButton.classList.add("button-clicked");

  // Affichage des photos filtrées pour le bouton "tous" (ID 0)
  currentFilteredItems = getGalleryFiltered(0);
}

// Fonction pour écouter le clic sur un bouton
function addButtonClickListeners() {
  // Définit la variable previousButton (afin de supprimer la classe de l'ancien bouton à chaque clic)
  let previousButton = null;

  // Parcourt les 4 id des boutons buttonCategories0, buttonCategories1, buttonCategories2 ou buttonCategories3
  for (let i = 0; i < 5; i++) {
    let button = document.getElementById("js-tag-button-" + i);

    button.addEventListener("click", () => {
      // retrait de la classe du bouton "tous"
      const defaultButton = document.getElementById("js-tag-button-0");
      defaultButton.classList.remove("button-clicked");
      // s'il y a un previousButton, retrait de la classe
      if (previousButton !== null) {
        previousButton.classList.remove("button-clicked");
      }
      // previousButton se re-remplit avec le nouveau bouton (jusqu'au clic suivant)
      previousButton = button;

      // ajout de la classe sur le bouton cliqué
      button.classList.add("button-clicked");

      const clickedButtonId = i; // récupère l'id du bouton cliqué      

      currentFilteredItems = getGalleryFiltered(clickedButtonId); // appelle la fonction d'affichage de la gallerie grâce à l'id du bouton 
      
      currentImageIndex = 0; // Réinitialise l'index de l'image actuelle à 0 lors du changement de filtre

    });
  }
}

// Fonction pour afficher les photos filtrées 
// 1. est appelée dans la fonction de sélection du bouton 'tous' par défaut
// 2. est appelée dans la fonction d'écoute du clic sur bouton de filtre
function getGalleryFiltered(clickedButtonId) {
  let filteredItems = []; // Tableau pour stocker les éléments filtrés

  if (clickedButtonId === 0) {
    const allGalleryItemsToShow = document.querySelectorAll(".gallery-item");
    allGalleryItemsToShow.forEach(item => {
      item.style.display = "block"; // affiche chaque image
      filteredItems.push(item); // Ajoute les éléments filtrés au tableau
    });
  } else {
   
    // 1. Masque tous les éléments de la galerie
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
      item.style.display = "none"; 
    });

    // 2. Affiche seulement les éléments de la galerie avec la classe correspondant à l'ID du bouton cliqué
    const galleryItemsToShow = document.querySelectorAll(".js-gallery-item-tag-" + clickedButtonId);
    galleryItemsToShow.forEach(item => {
      item.style.display = "block"; // affiche chaque image ayant bien la classe demandée
      filteredItems.push(item); // Ajoute les éléments filtrés au tableau
    });
  }

  return filteredItems; // Renvoie le tableau des éléments filtrés
}

// Fonction pour afficher la modale de photos (filtré) les photos filtrées 
function addPictureClickListener() {
  
  // Récupération des éléments DOM
  const modal = document.getElementById("modal");
  const modalPicture = document.getElementById("modal-picture");
  const leftArrow = modal.querySelector(".fa-chevron-left"); // Modification ici
  const rightArrow = modal.querySelector(".fa-chevron-right"); // Modification ici
  const galleryItems = document.querySelectorAll(".gallery-item");

  // Vérification si galleryItems est correctement récupéré
  if (!galleryItems || galleryItems.length === 0) {
    console.error("Erreur : Impossible de récupérer les éléments de la galerie.");
    return;
  }

  // Ouverture de la modale
  galleryItems.forEach((picture, index) => {
    picture.addEventListener("click", () => {
      modal.style.display = "block";
      modalPicture.innerHTML = `<img src="${galleryItems[index].src}" alt="Image en plein écran: ${galleryItems[index].alt}" >`;
      
      // récupération de l'ID de l'image cliquée
      const clickedImageId = picture.getAttribute("id");

      // Recherche de l'index de l'image cliquée dans currentFilteredItems en utilisant son ID
      currentImageIndex = currentFilteredItems.findIndex(item => item.getAttribute("id") === clickedImageId);
    });
  });

  // Écouteur pour le clic sur la flèche gauche
  leftArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + currentFilteredItems.length) % currentFilteredItems.length;
    modalPicture.innerHTML = `<img src="${currentFilteredItems[currentImageIndex].src}" alt="Image en plein écran: ${currentFilteredItems[currentImageIndex].alt}" >`;
  });

  // Écouteur pour le clic sur la flèche droite
  rightArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % currentFilteredItems.length;
    modalPicture.innerHTML = `<img src="${currentFilteredItems[currentImageIndex].src}" alt="Image en plein écran: ${currentFilteredItems[currentImageIndex].alt}" >`;
  });

  // Fermeture de la modale lorsque l'utilisateur clique en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
