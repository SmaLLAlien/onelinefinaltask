import '../scss/main.scss'
import mediator from './mediator'
import {View} from './viewYears'
import {viewTitle} from './viewTitle'
import {MODULE} from './module'
import {FilmView} from './FilmView'
import {MoreView} from './MoreView'
import {FooterView} from './FooterView'

let url = 'https://api.themoviedb.org/3/discover/movie?api_key=86ec1123e778eaa75fc49be69e72ea6c&with_genres=878.';
let module = new MODULE();
module.getArrOfFilms(url);

class viewR extends View{
  constructor(elementClass){
    super(elementClass);
    this.divYearElement = []
  }
  addClass({elementRight}) {
    elementRight.classList.add('active_right');
  };
  appendViewTitle({elementRight}){
    elementRight.parentNode.append(viewTitleRight.divTitle);
  };
  removeClass() {
    this.divYearElement.forEach(element => element.classList.remove('active_right'))

  }
}

class viewU extends View{
  constructor(elementClass){
    super(elementClass);
    this.divYearElement = []
  }
  addClass({elementUp}) {
    elementUp.classList.add('active');
  };
  removeClass() {
    this.divYearElement.forEach(element => element.classList.remove('active'))
  };
  appendViewTitle({elementUp}){
    elementUp.parentNode.append(viewTitleUp.divTitle)
  }
}

const viewRight = new viewR('main_right');
const viewUp = new viewU('main_year');
const viewTitleUp = new viewTitle();
const viewTitleRight = new viewTitle();
const filmView = new FilmView();
const moreView = new MoreView();
const footerView = new FooterView();

// CONTROLLER FOR View
let controller = {
  rightYearsElements: [],
  upYearsElements:[],

  addYears() {
    const years = module.getYears();
    years.forEach(year => {
      viewUp.showYears(year);
      viewRight.showYears(year);
    })
  },
  getClickedElement(element) {
    if(element.hasAttribute('data_year')) {
      const year = element.getAttribute('data_year');
      const elementUp = viewUp.divYearElement.filter(el => el.getAttribute('data_year') == year)[0];
      const elementRight = viewRight.divYearElement.filter(el => el.getAttribute('data_year') == year)[0];
      viewUp.removeClass();
      viewRight.removeClass();
      mediator.publish('readyClickedElements', {elementUp, elementRight});
      return year
    }
    else {
      return -1;
    }
  }
};

// CONTROLLER FOR viewTitle
let titleController = {
  addTitles(clickedElements) {
    let titlesArr = module.getTitlesFromYear(clickedElements.elementUp.textContent);
    viewTitleUp.divTitle.textContent = '';

    titlesArr.forEach(title => {
      viewTitleUp.showTitles(title);
    });
    viewTitleUp.addAbsolutePosition();

    viewTitleRight.divTitle.textContent = '';
    titlesArr.forEach(title => {
      viewTitleRight.showTitles(title);
    })
  },
  checkEventTarget(elementTarget) {
    if(elementTarget.classList.contains('title')) {
      mediator.publish('readyToRenderFilm', elementTarget.textContent);
      viewTitleUp.selfRemove();
      viewTitleRight.selfRemove();
    }
  }
};

// CONTROLLER FOR filmView
let filmController = {
  getMovie({title, overview, poster_path, date, vote_average}) {
    filmView.showMovie(title, overview, poster_path, date, vote_average);
    let endAngle = 0 - 3.14/2;
    setTimeout(this.drowCanvas.bind(filmController), 500, vote_average, endAngle)
  },
  drowCanvas(vote_average, endAngle) {
    const startAngle = 0 - 3.14/2;
    const usersVote = module.countArc(vote_average);
    const userVoteInRadians = usersVote - 3.14/2;
    const ctx = filmView.canvas.getContext('2d');
    // clear canvas
    ctx.clearRect(0, 0, filmView.canvas.width, filmView.canvas.height);
    ctx.beginPath();
    ctx.lineWidth = 3;
    // get needed angle
    if(endAngle < userVoteInRadians/3) {
      endAngle += 0.05;
    } else if(endAngle > userVoteInRadians/3 && endAngle < userVoteInRadians * 2 / 3) {
      endAngle += 0.1;
    } else {
      endAngle += 0.05;
    }

    // change color
    if(vote_average < 3) {
      ctx.fillStyle = "#F00";
      ctx.strokeStyle = "#F00";
    } else if(vote_average > 3 && vote_average < 7) {
      ctx.fillStyle = "#FFFF00";
      ctx.strokeStyle = "#FFFF00";
    } else {
      ctx.fillStyle = "#0F0";
      ctx.strokeStyle = "#0F0";
    }
    // drow text
    ctx.font = 'bold 14px sans-serif';
    ctx.fillText(`${vote_average}`, 10, 25);
    // drow line
    ctx.arc(20, 20, 18, startAngle, endAngle, false);
    if(endAngle < userVoteInRadians) {
      window.requestAnimationFrame( () =>  this.drowCanvas(vote_average, endAngle));
    }
    ctx.stroke();
    return ctx
  }
};


// CONTROLLER FOR MoreView
const moreController = {
  language: '',
  vote_average: '',
  getInfo({original_language, vote_average}) {
    this.language = original_language;
    this.vote_average = vote_average;
  },
  showMoreInfo() {
    moreView.mainMore.style.display = 'flex';
    moreView.drowMoreInfo(this.language, this.vote_average);
    for(let i = 0, roundedAverage = Math.floor(this.vote_average); i < roundedAverage; i++) {
      moreView.addStars(moreView.moreStars)
    }
  }
};

// CONTROLLER FOR FooterView
let footerController = {
  addStyle() {
    let templateUrl = `./assets/img/footer${Math.floor(Math.random() * 5 + 1)}.jpg`;
    footerView.addBackground(templateUrl)
  }
};

// information from server is ready
mediator.subscribe('filmsReady', controller.addYears);

// user choose year
mediator.subscribe('yearClicked', controller.getClickedElement);

// return clicked elements after checking from both views
mediator.subscribe('readyClickedElements', viewUp.addClass);
mediator.subscribe('readyClickedElements', viewRight.addClass);
mediator.subscribe('readyClickedElements', titleController.addTitles);
mediator.subscribe('readyClickedElements', viewUp.appendViewTitle);
mediator.subscribe('readyClickedElements', viewRight.appendViewTitle);

mediator.subscribe('checkIfTitleClicked', titleController.checkEventTarget);


mediator.subscribe('readyToRenderFilm', module.getMovie.bind(module));
mediator.subscribe('readyToRenderFilm', moreView.selfRemove.bind(moreView));

// return selected movie
mediator.subscribe('movieReady', filmController.getMovie.bind(filmController));
mediator.subscribe('movieReady', footerController.addStyle);
mediator.subscribe('movieReady', moreController.getInfo.bind(moreController));

mediator.subscribe('infoMoreClicked', moreController.showMoreInfo.bind(moreController));
