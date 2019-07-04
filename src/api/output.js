import axios from '@/libs/request'

export const getOutputListWithPage = (data) => {
  return axios.request({
    url: '/api/output/getListWithPage',
    method: 'get',
    params: data
  })
}

export const exportOutput = (data) => {
  return axios.request({
    url: '/api/output/exportOutput',
    method: 'get',
    params: data
  })
}

export const deleteOutput = (id) => {
  let data = {id: id}
  return axios.request({
    url: '/api/output/delete',
    method: 'post',
    params: data
  })
}

export const addOutput = (data) => {
  return axios.request({
    url: '/api/output/add',
    method: 'post',
    data: data
  })
}

