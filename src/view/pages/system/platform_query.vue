<template>
  <div>
    <div class="mb20 line-block">
      <label >平台代码：</label>
      <i-input v-model="formData.code" placeholder="平台代码" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >平台名称：</label>
      <i-input v-model="formData.name" placeholder="平台名称" class="mr20" style="width:200px" clearable ></i-input>
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
        <router-link to="/system/platform_add">
          <i-button type="success" icon="ios-add" class="mb20" >新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getPlatformListWithPage, deletePlatform } from "@/api/system"
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        code: ""
      },
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          key: "id"
        },
        {
          title: "平台名称",
          align: 'center',
          key: "name"
        },
        {
          title: "平台代码",
          align: 'center',
          key: "code"
        },
        {
          title: "支持的币种",
          align: 'center',
          key: "coins"
        },
        {
          title: "操作的权限",
          align: 'center',
          key: "chmod"
        },
        {
          title: "平台ID",
          align: 'center',
          key: "appId"
        },
        {
          title: "密钥",
          align: 'center',
          key: "appSecret"
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
                            name: 'platform_update',
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
                          this.deletePlatform(params.row.id)
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
      this.formData.code = "";
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
    deletePlatform(id) {
      const example = { id: id }
      deletePlatform(example).then(({ code, data, message }) => {
        if (code === 200) {
          this.$Message.success(message);
        } else {
          this.$Message.error(message);
        }
      })
      this.search();
    },
    getBasicInfo() {
      getPlatformListWithPage(this.formData).then(({ code, data, message }) => {
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
