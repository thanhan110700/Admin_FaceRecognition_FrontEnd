import Http from '../http'

export const DownloadFile = async (url, payload, filename = 'test.csv') => {
  try {
    const data = await Http.get(url, {
      params: payload,
      responseType: 'blob',
    })
    const blob = window.URL.createObjectURL(new Blob([data.data]))
    const link = document.createElement('a')
    link.href = blob
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    return true
  } catch (error) {
    return error
  }
}
