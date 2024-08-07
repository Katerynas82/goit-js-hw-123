import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
// import ButtonService from "./js/render-functions.js";

import { searchGalleryQuery } from './js/pixabay-api.js';
import { createImages, clearImages } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');
let currentPage = 1;
let searchWord = '';

form.addEventListener('submit', handleSubmitBtn);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmitBtn(event) {
  event.preventDefault();
  clearImages();
  currentPage = 1;
  searchWord = input.value.trim();

  if (!searchWord) {
    iziToast.warning({
      position: 'bottomRight',
      message: 'Please enter a search term',
    });
    return;
  }
  await fetchImages();
}

async function handleLoadMore() {
  currentPage += 1;
  await fetchImages();
  smoothScroll();
}

async function fetchImages() {
  loader.classList.remove('hidden');
  loadMoreBtn.classList.add('hidden');

  try {
    const data = await searchGalleryQuery(searchWord, currentPage);
    if (data.totalHits === 0) {
      iziToast.warning({
        position: 'bottomRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
    } else {
      createImages(data.hits);
      if (data.hits.length < 15 || currentPage * 15 >= data.totalHits) {
        loadMoreBtn.classList.add('hidden');
        iziToast.info({
          position: 'bottomRight',
          message: "We're sorry, but you've reached the end of search results.",
        });
      } else {
        loadMoreBtn.classList.remove('hidden');
      }
    }
  } catch (error) {
    iziToast.error({
      position: 'bottomRight',
      message: 'Failed to fetch images.',
    });
    console.error(error);
  } finally {
    loader.classList.add('hidden');
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery-list')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
