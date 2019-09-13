import mediator from './mediator'
export class MODULE {
  constructor() {
    this.arr = [];
  }
  async getArrOfFilms (url) {
    const responce = await fetch(url);
    const data = await responce.json();
    this.arr = data.results.map(obj => {
      let  {title, overview, poster_path, release_date, original_language, backdrop_path, vote_average} = obj;
      return   {title, overview, poster_path, release_date, original_language, backdrop_path, vote_average}
    });
    mediator.publish('filmsReady');
  };
  getYears() {
    const years = [];
    const temp =  this.arr.map(obj => {return obj.release_date.substr(0, 4)});
    for (let year of temp) {
      if (!years.includes(year)) {
        years.push(year);
      }
    }
    return years.sort(( b, a ) => a - b );
  };
  getTitlesFromYear(year) {
    const filmsArrOfYear =  this.arr.filter(obj => {
      if(obj.release_date.substr(0,4) == year) {
        return obj;
      }
    });
    return filmsArrOfYear.map(obj => obj.title)
  };
  getMovie(title) {
    const movie =  this.arr.filter(obj => obj.title == title);
    movie[0].date = this.convertDate(movie[0].release_date);
    mediator.publish('movieReady', movie[0]);
    return movie;
  };
  convertDate(dateString) {
    const date = new Date(dateString);
    const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthesLength = monthes.length;
    let month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    for(let i = 0; i < monthesLength; i++) {
      if(month === i) {
        month = monthes[i];
      }
    }
    return `${month} ${day}, ${year}`;
  };
  countArc(vote_average) {
    return 360*vote_average*3.14/10/180
  }
}