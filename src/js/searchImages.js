import { apiService } from './apiService';
import { refs } from './refs';
import card from '../templates/photo-card';
import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';
import { error, info } from '@pnotify/core';

setupPNotify();

refs.searchForm.addEventListener('submit', onSearchImageFormSubmit);
refs.loadBtn.addEventListener('click', onLoadMoreBtnClick);

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
      info({
        text: 'Matches not found. Please try another query!',
      });
      return;
    }
    makeMarkupPhotoCards(images.hits);
  } catch (err) {
    error({
      text: `Oops! Something went wrong: ${err.message}`,
    });
  }
}

function clearGalleryUI() {
  refs.galleryEl.innerHTML = '';
}

function makeMarkupPhotoCards(images) {
  let cardsMarkup = card(images);
  refs.galleryEl.insertAdjacentHTML('beforeend', cardsMarkup);
}

function setupPNotify() {
  defaultModules.set(PNotifyMobile, {});
  defaults.styling = 'material';
  defaults.icons = 'material';
  defaults.shadow = true;
  defaults.hide = true;
  defaults.delay = 2000;
}
