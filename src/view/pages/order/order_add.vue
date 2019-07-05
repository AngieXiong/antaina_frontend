<template>
  <div class="platuser-add">

    <i-form ref="formVali" :model="formValidate" :rules="ruleValidate" :label-width="100">

      <Form-Item label="订单号" prop="orderNo">
        <i-input v-model="formValidate.orderNo" placeholder="请输入订单号"></i-input>
      </Form-Item>

      <Form-Item label="客户" prop="customerId">
        <i-select v-model="formValidate.customerId" style="width:400px" class="mr20" clearable>
          <i-option v-for="item in customerList" :key="item.id" :value="item.id">{{ item.name }}</i-option>
        </i-select>
      </Form-Item>

      <!--<Form-Item label="物料编号" prop="productCode">-->
        <!--<i-select v-model="formValidate.productCode" style="width:400px" class="mr20" clearable>-->
          <!--<i-option v-for="item in productCodeList" :key="item.productCode" :value="item.productCode">{{-->
            <!--item.productCode }} # {{ item.productName }} # {{ item.model }}-->
          <!--</i-option>-->
        <!--</i-select>-->
      <!--</Form-Item>-->

      <Form-Item label="客户物料编号：" prop="customerProductCode">
        <i-input v-model="formValidate.customerProductCode" placeholder="请输入客户物料编号..." class="mr20" style="width:200px" clearable></i-input>
      </Form-Item>

      <Form-Item label="订单量" prop="amount">
        <InputNumber :min="0" v-model="formValidate.amount"></InputNumber>
      </Form-Item>

      <Form-Item label="交期" prop="amount">
        <div class="mb20 line-block">
          <Date-picker type="date" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20"
                       @on-change="dateChange" ref="dateModel"></Date-picker>
        </div>
      </Form-Item>

      <Form-Item>
        <i-button size="large" type="primary" @click="handleSubmit('formVali')">提交</i-button>
        <i-button size="large" @click="handleReset('formVali')" style="margin-left: 12px">重置</i-button>
      </Form-Item>
    </i-form>
  </div>
</template>
<!--<script src="//unpkg.com/vue/dist/vue.js"></script>-->
<!--<script src="//unpkg.com/element-ui@2.10.0/lib/index.js"></script>-->
<script>
  import {loadCustomerList} from '@/api/customer'
  import {loadProductCodeList} from '@/api/product'
  import {addOrder, getById} from '@/api/order'
  import AccessTree from '@/components/access-tree/access-tree'
  import { mapMutations } from 'vuex'


  export default {
    components: {
      AccessTree
    },
    data() {
      return {
        formValidate: {
          orderNo:'',
          customerId: '',
          customerProductCode: '',
          amount: 0,
          deliveryDate: ''
        },
        customerList: [],
        productCodeList: [],
        state: '',
        ruleValidate: {
          orderNo: [{required: true, message: "订单号不能为空", trigger: "blur"}],
          customerId: [{required: true, message: "客户不能为空", trigger: "blur"}],
          customerProductCode: [{required: true, message: "客户物料编号不能为空", trigger: "blur"}]
        }
      };
    },
    methods: {
      ...mapMutations([
        'closeTag'
      ]),
      querySearch(queryString, cb) {
        var productCodeList = this.productCodeList;
        var results = queryString ? productCodeList.filter(this.createFilter(queryString)) : productCodeList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (productCodeList) => {
          return (productCodeList.productCode.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
      close() {
        /**
         * 如果是调用closeTag方法，普通的页面传入的对象参数只需要写name字段即可
         * 如果是动态路由和带参路由，需要传入query或params字段，用来区别关闭的是参数为多少的页面
         */
        this.closeTag({
          name: 'order_add'
        })
      },
      dateChange(e) {
        this.formValidate.deliveryDate = e;
      },
      handleSubmit(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            addOrder(this.formValidate).then(({code, data, message}) => {
              if (code === 200) {
                this.$Message.success("添加成功");
                this.$refs[name].resetFields();
                this.close()
              } else {
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
      },
      loadCustomerList() {
        loadCustomerList().then(({code, data, message}) => {
          if (code === 200) {
            this.customerList = data;
          } else {
            this.$Message.error(message);
          }
        });
      },
      loadProductList() {
        loadProductCodeList().then(({code, data, message}) => {
          if (code === 200) {
            this.productCodeList = data
          } else {
            this.$Message.error(message);
          }
        });
      }
    },
    created() {
      this.loadCustomerList()
      this.loadProductList()
    }
  };
</script>

<style lang="less" scoped>
  @import url("//unpkg.com/element-ui@2.10.0/lib/theme-chalk/index.css");
  .platuser-add {
    width: 400px;
    margin: 40px auto;
  }
</style>
