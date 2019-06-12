<template>
  <div>
    <div class="mb20 line-block">
      <label >用户名称：</label>
      <i-input v-model="formData.name" placeholder="用户名称" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >所属平台：</label>
      <i-input v-model="formData.source" placeholder="所属平台" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >币种：</label>
      <i-input v-model="formData.coin" placeholder="币种" class="mr20" style="width:200px" clearable ></i-input>
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
    <table-model ref="TableModel" :modelColumns="modelColumns" :modelData="modelData"></table-model>
  </div>
</template>

<script>
import { getTotalAssetListWithPage, getAddressList} from "@/api/account";
import TableModel from '_c/table-model';
export default {
  components: {
    TableModel
  },
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        source: "",
        coin: ""
      },
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          key: "id"
        },
        {
          title: "用户名称",
          align: 'center',
          key: "name"
        },
        {
          title: "币种",
          align: 'center',
          key: "coin"
        },
        {
          title: "余额",
          align: 'center',
          key: "balance"
        },
        {
          title: "所属平台",
          align: 'center',
          key: "source"
        },
        {
          title: "创建时间",
          align: 'center',
          key: "createTime"
        },
        {
          title: "地址",
          align: 'center',
          fixed: 'right',
          width: '90',
          render: (h, params) => {
            return h("div", [
              h(
                "i-button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                    click: () => {
                      this.openModel(params.row);
                    }
                  }
                },
                "查看地址"
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
        key: "accountId"
      },
      {
        title: " 币种",
        align: 'center',
        key: "coin"
      },
      {
        title: "地址",
        align: 'center',
        key: "addr"
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
      this.search();
    },
    pageChange(e) {
      this.formData.pageNum = e;
      this.getBasicInfo();
    },
    getBasicInfo() {
      getTotalAssetListWithPage(this.formData).then(({ code, data, message }) => {
        if (code === 200) {
          this.formInfo = data.list;
          this.total = parseInt(data.total);
        } else {
          this.$Message.error(message);
        }
      });
    },
    openModel(row) {
      this.modelData = []
      const example = { accountId : row.id }
      getAddressList(example).then(({ code, data, message }) => {
        if (code === 200) {
          this.modelData = data;
        } else {
          this.$Message.error(message);
        }
      })
      this.$refs.TableModel.openModel();
    }
  },
  created() {
    this.getBasicInfo();
  }
}
</script>
