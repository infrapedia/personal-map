function createElement(tag, options) {
  const el = document.createElement(tag)

  if (options) {
    const keys = Object.keys(options)

    keys.includes('id') ? el.setAttribute('id', options.id) : null
    keys.includes('class') ? el.setAttribute('class', options.class) : null

    if (keys.includes('style')) {
      for (let key of Object.keys(options.style)) {
        el.style[key] = options.style[key]
      }
    }
  }

  return el
}

export default createElement
