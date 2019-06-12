import axios from '@/libs/request'

export const login = ({ userName, userPwd }) => {
  const data = {
    useraccount : userName,
    password : userPwd
  }
  return axios.request({
    url: '/api/admin/adminLogin',
    data,
    method: 'post'
  })
}

export const getUserInfo = () => {
  return axios.request({
    url: '/api/admin/getByToken',
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: '/api/admin/adminLogout',
    method: 'get'
  })
}
