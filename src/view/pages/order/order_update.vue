<template>
  <div class="platuser-add">
      <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="100">

        <Form-Item label="客户" prop="priority">
          <i-select v-model="formValidate.type" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in customerList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </Form-Item>

        <Form-Item label="客户物料编号" prop="productName">
        <i-input v-model="formValidate.customerProductCode" placeholder="请输入客户物料编号..."></i-input>
        </Form-Item>

        <Form-Item label="物料编号" prop="priority">
          <i-select v-model="formValidate.productCode" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in productCodeList" :key="item.id" :value="item.id">{{ item.productCode }}</i-option>
          </i-select>
        </Form-Item>

        <Form-Item label="订单量" prop="amount">
          <InputNumber :min="0" v-model="formValidate.amount"></InputNumber>
        </Form-Item>

      <Form-Item >
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>

<script>
import { getById, updateOrder } from '@/api/product'
import { getDictByKey, getNameByCode, PRODUCTTYPE, PRODUCTUNIT  } from '@/libs/dict'
import AccessTree from '@/components/access-tree/access-tree'
import { mapMutations } from 'vuex'
import { loadCustomerList } from '@/api/customer'
import { loadProductList } from '@/api/product'
export default {
  components: {
    AccessTree
  },
  data() {
    return {
      formValidate: {
        customerId: '',
        customerProductCode:'',
        productCode:'',
        amount:0,
      },
      productTypeList: getDictByKey(PRODUCTTYPE),
      customerList:[],
      productCodeList:[],
      ruleValidate: {
        customerId: [{ required: true, message: "客户不能为空", trigger: "blur" }],
        customerProductCode: [{ required: true, message: "客户物料编号不能为空", trigger: "blur" }],
        productCode: [{ required: true, message: "物料编号不能为空", trigger: "blur" }]
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
        name: 'order_update',
        params: {
          id: this.$route.params.id
        }
      })
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          updateOrder(this.formValidate).then(({code,data,message}) => {
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
    getOrderById () {
      const id = this.$route.params.id
      getById({ id }).then(({ code, data, message }) => {
        this.formValidate = data
      }).catch(err => {
        this.$Message.error(err.response.data.message)
        // 查询失败，关闭本页面
        this.close()
      })
    },
    loadCustomerList () {
      loadCustomerList().then(({ code, data, message }) => {
        if (code === 200) {
          this.customerList = data.list;
        } else {
          this.$Message.error(message);
        }
      });
    },
    loadProductList () {
      loadProductCodeList().then(({ code, data, message }) => {
        if (code === 200) {
          this.productCodeList = data.list
        } else {
          this.$Message.error(message);
        }
      });
    }
  },
  created () {
    this.getOrderById()
    this.loadCustomerList()
    this.loadProductList()
  },
  watch: {
    // 如果路由发生变化，再次执行该方法
    '$route': 'getOrderById'
  }
};
</script>

<style lang="less" scoped>
  .platuser-add{
    width: 400px;
    margin: 40px auto;
  }
</style>
