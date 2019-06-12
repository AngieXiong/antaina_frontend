import axios from '@/libs/request'

export const getOrderListWithPage = (data) => {

  return axios.request({
    url: '/api/order/getListWithPage',
    method: 'get',
    params: data
  })
}

export const addOrder = (data) => {
  return axios.request({
    url: '/api/customer/add',
    method: 'post',
    data: data
  })
}

export const updateOrder = (data) => {
  return axios.request({
    url: '/api/customer/update',
    method: 'post',
    data: data
  })
}

export const deleteOrder = (data) => {
  return axios.request({
    url: '/api/order/delete',
    method: 'post',
    params: data
  })
}

export const getById = (data) => {
  return axios.request({
    url: '/api/order/getById',
    method: 'get',
    params: data
  })
}
