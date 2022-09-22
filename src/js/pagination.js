import refs from './refs';

export function renderPagination(totalPages) {
  refs.paginationList.innerHTML = createMarkupPagination(totalPages);
}

export function checkPaginationList(e) {
  const pagBtns = [...e.currentTarget.children];

  pagBtns
    .find(elem => elem.classList.contains('js-current-btn'))
    .classList.remove('js-current-btn');

  const currentBtn = e.target;
  const currentLi = currentBtn.closest('li');
  currentLi.classList.add('js-current-btn');
  const currentBtnText = Number(currentBtn.textContent);

  if (
    currentLi.nextElementSibling &&
    currentLi.nextElementSibling.classList.contains('rest')
  ) {
    currentLi.insertAdjacentHTML('afterend', createPagElem(currentBtnText + 1));
    refs.paginationList.firstElementChild.remove();

    if (
      currentBtnText ===
      refs.paginationList.lastElementChild.textContent - 2
    ) {
      refs.paginationList.lastElementChild.previousElementSibling.remove();
    }
  }

  if (!currentLi.previousElementSibling && currentBtnText !== 1) {
    currentLi.insertAdjacentHTML(
      'beforebegin',
      createPagElem(currentBtnText - 1)
    );

    if (!pagBtns[pagBtns.length - 2].classList.contains('rest')) {
      refs.paginationList.lastElementChild.insertAdjacentHTML(
        'beforebegin',
        `<li class="pagination__item rest">...</li>`
      );
    }
    pagBtns[4].remove();
  }
}

function createPagElem(num) {
  return `<li class="pagination__item">
            <button class="pagination__btn" type="button">${num}</button>
          </li>`;
}

function createMarkupPagination(totalPages) {
  const maxPages = 50;
  const markup = [
    `<li class="pagination__item  js-current-btn">
            <button class="pagination__btn" type="button">1</button>
          </li>`,
  ];

  if (totalPages > 1) {
    for (let i = 2; i <= totalPages; i += 1) {
      markup.push(createPagElem(i));
      if (i > 4) {
        if (totalPages > 6) {
          markup.push(`<li class="pagination__item rest">...</li>`);
        } else {
          markup.push(createPagElem(totalPages));
        }
        break;
      }
    }
  }

  if (totalPages > 6) {
    const lastPage = totalPages > maxPages ? maxPages : totalPages;
    markup.push(createPagElem(lastPage));
  }

  return markup.join('');
}
