import axios from '@/libs/request'

export const getStorageListWithPage = (data) => {
  return axios.request({
    url: '/api/storage/getListWithPage',
    method: 'get',
    params: data
  })
}
