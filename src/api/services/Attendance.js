import Http from '../http'

export const fetchAttendance = async (payload) => {
  const { data } = await Http.get(`/attendances`, { params: payload })
  return data
}

export const storeAttendance = async () => {
  const { data } = await Http.post(`/attendances`)
  return data
}
