import refs from './refs';

export function onBtnSelect() {
  refs.searchList.classList.toggle('search__list--visible');
  refs.btnSelect.classList.toggle('search__select--active');
  document.addEventListener('keydown', onDocumentClick);
}

export function onSearchItemClick(e) {
  refs.btnSelect.textContent = e.target.textContent;
  refs.inputHidden.value = e.target.dataset.value;

  const event = new Event('input');
  refs.searchForm.dispatchEvent(event);

  refs.btnSelect.classList.add('search__select--selected');
  refs.searchList.classList.remove('search__list--visible');
  refs.btnSelect.classList.remove('search__select--active');
  document.removeEventListener('keydown', onDocumentClick);
}

export function onDocumentClick(e) {
  if (e.target !== refs.btnSelect || e.key === 'Escape') {
    refs.searchList.classList.remove('search__list--visible');
    refs.btnSelect.classList.remove('search__select--active');
  }
}
