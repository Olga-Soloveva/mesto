export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const element = this._renderer(item);
    this._container.append(element);
  }

  prependItem(item) {
    const element = this._renderer(item);
    this._container.prepend(element);
  }
}
