<template>
  <div>

    <div class="mb20 line-block">
      <label>起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20"
                   @on-change="dateChange" ref="dateModel"></Date-picker>
    </div>

    <div class="mb20 line-block">
      <label>订单号：</label>
      <i-input v-model="formData.orderNo" placeholder="订单号..." class="mr20" style="width:200px" clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="物料编号" class="mr20" style="width:200px" clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>状态：</label>
      <i-select v-model="formData.status" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in orderStatusList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
        <router-link to="/order/order_add">
          <i-button type="success" icon="ios-add" class="mb20">新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total
            @on-change="pageChange"></Page>
    </div>

    <table-model ref="TableModel" :modelColumns="modelColumns" :modelData="modelData"></table-model>
    <Modal
      v-model="InputModel"
      title="出货量"
      @on-ok="addAmount"
      @on-cancel="cancel">
      <label>出货量：</label><InputNumber :min="1" v-model="subFormData.amount"></InputNumber>
    </Modal>
  </div>
</template>

<script>
  import {deleteOrder, getDeliveryDetailList, getOrderListWithPage, addAmount, deleteDelivery, exportOrder} from "@/api/order"
  import {getDictByKey, getNameByCode, ORDERSTATUS} from '@/libs/dict'
  import TableModel from '_c/table-model';
  import excel from '@/libs/excel'
  import tools from '@/libs/tools'

  export default {
    components: {
      TableModel
    },
    data() {
      return {
        InputModel: false,
        total: 0,
        formData: {
          pageNum: 1,
          pageSize: 10,
          productCode: '',
          orderNo:'',
          status: 0,
          startTime: "",
          endTime: ""
        },
        orderStatusList: getDictByKey(ORDERSTATUS),
        formInfo: [],
        columns: [
          // {
          //   title: "ID",
          //   align: 'center',
          //   key: "id"
          // },
          {
            title: "订单号",
            align: 'center',
            key: "orderNo"
          },
          {
            title: "客户",
            align: 'center',
            key: "customerName"
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
            title: "订单量",
            align: 'center',
            key: "amount"
          },
          {
            title: "已出货量",
            align: 'center',
            key: "deliveryAmount"
          },
          {
            title: "未出货量",
            align: 'center',
            key: "remainingAmount"
          },
          {
            title: "状态",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.status, ORDERSTATUS))
            }
          },
          {
            title: "交期",
            align: 'center',
            key: "deliveryDate"
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
                      content: '更新',
                      transfer: true
                    }
                  }, [
                    h(
                      "i-button",
                      {
                        props: {
                          type: "primary",
                          icon: "md-create",
                          shape: "circle"
                        },
                        on: {
                          click: () => {
                            const id = params.row.id
                            this.$router.push({
                              name: 'order_update',
                              params: {id}
                            })
                          }
                        }
                      }
                    )
                  ]
                ),
                h(
                  'Tooltip',
                  {
                    props: {
                      content: '出货记录详情',
                      transfer: true
                    }
                  }, [
                    h(
                      "i-button",
                      {
                        props: {
                          type: "info",
                          icon: "md-list-box",
                          shape: "circle"
                        },
                        style: {
                          'margin-left': '10px'
                        },
                        on: {
                          click: () => {
                            this.openModel(params.row);
                          }
                        }
                      }
                    )
                  ]
                ),
                h(
                  'Tooltip',
                  {
                    props: {
                      content: '添加出货记录',
                      transfer: true
                    }
                  }, [
                    h(
                      "i-button",
                      {
                        props: {
                          type: "primary",
                          icon: "md-add",
                          shape: "circle"
                        },
                        style: {
                          'margin-left': '10px'
                        },
                        on: {
                          click: () => {
                            this.InputModel = true;
                            this.subFormData.orderId = params.row.id;
                          }
                        }
                      }
                    )
                  ]
                ),
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
                            this.deleteOrder(params.row.id)
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
        modelData: [],
        modelColumns: [
          {
            title: "ID",
            align: 'center',
            key: "id"
          },
          {
            title: "主表ID",
            align: 'center',
            key: "orderId"
          },
          {
            title: " 出货量",
            align: 'center',
            key: "amount"
          },
          {
            title: "出货时间",
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
                      content: '删除出货记录',
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
                            this.deleteDelivery(params.row.id);
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
        subFormData: {
          amount: 1,
          orderId: null
        },
        buttonSize: 'large',
        exportLoading:false,
        exportHead: [
          {
            title: '订单号',
            key: 'orderNo'
          },
          {
            title: '客户',
            key: 'customerName'
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
            title: '订单量',
            key: 'totalAmount'
          },
          {
            title: '已出货量',
            key: 'deliveryAmount'
          },
          {
            title: '未出货量',
            key: 'remainingAmount'
          },
          {
            title: '状态',
            key: 'status'
          },
          {
            title: '交期',
            key: 'deliveryDate'
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
        this.formData.productCode = ''
        this.formData.status = '';
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
        getOrderListWithPage(this.formData).then(({code, data, message}) => {
          if (code === 200) {
            this.formInfo = data.list;
            this.total = parseInt(data.total);
          } else {
            this.$Message.error(message);
          }
        });
      },
      deleteOrder(id) {
        const example = {id: id}
        deleteOrder(example).then(({code, data, message}) => {
          if (code === 200) {
            this.$Message.success(message);
          } else {
            this.$Message.error(message);
          }
        })
        this.search();
      },
      openModel(row) {
        this.loadTableData(row.id)
        this.$refs.TableModel.openModel()
      },
      loadTableData(id){
        this.modelData = []
        const example = {orderId: id}
        getDeliveryDetailList(example).then(({code, data, message}) => {
          if (code === 200) {
            this.modelData = data;
          } else {
            this.$Message.error(message);
          }
        })
      },
      addAmount() {
        addAmount(this.subFormData).then(({code, data, message}) => {
          if (code === 200) {
            this.$Message.info('添加成功');
            this.search();
          } else {
            this.$Message.error(message);
          }
        })
      },
      deleteDelivery(id) {
        deleteDelivery(id).then(({code, data, message}) => {
          if (code === 200) {
            this.loadTableData(this.subFormData.orderId);
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
        exportOrder({ queryModel }).then(res => {
          if (res.data.length > 0) {
            const params = {
              title: tools.getColumnsTileByArrayToTitleArray(this.exportHead),
              key: tools.getColumnsKeyByArrayToKeyArray(this.exportHead),
              data: res.data,
              autoWidth: true,
              filename: `订单导出-${(new Date()).valueOf()}`
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
      }
    },
    created() {
      this.formData.status = '';
      this.getBasicInfo();
    }
  }
</script>
