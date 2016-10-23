# react-liftC

This is the result of my frusteration with the amount of time/changes it takes to go from a stateless
component to one with state. It's influenced by the same functional programming principles that redux
is based on but does not require that all of your state be in a single component.


I think the best way to show how this works is with an example:

```jsx
import liftC from 'react-liftc'

// we're going to be building a counter using only functional components and pure functions

// let's start off with a simple component
const Counter = ({state, increment}) => (
  <div onClick={increment}>
    {state}
  </div>
)

// and now let's describe our state and its mutations
const state = {
  initialValue: 0,
  handlers: {
    increment = (prev) => prev + 1
  }
}

// and now let's put them together
const StatefulCounter = liftC(state)(Counter)
```
