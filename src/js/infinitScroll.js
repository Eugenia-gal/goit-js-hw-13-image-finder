import { refs } from './refs';
import { getAndRenderImages } from './searchImages';

export default function infiniteScroll() {
  const lastImage = refs.galleryEl.querySelector('.gallery_item:last-child');

  const options = {
    rootMargin: '0px',
    threshold: 1.0,
  };

  const onIntersectLastImage = async entries => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      await getAndRenderImages();
    }
    observer.unobserve(entry.target);
    observer.observe(refs.galleryEl.querySelector('.gallery_item:last-child'));
  };

  const observer = new IntersectionObserver(onIntersectLastImage, options);
  if (!lastImage) {
    return;
  }
  observer.observe(lastImage);
}
