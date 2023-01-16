import { onMounted, watch } from 'vue'
import lunisolar from 'lunisolar'
import { useBaseStore } from '@/store/index'

export const useDate = () => {
  const baseStore = useBaseStore()
  baseStore.$patch(state => {
    const dateStruct = new Date()
    state.year = dateStruct.getFullYear() + ''
    state.month = dateStruct.getMonth() + 1 + ''
    state.date = dateStruct.getDate() + ''
    state.hour = dateStruct.getHours() + ''
  })

  onMounted(() => {
    setData(baseStore.year, baseStore.month)
  })
  //初始化数据
  const setData = (year?, month?, date?, hour?) => {
    const { dayList, currentTime } = initDate(year, month, date, hour)
    baseStore.$patch(state => {
      state.dayList = dayList
      state.currentTime = currentTime
    })
  }

  // 获取时间列表
  const getHourList = () => {
    const { year, month, date } = baseStore
    const hourList = getHourListFunc(year, month, date)
    baseStore.$patch(state => {
      state.hourList = hourList
    })
  }
  watch(
    () => baseStore.date,
    () => {
      getHourList()
    },
    { deep: true },
  )

  return { setData }
}

export const initDate = (year?, month?, date?, hour?) => {
  // 获取一个月的数据对象
  const dayList = getDayList(year, month)
  // 设置当前时间数据对象
  const currentTime = getCurrentTime(year, month, date || 0, hour || 0)

  return {
    dayList,
    currentTime,
  }
}

const getMonthDays = (year, month) => {
  const days = new Date(year, month, 0).getDate()
  return days
}

const getHourListFunc = (year, month, date) => {
  const hourList = [] as any
  for (let i = 0; i < 24; i++) {
    const solar = lunisolar(`${year}/${month}/${date} ${i}:00`) as any
    hourList.push(solar)
  }
  return hourList
}

// 获取月份列表
const getDayList = (year, month) => {
  const days = getMonthDays(year, month)
  const dayList = [] as any
  for (let i = 1; i <= days; i++) {
    const jieqi = lunisolar(`${year}/${month}/${i} 00:00`).recentSolarTerm(2)
    const solar = lunisolar(`${year}/${month}/${i} 00:00`) as any
    solar.jieqi = jieqi.toString()
    dayList.push(solar)
  }
  return dayList
}

// 获取当前时间
const getCurrentTime = (year, month, date, hour) => {
  if (date === 0 && hour === 0) {
    date = '01'
    hour = '00'
  }
  return lunisolar(`${year}/${month}/${date} ${hour}`)
}

export const zhiList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']

export const ganList = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']

export const erShiSiShan = [
  '甲',
  '卯',
  '乙',
  '辰',
  '巽',
  '巳',
  '丙',
  '午',
  '丁',
  '未',
  '坤',
  '申',
  '庚',
  '酉',
  '辛',
  '戌',
  '乾',
  '亥',
  '壬',
  '子',
  '癸',
  '丑',
  '艮',
  '寅',
]

export const typeList = [
  {
    label: '通用',
    value: '1',
  },
  {
    label: '开工/开业',
    value: '2',
  },
  {
    label: '安床设帐',
    value: '3',
  },
  {
    label: '动土垫基',
    value: '4',
  },
  {
    label: '竖造宅社',
    value: '5',
  },
  {
    label: '修造中宫',
    value: '6',
  },
  {
    label: '入宅安香',
    value: '7',
  },
  {
    label: '婚姻嫁娶',
    value: '8',
  },
  {
    label: '成服除服',
    value: '9',
  },
  {
    label: '破土安葬',
    value: '10',
  },
]

export const sixtyList = [
  '甲子',
  '乙丑',
  '丙寅',
  '丁卯',
  '戊辰',
  '己巳',
  '庚午',
  '辛未',
  '壬申',
  '癸酉',
  '甲戌',
  '乙亥',
  '丙子',
  '丁丑',
  '戊寅',
  '己卯',
  '庚辰',
  '辛巳',
  '壬午',
  '癸未',
  '甲申',
  '乙酉',
  '丙戌',
  '丁亥',
  '戊子',
  '己丑',
  '庚寅',
  '辛卯',
  '壬辰',
  '癸巳',
  '甲午',
  '乙未',
  '丙申',
  '丁酉',
  '戊戌',
  '己亥',
  '庚子',
  '辛丑',
  '壬寅',
  '癸卯',
  '甲辰',
  '乙巳',
  '丙午',
  '丁未',
  '戊申',
  '己酉',
  '庚戌',
  '辛亥',
  '壬子',
  '癸丑',
  '甲寅',
  '乙卯',
  '丙辰',
  '丁巳',
  '戊午',
  '己未',
  '庚申',
  '辛酉',
  '壬戌',
  '癸亥',
]
