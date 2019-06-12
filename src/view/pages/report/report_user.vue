<template>
  <div>
    <div class="mb20 line-block">
      <label >币种：</label>
      <i-input v-model="formData.coinCode" placeholder="币种" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >统计频率：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in reportTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
  import { getUserReportWithPage } from "@/api/report"
  import { getDictByKey, getNameByCode, REPORTTYPE } from '@/libs/dict'
  export default {
    data() {
      return {
        total: 0,
        formData: {
          pageNum: 1,
          pageSize: 10,
          coinCode: "",
          type: ""
        },
        reportTypeList: getDictByKey(REPORTTYPE),
        formInfo: [],
        columns: [
          {
            title: "ID",
            align: 'center',
            key: "id"
          },
          {
            title: "币种",
            align: 'center',
            key: "coin"
          },
          {
            title: "用户:总数",
            align: 'center',
            key: "userAmount"
          },
          {
            title: "用户:增量",
            align: 'center',
            key: "userIncrement"
          },
          {
            title: "用户:环比增速",
            align: 'center',
            key: "userGrowth"
          },
          {
            title: "资产:总数",
            align: 'center',
            key: "assetAmount"
          },
          {
            title: "资产:增量",
            align: 'center',
            key: "assetIncrement"
          },
          {
            title: "资产:环比增速",
            align: 'center',
            key: "assetGrowth"
          },
          {
            title: "统计频率",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.type, REPORTTYPE))
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
        this.formData.coinCode = "";
        this.formData.type = "";
        this.search();
      },
      pageChange(e) {
        this.formData.pageNum = e;
        this.getBasicInfo();
      },
      getBasicInfo() {
        getUserReportWithPage(this.formData).then(({ code, data, message }) => {
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
