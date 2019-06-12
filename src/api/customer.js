import axios from '@/libs/request'

export const getCustomerListWithPage = (data) => {
  return axios.request({
    url: '/api/customer/getListWithPage',
    method: 'get',
    params: data
  })
}

export const addCustomer = (data) => {
  debugger
  return axios.request({
    url: '/api/customer/add',
    method: 'post',
    data: data
  })
}

export const updateCustomer = (data) => {
  return axios.request({
    url: '/api/customer/update',
    method: 'post',
    data: data
  })
}

export const deleteCustomer = (data) => {
  return axios.request({
    url: '/api/customer/delete',
    method: 'post',
    params: data
  })
}

export const getById = (data) => {
  return axios.request({
    url: '/api/customer/getById',
    method: 'get',
    params: data
  })
}

export const loadCustomerList = (data) => {
  return axios.request({
    url: '/api/customer/getCustomerList',
    method: 'get',
    params: data
  })
}

// export const getSendListWithPage = (data) => {
//   return axios.request({
//     url: '/api/send/getListWithPage',
//     method: 'get',
//     params: data
//   })
// }
//
// export const getSendDetail = (data) => {
//   return axios.request({
//     url: '/api/send/getSendDetail',
//     method: 'get',
//     params: data
//   })
// }
//
// export const getRecordListWithPage = (data) => {
//   return axios.request({
//     url: '/api/record/getListWithPage',
//     method: 'get',
//     params: data
//   })
// }
