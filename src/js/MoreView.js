
// RENDER INFO ABOUT LANGUAGE AND SHOW STARS
export class MoreView {
  constructor() {
    this.mainMore = document.querySelector('.main_more');
    this.moreLang = document.querySelector('.main_more_lang');
    this.moreStars = document.querySelector('.main_more_stars');
    this.star = document.querySelector('.main_more_stars span');
  }
  clearData() {
    this.moreLang.textContent = '';
    this.moreStars.textContent = '';
  };
  drowMoreInfo(language) {
    this.clearData();
    this.moreLang.textContent = language;
    this.moreLang.classList.add('main_more_lang');
    this.moreStars.classList.add('main_more_stars');
  };
  addStars(element) {
    element.innerHTML += '<span>&#9733;</span>';
  };
  selfRemove() {
    this.mainMore.style.display = 'none';
  }
}