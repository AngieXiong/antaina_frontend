<template>
  <div>
    <Modal
      title="接口权限"
      width="900"
      v-model="accessPermissionBool"
      :mask-closable="false"
      @on-ok="okModel"
      @on-cancel="cancelModel"
      :closable="false">
      <Transfer
        :data="accessPermissionALLSelectList"
        :target-keys="accessPermissionSelectList"
        :list-style="listStyle"
        :operations="['To left','To right']"
        filterable
        :filter-method="filterMethod"
        :titles="titles"
        :render-format="render"
        @on-change="handleChange"></Transfer>
    </Modal>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {
  name: 'AccessTransfer',
  props: {
    // 用户传入的权限
    accessPermissionList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      accessPermissionBool: false,
      checkedAccessPermission: '',
      accessPermissionSelectList: [],
      // 默认拥有权限
      accessPermissionDisabledSelectList: ['/api/admin/user/adminLogout', '/api/admin/user/getByToken', '/api/statisticsPlatform/getDayStatistics'],
      accessPermissionALLSelectList: [],
      titles: ['未拥有的接口权限', '已拥有的接口权限'],
      listStyle: {
        width: '350px',
        'margin-left': '20px',
        height: '450px'
      }
    }
  },
  methods: {
    ...mapActions([
      'handleGetPermissionList'
    ]),
    filterMethod (data, query) {
      return data.description.indexOf(query) > -1
    },
    handleChange (newTargetKeys, direction, moveKeys) {
      this.accessPermissionSelectList = newTargetKeys.filter(value => value !== undefined)
    },
    render (item) {
      return item.description
    },
    cancelModel () {
    },
    okModel () {
      // previousValue上一个值；currentValue当前值
      this.checkedAccessPermission = this.accessPermissionSelectList.reduce((previousValue, currentValue) => {
        let pre = ''
        if (previousValue) {
          pre = previousValue.concat(';')
        } else {
          pre = previousValue
        }
        return pre.concat(this.accessPermissionALLSelectList.filter(permission => permission.key === currentValue).pop().label)
      }, '')
    },
    closeModel () {
      this.accessPermissionBool = false
    },
    openModel () {
      this.accessPermissionSelectList = []
      const msg = this.$Message.loading({
        content: '加载中，请稍后...',
        duration: 0
      })
      setTimeout(() => {
        this.accessPermissionList.forEach(value => {
          this.accessPermissionSelectList.push(this.accessPermissionALLSelectList.filter(permission => permission.label.trim() === value.trim()).pop().key)
        })
        this.accessPermissionBool = true
      }, 200)
      setTimeout(msg, 200)
    },
    indexOfBool (value) {
      return this.accessPermissionDisabledSelectList.indexOf(value) !== -1
    },
    loadPermissionList () {
      this.handleGetPermissionList().then(res => {
        res.data.data.forEach(value => {
          this.accessPermissionALLSelectList.push({
            key: value.id,
            label: value.url,
            description: value.id + ' - ' + value.permission,
            disabled: this.indexOfBool(value.url)
          })
        })
      }).catch(err => {
        this.$Message.error(err.response.data.message)
      })
    }
  },
  watch: {
    checkedAccessPermission (value) {
      this.$emit('checkedAccessPermission', value)
    }
  },
  created () {
    this.loadPermissionList()
  }
}
</script>

<style>

</style>
