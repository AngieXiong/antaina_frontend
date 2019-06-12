<template>
  <div>
    <div class="mb20 line-block">
      <label >起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20" @on-change="dateChange" ref="dateModel"></Date-picker>
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
        <router-link to="/admin/admin_add">
          <i-button type="success" icon="ios-add" class="mb20" >新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getAdminListWithPage } from "@/api/admin"
import { getNameByCode, ADMINSTATUS } from '@/libs/dict'
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        startTime: "",
        endTime: ""
      },
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          key: "id"
        },
        {
          title: "账号名称",
          align: 'center',
          key: "username"
        },
        {
          title: "登陆账号",
          align: 'center',
          key: "useraccount"
        },
        {
          title: "电话号码",
          align: 'center',
          key: "phone"
        },
        {
          title: "状态",
          align: 'center',
          render: (h, params) => {
            return h('div', {}, getNameByCode(params.row.status, ADMINSTATUS))
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
          width: '90',
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
                            name: 'admin_update',
                            params: { id }
                          })
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
    getBasicInfo() {
      getAdminListWithPage(this.formData).then(({ code, data, message }) => {
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
