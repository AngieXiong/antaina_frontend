<template>
  <div class="platuser-add">
    <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <Form-Item label="登陆账号" prop="useraccount">
        <i-input v-model="formValidate.useraccount" placeholder="请输入登陆账号"></i-input>
      </Form-Item>
      <Form-Item label="名称" prop="username">
        <i-input v-model="formValidate.username" placeholder="请输入名称"></i-input>
      </Form-Item>
      <Form-Item label="手机号码" prop="phone">
        <i-input v-model="formValidate.phone" placeholder="请输入手机号码"></i-input>
      </Form-Item>
      <Form-Item label="登陆密码" prop="password">
        <i-input v-model="formValidate.password" placeholder="请输入登陆密码"></i-input>
      </Form-Item>
      <Form-Item label="状态" prop="status">
        <i-select v-model="formValidate.status">
          <i-option v-for="item in adminStatusList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
        </i-select>
      </Form-Item>
      <Form-Item label="菜单栏" prop="accessMenu">
        <Input disabled v-model="formValidate.accessMenu" placeholder="请选择菜单">
          <Button slot="append" icon="md-options" @click="openAccessMenuModel">赋予菜单</Button>
        </Input>
        <access-tree v-on:checkedAccessMenu="checkedAccessMenu" ref="access-tree-child"
                     :access-menu-list="accessMenuList"></access-tree>
      </Form-Item>
      <Form-Item >
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>

<script>
import { addAdmin } from '@/api/admin'
import { getDictByKey, ADMINSTATUS } from '@/libs/dict'
import AccessTree from '@/components/access-tree/access-tree'
import { mapMutations } from 'vuex'
export default {
  components: {
    AccessTree
  },
  data() {
    return {
      formValidate: {
        accessMenu: "",
        accessPermission: "",
        password: "",
        phone: "",
        status: 1,
        useraccount: "",
        username: ""
      },
      accessMenuList: [],
      adminStatusList: getDictByKey(ADMINSTATUS),
      ruleValidate: {
        useraccount: [{ required: true, message: "登陆账号不能为空", trigger: "blur" }],
        username: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        password: [{ required: true, message: "登陆密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    checkedAccessMenu(value) {
      this.accessMenuList = value.trim() === '' ? [] : value.split(';')
      this.formValidate.accessMenu = value
    },
    close () {
      /**
       * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
       * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
       */
      this.closeTag({
        name: 'admin_add'
      })
    },
    handleSubmit(name) {
      debugger
      this.$refs[name].validate(valid => {
        if (valid) {
          addAdmin(this.formValidate).then(({code,data,message}) => {
            if(code === 200){
              this.$Message.success("添加成功");
              this.$refs[name].resetFields();
              this.close()
            }else{
              this.$Message.error(message);
            }
          })
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    openAccessMenuModel() {
      this.$refs['access-tree-child'].openModel()
    },
  }
};
</script>

<style lang="less" scoped>
  .platuser-add{
    width: 400px;
    margin: 40px auto;
  }
</style>
