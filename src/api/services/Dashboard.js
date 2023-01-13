import Http from '../http'

export const getMasterData = async () => {
  const { data } = await Http.get(`/master-data`)
  return data
}
