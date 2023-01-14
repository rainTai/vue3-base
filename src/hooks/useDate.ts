import { onMounted } from 'vue'
// const LunarCalendar = require('lunar-calendar')
import { useBaseStore } from '@/store/index'

const baseStore = useBaseStore()

export const useDate = () => {
  // 初始化日期
  onMounted(() => {
    baseStore.baseDate = initDate()
  })
  return {}
}

const initDate = (_year = 0, _month = 0, _date = 0, _hour = 0) => {
  // const { year, month, date, hour } = [0, 0, 0, 0]
  // // 如果年月日时都不为真
  // if (!year && !month && !date && !hour) {
  //   const dateStruct = new Date()
  //   let cYear = dateStruct.getFullYear()
  //   let cMonth = dateStruct.getMonth() + 1
  //   let cDate = dateStruct.getDate()
  //   let cHour = dateStruct.getHours()
  // }

  // if (sYear && sMonth && sDate && sHour) {
  //   year = sYear
  //   month = sMonth
  //   date = sDate
  //   hour = sHour
  // }
  // const dateList = LunarCalendar.calendar(year, month, false)
  // console.log(dateList, '当前时间状态')
  // const curDateData = dateList.monthData[date - 1]
  // curDateData.GanZhiHour = getGanZhiHour(curDateData.GanZhiDay, hour)
  // curDateData.hour = hour
  // curDateData.jieqi = getjq(year, month, date)
  return
}
