import axios from '@/libs/request'

export const getSysErrorListWithPage = (data) => {
  return axios.request({
    url: '/api/sysError/getListWithPage',
    method: 'get',
    params: data
  })
}

export const getPlatformListWithPage = (data) => {
  return axios.request({
    url: '/api/platform/getListWithPage',
    method: 'get',
    params: data
  })
}

export const getPlatformById = (data) => {
  return axios.request({
    url: '/api/platform/getPlatformById',
    method: 'get',
    params: data
  })
}

export const addPlatform = (data) => {
  return axios.request({
    url: '/api/platform/add',
    method: 'post',
    data: data
  })
}

export const updatePlatform = (data) => {
  return axios.request({
    url: '/api/platform/update',
    method: 'post',
    data: data
  })
}

export const deletePlatform = (data) => {
  return axios.request({
    url: '/api/platform/delete',
    method: 'post',
    params: data
  })
}
