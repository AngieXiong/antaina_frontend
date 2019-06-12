<template>
  <div class="platuser-add">
    <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <Form-Item label="平台代号" prop="code">
        <i-input v-model="formValidate.code" placeholder="平台代号"></i-input>
      </Form-Item>
      <Form-Item label="平台名称" prop="name">
        <i-input v-model="formValidate.name" placeholder="平台名称"></i-input>
      </Form-Item>
      <Form-Item label="支持的币种" prop="coins">
        <i-input v-model="formValidate.coins" placeholder="支持的币种，用“;”分隔"></i-input>
      </Form-Item>
      <Form-Item label="操作的权限" prop="chmod">
        <i-input v-model="formValidate.chmod" placeholder="操作的权限，用“;”分隔"></i-input>
      </Form-Item>
      <!--<Form-Item label="私钥" prop="privateKey">-->
        <!--<i-input v-model="formValidate.privateKey" placeholder="私钥"></i-input>-->
      <!--</Form-Item>-->
      <!--<Form-Item label="公钥" prop="publicKey">-->
        <!--<i-input v-model="formValidate.publicKey" placeholder="公钥"></i-input>-->
      <!--</Form-Item>-->
      <Form-Item >
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>

<script>
import { addPlatform } from '@/api/system'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      formValidate: {
        code: "",
        name: "",
        coins: "",
        chmod: ""
        // ,
        // privateKey: "",
        // publicKey: "",
      },
      ruleValidate: {
        code: [{ required: true, message: "平台代号不能为空", trigger: "blur" }],
        name: [{ required: true, message: "平台名称不能为空", trigger: "blur" }],
        coins: [{ required: true, message: "支持的币种不能为空", trigger: "blur" }],
        chmod: [{ required: true, message: "操作的权限不能为空", trigger: "blur" }]
        // ,
        // privateKey: [{ required: true, message: "私钥不能为空", trigger: "blur" }],
        // publicKey: [{ required: true, message: "公钥不能为空", trigger: "blur" }]
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
        name: 'platform_add'
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          addPlatform(this.formValidate).then(({code,data,message}) => {
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
