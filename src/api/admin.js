import axios from '@/libs/request'

export const getAdminListWithPage = (data) => {
  return axios.request({
    url: '/api/admin/list',
    method: 'get',
    params: data
  })
}

export const addAdmin = (data) => {
  return axios.request({
    url: '/api/admin/add',
    method: 'post',
    data: data
  })
}

export const getById = (data) => {
  return axios.request({
    url: '/api/admin/getById',
    method: 'get',
    params: data
  })
}

export const updateAdmin = (data) => {
  return axios.request({
    url: '/api/admin/update',
    method: 'post',
    data: data
  })
}
