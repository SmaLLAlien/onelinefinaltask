import mediator from './mediator'

// RENDER INFORMATION ABOUT MOVIE
export class FilmView {
  constructor() {
    this.imgChoose = document.querySelector('.choose');
    this.divFilm = document.querySelector('.film');
    this.divPoster = document.querySelector('.film_poster');
    this.divInfoContent = document.querySelector('.film_info_content');
    this.divMore = document.querySelector('.film_info_more');
    this.divTitle = document.querySelector('.header_title');
    this.divDate = document.querySelector('.header_date');
    this.canvas = document.getElementById('cnvs');
    this.url = 'https://image.tmdb.org/t/p/w500';
  }

  showMovie(title, overview, poster_path, date, vote_average) {
    this.imgChoose.style.display = 'none';
    this.divFilm.style.display = 'flex';
    this.divInfoContent.textContent = overview;
    this.divPoster.style.backgroundImage = `url(${this.url}${poster_path})`;
    this.divTitle.textContent = title;
    this.divDate.textContent = date;
    this.addEvent(this.divMore);
  };
  addEvent(element) {
    element.addEventListener('click', this.handleMoreClick);
  };
  handleMoreClick(event) {
    mediator.publish('infoMoreClicked', event.target);
  }
}