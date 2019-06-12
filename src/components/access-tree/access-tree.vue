<template>
  <div>
    <Modal
      title="菜单栏权限"
      width="800"
      v-model="accessMenuBool"
      :mask-closable="false"
      @on-ok="okModel"
      @on-cancel="cancelModel"
      :closable="false">
      <Tree ref="treeModel" :data="accessTreeList" multiple show-checkbox></Tree>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'AccessTree',
  props: {
    // 用户传入的权限
    accessMenuList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      // 加载的菜单内容
      accessTreeList: [],
      accessMenuBool: false,
      checkedAccessMenu: ''
    }
  },
  methods: {
    cancelModel () {
    },
    okModel () {
      // previousValue上一个值；currentValue当前值
      this.checkedAccessMenu = this.$refs.treeModel.getCheckedAndIndeterminateNodes().reduce((previousValue, currentValue) => {
        let pre = ''
        if (previousValue) {
          pre = previousValue.concat(';')
        } else {
          pre = previousValue
        }
        return pre.concat(currentValue.value)
      }, '')
    },
    closeModel () {
      this.accessMenuBool = false
    },
    openModel () {
      const msg = this.$Message.loading({
        content: '加载中，请稍后...',
        duration: 0
      })
      setTimeout(() => {
        this.accessTreeList.forEach(value => {
          let bool = this.indexOfBool(value.value)
          value.selected = bool
          value.expand = bool
          value.children.forEach(child => {
            child.checked = this.indexOfBool(child.value)
          })
        })
        this.accessMenuBool = true
      }, 200)
      setTimeout(msg, 200)
    },
    indexOfBool (value) {
      return this.accessMenuList.indexOf(value) !== -1
    },
    loadTree () {
      const treeList = this.$router.options.routes
      treeList.forEach(tree => {
        let icon = ''
        let treeModel = {
          title: '',
          value: '',
          expand: false,
          render: (h, { root, node, data }) => {
            return h('span', [
              h('Icon', {
                props: {
                  type: icon
                },
                style: {
                  marginRight: '8px'
                }
              }),
              h('span', data.title)
            ])
          },
          children: []
        }
        // 先进行当前路由是否需要进行权限
        if (tree.meta.access) {
          // 进行第一级的添加
          treeModel.title = tree.meta.title
          treeModel.value = tree.name
          icon = tree.meta.icon
          if (tree.children) {
            tree.children.forEach(child => {
              treeModel.children.push({
                title: child.meta.title,
                value: child.name,
                render: (h, { root, node, data }) => {
                  return h('span', [
                    h('Icon', {
                      props: {
                        type: child.meta.icon
                      },
                      style: {
                        marginRight: '8px'
                      }
                    }),
                    h('span', data.title)
                  ])
                }
              })
            })
          }
          this.accessTreeList.push(treeModel)
        }
      })
    }
  },
  watch: {
    checkedAccessMenu (value) {
      this.$emit('checkedAccessMenu', value)
    }
  },
  created () {
    this.loadTree()
  }
}
</script>

<style>

</style>
