import axios from '@/libs/request'

export const getStorageListWithPage = (data) => {
  return axios.request({
    url: '/api/storage/getListWithPage',
    method: 'get',
    params: data
  })
}

export const addStorage = (data) => {
  return axios.request({
    url: '/api/storage/add',
    method: 'post',
    data: data
  })
}

export const updateStorage = (data) => {
  return axios.request({
    url: '/api/storage/update',
    method: 'post',
    data: data
  })
}

export const deleteStorage = (data) => {
  return axios.request({
    url: '/api/storage/delete',
    method: 'post',
    params: data
  })
}

export const getById = (data) => {
  return axios.request({
    url: '/api/storage/getById',
    method: 'get',
    params: data
  })
}

export const getStorageDetailList = (data) => {
  return axios.request({
    url: '/api/storage/getDeliveryListByOrderId',
    method: 'get',
    params: data
  })
}

export const addAmount = (data) => {
  return axios.request({
    url: '/api/storage/add',
    method: 'post',
    data: data
  })
}

export const deleteStorageDetail = (id) => {
  let data = {deliveryId: id}
  return axios.request({
    url: '/api/storage/delete',
    method: 'post',
    params: data
  })
}
