import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
import { defaults } from '@pnotify/core';
import { error, info } from '@pnotify/core';

function setupNotify() {
  defaultModules.set(PNotifyMobile, {});
  defaults.styling = 'material';
  defaults.icons = 'material';
  defaults.shadow = true;
  defaults.hide = true;
  defaults.delay = 2000;
}

function showNoMatchesNotify() {
  setupNotify();
  info({
    text: 'Matches not found. Please try another query!',
  });
  return;
}

function showGetErrorNotify(err) {
  setupNotify();
  error({
    text: `Oops! Something went wrong: ${err.message}`,
  });
}

export { showNoMatchesNotify, showGetErrorNotify };
