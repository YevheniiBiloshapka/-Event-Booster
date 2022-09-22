import axios from 'axios';
export class EventsAPI {
  BASE_URL = 'https://app.ticketmaster.com/discovery/v2/events';
  key = 'tIj1kC332ExvV8vs1uBAp1fasaO5ERpG';
  size = 16;
  page = 0;

  async getEvents(keyword, countryCode) {
    const config = {
      params: {
        apikey: this.key,
        size: this.size,
        page: this.page,
        keyword,
      },
    };
    if (countryCode) {
      config.params.countryCode = countryCode;
    }
    return await axios.get(this.BASE_URL, config);
  }

  async getEvent(id) {
    const config = {
      params: {
        apikey: this.key,
        id,
      },
    };
    return await axios.get(this.BASE_URL, config);
  }

  setPage(p) {
    this.page = p;
  }

  setCountryCode(code) {
    this.countryCode = code;
  }
}
