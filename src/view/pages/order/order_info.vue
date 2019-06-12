<template>
  <div>

    <div class="mb20 line-block">
      <label >起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20" @on-change="dateChange" ref="dateModel"></Date-picker>
    </div>

    <div class="mb20 line-block">
      <label >客户物料编号：</label>
      <i-input v-model="formData.customerProductCode" placeholder="物料编号" class="mr20" style="width:200px" clearable ></i-input>
    </div>

    <div class="mb20 line-block">
      <label >物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="物料编号" class="mr20" style="width:200px" clearable ></i-input>
    </div>

    <div class="mb20 line-block">
      <label >状态：</label>
      <i-select v-model="formData.status" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in orderStatusList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
      </i-select>
    </div>

    <div class="mb20 line-block">
      <i-button type="primary" icon="ios-search" class="mr20" @click="search">搜索</i-button>
      <i-button icon="ios-refresh" class="mr20" @click="reset">重置</i-button>
    </div>
    <div>
      <i-table border :columns="columns" :data="formInfo"></i-table>
    </div>
    <div class="text-center mt20">
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getOrderListWithPage, deleteOrder } from "@/api/order"
import { getDictByKey, getNameByCode, ORDERSTATUS} from '@/libs/dict'
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        customerProductCode: '',
        productCode:'',
        status: 0,
        startTime: "",
        endTime: ""
      },
      orderStatusList:getDictByKey(ORDERSTATUS),
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          key: "id"
        },
        {
          title: "客户",
          align: 'center',
          key: "customerName"
        },
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
                },[
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
                            params: { id }
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
                },[
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
      ]
    };
  },
  methods: {
    search() {
      this.formData.pageNum = 1;
      this.getBasicInfo();
    },
    reset() {
      this.formData.customerProductCode=''
      this.formData.productCode=''
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
      getOrderListWithPage(this.formData).then(({ code, data, message }) => {
        if (code === 200) {
          this.formInfo = data.list;
          this.total = parseInt(data.total);
        } else {
          this.$Message.error(message);
        }
      });
    },
    deleteOrder(id) {
      const example = { id: id }
      deleteOrder(example).then(({ code, data, message }) => {
        if (code === 200) {
          this.$Message.success(message);
        } else {
          this.$Message.error(message);
        }
      })
      this.search();
    }
  },
  created() {
    this.formData.status = '';
    this.getBasicInfo();
  }
}
</script>
