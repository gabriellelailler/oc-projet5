let currentImageIndex = 0;

document.addEventListener("DOMContentLoaded", function() {
  addButtonClickListeners()
  addPictureClickListener()
})


function addButtonClickListeners() {
// Définit la variable previousButton (afin de supprimer la classe de l'ancien bouton à chaque clic)
let previousButton = null;

// Parcourt les 4 id des button buttonCategories0, buttonCategories1, buttonCategories2 ou buttonCategories3
for (let i = 0; i < 5; i++) {
  let button = document.getElementById("js-tag-button-" + i);

  button.addEventListener("click", () => {

    // s'il y a un previousButton, retrait de la classe
    if (previousButton !== null) {
        previousButton.classList.remove("button-clicked");
    }
    // previousButton se re-remplit avec le nouveau button (jusau'au clic suivant)
    previousButton=button;

    // ajout de la classe sur le bouton cliqué
    button.classList.add("button-clicked");
    
    const clickedButtonId = i;
    // affichage des photos filtrées
    getGalleryFiltered(clickedButtonId); 
    currentImageIndex = 0;
  });
}
}

 // Fonction pour l'affichage des photos filtrées
 function getGalleryFiltered(clickedButtonId) {

  if (clickedButtonId === 0) {
    const allGalleryItemsToShow = document.querySelectorAll(".gallery-item");
    allGalleryItemsToShow.forEach(item => {
      item.style.display = "block";
      
    })
  } 
  else {
    // Hide all gallery items
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
      item.style.display = "none";
    });

    // Show only the gallery items with the class corresponding to the clicked button's ID
    const galleryItemsToShow = document.querySelectorAll(".js-gallery-item-tag-" + clickedButtonId);
    galleryItemsToShow.forEach(item => {
      item.style.display = "block";
    });
  }
}


function addPictureClickListener() {
  // Récupération des éléments DOM
  const modal = document.getElementById("modal");
  const modalPicture = document.getElementById("modal-picture");
  const galleryItems = document.querySelectorAll(".gallery-item");
  const leftArrow = document.querySelector(".fa-chevron-left");
  const rightArrow = document.querySelector(".fa-chevron-right");

  // Ouverture de la modale
  galleryItems.forEach((picture, index) => {
    picture.addEventListener("click", () => {
      modal.style.display = "block";
      modalPicture.innerHTML = `<img src="${galleryItems[index].src}" alt="Image en plein écran: ${galleryItems[index].alt}" >`;
      currentImageIndex = index;
    });
  });

  // Écouteur pour le clic sur la flèche gauche
  leftArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
    modalPicture.innerHTML = `<img src="${galleryItems[currentImageIndex].src}" alt="Image en plein écran: ${galleryItems[currentImageIndex].alt}" >`;
  });

  // Écouteur pour le clic sur la flèche droite
  rightArrow.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
    modalPicture.innerHTML = `<img src="${galleryItems[currentImageIndex].src}" alt="Image en plein écran: ${galleryItems[currentImageIndex].alt}" >`;
  });

  // Fermeture de la modale lorsque l'utilisateur clique en dehors de son contenu
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}