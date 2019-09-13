// CHANGE FOOTER BACKGROUND
export class FooterView {
  constructor() {
    this.footer = document.querySelector('footer');
  }
  addBackground(templateUrl) {
    this.footer.style.backgroundImage = `url(${templateUrl}), radial-gradient(at 30% top, #074034 0%, #081c24 70%)`;
  }
}