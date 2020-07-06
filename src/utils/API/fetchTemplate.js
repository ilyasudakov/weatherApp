export const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
    // ...options.headers,
  })

  //   headers.append(
  //     'Authorization',
  //     'Bearer_' + localStorage.getItem('accessToken'),
  //   )

  const defaults = { headers: headers }

  options = Object.assign({}, defaults, options)

  return fetch(options.url, options).then((response) => {
    if (!response.ok) {
      return Promise.reject(response.error)
    }
    return response
  })
}
