import mediator from './mediator'

// SHOW YEARS
export class View {
  constructor(elementClass) {
    this._elementClass = elementClass;
    this.divYear = document.getElementsByClassName(this._elementClass)[0];
  }
  showYears(year) {
    const div = document.createElement('div');
    div.classList.add(`${this._elementClass}_item`);
    div.setAttribute('data_year',`${year}`);
    div.textContent = year;
    this.addEventListener(this.divYear);
    this.divYearElement.push(div);

    const divWrapper = document.createElement('div');
    divWrapper.classList.add('main_wrapper_year');
    divWrapper.append(div);
    this.divYear.append(divWrapper);
  };
  addEventListener(element) {
    this.divYear.addEventListener('click', this.handleYear);
  };
  handleYear({target}) {
    mediator.publish('yearClicked', target);
  };

}
