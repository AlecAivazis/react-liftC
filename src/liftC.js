// external imports
import React from 'react'

export default config => component => {
  // the stateful class that will manage the state
  return class StatefulComponent extends React.Component {
    static propTypes = {
      children: React.PropTypes.element
    }

    constructor(...args) {
      // instantiate this
      super(...args)
      // use the initial value of the config as the state of the prop
      this.state = {
          componentState: config.initialValue
      }
    }

    // this getter returns the handlers associated with the
    get mutations() {
      // the handlers associated with the component state all have the form
      // (old, ...args) => new

      // this function tranforms the given handler into something that updates
      // the state of the component
      const handlerMap = (prev, key) => ({
        ...prev,
        [key]: (...args) => this.setState({
          componentState: this.handlers[key](this.state.componentState, ...args)
        })
      })

      // build the object of handlers to functions that update the state
      return Object.keys(this.handlers).reduce(handlerMap, {})
    }

    // this getter returns the dictionary of handlers as defined by the config
    get handlers() {
      return config.handlers
    }

    // render the child with the current state and the handlers as props
    render() {
      // add the handlers and component state to the only child
      return  React.createElement(component, {
        ...this.props,
        ...this.mutations,
        state: this.state.componentState,
      })
    }
  }
}
