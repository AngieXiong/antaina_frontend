<template>
  <div class="platuser-add">
      <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <Form-Item label="物料编号" prop="productCode">
          <i-input v-model="formValidate.productCode" placeholder="请输入物料编号..."></i-input>
        </Form-Item>

        <Form-Item label="物料名称" prop="productName">
          <i-input v-model="formValidate.productName" placeholder="请输入物料名称..."></i-input>
        </Form-Item>

        <Form-Item label="型号" prop="model">
          <i-input v-model="formValidate.model" placeholder="请输入型号..."></i-input>
        </Form-Item>

        <Form-Item label="物料类型" prop="priority">
          <i-select v-model="formValidate.type" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in productTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </Form-Item>

        <Form-Item label="计量单位" prop="priority">
          <i-select v-model="formValidate.productUnit" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in productUnitList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </Form-Item>
      <Form-Item >
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>

<script>
import { getById, updateProduct } from '@/api/product'
import { getDictByKey, getNameByCode, PRODUCTTYPE, PRODUCTUNIT  } from '@/libs/dict'
import AccessTree from '@/components/access-tree/access-tree'
import { mapMutations } from 'vuex'
export default {
  components: {
    AccessTree
  },
  data() {
    return {
      formValidate: {
        productCode: '',
        productName: '',
        model:'',
        type: 0,
        productUnit:0
      },
      productTypeList: getDictByKey(PRODUCTTYPE),
      productUnitList: getDictByKey(PRODUCTUNIT),
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
        name: 'product_update',
        params: {
          id: this.$route.params.id
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          updateProduct(this.formValidate).then(({code,data,message}) => {
            if(code === 200){
              this.$Message.success("更新成功");
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
    getProductById () {
      const id = this.$route.params.id
      getById({ id }).then(({ code, data, message }) => {
        this.formValidate = data
      }).catch(err => {
        this.$Message.error(err.response.data.message)
        // 查询失败，关闭本页面
        this.close()
      })
    }
  },
  created () {
    this.getProductById()
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    '$route': 'getProductById'
  }
};
</script>

<style lang="less" scoped>
  .platuser-add{
    width: 400px;
    margin: 40px auto;
  }
</style>
