import refs from './js/refs';
import { EventsAPI } from './js/eventsAPI';
import { renderEventsList } from './js/createMarkupEventsList';
import {
  onTeamBtnClick,
  closeModal,
  onEventClick,
  openRejectModal,
} from './js/modals';
import { checkPaginationList, renderPagination } from './js/pagination';
import { onScrollTracking } from './js/animate';
import { onBtnSelect, onSearchItemClick, onDocumentClick } from './js/select';

const eventsAPI = new EventsAPI();

refs.teamModalOpenBtn.addEventListener('click', onTeamBtnClick);
refs.teamModalBackdrop.addEventListener('click', closeModal);
refs.eventsList.addEventListener('click', onEventClick);
refs.eventModalBackdrop.addEventListener('click', closeModal);
refs.rejectModalBackdrop.addEventListener('click', closeModal);
refs.paginationList.addEventListener('click', onPaginationClick);
refs.btnSelect.addEventListener('click', onBtnSelect);
refs.searchList.addEventListener('click', searchByCountyCode);
refs.searchInput.addEventListener('change', searchByQuery);
document.addEventListener('click', onDocumentClick);

window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

const defaultCountry = 'PL';
let codeCountry = '';
let query = '';

requestAPI(query, defaultCountry);

function onPaginationClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  refs.eventsList.innerHTML = '';

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });

  checkPaginationList(e);

  eventsAPI.setPage(Number(e.target.textContent) - 1);

  let code = codeCountry;
  if (!codeCountry && !query) {
    code = defaultCountry;
  }

  eventsAPI
    .getEvents(query, code)
    .then(response => {
      renderEventsList(response.data._embedded.events);
      onScrollTracking();
    })
    .catch();
}

function searchByCountyCode(e) {
  const code = e.target.dataset.value;
  refs.inputHidden.value = code;
  codeCountry = code;
  query = refs.searchInput.value;
  onSearchItemClick(e);
  requestAPI(query, codeCountry);
}

function searchByQuery(e) {
  const value = e.target.value;
  query = value ? value[0].toUpperCase() + value.slice(1) : '';
  requestAPI(query, codeCountry);
}

function requestAPI(query, codeCountry) {
  eventsAPI.setPage(0);
  eventsAPI
    .getEvents(query, codeCountry)
    .then(resp => {
      if (!resp.data._embedded) {
        throw new Error('Sorry! Bad request');
      }

      const {
        _embedded: { events },
        page: { totalPages },
      } = resp.data;

      renderEventsList(events);
      onScrollTracking();
      renderPagination(totalPages);
    })
    .catch(() => {
      openRejectModal();
    });
}
