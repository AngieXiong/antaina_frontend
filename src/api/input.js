import axios from '@/libs/request'

export const getInputListWithPage = (data) => {
  return axios.request({
    url: '/api/input/getListWithPage',
    method: 'get',
    params: data
  })
}

export const deleteInput = (id) => {
  let data = {id: id}
  return axios.request({
    url: '/api/input/delete',
    method: 'post',
    params: data
  })
}

export const addInput = (data) => {
  return axios.request({
    url: '/api/input/add',
    method: 'post',
    data: data
  })
}

