// external imports
import React from 'react'
import { mount } from 'enzyme'
// local imports
import liftC from './liftC'

// the configuration for the lift
const state = {
  initialValue: 1,

  handlers: {
    increment(prev) {
      return prev + 1
    },
    addN(prev, n) {
      return prev + n
    }
  }
}
// the component to lift
const Counter = ({state, increment}) => (
  <div onClick={increment}>
    {state}
  </div>
)
const MultiCounter = ({state, addN, n}) => (
  <div onClick={() => addN(n)}>
    {state}
  </div>
)

// make sure it returns a component
it('returns a component', () => {
  // lift the component with the given state
  const NewComponent = liftC(state)(Counter)

  // make sure it returned a component
  expect(React.isValidElement(NewComponent)).toBe.true
})

it('state begins at initial value', () => {
  // lift the component with the given state
  const StatefulCounter = liftC(state)(Counter)

  // render the component
  const component = mount(<StatefulCounter/>)

  // make sure the content of the article element is the initial value
  expect(component.text()).toBe("1")
})

it('passes props through', () => {
  // a component to test prop values
  const PropComponent = ({hello}) => <article>{hello}</article>
  // lift the component with the given state
  const NewComponent = liftC(state)(PropComponent)

  // check the component content

  // render the component
  const component = mount(<NewComponent hello="world"/>)
  // make sure the content of the article matches the prop we passed
  expect(component.text()).toBe("world")
})

it('handlers correctly affect the state', () => {
  // lift the component with the given state
  const NewComponent = liftC(state)(Counter)

  // render the component
  const component = mount(<NewComponent/>)

  // simulate a click on the component
  component.find('div').simulate('click')

  // make sure the content of the article element is the initial value
  expect(component.text()).toBe("2")
})

it('passes handler arguments through', () => {
  // lift the component with the given state
  const NewComponent = liftC(state)(MultiCounter)

  // render the component
  const component = mount(<NewComponent n={2}/>)

  // simulate a click on the component
  component.find('div').simulate('click')

  // make sure the content of the article element is the initial value
  expect(component.text()).toBe("3")
})
