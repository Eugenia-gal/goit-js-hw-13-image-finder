import * as basicLightbox from 'basiclightbox';

export function showLargeImage(event) {
  const modal = basicLightbox.create(`<img src="" width="800" >`);
  const modalImgEl = modal.element().querySelector('img');
  modalImgEl.src = event.target.dataset.source;

  modal.show();
}
