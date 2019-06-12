<template>
  <div class="platuser-add">
    <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="250">
      <Form-Item label="客户名" prop="name">
        <i-input v-model="formValidate.name" placeholder="请输入客户名"></i-input>
      </Form-Item>
      <Form-Item label="客户优先级（数值越大，优先级越高）" prop="priority">
        <InputNumber :min="0" v-model="formValidate.priority"></InputNumber>
      </Form-Item>
      <Form-Item >
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>

<script>
import { addCustomer } from '@/api/customer'
import AccessTree from '@/components/access-tree/access-tree'
import { mapMutations } from 'vuex'
export default {
  components: {
    AccessTree
  },
  data() {
    return {
      formValidate: {
        priority: 0,
        name: ""
      },
      ruleValidate: {
        name: [{ required: true, message: "客户名不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    close () {
      /**
       * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
       * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
       */
      this.closeTag({
        name: 'customer_add'
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addCustomer(this.formValidate).then(({code,data,message}) => {
            if(code === 200){
              this.$Message.success("添加成功");
              this.$refs[name].resetFields();
              this.close()
            }else{
              this.$Message.error(message);
            }
          })
        } else {
          console.log('false');
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
  .platuser-add{
    width: 400px;
    margin: 40px auto;
  }
</style>
