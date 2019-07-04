<template>
  <div>

    <div class="mb20 line-block">
      <label>起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20"
                   @on-change="dateChange" ref="dateModel"></Date-picker>
    </div>

    <div class="mb20 line-block">
      <label>物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="请输入物料编号..." class="mr20" style="width:200px"
               clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>订单号：</label>
      <i-input v-model="formData.orderNo" placeholder="订单号..." class="mr20" style="width:200px" clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>入库类型：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in inputTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
      </i-select>
    </div>

    <div class="mb20 line-block">
      <i-button type="primary" icon="ios-search" class="mr20" @click="search">搜索</i-button>
      <i-button icon="ios-refresh" class="mr20" @click="reset">重置</i-button>
    </div>

    <div class="mb20 line-block">
      <Button :size="buttonSize" :loading="exportLoading" icon="ios-download-outline" type="warning" @click="exportExcel">导出</Button>
    </div>

    <div>
      <i-table border :columns="columns" :data="formInfo"></i-table>
    </div>
    <div class="text-center mt20">
      <div class="mb20 fl">
        <i-button type="success" icon="ios-add" class="mb20" @click="openInputModel">新增</i-button>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total
            @on-change="pageChange"></Page>
    </div>

    <Modal
      v-model="InputModel"
      title="新增入库记录"
      @on-ok="addInput('formValid')"
      @on-cancel="cancel">

      <i-form ref="formValid" :model="subFormData" :rules="ruleValidate" :label-width="100">
        <!--<Form-Item label="物料编号" prop="productCode">-->
          <!--<i-select v-model="subFormData.productCode" style="width:400px" class="mr20" clearable>-->
            <!--<i-option v-for="item in productCodeList" :key="item.productCode" :value="item.productCode">{{-->
              <!--item.productCode }} # {{ item.productName }} # {{ item.model }}-->
            <!--</i-option>-->
          <!--</i-select>-->
        <!--</Form-Item>-->

        <Form-Item label="物料编号：" prop="orderNo">
          <i-input v-model="subFormData.productCode" placeholder="请输入物料编号..." class="mr20" style="width:200px" clearable></i-input>
        </Form-Item>

        <Form-Item label="订单号：" prop="orderNo">
          <i-input v-model="subFormData.orderNo" placeholder="请输入订单号..." class="mr20" style="width:200px" clearable></i-input>
        </Form-Item>

        <Form-Item label="入库量" prop="amount">
          <InputNumber :min="1" v-model="subFormData.amount"></InputNumber>
        </Form-Item>

        <Form-Item label="入库类型" prop="type">
          <i-select v-model="subFormData.type" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in inputTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </Form-Item>
      </i-form>

    </Modal>
  </div>
</template>

<script>
  import {addInput, deleteInput, getInputListWithPage, exportInput} from "@/api/input"
  import {loadProductCodeList} from '@/api/product'
  import {getDictByKey, getNameByCode, INPUTTYPE, PRODUCTTYPE, PRODUCTUNIT} from '@/libs/dict'
  import excel from '@/libs/excel'
  import tools from '@/libs/tools'

  export default {
    components: {},
    data() {
      return {
        InputModel: false,
        total: 0,
        formData: {
          pageNum: 1,
          pageSize: 10,
          productCode: '',
          orderNo:'',
          type: null,
          startTime: '',
          endTime: ''
        },
        inputTypeList: getDictByKey(INPUTTYPE),
        formInfo: [],
        columns: [
          // {
          //   title: "ID",
          //   align: 'center',
          //   key: "id"
          // },
          {
            title: "物料编号 ",
            align: 'center',
            key: "productCode"
          },
          {
            title: "物料名 ",
            align: 'center',
            key: "productName"
          },
          {
            title: "物料型号 ",
            align: 'center',
            key: "productModel"
          },
          {
            title: "物料类型",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.productType, PRODUCTTYPE))
            }
          },
          {
            title: "订单号 ",
            align: 'center',
            key: "orderNo",
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.orderNo == null ? '==' : params.row.orderNo == '' ? '==' : params.row.orderNo)
              ]);
            }
          },
          {
            title: "计量单位",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.productUnit, PRODUCTUNIT))
            }
          },
          {
            title: "当前库存",
            align: 'center',
            key: "totalAmount"
          },
          {
            title: "入库量",
            align: 'center',
            key: "amount"
          },
          {
            title: "入库类型",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.type, INPUTTYPE))
            }
          },
          {
            title: "创建时间",
            align: 'center',
            key: "createTime"
          },
          {
            title: "更新时间",
            align: 'center',
            key: "updateTime"
          },
          {
            title: "操作",
            align: 'center',
            width: '200',
            render: (h, params) => {
              return h("div", [
                h(
                  'Tooltip',
                  {
                    props: {
                      content: '删除',
                      transfer: true
                    }
                  }, [
                    h(
                      "i-button",
                      {
                        props: {
                          type: "error",
                          icon: "md-trash",
                          shape: "circle"
                        },
                        style: {
                          'margin-left': '10px'
                        },
                        on: {
                          click: () => {
                            this.deleteInput(params.row.id)
                          }
                        }
                      }
                    )
                  ]
                )
              ]);
            }
          }
        ],
        productCodeList: [],
        subFormData: {
          amount: 1,
          productCode: '',
          orderNo:'',
          type: 0
        },
        ruleValidate: {
          productCode: [{required: true, message: "物料编号不能为空", trigger: "blur"}]
        },
        buttonSize: 'large',
        exportLoading:false,
        exportHead: [
          {
            title: '物料编号',
            key: 'productCode'
          },
          {
            title: '物料名',
            key: 'productName'
          },
          {
            title: '物料型号',
            key: 'productModel'
          },
          {
            title: '物料类型',
            key: 'productType'
          },
          {
            title: '计量单位',
            key: 'productUnit'
          },
          {
            title: '订单号',
            key: 'orderNo'
          },
          {
            title: '当前库存',
            key: 'totalAmount'
          },
          {
            title: '入库量',
            key: 'amount'
          },
          {
            title: '入库类型',
            key: 'inputType'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          }
        ]
      };
    },
    methods: {
      search() {
        this.formData.pageNum = 1;
        this.getBasicInfo();
      },
      reset() {
        this.formData.productCode = ''
        this.$refs.dateModel ? this.$refs.dateModel.handleClear() : "";
        this.search();
      },
      dateChange(e) {
        this.formData.startTime = e[0];
        this.formData.endTime = e[1];
      },
      pageChange(e) {
        this.formData.pageNum = e;
        this.getBasicInfo();
      },
      getBasicInfo() {
        getInputListWithPage(this.formData).then(({code, data, message}) => {
          if (code === 200) {
            this.formInfo = data.list;
            this.total = parseInt(data.total);
          } else {
            this.$Message.error(message);
          }
        });
      },
      openInputModel() {
        this.InputModel = true;
        this.loadProductList();
      },
      addInput(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            addInput(this.subFormData).then(({code, data, message}) => {
              if (code === 200) {
                this.search();
                this.$Message.success("添加成功");
                this.$refs[name].resetFields();
                this.close();
              } else {
                this.InputModel = true;
                this.$Message.error(message);
              }
            })
          } else {
            console.log('false');
          }
        });
      },
      deleteInput(id) {
        deleteInput(id).then(({code, data, message}) => {
          if (code === 200) {
            this.search();
            this.$Message.success(message);
          } else {
            this.$Message.error(message);
          }
        })
      },
      exportExcel(){
        this.exportLoading = true
        const queryModel = this.formData
        exportInput({ queryModel }).then(res => {
          if (res.data.length > 0) {
            const params = {
              title: tools.getColumnsTileByArrayToTitleArray(this.exportHead),
              key: tools.getColumnsKeyByArrayToKeyArray(this.exportHead),
              data: res.data,
              autoWidth: true,
              filename: `入库导出-${(new Date()).valueOf()}`
            }
            excel.export_array_to_excel(params)
          } else {
            this.$Message.info('表格数据不能为空！')
          }
        }).catch(err => {
          this.$Message.error(err.response.message)
        })
        this.exportLoading = false
      },
      cancel() {
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
      this.formData.type = '';
      this.getBasicInfo();
    }
  }
</script>
