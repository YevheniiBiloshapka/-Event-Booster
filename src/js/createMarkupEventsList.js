import refs from './refs';

export function renderEventsList(array) {
  refs.eventsList.innerHTML = createMarkupEventsList(array);
}

function createMarkupEventsList(events) {
  return events.reduce((acc, { id, images, name, dates, _embedded }) => {
    let locationName = 'No info';
    if (_embedded?.venues) {
      locationName = _embedded.venues[0].name;
    }

    const poster = images.find(
      image => image.height === Math.max(...images.map(img => img.height))
    ).url;
    return (
      acc +
      `<li class="eventcards__item js-anim"  id="${id}">
        <a href="#" class="eventcards__link">
          <div class="eventcards__thumb">
            <img
              class="eventcards__img"
              src="${poster}"
              alt="${name}"
              width="267"
              height="337"
              loading="lazy"
            />
          </div>
          <div class="eventcards__content">
            <h3 class="eventcards__name">${name}</h3>
            <p class="eventcards__date">${dates.start.localDate}</p>
            <p class="eventcards__location"><img class="eventcards__loc-img" src="https://i.ibb.co/zXQ2Gs8/Place.png" alt="Place" width="8" height="10" border="0">
              ${locationName}
            </p>
          </div>
        </a>
      </li>`
    );
  }, '');
}
