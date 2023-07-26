// Import the mauGallery function from the mauGallery.js file
import { mauGallery } from '/mauGallery.js';

// Define the gallery configuration
const galleryConfig = {
    columns: {
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
        xl: 3
    },
    lightBox: true,
    lightboxId: 'myAwesomeLightbox',
    showTags: true,
    tagsPosition: 'top'
};

// Check if ES modules are supported in the browser
const isModuleSupported = 'noModule' in document.createElement('script');

// Function to initialize the gallery
function initializeGallery() {
    // Use the mauGallery function to initialize the gallery
    mauGallery(galleryConfig);
}

// Run the gallery initialization function when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    // Call the appropriate initialization function based on browser support
    if (isModuleSupported) {
        initializeGallery(); // For modern browsers
    } else {
        mauGallery(galleryConfig); // For legacy browsers
    }
});
