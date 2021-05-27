const APIKEY = '21801737-49cda37636a05962c9a05323f';

export const apiService = {
  basicURL: 'https://pixabay.com/api/',
  imageParams: 'image_type=photo&orientation=horizontal',
  searchQuery: '',
  page: 1,

  getImage: async function () {
    const response = await fetch(
      `${this.basicURL}?${this.imageParams}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${APIKEY}`,
    );
    const result = await response.json();

    this.incrPage();
    return result;
  },

  incrPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  getQuery() {
    return this.searchQuery;
  },

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  },
};
