//createImages, clearImages

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery-list');
let lightbox;

export function createImages(images) {
  const markup = images
    .map(
      image =>
        `<li class="image-wrapper">
    <a href="${image.largeImageURL}">
    <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}"></img>
    </a>
    <div class="text-wrapper">
    <div class="text-item"><h5 class="text-header">Likes</h5><p class="text-paragraph">${image.likes}</p></div>
    <div class="text-item"><h5 class="text-header">Views</h5><p class="text-paragraph">${image.views}</p></div>
    <div class="text-item"><h5 class="text-header">Comments</h5><p class="text-paragraph">${image.comments}</p></div>
    <div class="text-item"><h5 class="text-header">Downloads</h5><p class="text-paragraph">${image.downloads}</p></div>
    </div>
    </li>`
    )
    .join('');

  galleryList.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery-list a', {
      captions: true,
      captionsData: 'alt',
      captionsDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}
export function clearImages() {
  galleryList.innerHTML = '';
}
