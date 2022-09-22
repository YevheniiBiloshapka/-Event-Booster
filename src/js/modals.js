import { addToModalContent } from './eventContent';
import refs from './refs';

export function onEventClick(e) {
  const card = e.target.closest('li');
  if (!card) {
    return;
  }
  addListener();
  refs.eventModalBackdrop.classList.remove('visually-hidden');

  addToModalContent(card.attributes.id.textContent);
}

export function onTeamBtnClick() {
  addListener();
  refs.teamModalBackdrop.classList.remove('visually-hidden');
}

function addListener() {
  window.addEventListener('keydown', closeModal);
  document.body.classList.add('no-scroll');
}

export function closeModal(e) {
  if (
    e.target.classList.contains('backdrop') ||
    e.target.nodeName === 'BUTTON' ||
    e.key === 'Escape'
  ) {
    document.body.classList.remove('no-scroll');
    refs.eventModalBackdrop.classList.add('visually-hidden');
    refs.teamModalBackdrop.classList.add('visually-hidden');
    refs.rejectModalBackdrop.classList.add('visually-hidden');
    window.removeEventListener('keydown', closeModal);
  }
}

export function openRejectModal() {
  refs.eventsList.innerHTML = '';
  refs.paginationList.innerHTML = '';
  addListener();
  refs.rejectModalBackdrop.classList.remove('visually-hidden');
}
