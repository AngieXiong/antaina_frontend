<template>
  <div>
    <div class="mb20 line-block">
      <label >物料编号：</label>
      <i-input v-model="formData.productCode" placeholder="物料编号" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >物料名称：</label>
      <i-input v-model="formData.productName" placeholder="物料名称" class="mr20" style="width:200px" clearable ></i-input>
    </div>
    <div class="mb20 line-block">
      <label >物料类型：</label>
      <i-select v-model="formData.type" style="width:200px" class="mr20" clearable>
        <i-option v-for="item in productTypeList" :key="item.value" :value="item.value">{{ item.label }}</i-option>
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
      <div class="mb20 fl">
        <router-link to="/product/product_add">
          <i-button type="success" icon="ios-add" class="mb20" >新增</i-button>
        </router-link>
      </div>
      <Page :total="total" :current="formData.pageNum" :page-size="formData.pageSize" show-elevator show-total @on-change="pageChange"></Page>
    </div>
  </div>
</template>

<script>
import { getProductWithPage, deleteProduct } from "@/api/product"
import { getDictByKey, getNameByCode, PRODUCTTYPE, PRODUCTUNIT } from '@/libs/dict'
export default {
  data() {
    return {
      total: 0,
      formData: {
        pageNum: 1,
        pageSize: 10,
        productCode: '',
        productName: '',
        type: 0
      },
      formInfo: [],
      productTypeList: getDictByKey(PRODUCTTYPE),
      columns: [
        {
          title: "ID",
          align: 'center',
          key: "id"
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
                            name: 'product_update',
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
      getProductWithPage(this.formData).then(({ code, data, message }) => {
        if (code === 200) {
          this.formInfo = data.list;
          this.total = parseInt(data.total);
        } else {
          this.$Message.error(message);
        }
      });
    },
    deleteProduct(id) {
      const example = { id: id }
      deleteProduct(example).then(({ code, data, message }) => {
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
    this.formData.type = '';
    this.getBasicInfo();
  }
}
</script>
