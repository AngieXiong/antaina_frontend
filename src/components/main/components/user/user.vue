<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge>
        <Avatar :src="userAvatar"/>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem>
          <Icon class="icon-top" :size="15" type="ios-person" />账号:{{userAccount}}
        </DropdownItem>
        <DropdownItem name="logout"  style="color: #f02d73;">
          <Icon class="icon-top" :size="15" type="md-exit" />退出登录
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import defaultAvatar from '../../../../assets/images/avatar.png'
import { mapActions } from 'vuex'
export default {
  name: 'User',
  props: {
    userAvatar: {
      type: String,
      default: defaultAvatar
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    },
    userAccount: {
      type: String,
      default: '无效账号'
    },
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut().then(() => {
        this.$router.push({
          name: 'login'
        })
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>
<style>
  .icon-top {
    margin: -3px 2px 0 0;
  }
</style>
