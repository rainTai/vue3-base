<template>
  <div class="select">
    <el-form :model="form" class="form" label-width="70px">
      <el-form-item label="年月">
        <el-date-picker
          style="width: 100px"
          v-model="form.yearMonth"
          type="month"
          placeholder="Pick a Year"
          clearable
          value-format="YYYY-MM"
          size="small"
          @change="setYearMonth"
        />
      </el-form-item>
      <el-form-item label="过滤干">
        <el-select v-model="form.filterGan" style="width: 250px" multiple size="small" clearable>
          <el-option v-for="item in ganList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="过滤支">
        <el-select v-model="form.filterZhi" style="width: 250px" multiple size="small" clearable>
          <el-option v-for="item in zhiList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>

      <el-form-item label="命主">
        <el-select
          v-model="form.mingList"
          style="width: 250px"
          multiple
          size="small"
          clearable
          @change="setMingList"
        >
          <el-option v-for="item in sixtyList" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="坐山">
        <el-select
          v-model="form.zuoshan"
          style="width: 70px"
          size="small"
          clearable
          @change="setZuoShan"
        >
          <el-option v-for="item in erShiSiShan" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" style="width: 100px" size="small" clearable>
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, onBeforeMount, onMounted, watchEffect } from 'vue'
import { useBaseStore } from '@/store'
import { useDate, ganList, zhiList, erShiSiShan, typeList, sixtyList } from '@/hooks/useDate'
import { useGong } from '@/hooks/useGong'
import { useMing } from '@/hooks/useMing'

const baseStore = useBaseStore()

const { setData } = useDate()
const { initGongList } = useGong()
const { initMingList } = useMing()

const form = reactive({
  yearMonth: '',
  filterGan: [],
  filterZhi: [],
  zuoshan: '',
  mingList: [],
  type: '',
})

const setYearMonth = () => {
  if (form.yearMonth) {
    const [year, month] = form.yearMonth.split('-')
    setData(year, month)
    initGongList()
    baseStore.$patch(state => {
      state.year = year
      state.month = month
      state.date = '1'
      state.hour = '0'
    })
  } else {
    const { year, month } = baseStore
    setData(year, month)
  }
}

const setZuoShan = () => {
  setTimeout(() => {
    initGongList()
    setYearMonth()
  }, 100)
}
const setMingList = () => {
  setTimeout(() => {
    initMingList()
  }, 100)
}

watchEffect(() => {
  baseStore.$patch(state => {
    state.filterGan = form.filterGan
    state.filterZhi = form.filterZhi
    state.zuoshan = form.zuoshan
    state.mingList = form.mingList
    state.type = form.type
  })
})

onBeforeMount(() => {})
onMounted(() => {})
watchEffect(() => {})
</script>
<style scoped lang="scss">
.select {
  margin: 10px;
}
.form {
  display: flex;
  flex-wrap: wrap;
}
</style>
