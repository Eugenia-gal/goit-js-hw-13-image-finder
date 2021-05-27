import { apiService } from './apiService';
import { refs } from './refs';
import card from '../templates/photo-card';
import { showNoMatchesNotify, showGetErrorNotify } from './notify';
import { showLargeImage } from './modal';
import infiniteScroll from './infinitScroll';

refs.searchForm.addEventListener('submit', onSearchImageFormSubmit);
refs.loadBtn.addEventListener('click', onLoadMoreBtnClick);
refs.galleryEl.addEventListener('click', onGalleryItemClick);

async function onSearchImageFormSubmit(e) {
  e.preventDefault();

  clearGalleryUI();
  apiService.resetPage();

  const input = e.currentTarget.elements.query;
  apiService.setQuery(input.value);

  await getAndRenderImages();
  infiniteScroll();

  // refs.loadBtn.classList.remove('visually-hidden');

  //  Реализация пагинации с помощью кнопки Load More:
  // 1. Разкомментировать операцию удаления с кнопки класса 'visually-hidden'
  // 2. Закомментировать строку с вызовом функции infiniteScroll();
}

async function onLoadMoreBtnClick() {
  await getAndRenderImages();
  refs.loadBtn.scrollIntoView({ behavior: 'smooth', block: 'end' });
}

export async function getAndRenderImages() {
  try {
    const images = await apiService.getImage();

    if (images.hits.length === 0) {
      showNoMatchesNotify();
      return;
    }
    makeMarkupPhotoCards(images.hits);
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
