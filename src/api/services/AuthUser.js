import state from '../../utils/localStorage'
import Http from '../http'

export const login = async (payload) => {
  const { data } = await Http.post(`/login`, payload)
  return data
}

export const logout = () => {
  state.remove('token')
  state.remove('user')
}

export const register = async (payload) => {
  const data = await Http.post(`/register`, payload)
  return data
}

export const getUser = async () => {
  const { data } = await Http.get(`/users`)
  return data
}

export const deleteUser = async (payload) => {
  const { data } = await Http.delete(`/users/${payload}`)
  return data
}

export const getUserById = async (payload) => {
  const { data } = await Http.get(`/users/${payload}`)
  return data
}

export const updateUser = async (id, payload) => {
  const { data } = await Http.put(`/users/${id}`, payload)
  return data
}
