import Http from '../http'

export const fetchAttendanceByUserId = async (id, payload) => {
  const { data } = await Http.get(`/attendances/${id}`, { params: payload })
  return data
}

export const storeAttendance = async () => {
  const { data } = await Http.post(`/attendances`)
  return data
}

export const updateAttendance = async (payload) => {
  const { data } = await Http.post(`/attendances/update`, payload)
  return data
}
