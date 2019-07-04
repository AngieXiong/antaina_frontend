import axios from '@/libs/request'

export const getOrderListWithPage = (data) => {
  return axios.request({
    url: '/api/order/getListWithPage',
    method: 'get',
    params: data
  })
}

export const exportOrder = (data) => {
  return axios.request({
    url: '/api/order/exportOrder',
    method: 'get',
    params: data
  })
}

export const addOrder = (data) => {
  return axios.request({
    url: '/api/order/add',
    method: 'post',
    data: data
  })
}

export const updateOrder = (data) => {
  return axios.request({
    url: '/api/order/update',
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

export const getDeliveryDetailList = (data) => {
  return axios.request({
    url: '/api/delivery/getDeliveryListByOrderId',
    method: 'get',
    params: data
  })
}

export const addAmount = (data) => {
  return axios.request({
    url: '/api/delivery/add',
    method: 'post',
    data: data
  })
}

export const deleteDelivery = (id) => {
  let data = {deliveryId: id}
  return axios.request({
    url: '/api/delivery/delete',
    method: 'post',
    params: data
  })
}
