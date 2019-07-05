import axios from '@/libs/request'

export const getStorageListWithPage = (data) => {
  return axios.request({
    url: '/api/report/getListWithPage',
    method: 'get',
    params: data
  })
}

export const exportReport = (data) => {
  return axios.request({
    url: '/api/report/exportRptStorage',
    method: 'get',
    params: data
  })
}
