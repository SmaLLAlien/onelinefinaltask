import mediator from './mediator'

// SHOW MOVIES TITLES
export class viewTitle {
  constructor() {
    this.divTitle = document.createElement('div');

  }

  showTitles(title) {
    this.divTitle.classList.add('wrapper_title');
    let div = document.createElement('div');
    div.classList.add('title');
    div.textContent = title;
    this.divTitle.append(div);
    this.addEvents(this.divTitle);
    return this.divTitle;
  }
  addEvents(element) {
    element.addEventListener('click', this.handleTitleClick);
  }
  handleTitleClick(event) {
    // console.log(this);
    // console.log(event.target);
    mediator.publish('checkIfTitleClicked', event.target);
  }
  selfRemove() {
    this.divTitle.remove();
  }
  addAbsolutePosition() {
    this.divTitle.closest('div').style.position = 'absolute';
    const titles = [...this.divTitle.children];
    titles.forEach(title => title.style.backgroundColor = '#e9e9e9');

  }
}
