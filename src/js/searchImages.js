import { apiService } from './apiService';
import { refs } from './refs';
import card from '../templates/photo-card';

refs.searchForm.addEventListener('submit', onSearchImageFormSubmit);
refs.loadBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearchImageFormSubmit(e) {
  e.preventDefault();

  clearGalleryUI();
  apiService.resetPage();

  const input = e.currentTarget.elements.query;
  apiService.setQuery(input.value);
  //   console.log(apiService.getQuery());

  getAndRenderImages();
}

async function onLoadMoreBtnClick() {
  await getAndRenderImages();
  refs.loadBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

async function getAndRenderImages() {
  const images = await apiService.getImage();
  makeMarkupPhotoCards(images);
}

function clearGalleryUI() {
  refs.galleryEl.innerHTML = '';
}

function makeMarkupPhotoCards(images) {
  let cardsMarkup = card(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);
}
