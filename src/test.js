// external imports
import React from 'react'
import { mount } from 'enzyme'
import test from 'ava'
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
test('returns a component', t => {
  // lift the component with the given state
  const NewComponent = liftC(state)(Counter)

  // make sure it returned a component
  t.is(React.isValidElement(<NewComponent />), true)
})

test('state begins at initial value', t => {
  // lift the component with the given state
  const StatefulCounter = liftC(state)(Counter)

  // render the component
  const component = mount(<StatefulCounter/>)

  // make sure the content of the article element is the initial value
  t.is(component.text(), "1")
})

test('passes props through', t => {
  // a component to test prop values
  const PropComponent = ({hello}) => <article>{hello}</article>
  // lift the component with the given state
  const NewComponent = liftC(state)(PropComponent)

  // check the component content

  // render the component
  const component = mount(<NewComponent hello="world"/>)
  // make sure the content of the article matches the prop we passed
  t.is(component.text(), "world")
})

test('handlers correctly affect the state', t => {
  // lift the component with the given state
  const NewComponent = liftC(state)(Counter)

  // render the component
  const component = mount(<NewComponent/>)

  // simulate a click on the component
  component.find('div').simulate('click')

  // make sure the content of the article element is the initial value
  t.is(component.text(), "2")
})

test('passes handler arguments through', t => {
  // lift the component with the given state
  const NewComponent = liftC(state)(MultiCounter)

  // render the component
  const component = mount(<NewComponent n={2}/>)

  // simulate a click on the component
  component.find('div').simulate('click')

  // make sure the content of the article element is the initial value
  t.is(component.text(), "3")
})
