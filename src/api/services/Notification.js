import Http from '../http'

export const getListNotification = async (payload) => {
  const { data } = await Http.get(`/notifications/get-list`, {
    params: payload,
  })
  return data
}

export const updateNotificationRead = async (id, payload) => {
  const { data } = await Http.put(`/notifications/update-read/${id}`, payload)
  return data
}
