import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener)
      const method = this[methodName]
      if (!method) {
        throw new Error(`Method ${methodName} is not implemented in ${this.name} Component`);
      }
      this.$root.on(listener, method.bind(this))

      console.log(this.$root);
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const methodName = getMethodName(listener)
      const method = this[methodName]
      this.$root.off(listener, method)
    })
    this.listeners = [];
  }
}

const getMethodName = string => 'on' + capitalize(string)
