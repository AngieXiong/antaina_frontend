<template>
  <div>
    <div class="mb20 line-block">
      <label>起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20"
                   @on-change="dateChange" ref="dateModel"></Date-picker>
    </div>

    <div class="mb20 line-block">
      <label>客户物料编号：</label>
      <i-input v-model="formData.customerProductCode" placeholder="请输入客户物料编号..." class="mr20" style="width:200px"
               clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>订单号：</label>
      <i-input v-model="formData.orderNo" placeholder="订单号..." class="mr20" style="width:200px" clearable></i-input>
    </div>
    <div class="mb20 line-block">
      <label>出库类型：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in outputTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
        <i-button type="success" icon="ios-add" class="mb20" @click="openOutputModel">新增</i-button>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total
            @on-change="pageChange"></Page>
    </div>

    <Modal
      v-model="InputModel"
      title="新增出库记录"
      @on-ok="addOutput('formValid')"
      @on-cancel="cancel">

      <i-form ref="formValid" :model="subFormData" :rules="ruleValidate" :label-width="100">

        <Form-Item label="客户物料编号：" prop="customerProductCode">
          <i-input v-model="subFormData.customerProductCode" placeholder="请输入客户物料编号..." class="mr20" style="width:200px" clearable></i-input>
        </Form-Item>

        <Form-Item label="订单号：" prop="orderNo">
          <i-input v-model="subFormData.orderNo" placeholder="请输入订单号..." class="mr20" style="width:200px" clearable></i-input>
        </Form-Item>

        <Form-Item label="出库量" prop="amount">
          <InputNumber :min="1" v-model="subFormData.amount"></InputNumber>
        </Form-Item>

        <Form-Item label="出库类型" prop="type">
          <i-select v-model="subFormData.type" style="width:200px" class="mr20" clearable>
            <i-option v-for="item in outputTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
          </i-select>
        </Form-Item>
      </i-form>

    </Modal>
  </div>
</template>

<script>
  import {addOutput, deleteOutput, getOutputListWithPage, exportOutput} from "@/api/output"
  import {loadProductCodeList} from '@/api/product'
  import {getDictByKey, getNameByCode, OUTPUTTYPE, PRODUCTTYPE, PRODUCTUNIT} from '@/libs/dict'
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
          customerProductCode: '',
          orderNo:'',
          type: null,
          startTime: '',
          endTime: ''
        },
        outputTypeList: getDictByKey(OUTPUTTYPE),
        formInfo: [],
        columns: [
          {
            title: "客户物料编号 ",
            align: 'center',
            key: "customerProductCode"
          },
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
            title: "出库量",
            align: 'center',
            key: "amount"
          },
          {
            title: "出库类型",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.type, OUTPUTTYPE))
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
                            this.deleteOutput(params.row.id)
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
          customerProductCode: '',
          orderNo:'',
          type: 0
        },
        ruleValidate: {
          customerProductCode: [{required: true, message: "客户物料编号不能为空", trigger: "blur"}]
        },
        buttonSize: 'large',
        exportLoading:false,
        exportHead: [
          {
            title: '客户物料编号',
            key: 'customerProductCode'
          },
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
            title: '出库量',
            key: 'amount'
          },
          {
            title: '出库类型',
            key: 'outputType'
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
        this.formData.customerProductCode = ''
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
        getOutputListWithPage(this.formData).then(({code, data, message}) => {
          if (code === 200) {
            this.formInfo = data.list;
            this.total = parseInt(data.total);
          } else {
            this.$Message.error(message);
          }
        });
      },
      openOutputModel() {
        this.InputModel = true;
        this.loadProductList();
      },
      addOutput(name) {
        this.$refs[name].validate(valid => {
          if (valid) {
            addOutput(this.subFormData).then(({code, data, message}) => {
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
      deleteOutput(id) {
        deleteOutput(id).then(({code, data, message}) => {
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
        exportOutput({ queryModel }).then(res => {
          if (res.data.length > 0) {
            const params = {
              title: tools.getColumnsTileByArrayToTitleArray(this.exportHead),
              key: tools.getColumnsKeyByArrayToKeyArray(this.exportHead),
              data: res.data,
              autoWidth: true,
              filename: `出库导出-${(new Date()).valueOf()}`
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
