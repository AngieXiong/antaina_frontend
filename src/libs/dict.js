
const transactionTypeDict = [ { value: 10, label: '初始化' }, { value: 11, label: '接收' }, { value: 12, label: '失败退回' }, { value: 21, label: '发送' }, { value: 22, label: '发送手续费' } ]
const adminStatusDict = [ { value: 0, label: '删除' }, { value: 1, label: '正常' }, { value: 2, label: '冻结登陆' } ]
const reportTypeDict = [ { value: 0, label: '每小时' }, { value: 1, label: '每12小时' }, { value: 2, label: '每天' }, { value: 3, label: '每周' }, { value: 4, label: '每月' }, { value: 5, label: '年' } ]
const reportTransactionTypeDict = [ { value: 0, label: '转入' }, { value: 1, label: '转出' }, { value: 2, label: '全部' } ]
const sysErrorTypeDict = [ { value: 0, label: '未处理' }, { value: 1, label: '已处理' } ]
const productTypeDict= [ { value: 0, label: '原材料' }, { value: 1, label: '半成品' }, { value: 2, label: '成品' }]
const productUnitDict= [ { value: 0, label: '片' }, { value: 1, label: '个' }]
const orderStatusDict= [ { value: 0, label: '未全部交货' }, { value: 1, label: '已完成' }]

const dictMAP = {
  transactionType: transactionTypeDict,
  adminStatus: adminStatusDict,
  reportType: reportTypeDict,
  reportTransactionType: reportTransactionTypeDict,
  sysErrorType: sysErrorTypeDict,
  productType : productTypeDict,
  productUnit : productUnitDict,
  orderStatus:orderStatusDict
}

export const TRANSACTIONTYPE = 'transactionType'
export const ADMINSTATUS = 'adminStatus'
export const REPORTTYPE = 'reportType'
export const REPORTTRANSACTIONTYPE = 'reportTransactionType'
export const SYSERRORTYPE = 'sysErrorType'
export const PRODUCTTYPE = 'productType'
export const PRODUCTUNIT = 'productUnit'
export const ORDERSTATUS = 'orderStatus'

export const getNameByCode = (value, key) => {
  const dict = dictMAP[key].filter(lang => lang.value === value)
  if (dict.length > 0) {
    return dict[0].label
  } else {
    return '无匹配'
  }
}

export const getCodeByName = (label, key) => {
  const dict = dictMAP[key].filter(lang => lang.label === label)
  if (dict.length > 0) {
    return dict[0].value
  } else {
    return '无匹配'
  }
}

export const getIconByCode = (value, key) => {
  const dict = dictMAP[key].filter(lang => lang.value === value)
  if (dict.length > 0) {
    return dict[0].icon
  } else {
    return '无匹配'
  }
}

export const getDictByKey = (key) => {
  return dictMAP[key].length > 0 ? dictMAP[key] : []
}
