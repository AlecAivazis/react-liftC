export default initialValue => ({
  initialValue,

  handlers: {
    set(prev, newValue) {
      return newValue
    }
  }
})
