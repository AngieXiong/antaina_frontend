import axios from '@/libs/request'

export const getStorageListWithPage = (data) => {
  return axios.request({
    url: '/api/storage/getListWithPage',
    method: 'get',
    params: data
  })
}

export const exportReport = (data) => {
  return axios.request({
    url: '/api/storage/exportRptStorage',
    method: 'post',
    data: data
  })
}
