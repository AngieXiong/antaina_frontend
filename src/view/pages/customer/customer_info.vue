<template>
  <div>
    <div class="mb20 line-block">
      <label >客户名：</label>
      <!--<Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20" @on-change="dateChange" ref="dateModel"></Date-picker>-->
      <i-input v-model="formData.name" placeholder="客户名" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <i-button type="primary" icon="ios-search" class="mr20" @click="search">搜索</i-button>
      <i-button icon="ios-refresh" class="mr20" @click="reset">重置</i-button>
    </div>
    <div>
      <i-table border :columns="columns" :data="formInfo"></i-table>
    </div>
    <div class="text-center mt20">
      <div class="mb20 fl">
        <router-link to="/customer/customer_add">
          <i-button type="success" icon="ios-add" class="mb20" >新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getCustomerListWithPage,deleteCustomer } from "@/api/customer";
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        name: ""
      },
      formInfo: [],
      columns: [
        {
          title: "账号ID",
          align: 'center',
          fixed: 'left',
          width: '200',
          key: "id"
        },
        {
          title: "客户名称",
          align: 'center',
          width: '300',
          key: "name"
        },
        {
          title: "优先级(数字越大，优先级越高)",
          align: 'center',
          width: '300',
          key: "priority"
        },
        {
          title: "创建时间",
          align: 'center',
          width: '300',
          key: "createTime"
        },
        {
          title: "更新时间",
          align: 'center',
          width: '300',
          key: "updateTime"
        },
        {
          title: "操作",
          align: 'center',
          width: '270',
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
                            name: 'customer_update',
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
                          this.deleteCustomer(params.row.id)
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
      this.formData.name = "";
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
    deleteCustomer(id) {
      const example = { id: id }
      deleteCustomer(example).then(({ code, data, message }) => {
        if (code === 200) {
          this.$Message.success(message);
        } else {
          this.$Message.error(message);
        }
      })
      this.search();
    },
    getBasicInfo() {
      getCustomerListWithPage(this.formData).then(({ code, data, message }) => {
        if (code === 200) {
          this.formInfo = data.list;
          this.total = parseInt(data.total);
        } else {
          this.$Message.error(message);
        }
      });
    }
  },
  created() {
    this.getBasicInfo();
  }
}
</script>
