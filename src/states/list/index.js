export default ({
  initialValue: [],

  handlers: {
      clear: () => [],
      append: (prev, value) => [...prev, value],
      prepend: (prev, value) => [value, ...prev],
      popStart: (prev) => prev.slice(1, prev.length),
      popEnd: (prev, value) => prev.slice(0, prev.length-1),
  }
})
