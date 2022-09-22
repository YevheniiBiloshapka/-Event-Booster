import { EventsAPI } from './eventsAPI';
import refs from './refs';

const infoObj = new EventsAPI();

export function addToModalContent(id) {
  infoObj.getEvent(id).then(response => {
    const { images, name, info, dates, _embedded, priceRanges, url } =
      response.data._embedded.events[0];

    const posterBestSize = images.filter(
      image => image.ratio === '3_2' || image.ratio === '4_3'
    );
    const poster = posterBestSize.find(
      image => image.height === Math.max(...posterBestSize.map(e => e.height))
    ).url;

    const eventTimedate = `${dates.start.localDate} ${
      dates.start.localTime ? dates.start.localTime.slice(0, 5) : ''
    } ${dates.timezone ? dates.timezone : ''}`;
    let eventPointPlace = 'No info';
    let eventMapPoint = 'https://www.google.com/maps/';
    let city = '';

    if (_embedded?.venues) {
      const { address, country, location } = _embedded.venues[0];
      city = _embedded.venues[0].city;
      eventPointPlace = `${city.name}, ${country.name}, ${
        address.line1 ? address.line1 : ''
      }`;
      eventMapPoint = `https://www.google.com/maps/search/${location.latitude}+${location.longitude}`;
    }

    const eventFace = _embedded?.attractions
      ? _embedded.attractions.map(e => e.name).join(', ')
      : name;

    const moreAboutEvent = `https://www.google.com/search?q=${eventFace}+${
      city ? city.name : ''
    }+${dates.start.localDate}`;

    const standardTicketType = 'standard';
    const vipTicketType = 'VIP';
    let firstPriceText = '';
    let secondPriceText = '';
    let hiddenClass = 'visually-hidden';
    let disabledLink = '';

    if (priceRanges) {
      priceRanges.forEach(({ type, currency, min, max }) => {
        if (type === standardTicketType && min === max) {
          firstPriceText = `${type} ${min || max} ${currency}`.toUpperCase();
        } else if (type === standardTicketType) {
          firstPriceText = `${type} ${min}-${max} ${currency}`.toUpperCase();
        } else if (type === vipTicketType && min === max) {
          secondPriceText = `${type} ${min || max} ${currency}`.toUpperCase();
          hiddenClass = '';
        } else if (type === vipTicketType) {
          secondPriceText = `${type} ${min}-${max} ${currency}`.toUpperCase();
          hiddenClass = '';
        }
      });
    } else {
      firstPriceText =
        'Currently price info is absent. Click "Buy tickets" for more information';
    }

    if (!url) {
      disabledLink = 'disabled-link';
    }

    refs.eventContentWrapper.innerHTML = modalMarkup(
      poster,
      info,
      name,
      eventTimedate,
      eventMapPoint,
      eventPointPlace,
      eventFace,
      firstPriceText,
      url,
      secondPriceText,
      moreAboutEvent,
      hiddenClass,
      disabledLink
    );
  });
}

function modalMarkup(
  poster,
  info,
  name,
  eventTimedate,
  eventMapPoint,
  eventPointPlace,
  eventFace,
  firstPriceText,
  url,
  secondPriceText,
  moreAboutEvent,
  hiddenClass,
  disabledLink
) {
  const barcode = 'https://i.ibb.co/0GbLwtb/ticket1.png';
  const location = 'https://i.ibb.co/8r1FNjQ/location.png';
  const markup = `<img src="${poster}" alt="small-pic" class="modal__small-pic">
        <div class="modal__list">
            <div class="modal__card-poster">
                <img src="${poster}" alt="big-pic" class="modal__big-pic">
            </div>
            <div class="modal__description">
                <ul>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">INFO</h3>
                        <p class="modal__item-text js-info">${
                          info ? info : name
                        }</p>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHEN</h3>
                        <p class="modal__item-text js-when">${eventTimedate}</p>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHERE</h3>
                        <a class="modal__map-point" href="${eventMapPoint}" target="_blanc">
                            <p class="modal__item-text">
                            <img class="modal__icon-location" src="${location}" alt='location-icon' width="10">
                            <span class="js-where">${eventPointPlace}</span></p></a>                        
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">WHO</h3>
                        <p class="modal__item-text js-who">${eventFace}</p>
                    </li>
                    <li class="modal__list-info">
                        <h3 class="modal__item-title">PRICES</h3>
                        <ul class="modal__price-list">
                            <li class="modal__price-item">
                                <p class="modal__item-text js-first-price">
                                        <img class="modal__icon-code" src="${barcode}" alt="barcode" width="25">
                                    <span class="js-price-text">${firstPriceText}</span>
                                </p>
                                <a class="modal__list-btn ${disabledLink}" href="${url}" target="_blanc">BUY TICKETS</a>
                            </li>
                            <li class="modal__price-item js-second-priceItem ${hiddenClass}">
                                <p class="modal__item-text js-second-price">
                                    <img class="modal__icon-code" src="${barcode}" alt="barcode" width="25">
                                    <span class="js-price-text">${secondPriceText}</span>
                                </p>
                                <a class="modal__list-btn" href="${url}" target="_blanc">BUY TICKETS</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <a class="moreinfo-link" target="_blank" href="${moreAboutEvent}">MORE ABOUT THIS
            EVENT</a>`;
  return markup;
}
