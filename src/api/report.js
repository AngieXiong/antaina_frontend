import axios from '@/libs/request'

export const getUserReportWithPage = (data) => {
  return axios.request({
    url: '/api/report/getUserReportWithPage',
    method: 'get',
    params: data
  })
}

export const getTransactionReportWithPage = (data) => {
  return axios.request({
    url: '/api/report/getTransactionReportWithPage',
    method: 'get',
    params: data
  })
}
