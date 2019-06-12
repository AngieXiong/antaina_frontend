<template>
  <div>
    <Row :gutter="20">
      我是首頁
      <!-- <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">

      </i-col> -->
    </Row>
    <Row :gutter="20" style="margin-top: 10px;">
      <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
        <!-- <Card shadow>

        </Card> -->
      </i-col>
      <i-col :md="24" :lg="16" style="margin-bottom: 20px;">

      </i-col>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
</style>
