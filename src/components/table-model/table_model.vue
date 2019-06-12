<template>
  <Modal v-model="inquireModal" title="详情" :width="1300">
    <div>
      <i-table border :columns="modelColumns" :data="modelData"></i-table>
      <div class="text-center mt20" v-if="modelTotal !== 0">
        <Page :total="modelTotal" :current="modelPageNum" :page-size="modelPageSize" show-elevator show-total></Page>
      </div>
    </div>
  </Modal>
</template>
<script>
  export default {
    name: 'TableModel',
    props: {
      modelColumns: {
        type: Array,
        default: []
      },
      modelData: {
        type: Array,
        default: []
      },
      modelTotal: {
        type: Number,
        default: 0
      },
      modelPageNum: {
        type: Number,
        default: 0
      },
      modelPageSize: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        inquireModal: false
      }
    },
    methods: {
      openModel() {
        this.inquireModal = true
      },
      closeModel() {
        this.inquireModal = false
      }
    }
  }
</script>
