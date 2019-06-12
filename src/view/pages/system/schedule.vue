<template>
  <div>
    <div class="mb20 line-block">
      <label >处理状态：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in sysErrorTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
import { getSysErrorListWithPage } from "@/api/system"
import { getDictByKey, getNameByCode, SYSERRORTYPE } from '@/libs/dict'
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        type: ""
      },
      sysErrorTypeList: getDictByKey(SYSERRORTYPE),
      formInfo: [],
      columns: [
        {
          title: "ID",
          align: 'center',
          width: '180',
          key: "id"
        },
        {
          title: "唯一标识",
          align: 'center',
          key: "token"
        },
        {
          title: "执行的任务内容",
          align: 'center',
          key: "content"
        },
        {
          title: "是否已处理",
          align: 'center',
          width: '100',
          render: (h, params) => {
            return h('div', {}, getNameByCode(params.row.type, SYSERRORTYPE))
          }
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
      this.formData.type = "";
      this.search();
    },
    pageChange(e) {
      this.formData.pageNum = e;
      this.getBasicInfo();
    },
    getBasicInfo() {
      getSysErrorListWithPage(this.formData).then(({ code, data, message }) => {
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
