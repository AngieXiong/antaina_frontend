<template>
  <div>

    <div class="mb20 line-block">
      <label>客户物料编号：</label>
      <i-input v-model="formData.customerProductCode" placeholder="物料编号" class="mr20" style="width:200px"
               clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>客户：</label>
      <i-select v-model="formData.customerId" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in customerList" :key="item.id" :value="item.id">{{ item.name }}</i-option>
      </i-select>
    </div>

    <div class="mb20 line-block">
      <label>物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="物料编号" class="mr20" style="width:200px" clearable></i-input>
    </div>
    <div class="mb20 line-block">
      <label>物料名称：</label>
      <i-input v-model="formData.productName" placeholder="物料名称" class="mr20" style="width:200px" clearable></i-input>
    </div>
    <div class="mb20 line-block">
      <label>物料类型：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in productTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
        <router-link to="/product/product_add">
          <i-button type="success" icon="ios-add" class="mb20">新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total
            @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
  import {deleteProduct, getProductWithPage, exportProduct} from "@/api/product"
  import {loadCustomerList} from '@/api/customer'
  import {getDictByKey, getNameByCode, PRODUCTTYPE, PRODUCTUNIT} from '@/libs/dict'
  import excel from '@/libs/excel'
  import tools from '@/libs/tools'

  export default {
    data() {
      return {
        total: 0,
        formData: {
          pageNum: 1,
          pageSize: 10,
          customerId: null,
          productCode: '',
          productName: '',
          type: 0,
          customerProductCode: ''
        },
        formInfo: [],
        productTypeList: getDictByKey(PRODUCTTYPE),
        customerList: [],
        columns: [
          {
            title: "客户名称",
            align: 'center',
            key: "customerName"
          },
          {
            title: "客户物料编号 ",
            align: 'center',
            key: "customerProductCode"
          },
          {
            title: "物料编号",
            align: 'center',
            key: "productCode"
          },
          {
            title: "物料名称",
            align: 'center',
            key: "productName"
          },
          {
            title: "型号",
            align: 'center',
            key: "model"
          },
          {
            title: "物料类型",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.type, PRODUCTTYPE))
            }
          },
          {
            title: "计量单位",
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.productUnit, PRODUCTUNIT))
            }
          },
          {
            title: "当前库存",
            align: 'center',
            width: '150',
            key: "totalAmount"
          },
          {
            title: "创建时间",
            align: 'center',
            width: '150',
            key: "createTime"
          },
          {
            title: "更新时间",
            align: 'center',
            width: '150',
            key: "updateTime"
          },
          {
            title: "操作",
            align: 'center',
            width: '150',
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
                              name: 'product_update',
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
                            this.deleteProduct(params.row.id)
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
        buttonSize: 'large',
        exportLoading:false,
        exportHead: [
          {
            title: "客户名称",
            key: "customerName"
          },
          {
            title: "客户物料编号 ",
            key: "customerProductCode"
          },
          {
            title: "物料编号",
            key: "productCode"
          },
          {
            title: "物料名称",
            key: "productName"
          },
          {
            title: "型号",
            key: "productModel"
          },
          {
            title: "物料类型",
            key: "productType"
          },
          {
            title: "计量单位",
            key: "productUnit"
          },
          {
            title: "当前库存",
            key: "totalAmount"
          },
          {
            title: "创建时间",
            key: "createTime"
          },
          {
            title: "更新时间",
            key: "updateTime"
          }
        ]
      };
    },
    methods: {
      search() {
        this.formData.pageNum = 1
        this.getBasicInfo()
      },
      reset() {
        this.formData.name = ''
        this.formData.customerProductCode = ''
        this.$refs.dateModel ? this.$refs.dateModel.handleClear() : ''
        this.search()
      },
      dateChange(e) {
        this.formData.startTime = e[0]
        this.formData.endTime = e[1]
      },
      pageChange(e) {
        this.formData.pageNum = e
        this.getBasicInfo()
      },
      getBasicInfo() {
        getProductWithPage(this.formData).then(({code, data, message}) => {
          if (code === 200) {
            this.formInfo = data.list
            this.total = parseInt(data.total)
          } else {
            this.$Message.error(message)
          }
        });
      },
      deleteProduct(id) {
        const example = {id: id}
        deleteProduct(example).then(({code, data, message}) => {
          if (code === 200) {
            this.$Message.success(message)
          } else {
            this.$Message.error(message)
          }
        })
        this.search();
      },
      loadCustomerList() {
        loadCustomerList().then(({code, data, message}) => {
          if (code === 200) {
            this.customerList = data
          } else {
            this.$Message.error(message)
          }
        });
      },
      exportExcel(){
        this.exportLoading = true
        const queryModel = this.formData
        exportProduct({ queryModel }).then(res => {
          if (res.data.length > 0) {
            const params = {
              title: tools.getColumnsTileByArrayToTitleArray(this.exportHead),
              key: tools.getColumnsKeyByArrayToKeyArray(this.exportHead),
              data: res.data,
              autoWidth: true,
              filename: `物料列表导出-${(new Date()).valueOf()}`
            }
            excel.export_array_to_excel(params)
          } else {
            this.$Message.info('表格数据不能为空！')
          }
        }).catch(err => {
          this.$Message.error(err.response.message)
        })
        this.exportLoading = false
      }
    },
    created() {
      this.formData.type = ''
      this.getBasicInfo()
      this.loadCustomerList()
    }
  }
</script>
