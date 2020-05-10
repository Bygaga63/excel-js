import {$} from '@core/dom';

export class Excel {
  constructor(selector, {components = []}) {
    this.$el = document.querySelector(selector);
    this.components = components;
  }

  getRoot() {
    const $root = $.create('div', 'excel');
    this.components.forEach(Component => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.insertAdjacentHTML('afterbegin', component.toHTML());
      $root.append($el);
    })
    return $root;
  }

  render() {
    console.log(this.$el);

    this.$el.append(this.getRoot())
  }
}
