import Http from '../http'
import { DownloadFile } from './DownloadFile'

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

export const getListSalary = async (payload) => {
  const { data } = await Http.get(`/salary`, { params: payload })
  return data
}

export const downloadCsvSalary = async (payload) => {
  try {
    const url = `/download-csv-salary`
    const filename = `salary.csv`
    DownloadFile(url, payload, filename).catch((response) => {
      return response
    })
    return true
  } catch (error) {
    return false
  }
}
