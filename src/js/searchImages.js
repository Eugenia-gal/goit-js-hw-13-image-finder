import { apiService } from './apiService';
import { refs } from './refs';
import card from '../templates/photo-card';
import { showNoMatchesNotify, showGetErrorNotify } from './notify';
import { showLargeImage } from './modal';

refs.searchForm.addEventListener('submit', onSearchImageFormSubmit);
refs.loadBtn.addEventListener('click', onLoadMoreBtnClick);
refs.galleryEl.addEventListener('click', onGalleryItemClick);

function onSearchImageFormSubmit(e) {
  e.preventDefault();

  clearGalleryUI();
  apiService.resetPage();

  const input = e.currentTarget.elements.query;
  apiService.setQuery(input.value);

  getAndRenderImages();
}

async function onLoadMoreBtnClick() {
  await getAndRenderImages();
  refs.loadBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function getAndRenderImages() {
  try {
    const images = await apiService.getImage();

    if (images.hits.length === 0) {
      showNoMatchesNotify();
      return;
    }
    makeMarkupPhotoCards(images.hits);
    refs.loadBtn.classList.remove('visually-hidden');
  } catch (err) {
    showGetErrorNotify(err);
  }
}

function clearGalleryUI() {
  refs.galleryEl.innerHTML = '';
}

function makeMarkupPhotoCards(images) {
  let cardsMarkup = card(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);
}

function onGalleryItemClick(e) {
  e.preventDefault();
  showLargeImage(e);
}
