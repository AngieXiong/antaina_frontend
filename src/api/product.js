import axios from '@/libs/request'

export const getProductWithPage = (data) => {
  return axios.request({
    url: '/api/product/getListWithPage',
    method: 'get',
    params: data
  })
}

export const addProduct = (data) => {
  return axios.request({
    url: '/api/product/add',
    method: 'post',
    data: data
  })
}

export const updateProduct = (data) => {
  return axios.request({
    url: '/api/product/update',
    method: 'post',
    data: data
  })
}

export const deleteProduct = (data) => {
  return axios.request({
    url: '/api/product/delete',
    method: 'post',
    params: data
  })
}

export const getById = (data) => {
  return axios.request({
    url: '/api/product/getById',
    method: 'get',
    params: data
  })
}

export const loadProductCodeList = (data) => {
  return axios.request({
    url: '/api/product/getProductList',
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
