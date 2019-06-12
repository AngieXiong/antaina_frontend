<template>
  <div>
    <div class="mb20 line-block">
      <label >交易类型：</label>
      <i-select v-model="formData.transactionType" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in reportTransactionTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
      </i-select>
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
import { getTransactionReportWithPage } from "@/api/report"
import { getDictByKey, getNameByCode, REPORTTYPE, REPORTTRANSACTIONTYPE } from '@/libs/dict'
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        transactionType: "",
        type: ""
      },
      reportTypeList: getDictByKey(REPORTTYPE),
      reportTransactionTypeList: getDictByKey(REPORTTRANSACTIONTYPE),
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          fixed: 'left',
          width: '180',
          key: "id"
        },
        {
          title: "交易总数",
          align: 'center',
          width: '180',
          key: "dealAmount"
        },
        {
          title: "总确认数",
          align: 'center',
          width: '180',
          key: "confirmAmount"
        },
        {
          title: "交易数量峰值:最高值",
          align: 'center',
          width: '180',
          key: "dealAmountMax"
        },
        {
          title: "交易数量峰值:最低值",
          align: 'center',
          width: '180',
          key: "dealAmountMin"
        },
        {
          title: "交易环比增量",
          align: 'center',
          width: '180',
          key: "amountIncrement"
        },
        {
          title: "交易环比增速",
          align: 'center',
          width: '180',
          key: "amountGrowth"
        },
        {
          title: "手续费总数",
          align: 'center',
          width: '180',
          key: "feeAmount"
        },
        {
          title: "手续费峰值:最高值",
          align: 'center',
          width: '180',
          key: "feeAmountMax"
        },
        {
          title: "手续费峰值:最低值",
          align: 'center',
          width: '180',
          key: "feeAmountMin"
        },
        {
          title: "手续费环比增量",
          align: 'center',
          width: '180',
          key: "feeIncrement"
        },
        {
          title: "手续费环比增速",
          align: 'center',
          width: '180',
          key: "feeGrowth"
        },
        {
          title: "交易类型",
          align: 'center',
          width: '180',
          render: (h, params) => {
            return h('div', {}, getNameByCode(params.row.transactionType, REPORTTRANSACTIONTYPE))
          }
        },
        {
          title: "统计频率",
          align: 'center',
          width: '180',
          render: (h, params) => {
            return h('div', {}, getNameByCode(params.row.type, REPORTTYPE))
          }
        },
        {
          title: "创建时间",
          align: 'center',
          width: '180',
          key: "createTime"
        },
        {
          title: "更新时间",
          align: 'center',
          width: '180',
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
      this.formData.transactionType = "";
      this.formData.type = "";
      this.search();
    },
    pageChange(e) {
      this.formData.pageNum = e;
      this.getBasicInfo();
    },
    getBasicInfo() {
      getTransactionReportWithPage(this.formData).then(({ code, data, message }) => {
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
