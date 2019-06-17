<template>
  <div>

    <div class="mb20 line-block">
      <label>起始时间：</label>
      <Date-picker type="datetimerange" format="yyyy-MM-dd" placeholder="选择日期" style="width: 300px" class="mr20"
                   @on-change="dateChange" ref="dateModel"></Date-picker>
    </div>

    <div class="mb20 line-block">
      <label>物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="物料编号" class="mr20" style="width:200px" clearable></i-input>
    </div>

    <div class="mb20 line-block">
      <label>统计频率：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in frequencyList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total
            @on-change="pageChange"></Page>
    </div>

  </div>
</template>

<script>
  import {getStorageListWithPage} from "@/api/storage"
  import {getDictByKey, getNameByCode, FREQUENCY, PRODUCTTYPE, PRODUCTUNIT} from '@/libs/dict'
  import TableModel from '_c/table-model';

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
          type: null,
          startTime: "",
          endTime: ""
        },
        frequencyList: getDictByKey(FREQUENCY),
        formInfo: [],
        columns: [
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
            title: "计量单位",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.productUnit, PRODUCTTYPE))
            }
          },
          {
            title: "物料类型",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.productType, PRODUCTUNIT))
            }
          },
          {
            title: "入库物料总量",
            align: 'center',
            key: "inputAmount"
          },
          {
            title: "出库物料总量",
            align: 'center',
            key: "outputAmount"
          },
          {
            title: "统计频率",
            align: 'center',
            render: (h, params) => {
              return h('div', {}, getNameByCode(params.row.type, FREQUENCY))
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
        this.formData.productCode = ''
        this.formData.type = null;
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
        getStorageListWithPage(this.formData).then(({code, data, message}) => {
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
      this.formData.status = '';
      this.getBasicInfo();
    }
  }
</script>
