import axios from '@/libs/request'

export const getTotalAssetListWithPage = (data) => {
  return axios.request({
    url: '/api/account/getTotalAssetListWithPage',
    method: 'get',
    params: data
  })
}

export const getAddressList = (data) => {
  return axios.request({
    url: '/api/account/getAddressListByAccountId',
    method: 'get',
    params: data
  })
}
