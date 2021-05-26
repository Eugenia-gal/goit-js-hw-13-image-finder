const APIKEY = '21801737-49cda37636a05962c9a05323f';

export const apiService = {
  basicURL: 'https://pixabay.com/api/',
  imageParams: 'image_type=photo&orientation=horizontal',
  searchQuery: '',
  page: 1,

  getImage: async function () {
    const data = await fetch(
      `${this.basicURL}?${this.imageParams}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${APIKEY}`,
    )
      .then(response => {
        return response.json();
      })
      .then(result => {
        return result.hits;
      });
    this.incrPage();
    return data;
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

//https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
