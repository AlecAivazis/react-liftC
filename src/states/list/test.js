// external imports
import test from 'ava'
import React from 'react'
import { mount } from 'enzyme'
// local imports
import liftC, { listState } from '../..'

const ListTest = ({state, ...unused}) => <div/>
const Lifted = liftC(listState)(ListTest)

const verifyState = (t, wrapper, state) => (
    t.deepEqual(wrapper.find(ListTest).props().state, state)
)

test('can append to the list state', t => {
    // mount a version of the lifted component
    const wrapper = mount(<Lifted />)

    // call the append prop with a value
    wrapper.find(ListTest).props().append("hello")
    wrapper.find(ListTest).props().append("world")

    // make sure the component has the most up to date value
    verifyState(t, wrapper, ["hello", "world"])
})

test('can clear the current state', t => {
    // mount a version of the lifted component
    const wrapper = mount(<Lifted />)

    // call the append prop with a value
    wrapper.find(ListTest).props().append("hello")
    // clear the state
    wrapper.find(ListTest).props().clear()

    // make sure the component has the most up to date state
    verifyState(t, wrapper, [])
})

test('can prepend to the list state', t => {
    // mount a version of the lifted component
    const wrapper = mount(<Lifted />)

    // call the append prop with a value
    wrapper.find(ListTest).props().append("world")
    // add a string before the first one
    wrapper.find(ListTest).props().prepend("hello")

    // make sure the component has the most up to date state
    verifyState(t, wrapper, ["hello", "world"])
})

test('can pop the start of the list', t => {
    // mount a version of the lifted component
    const wrapper = mount(<Lifted />)

    // call the append prop with a value
    wrapper.find(ListTest).props().append("world")
    // add a value before the first one
    wrapper.find(ListTest).props().prepend("hello")

    // remove the first entry in the list
    wrapper.find(ListTest).props().popStart()

    // make sure the component has the most up to date state
    verifyState(t, wrapper, ["world"])
})

test('can pop the start of the list', t => {
    // mount a version of the lifted component
    const wrapper = mount(<Lifted />)

    // call the append prop with a value
    wrapper.find(ListTest).props().append("world")
    // add a value before the first one
    wrapper.find(ListTest).props().prepend("hello")

    // remove the first entry in the list
    wrapper.find(ListTest).props().popEnd()

    // make sure the component has the most up to date state
    verifyState(t, wrapper, ["hello"])
})
