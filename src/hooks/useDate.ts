import { onMounted, watch } from 'vue'
import lunisolar from 'lunisolar'
import { useBaseStore } from '@/store/index'
import { useWuTu } from './useWuTu'

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
    setData(baseStore.year, baseStore.month, baseStore.date, baseStore.hour)
    setTimeout(() => {
      getHourList()
    }, 100)
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
  let currentTime
  if (!date && !hour) {
    currentTime = dayList[0]
  } else {
    const solar = lunisolar(`${year}/${month}/${date} ${hour || 0}`) as any
    currentTime = getDayFormat(solar)
  }

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
    const solar = lunisolar(`${year}/${month}/${i} 00:00`) as any
    getDayFormat(solar)
    dayList.push(solar)
  }
  return dayList
}

const getDayFormat = solar => {
  const jieqi = solar.recentSolarTerm(2)
  solar.jieqi = jieqi.toString()
  solar.goodList = getGoodList(solar)
  solar.badList = getBadList(solar)
  solar.zhiRi = getZhiRi(solar)
  solar.xingXiu = getXingXiu(solar)
  // 乌兔太阳日时
  const { isWuTuTaiYangRi, isWuTuTaiYangShi } = useWuTu(solar)
  solar.wuTuTaiYang = isWuTuTaiYangRi()
  const hourList = [
    '子',
    '丑',
    '丑',
    '寅',
    '寅',
    '卯',
    '卯',
    '辰',
    '辰',
    '巳',
    '巳',
    '午',
    '午',
    '未',
    '未',
    '申',
    '申',
    '酉',
    '酉',
    '戌',
    '戌',
    '亥',
    '亥',
    '子',
  ]
  solar.jieLuKongWang = []
  solar.guiRenDengTianMen = []
  solar.luoWenJiaoGui = []
  solar.wuBuYuShi = []
  solar.wuTuTaiYangShi = []
  hourList.forEach((hourZhi, index) => {
    if (isWuTuTaiYangShi(hourZhi)) {
      solar.wuTuTaiYangShi.push(hourZhi)
    }
    if (isWuBuYuShi(solar, index)) {
      solar.wuBuYuShi.push(hourZhi)
    }
    if (isLuoWenJiaoGui(solar, index)) {
      solar.luoWenJiaoGui.push(hourZhi)
    }
    if (isGuiRenDengTianMen(solar, hourZhi)) {
      solar.guiRenDengTianMen.push(hourZhi)
    }
    if (isJieLuKongWang(solar, hourZhi)) {
      solar.jieLuKongWang.push(hourZhi)
    }
  })
  return solar
}

// 获取好的列表
const getGoodList = solar => {
  return dayGoodList(solar).filter(x => x.value)
}
const getBadList = solar => {
  return dayBadList(solar).filter(x => x.value)
}
const getZhiRi = solar => {
  const month = solar.lunar.month
  const day = solar.format('cD')
  const dayZhi = day[1]
  //循环轮值表
  const tempArr = zhiRiList.concat(zhiRiList)
  //倒排数据
  const tempList = tempArr.slice(tempArr.length - month - 11, tempArr.length - month + 1)

  const zhiIndex = zhiList.findIndex(x => x === dayZhi)
  return tempList[zhiIndex]
}

const getXingXiu = solar => {
  const year = solar.lunar.year
  const month = solar.lunar.month
  const day = solar.lunar.day
  const tempDate = new Date(year, month - 1, day)
  const curWeek = tempDate.getDay()
  const GanZhiDay = solar.format('cD')
  const ZhiDay = GanZhiDay[1]
  //0-周日 1-周一 23456
  let xingxiu = ''
  if (['申', '子', '辰'].includes(ZhiDay)) {
    const tempArr = ['虚', '毕', '翼', '箕', '奎', '鬼', '氐']
    xingxiu = tempArr[curWeek]
  }
  if (['巳', '酉', '丑'].includes(ZhiDay)) {
    const tempArr = ['房', '危', '觜', '轸', '斗', '娄', '柳']
    xingxiu = tempArr[curWeek]
  }
  if (['寅', '午', '戌'].includes(ZhiDay)) {
    const tempArr = ['星', '心', '室', '参', '角', '牛', '胃']
    xingxiu = tempArr[curWeek]
  }
  if (['亥', '卯', '未'].includes(ZhiDay)) {
    const tempArr = ['昴', '张', '尾', '壁', '井', '亢', '女']
    xingxiu = tempArr[curWeek]
  }

  return xingxiu
}

//值日列表
export const zhiRiList = ['开', '闭', '建', '除', '满', '平', '定', '执', '破', '危', '成', '收']

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

const dayGoodList = solar => [
  {
    label: '天德',
    value: isTianDe(solar),
    info: '百事吉',
  },
  {
    label: '天德合',
    value: isTianDeHe(solar),
    info: '百事吉',
  },
  {
    label: '喜神',
    value: isXiShen(solar),
    info: '宜结婚纳采求子等吉',
  },
  {
    label: '天贵',
    value: isTianGui(solar),
    info: '百事吉',
  },
  {
    label: '天福',
    value: isTianFu(solar),
    info: '宜上官入宅送礼',
  },
  {
    label: '天官',
    value: isTianGuan(solar),
    info: '宜就职和诵和解',
  },
  {
    label: '天马',
    value: isTianMa(solar),
    info: '宜出行求财上任',
  },
  {
    label: '地财',
    value: isDiCai(solar),
    info: '宜人财，收藏宝器',
  },
  {
    label: '月恩',
    value: isYueEn(solar),
    info: '百事吉',
  },
  {
    label: '母仓',
    value: isMuCang(solar),
    info: '四季土旺后巳午日真',
  },
  {
    label: '圣心',
    value: isShengXin(solar),
    info: '祝福喜事',
  },
  {
    label: '禄库',
    value: isLuKu(solar),
    info: '宜入财',
  },
  {
    label: '福厚',
    value: isFuHou(solar),
    info: '求子庆寿',
  },
  {
    label: '阴德',
    value: isYinDe(solar),
    info: '祝寿喜宴求子',
  },
  {
    label: '解神',
    value: isXieShen(solar),
    info: '宜上表解冤讼狱事',
  },
  {
    label: '普护',
    value: isPuHu(solar),
    info: '宜祈福嫁娶出行百吉',
  },
  {
    label: '续世',
    value: isXuShi(solar),
    info: '嫁娶订婚纳婿聘佣人',
  },
  {
    label: '驿马',
    value: isYiMa(solar),
    info: '出行百事吉',
  },
  {
    label: '民日',
    value: isMingRi(solar),
    info: '既成动',
  },
  {
    label: '旺日',
    value: isWangRi(solar),
    info: '百事吉利',
  },
  {
    label: '三合',
    value: isSanHe(solar),
    info: '百事吉',
  },
  {
    label: '大红沙',
    value: isDaHongSha(solar),
    info: '百事吉',
  },
  {
    label: '天富',
    value: isTianFu2(solar),
    info: '满日宜造葬做仓库',
  },
  {
    label: '月德',
    value: isYueDe(solar),
    info: '百事吉，忌打官司',
  },
  {
    label: '月德合',
    value: isYueDeHe(solar),
    info: '百事吉，五，十一月不赦',
  },
  {
    label: '天医',
    value: isTianYi(solar),
    info: '闭日宜治病合药',
  },
  {
    label: '天财',
    value: isTianCai(solar),
    info: '宜求财造仓库，出行',
  },
  {
    label: '月财',
    value: isYueCai(solar),
    info: '开张修造仓库作灶出行',
  },
  {
    label: '月空',
    value: isYueKong(solar),
    info: '修造床帐进表上策吉',
  },
  {
    label: '明星',
    value: isMingXin(solar),
    info: '上官造葬百事光明吉',
  },
  {
    label: '五富',
    value: isWuFu(solar),
    info: '百事皆吉，宜开卷',
  },
  {
    label: '福星',
    value: isFuXin(solar),
    info: '宜宴会订盟喜事',
  },
  {
    label: '吉庆',
    value: isJiQin(solar),
    info: '宜亲临',
  },
  {
    label: '活耀',
    value: isHuoYao(solar),
    info: '与受死日会同则凶',
  },
  {
    label: '生气',
    value: isShengQi(solar),
    info: '修造动土植百事吉',
  },
  {
    label: '益后',
    value: isYiHou(solar),
    info: '宜同续世',
  },
  {
    label: '要安',
    value: isYaoAn(solar),
    info: '百事吉利',
  },
  {
    label: '官日',
    value: isGuanRi(solar),
    info: '将星',
  },
  {
    label: '守日',
    value: isShouRi(solar),
    info: '寡怨宿',
  },
  {
    label: '相日',
    value: isXiangRi(solar),
    info: '百事吉，宜取利',
  },
  {
    label: '六合',
    value: isLiuHe(solar),
    info: '百事皆吉取利',
  },
]

const isTianDe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (monthZhi === '寅' && dayGan === '丁') ||
    (monthZhi === '辰' && dayGan === '壬') ||
    (monthZhi === '巳' && dayGan === '辛') ||
    (monthZhi === '未' && dayGan === '甲') ||
    (monthZhi === '申' && dayGan === '癸') ||
    (monthZhi === '戌' && dayGan === '丙') ||
    (monthZhi === '亥' && dayGan === '乙') ||
    (monthZhi === '丑' && dayGan === '庚')
  ) {
    return true
  } else {
    return false
  }
}

//天德合
const isTianDeHe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (monthZhi === '寅' && dayGan === '壬') ||
    (monthZhi === '辰' && dayGan === '丁') ||
    (monthZhi === '巳' && dayGan === '丙') ||
    (monthZhi === '未' && dayGan === '己') ||
    (monthZhi === '申' && dayGan === '戊') ||
    (monthZhi === '戌' && dayGan === '辛') ||
    (monthZhi === '亥' && dayGan === '庚') ||
    (monthZhi === '丑' && dayGan === '乙')
  ) {
    return true
  } else {
    return false
  }
}

//喜神
const isXiShen = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '戌') ||
    (monthZhi === '卯' && dayZhi === '亥') ||
    (monthZhi === '辰' && dayZhi === '子') ||
    (monthZhi === '巳' && dayZhi === '丑') ||
    (monthZhi === '午' && dayZhi === '寅') ||
    (monthZhi === '未' && dayZhi === '卯') ||
    (monthZhi === '申' && dayZhi === '辰') ||
    (monthZhi === '酉' && dayZhi === '巳') ||
    (monthZhi === '戌' && dayZhi === '午') ||
    (monthZhi === '亥' && dayZhi === '未') ||
    (monthZhi === '子' && dayZhi === '申') ||
    (monthZhi === '丑' && dayZhi === '酉')
  ) {
    return true
  } else {
    return false
  }
}
//天贵
const isTianGui = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['甲', '乙'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['丙', '丁'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['庚', '辛'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['壬', '癸'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//天福
const isTianFu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['戊', '己'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['庚', '辛', '壬', '癸'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['甲', '乙'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['丙', '丁'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//天官
const isTianGuan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '戌') ||
    (monthZhi === '卯' && dayZhi === '子') ||
    (monthZhi === '辰' && dayZhi === '寅') ||
    (monthZhi === '巳' && dayZhi === '辰') ||
    (monthZhi === '午' && dayZhi === '午') ||
    (monthZhi === '未' && dayZhi === '申') ||
    (monthZhi === '申' && dayZhi === '戌') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '辰') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '申')
  ) {
    return true
  } else {
    return false
  }
}
//天马
const isTianMa = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '申') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '子') ||
    (monthZhi === '午' && dayZhi === '寅') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '戌') ||
    (monthZhi === '亥' && dayZhi === '子') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
//地财
const isDiCai = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '酉') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '卯') ||
    (monthZhi === '申' && dayZhi === '巳') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '酉') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '丑') ||
    (monthZhi === '丑' && dayZhi === '卯')
  ) {
    return true
  } else {
    return false
  }
}
//月恩
const isYueEn = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayGan === '丙') ||
    (monthZhi === '卯' && dayGan === '丁') ||
    (monthZhi === '辰' && dayGan === '庚') ||
    (monthZhi === '巳' && dayGan === '己') ||
    (monthZhi === '午' && dayGan === '戊') ||
    (monthZhi === '未' && dayGan === '辛') ||
    (monthZhi === '申' && dayGan === '壬') ||
    (monthZhi === '酉' && dayGan === '癸') ||
    (monthZhi === '戌' && dayGan === '庚') ||
    (monthZhi === '亥' && dayGan === '乙') ||
    (monthZhi === '子' && dayGan === '甲') ||
    (monthZhi === '丑' && dayGan === '辛')
  ) {
    return true
  } else {
    return false
  }
}
//母仓日
const isMuCang = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['亥', '子'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['寅', '卯'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['辰', '戌', '丑', '未'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['申', '酉'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//圣心
const isShengXin = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '亥') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '子') ||
    (monthZhi === '巳' && dayZhi === '午') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '未') ||
    (monthZhi === '申' && dayZhi === '寅') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '卯') ||
    (monthZhi === '亥' && dayZhi === '酉') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '戌')
  ) {
    return true
  } else {
    return false
  }
}
//禄库
const isLuKu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '辰') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '午') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '申') ||
    (monthZhi === '未' && dayZhi === '酉') ||
    (monthZhi === '申' && dayZhi === '戌') ||
    (monthZhi === '酉' && dayZhi === '亥') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '丑') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '卯')
  ) {
    return true
  } else {
    return false
  }
}

//福厚
const isFuHou = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['寅'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['巳'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['申'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['亥'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//阴德
const isYinDe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '酉') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '巳') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '亥') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '巳') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '丑') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//解神
const isXieShen = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '申') ||
    (monthZhi === '卯' && dayZhi === '申') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '戌') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '子') ||
    (monthZhi === '申' && dayZhi === '寅') ||
    (monthZhi === '酉' && dayZhi === '寅') ||
    (monthZhi === '戌' && dayZhi === '辰') ||
    (monthZhi === '亥' && dayZhi === '辰') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '午')
  ) {
    return true
  } else {
    return false
  }
}
//普护
const isPuHu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '申') ||
    (monthZhi === '卯' && dayZhi === '寅') ||
    (monthZhi === '辰' && dayZhi === '酉') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '戌') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '巳') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '午') ||
    (monthZhi === '子' && dayZhi === '丑') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//续世
const isXuShi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '丑') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '寅') ||
    (monthZhi === '巳' && dayZhi === '申') ||
    (monthZhi === '午' && dayZhi === '卯') ||
    (monthZhi === '未' && dayZhi === '酉') ||
    (monthZhi === '申' && dayZhi === '辰') ||
    (monthZhi === '酉' && dayZhi === '戌') ||
    (monthZhi === '戌' && dayZhi === '巳') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '子')
  ) {
    return true
  } else {
    return false
  }
}
//驿马
const isYiMa = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '申') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '寅') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '申') ||
    (monthZhi === '未' && dayZhi === '巳') ||
    (monthZhi === '申' && dayZhi === '寅') ||
    (monthZhi === '酉' && dayZhi === '亥') ||
    (monthZhi === '戌' && dayZhi === '申') ||
    (monthZhi === '亥' && dayZhi === '巳') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//民日
const isMingRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['子'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['卯'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//旺日
const isWangRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['寅', '卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['巳', '午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['申', '酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子', '丑'].includes(dayZhi)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['甲', '乙'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['丙', '丁'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['庚', '辛'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['壬', '癸'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//三合
const isSanHe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['戌', '午'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['亥', '未'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['子', '申'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['丑', '酉'].includes(dayZhi)) ||
    (monthZhi === '午' && ['寅', '戌'].includes(dayZhi)) ||
    (monthZhi === '未' && ['亥', '卯'].includes(dayZhi)) ||
    (monthZhi === '申' && ['子', '辰'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['巳', '酉'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['寅', '午'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['卯', '未'].includes(dayZhi)) ||
    (monthZhi === '子' && ['申', '辰'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['巳', '酉'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//大红砂
const isDaHongSha = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['戌', '子'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['辰', '巳'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['未'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['申', '戌'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//天富
const isTianFu2 = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['午'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['未'].includes(dayZhi)) ||
    (monthZhi === '午' && ['申'].includes(dayZhi)) ||
    (monthZhi === '未' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '申' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['子'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '子' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['卯'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//月德
const isYueDe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['丙'].includes(dayGan)) ||
    (monthZhi === '卯' && ['甲'].includes(dayGan)) ||
    (monthZhi === '辰' && ['壬'].includes(dayGan)) ||
    (monthZhi === '巳' && ['庚'].includes(dayGan)) ||
    (monthZhi === '午' && ['丙'].includes(dayGan)) ||
    (monthZhi === '未' && ['甲'].includes(dayGan)) ||
    (monthZhi === '申' && ['壬'].includes(dayGan)) ||
    (monthZhi === '酉' && ['庚'].includes(dayGan)) ||
    (monthZhi === '戌' && ['丙'].includes(dayGan)) ||
    (monthZhi === '亥' && ['甲'].includes(dayGan)) ||
    (monthZhi === '子' && ['壬'].includes(dayGan)) ||
    (monthZhi === '丑' && ['庚'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//月德合
const isYueDeHe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['辛'].includes(dayGan)) ||
    (monthZhi === '卯' && ['己'].includes(dayGan)) ||
    (monthZhi === '辰' && ['丁'].includes(dayGan)) ||
    (monthZhi === '巳' && ['乙'].includes(dayGan)) ||
    (monthZhi === '午' && ['辛'].includes(dayGan)) ||
    (monthZhi === '未' && ['己'].includes(dayGan)) ||
    (monthZhi === '申' && ['丁'].includes(dayGan)) ||
    (monthZhi === '酉' && ['乙'].includes(dayGan)) ||
    (monthZhi === '戌' && ['辛'].includes(dayGan)) ||
    (monthZhi === '亥' && ['己'].includes(dayGan)) ||
    (monthZhi === '子' && ['丁'].includes(dayGan)) ||
    (monthZhi === '丑' && ['乙'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//天医
const isTianYi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '午' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '未' && ['午'].includes(dayZhi)) ||
    (monthZhi === '申' && ['未'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['申'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '子' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//天财
const isTianCai = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['午'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['申'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '午' && ['子'].includes(dayZhi)) ||
    (monthZhi === '未' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '申' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['午'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['申'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '子' && ['子'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['寅'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//月财
const isYueCai = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['午'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['未'].includes(dayZhi)) ||
    (monthZhi === '午' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '未' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '申' && ['午'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['未'].includes(dayZhi)) ||
    (monthZhi === '子' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['亥'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//月空
const isYueKong = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['壬'].includes(dayGan)) ||
    (monthZhi === '卯' && ['庚'].includes(dayGan)) ||
    (monthZhi === '辰' && ['丙'].includes(dayGan)) ||
    (monthZhi === '巳' && ['甲'].includes(dayGan)) ||
    (monthZhi === '午' && ['壬'].includes(dayGan)) ||
    (monthZhi === '未' && ['庚'].includes(dayGan)) ||
    (monthZhi === '申' && ['丙'].includes(dayGan)) ||
    (monthZhi === '酉' && ['甲'].includes(dayGan)) ||
    (monthZhi === '戌' && ['壬'].includes(dayGan)) ||
    (monthZhi === '亥' && ['庚'].includes(dayGan)) ||
    (monthZhi === '子' && ['丙'].includes(dayGan)) ||
    (monthZhi === '丑' && ['甲'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//明星
const isMingXin = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['申'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['子'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '午' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '未' && ['午'].includes(dayZhi)) ||
    (monthZhi === '申' && ['申'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['子'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '子' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['午'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//五富
const isWuFu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['申'].includes(dayZhi)) ||
    (monthZhi === '午' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '未' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '申' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['申'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '子' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['申'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//福星
const isFuXin = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '午' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '未' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '申' && ['子'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['午'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['未'].includes(dayZhi)) ||
    (monthZhi === '子' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['申'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//吉庆
const isJiQin = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '午' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '未' && ['未'].includes(dayZhi)) ||
    (monthZhi === '申' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['申'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '子' && ['未'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//活耀
const isHuoYao = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['未'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['子'].includes(dayZhi)) ||
    (monthZhi === '午' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '未' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '申' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['未'].includes(dayZhi)) ||
    (monthZhi === '子' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['申'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//生气
const isShengQi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['子'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '午' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '未' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '申' && ['午'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['未'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['申'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '子' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['亥'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//益后
const isYiHou = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['子'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['午'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['未'].includes(dayZhi)) ||
    (monthZhi === '午' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '未' && ['申'].includes(dayZhi)) ||
    (monthZhi === '申' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '子' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['亥'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//要安
const isYaoAn = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['申'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '午' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '未' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '申' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['午'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['子'].includes(dayZhi)) ||
    (monthZhi === '子' && ['未'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['丑'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//官日
const isGuanRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//守日
const isShouRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['子'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['午'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//相日
const isXiangRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['巳', '午'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['辰', '戌', '丑', '未'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['亥', '子'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['寅', '卯'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//六合
const isLiuHe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && ['亥'].includes(dayZhi)) ||
    (monthZhi === '卯' && ['戌'].includes(dayZhi)) ||
    (monthZhi === '辰' && ['酉'].includes(dayZhi)) ||
    (monthZhi === '巳' && ['申'].includes(dayZhi)) ||
    (monthZhi === '午' && ['未'].includes(dayZhi)) ||
    (monthZhi === '未' && ['午'].includes(dayZhi)) ||
    (monthZhi === '申' && ['巳'].includes(dayZhi)) ||
    (monthZhi === '酉' && ['辰'].includes(dayZhi)) ||
    (monthZhi === '戌' && ['卯'].includes(dayZhi)) ||
    (monthZhi === '亥' && ['寅'].includes(dayZhi)) ||
    (monthZhi === '子' && ['丑'].includes(dayZhi)) ||
    (monthZhi === '丑' && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}

// 坏日子
const dayBadList = solar => [
  {
    label: '嫁娶离别日',
    value: isJiaQuLiBieRi(solar),
    info: '不宜嫁娶',
  },
  {
    label: '金神七煞值日',
    value: isJinShenQiShaRi(solar),
    info: '大凶',
  },
  {
    label: '十败大恶日',
    value: isShiBaiDaERi(solar),
    info: '日常出行,办事,喜庆之事忌此日.与天月二德并者不忌',
  },
  {
    label: '月破日',
    value: isYuePo(solar),
    info: '百事忌',
  },
  {
    label: '天罡',
    value: isTianGang(solar),
    info: '又称灭门，百事凶',
  },
  {
    label: '天瘟',
    value: isTianWen(solar),
    info: '忌修造治病作六畜栏',
  },
  {
    label: '天吏',
    value: isTianLi(solar),
    info: '忌词讼上官事',
  },
  {
    label: '天狱',
    value: isTianYu(solar),
    info: '忌诉讼冤狱状，争论',
  },
  {
    label: '天棒',
    value: isTianBang(solar),
    info: '忌词讼官事',
  },
  {
    label: '天狗日',
    value: isTianGou(solar),
    info: '祭祀鬼神不食',
  },
  {
    label: '天转',
    value: isTianZhuan(solar),
    info: '忌动土出行船车',
  },
  {
    label: '地转',
    value: isDiZhuan(solar),
    info: '忌动土出行船车',
  },
  {
    label: '天贼',
    value: isTianZei(solar),
    info: '竖造动土入宅开仓库忌',
  },
  {
    label: '天火',
    value: isTianHuo(solar),
    info: '忌盖屋起造修方不利',
  },
  {
    label: '月火',
    value: isYueHuo(solar),
    info: '忌造作盖屋',
  },
  {
    label: '荒芜',
    value: isHuangWu(solar),
    info: '九苦八穷百事皆忌',
  },
  {
    label: '死符',
    value: isSiFu(solar),
    info: '忌起基起造安床',
  },
  {
    label: '旁废',
    value: isPangFei(solar),
    info: '若有吉星多可用',
  },
  {
    label: '黄砂',
    value: isHuangSha(solar),
    info: '忌出行',
  },
  {
    label: '大耗',
    value: isDaHao(solar),
    info: '百事忌破败',
  },
  {
    label: '神隔',
    value: isShenGe(solar),
    info: '忌祭祀祈福',
  },
  {
    label: '朱雀',
    value: isZhuQue(solar),
    info: '即飞廉忌入阳宅开门',
  },
  {
    label: '玄武',
    value: isXuanWu(solar),
    info: '即阴司忌埋葬事',
  },
  {
    label: '鲁班',
    value: isLuBan(solar),
    info: '忌竖造做斜材',
  },
  {
    label: '木马',
    value: isMuMa(solar),
    info: '忌匠人造工伐木',
  },
  {
    label: '披爵',
    value: isPiJue(solar),
    info: '忌嫁娶入宅',
  },
  {
    label: '破败',
    value: isPoBai(solar),
    info: '忌制作器用',
  },
  {
    label: '天轴',
    value: isTianZhou(solar),
    info: '忌动土',
  },
  {
    label: '地轴',
    value: isDiZhou(solar),
    info: '忌动土',
  },
  {
    label: '月转',
    value: isYueZhuan(solar),
    info: '忌动土',
  },
  {
    label: '地贼',
    value: isDiZei(solar),
    info: '忌造葬出行开池动土',
  },
  {
    label: '地火',
    value: isDiHuo(solar),
    info: '忌栽种五行花果植物',
  },
  {
    label: '月厌',
    value: isYueYan(solar),
    info: '大祸忌嫁娶出行',
  },
  {
    label: '月杀',
    value: isYueSha(solar),
    info: '忌造门开张',
  },
  {
    label: '受死',
    value: isShouSi(solar),
    info: '百事忌，宜捕捉',
  },
  {
    label: '四废',
    value: isSiFei(solar),
    info: '百事忌，宜合板寿木',
  },
  {
    label: '小红砂',
    value: isXiaoHongSha(solar),
    info: '百事忌',
  },
  {
    label: '不成',
    value: isBuCheng(solar),
    info: '忌起造',
  },
  {
    label: '小耗',
    value: isXiaoHao(solar),
    info: '忌财务搬运出入',
  },
  {
    label: '人隔',
    value: isRenGe(solar),
    info: '忌嫁娶进人口求子',
  },
  {
    label: '白虎',
    value: isBaiHu(solar),
    info: '忌墓葬',
  },
  {
    label: '勾陈',
    value: isGouChen(solar),
    info: '土孛',
  },
  {
    label: '斧杀',
    value: isFuSha(solar),
    info: '忌建筑起工',
  },
  {
    label: '刀砧',
    value: isDaoZhan(solar),
    info: '忌针灸穿隔六畜',
  },
  {
    label: '五鬼',
    value: isWuGui(solar),
    info: '忌出行',
  },
  {
    label: '殃败',
    value: isYangBai(solar),
    info: '忌进人口，纳牲畜',
  },
  {
    label: '临日',
    value: isLinRi(solar),
    info: '忌上官',
  },
  {
    label: '河魁',
    value: isHeKui(solar),
    info: '大祸，忌起造安门',
  },
  {
    label: '阴错',
    value: isYinCuo(solar),
    info: '忌上官出嫁移居',
  },
  {
    label: '阳错',
    value: isYangCuo(solar),
    info: '忌上官出嫁移居',
  },
  {
    label: '往亡',
    value: isWangWang(solar),
    info: '忌赴会就职出行嫁娶',
  },
  {
    label: '血支',
    value: isXueZhi(solar),
    info: '忌针灸穿割六畜',
  },
  {
    label: '土瘟',
    value: isTuWen(solar),
    info: '忌动土',
  },
  {
    label: '土府',
    value: isTuFu(solar),
    info: '同月建日忌动土',
  },
  {
    label: '土忌',
    value: isTuJi(solar),
    info: '忌动土',
  },
]

const isShiBaiDaERi = solar => {
  const day = solar.format('cD')
  if (
    ['甲辰', '乙巳', '丙申', '丁亥', '戊戌', '己丑', '庚辰', '辛巳', '壬申', '癸亥'].includes(day)
  ) {
    return true
  } else {
    return false
  }
}

//金神七煞值日
const isJinShenQiShaRi = solar => {
  const year = solar.format('cY')
  const yearGan = year[0]
  // const yearZhi = year[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  let data = false
  if (['甲', '己'].includes(yearGan) && ['午', '未'].includes(dayZhi)) {
    data = true
  }
  if (['乙', '庚'].includes(yearGan) && ['辰', '巳'].includes(dayZhi)) {
    data = true
  }
  if (['丙', '辛'].includes(yearGan) && ['子', '丑', '寅', '卯'].includes(dayZhi)) {
    data = true
  }
  if (['丁', '壬'].includes(yearGan) && ['戌', '亥'].includes(dayZhi)) {
    data = true
  }
  if (['戊', '癸'].includes(yearGan) && ['申', '酉'].includes(dayZhi)) {
    data = true
  }
  return data
}

//嫁娶离别日
const isJiaQuLiBieRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  // const dayZhi = day[1]
  let libireri = false
  if (monthZhi === '寅' && day === '丙子') {
    libireri = true
  }
  if (monthZhi === '卯' && day === '癸丑') {
    libireri = true
  }
  if (monthZhi === '辰' && day === '丙申') {
    libireri = true
  }
  if (monthZhi === '巳' && day === '丙辰') {
    libireri = true
  }
  if (monthZhi === '午' && day === '丁巳') {
    libireri = true
  }
  if (monthZhi === '未' && day === '丁巳') {
    libireri = true
  }
  // if (monthZhi === "申" && day === '庚辰') {
  //     libireri = true
  // }
  if (monthZhi === '酉' && day === '庚辰') {
    libireri = true
  }
  if (monthZhi === '戌' && day === '辛未') {
    libireri = true
  }
  if (monthZhi === '亥' && day === '丙午') {
    libireri = true
  }
  if (monthZhi === '子' && day === '癸巳') {
    libireri = true
  }
  if (monthZhi === '丑' && day === '丙午') {
    libireri = true
  }
  return libireri
}

const isWuBuYuShi = (solar, hourIndex) => {
  const date = solar.format('cD')
  const dateGan = date[0]
  const baseStore = useBaseStore()
  const { year, month, date: date2 } = baseStore
  const tempSolar = lunisolar(`${year}/${month}/${date2} ${hourIndex}`)
  const hourGanZhi = tempSolar.format('cH')
  // console.log(hourGanZhi, 'ganZhi')
  const TianGan = [
    {
      dateGan: '甲',
      hourGanZhi: '庚午',
    },
    {
      dateGan: '乙',
      hourGanZhi: '辛巳',
    },
    {
      dateGan: '丙',
      hourGanZhi: '壬辰',
    },
    {
      dateGan: '丁',
      hourGanZhi: '癸卯',
    },
    {
      dateGan: '戊',
      hourGanZhi: '甲寅',
    },
    {
      dateGan: '己',
      hourGanZhi: '乙丑',
    },
    {
      dateGan: '庚',
      hourGanZhi: '丙子',
    },
    {
      dateGan: '辛',
      hourGanZhi: '丁酉',
    },
    {
      dateGan: '壬',
      hourGanZhi: '戊申',
    },
    {
      dateGan: '癸',
      hourGanZhi: '己未',
    },
  ]
  if (TianGan.some(x => x.dateGan === dateGan && x.hourGanZhi === hourGanZhi)) {
    return true
  } else {
    return false
  }
}

//罗纹交贵
const isLuoWenJiaoGui = (solar, hourIndex) => {
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  const timeStr = solar.format('YYYY/MM/DD') // 2023-02-02 00:00:00

  const tempSolar = lunisolar(`${timeStr} ${hourIndex}`)
  const hour = tempSolar.format('cH')
  const hourGan = hour[0]
  const hourZhi = hour[1]
  let riToShi = false
  let shiToRi = false
  if (
    (['丑', '未'].includes(hourZhi) && ['甲', '戊', '庚'].includes(dayGan)) ||
    (['申', '子'].includes(hourZhi) && ['乙', '己'].includes(dayGan)) ||
    (['亥', '酉'].includes(hourZhi) && ['丙', '丁'].includes(dayGan)) ||
    (['卯', '巳'].includes(hourZhi) && ['壬', '癸'].includes(dayGan)) ||
    (['午', '寅'].includes(hourZhi) && ['辛'].includes(dayGan))
  ) {
    riToShi = true
  }
  if (
    (['丑', '未'].includes(dayZhi) && ['甲', '戊', '庚'].includes(hourGan)) ||
    (['申', '子'].includes(dayZhi) && ['乙', '己'].includes(hourGan)) ||
    (['亥', '酉'].includes(dayZhi) && ['丙', '丁'].includes(hourGan)) ||
    (['卯', '巳'].includes(dayZhi) && ['壬', '癸'].includes(hourGan)) ||
    (['午', '寅'].includes(dayZhi) && ['辛'].includes(hourGan))
  ) {
    shiToRi = true
  }
  if (riToShi && shiToRi) {
    return true
  } else {
    return false
  }
}

// 贵人登天门
const isGuiRenDengTianMen = (solar, hourZhi) => {
  const jieqi = solar.jieqi.split(',')[0]
  const day = solar.format('cD')
  const dayGan = day[0]
  const jieQiList = [
    {
      jieqi: '雨水,惊蛰',
      dayZhi: ['卯，酉', '戌', '亥', '丑', '卯，酉', '寅', '卯，酉', '申', '未', '巳'],
    },
    {
      jieqi: '春分,清明',
      dayZhi: ['', '酉', '戌', '子', '寅，申', '丑，酉', '寅，申', '卯，未', '午', '辰'],
    },
    {
      jieqi: '谷雨,立夏',
      dayZhi: ['', '', '', '酉，亥', '丑，未', '子，申', '丑，未', '寅，午', '巳', '卯'],
    },
    {
      jieqi: '小满,芒种',
      dayZhi: ['', '', '戌', '申，戌', '子，午', '未，亥', '子，午', '丑，巳', '寅，辰', '寅'],
    },
    {
      jieqi: '夏至，小暑',
      dayZhi: ['', '戌', '酉', '未', '巳，亥', '午，戌', '巳，亥', '子，辰', '卯，丑', ''],
    },
    {
      jieqi: '大暑，立秋',
      dayZhi: ['', '酉', '申', '午', '辰，戌', '巳', '辰，戌', '卯，亥', '子，寅', '寅'],
    },
    {
      jieqi: '处暑，白露',
      dayZhi: ['酉', '申', '未', '巳', '酉，卯', '辰', '卯,酉', '戌', '亥', '丑'],
    },
    {
      jieqi: '秋分，寒露',
      dayZhi: ['寅，申', '卯，未', '未', '辰', '', '卯', '', '酉', '戌', '子'],
    },
    {
      jieqi: '霜降，立冬',
      dayZhi: ['丑，未', '寅，午', '卯，巳', '卯', '', '', '', '', '酉', '酉，亥'],
    },
    {
      jieqi: '小雪，大雪',
      dayZhi: ['午，子', '丑，巳', '辰，寅', '', '', '', '', '', '', '申，戌'],
    },
    {
      jieqi: '冬至，小寒',
      dayZhi: ['巳，亥', '子，辰', '丑', '卯', '', '辰', '', '', '', '未，酉'],
    },
    {
      jieqi: '大寒，立春',
      dayZhi: ['辰，戌', '卯，亥', '子', '寅', '', '卯', '', '', '申', '午，申'],
    },
  ]
  let flag = false
  jieQiList.forEach(x => {
    if (x.jieqi.includes(jieqi)) {
      const index = ganList.findIndex(x => x === dayGan)
      if (x.dayZhi[index].includes(hourZhi)) {
        flag = true
      }
    }
  })
  return flag
}

// 截路空亡
const isJieLuKongWang = (solar, hourZhi) => {
  // 如果是甲或己日，时支见申或酉为截路空亡；乙日或庚日，时支见午未；丙辛日时支见辰巳，丁壬日时支见寅卯，戊癸日地支见子丑。
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (['甲', '己'].includes(dayGan) && ['申', '酉'].includes(hourZhi)) ||
    (['乙', '庚'].includes(dayGan) && ['午', '未'].includes(hourZhi)) ||
    (['丙', '辛'].includes(dayGan) && ['辰', '巳'].includes(hourZhi)) ||
    (['丁', '壬'].includes(dayGan) && ['寅', '卯'].includes(hourZhi)) ||
    (['戊', '癸'].includes(dayGan) && ['子', '丑'].includes(hourZhi))
  ) {
    return true
  } else {
    return false
  }
}

//月破日
const isYuePo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '申') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '丑') ||
    (monthZhi === '申' && dayZhi === '寅') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '辰') ||
    (monthZhi === '亥' && dayZhi === '巳') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//死府
const isSiFu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '酉') ||
    (monthZhi === '午' && dayZhi === '戌') ||
    (monthZhi === '未' && dayZhi === '亥') ||
    (monthZhi === '申' && dayZhi === '子') ||
    (monthZhi === '酉' && dayZhi === '丑') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '巳')
  ) {
    return true
  } else {
    return false
  }
}
//旁废
const isPangFei = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['庚', '辛'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['壬', '癸'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['甲', '乙'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['丙', '丁'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//黄砂
const isHuangSha = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '寅') ||
    (monthZhi === '辰' && dayZhi === '子') ||
    (monthZhi === '巳' && dayZhi === '午') ||
    (monthZhi === '午' && dayZhi === '寅') ||
    (monthZhi === '未' && dayZhi === '子') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '寅') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '午') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '子')
  ) {
    return true
  } else {
    return false
  }
}
//大耗
const isDaHao = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '酉') ||
    (monthZhi === '午' && dayZhi === '戌') ||
    (monthZhi === '未' && dayZhi === '亥') ||
    (monthZhi === '申' && dayZhi === '子') ||
    (monthZhi === '酉' && dayZhi === '丑') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '巳')
  ) {
    return true
  } else {
    return false
  }
}
//神隔
const isShenGe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '卯') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '未') ||
    (monthZhi === '申' && dayZhi === '巳') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '酉') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//朱雀
const isZhuQue = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '卯') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '未') ||
    (monthZhi === '巳' && dayZhi === '酉') ||
    (monthZhi === '午' && dayZhi === '亥') ||
    (monthZhi === '未' && dayZhi === '丑') ||
    (monthZhi === '申' && dayZhi === '卯') ||
    (monthZhi === '酉' && dayZhi === '巳') ||
    (monthZhi === '戌' && dayZhi === '未') ||
    (monthZhi === '亥' && dayZhi === '酉') ||
    (monthZhi === '子' && dayZhi === '亥') ||
    (monthZhi === '丑' && dayZhi === '丑')
  ) {
    return true
  } else {
    return false
  }
}
//玄武
const isXuanWu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '酉') ||
    (monthZhi === '卯' && dayZhi === '亥') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '巳') ||
    (monthZhi === '未' && dayZhi === '未') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '亥') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '巳') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//鲁班
const isLuBan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['子'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['卯'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['午'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['酉'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//木马
const isMuMa = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '酉') ||
    (monthZhi === '巳' && dayZhi === '申') ||
    (monthZhi === '午' && dayZhi === '戌') ||
    (monthZhi === '未' && dayZhi === '子') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '丑') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '寅') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '午')
  ) {
    return true
  } else {
    return false
  }
}
//披蕨
const isPiJue = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '子') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '午') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '酉') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '酉') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '卯')
  ) {
    return true
  } else {
    return false
  }
}
//破败
const isPoBai = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')

  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '申') ||
    (monthZhi === '卯' && dayZhi === '戌') ||
    (monthZhi === '辰' && dayZhi === '子') ||
    (monthZhi === '巳' && dayZhi === '寅') ||
    (monthZhi === '午' && dayZhi === '辰') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '申') ||
    (monthZhi === '酉' && dayZhi === '戌') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '寅') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '午')
  ) {
    return true
  } else {
    return false
  }
}
//天轴
const isTianZhou = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['癸'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['丙'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['丁'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['庚'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//地轴
const isDiZhou = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['癸'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['丙'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['丁'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['庚'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//月转
const isYueZhuan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//地贼
const isDiZei = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '丑') ||
    (monthZhi === '卯' && dayZhi === '子') ||
    (monthZhi === '辰' && dayZhi === '亥') ||
    (monthZhi === '巳' && dayZhi === '戌') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '申') ||
    (monthZhi === '申' && dayZhi === '未') ||
    (monthZhi === '酉' && dayZhi === '午') ||
    (monthZhi === '戌' && dayZhi === '巳') ||
    (monthZhi === '亥' && dayZhi === '辰') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '寅')
  ) {
    return true
  } else {
    return false
  }
}
//地火
const isDiHuo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '戌') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '午') ||
    (monthZhi === '未' && dayZhi === '巳') ||
    (monthZhi === '申' && dayZhi === '辰') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '丑') ||
    (monthZhi === '子' && dayZhi === '子') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//月厌
const isYueYan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '戌') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '午') ||
    (monthZhi === '未' && dayZhi === '巳') ||
    (monthZhi === '申' && dayZhi === '辰') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '丑') ||
    (monthZhi === '子' && dayZhi === '子') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//月杀
const isYueSha = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '丑') ||
    (monthZhi === '卯' && dayZhi === '戌') ||
    (monthZhi === '辰' && dayZhi === '辰') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '戌') ||
    (monthZhi === '申' && dayZhi === '辰') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '戌') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//受死
const isShouSi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '戌') ||
    (monthZhi === '卯' && dayZhi === '辰') ||
    (monthZhi === '辰' && dayZhi === '亥') ||
    (monthZhi === '巳' && dayZhi === '巳') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '丑') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '申') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '酉')
  ) {
    return true
  } else {
    return false
  }
}
//四废
const isSiFei = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['申', '酉'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['亥', '子'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['卯', '寅'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['巳', '午'].includes(dayZhi)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['庚', '辛'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['壬', '癸'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['甲', '乙'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['丙', '丁'].includes(dayGan))
  ) {
    return true
  } else {
    return false
  }
}
//小红砂
const isXiaoHongSha = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '巳') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '丑') ||
    (monthZhi === '申' && dayZhi === '巳') ||
    (monthZhi === '酉' && dayZhi === '酉') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '巳') ||
    (monthZhi === '子' && dayZhi === '酉') ||
    (monthZhi === '丑' && dayZhi === '丑')
  ) {
    return true
  } else {
    return false
  }
}
//不成
const isBuCheng = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '寅') ||
    (monthZhi === '卯' && dayZhi === '午') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '巳') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '丑') ||
    (monthZhi === '申' && dayZhi === '申') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '辰') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '未')
  ) {
    return true
  } else {
    return false
  }
}
//小耗
const isXiaoHao = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '午') ||
    (monthZhi === '辰' && dayZhi === '未') ||
    (monthZhi === '巳' && dayZhi === '申') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '戌') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '寅') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
//人隔
const isRenGe = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '酉') ||
    (monthZhi === '卯' && dayZhi === '未') ||
    (monthZhi === '辰' && dayZhi === '巳') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '亥') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '巳') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '丑') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//白虎
const isBaiHu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '申') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '子') ||
    (monthZhi === '午' && dayZhi === '寅') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '戌') ||
    (monthZhi === '亥' && dayZhi === '子') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
//勾陈
const isGouChen = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '亥') ||
    (monthZhi === '卯' && dayZhi === '丑') ||
    (monthZhi === '辰' && dayZhi === '卯') ||
    (monthZhi === '巳' && dayZhi === '巳') ||
    (monthZhi === '午' && dayZhi === '未') ||
    (monthZhi === '未' && dayZhi === '酉') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '丑') ||
    (monthZhi === '戌' && dayZhi === '卯') ||
    (monthZhi === '亥' && dayZhi === '巳') ||
    (monthZhi === '子' && dayZhi === '未') ||
    (monthZhi === '丑' && dayZhi === '酉')
  ) {
    return true
  } else {
    return false
  }
}
//斧杀
const isFuSha = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['辰'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['未'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//刀砧
const isDaoZhan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['亥', '子'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['寅', '卯'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['巳', '午'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['申', '酉'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//五鬼
const isWuGui = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '寅') ||
    (monthZhi === '辰' && dayZhi === '辰') ||
    (monthZhi === '巳' && dayZhi === '酉') ||
    (monthZhi === '午' && dayZhi === '卯') ||
    (monthZhi === '未' && dayZhi === '申') ||
    (monthZhi === '申' && dayZhi === '丑') ||
    (monthZhi === '酉' && dayZhi === '巳') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '未') ||
    (monthZhi === '丑' && dayZhi === '戌')
  ) {
    return true
  } else {
    return false
  }
}
//殃败
const isYangBai = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '卯') ||
    (monthZhi === '卯' && dayZhi === '寅') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '子') ||
    (monthZhi === '午' && dayZhi === '亥') ||
    (monthZhi === '未' && dayZhi === '戌') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '未') ||
    (monthZhi === '亥' && dayZhi === '午') ||
    (monthZhi === '子' && dayZhi === '巳') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
// //狗领
// const isGouLing = solar => {
//   const month = solar.format('cM')
//   const monthZhi = month[1]
//   const day = solar.format('cD')
//   const dayZhi = day[1]
//   if (
//     (monthZhi === '寅' && dayZhi === '亥') ||
//     (monthZhi === '卯' && dayZhi === '午') ||
//     (monthZhi === '辰' && dayZhi === '丑') ||
//     (monthZhi === '巳' && dayZhi === '申') ||
//     (monthZhi === '午' && dayZhi === '卯') ||
//     (monthZhi === '未' && dayZhi === '戌') ||
//     (monthZhi === '申' && dayZhi === '巳') ||
//     (monthZhi === '酉' && dayZhi === '子') ||
//     (monthZhi === '戌' && dayZhi === '未') ||
//     (monthZhi === '亥' && dayZhi === '寅') ||
//     (monthZhi === '子' && dayZhi === '酉') ||
//     (monthZhi === '丑' && dayZhi === '辰')
//   ) {
//     return true
//   } else {
//     return false
//   }
// }
//临日
const isLinRi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '亥') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '丑') ||
    (monthZhi === '午' && dayZhi === '戌') ||
    (monthZhi === '未' && dayZhi === '卯') ||
    (monthZhi === '申' && dayZhi === '子') ||
    (monthZhi === '酉' && dayZhi === '巳') ||
    (monthZhi === '戌' && dayZhi === '寅') ||
    (monthZhi === '亥' && dayZhi === '未') ||
    (monthZhi === '子' && dayZhi === '辰') ||
    (monthZhi === '丑' && dayZhi === '酉')
  ) {
    return true
  } else {
    return false
  }
}
//河魁
const isHeKui = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '亥') ||
    (monthZhi === '卯' && dayZhi === '午') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '申') ||
    (monthZhi === '午' && dayZhi === '卯') ||
    (monthZhi === '未' && dayZhi === '戌') ||
    (monthZhi === '申' && dayZhi === '巳') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '未') ||
    (monthZhi === '亥' && dayZhi === '寅') ||
    (monthZhi === '子' && dayZhi === '酉') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
//阴错
const isYinCuo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  if (
    (monthZhi === '寅' && day === '庚戌') ||
    (monthZhi === '卯' && day === '辛酉') ||
    (monthZhi === '辰' && day === '庚申') ||
    (monthZhi === '巳' && day === '丁未') ||
    (monthZhi === '午' && day === '丙午') ||
    (monthZhi === '未' && day === '丁巳') ||
    (monthZhi === '申' && day === '甲辰') ||
    (monthZhi === '酉' && day === '乙卯') ||
    (monthZhi === '戌' && day === '甲寅') ||
    (monthZhi === '亥' && day === '癸丑') ||
    (monthZhi === '子' && day === '壬子') ||
    (monthZhi === '丑' && day === '癸亥')
  ) {
    return true
  } else {
    return false
  }
}
//往亡
const isWangWang = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '寅') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '卯') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '辰') ||
    (monthZhi === '亥' && dayZhi === '未') ||
    (monthZhi === '子' && dayZhi === '戌') ||
    (monthZhi === '丑' && dayZhi === '丑')
  ) {
    return true
  } else {
    return false
  }
}
//八座
// const isBaZuo = solar => {
//   const month = solar.format('cM')
//   const monthZhi = month[1]
//   const day = solar.format('cD')
//   const dayZhi = day[1]
//   if (
//     (monthZhi === '寅' && dayZhi === '亥') ||
//     (monthZhi === '卯' && dayZhi === '子') ||
//     (monthZhi === '辰' && dayZhi === '丑') ||
//     (monthZhi === '巳' && dayZhi === '寅') ||
//     (monthZhi === '午' && dayZhi === '卯') ||
//     (monthZhi === '未' && dayZhi === '辰') ||
//     (monthZhi === '申' && dayZhi === '巳') ||
//     (monthZhi === '酉' && dayZhi === '午') ||
//     (monthZhi === '戌' && dayZhi === '未') ||
//     (monthZhi === '亥' && dayZhi === '申') ||
//     (monthZhi === '子' && dayZhi === '酉') ||
//     (monthZhi === '丑' && dayZhi === '戌')
//   ) {
//     return true
//   } else {
//     return false
//   }
// }
//血支
const isXueZhi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '丑') ||
    (monthZhi === '卯' && dayZhi === '寅') ||
    (monthZhi === '辰' && dayZhi === '卯') ||
    (monthZhi === '巳' && dayZhi === '辰') ||
    (monthZhi === '午' && dayZhi === '巳') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '未') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '酉') ||
    (monthZhi === '亥' && dayZhi === '戌') ||
    (monthZhi === '子' && dayZhi === '亥') ||
    (monthZhi === '丑' && dayZhi === '子')
  ) {
    return true
  } else {
    return false
  }
}
// //重日
// const isChongRi = solar => {
//   const month = solar.format('cM')
//   const monthZhi = month[1]
//   const day = solar.format('cD')
//   const dayGan = day[0]
//   if (
//     (monthZhi === '寅' && dayGan === '庚') ||
//     (monthZhi === '卯' && dayGan === '辛') ||
//     (monthZhi === '辰' && dayGan === '己') ||
//     (monthZhi === '巳' && dayGan === '壬') ||
//     (monthZhi === '午' && dayGan === '戊') ||
//     (monthZhi === '未' && dayGan === '癸') ||
//     (monthZhi === '申' && dayGan === '甲') ||
//     (monthZhi === '酉' && dayGan === '乙') ||
//     (monthZhi === '戌' && dayGan === '己') ||
//     (monthZhi === '亥' && dayGan === '壬') ||
//     (monthZhi === '子' && dayGan === '癸') ||
//     (monthZhi === '丑' && dayGan === '巳')
//   ) {
//     return true
//   } else {
//     return false
//   }
// }
//阳错
const isYangCuo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  if (
    (monthZhi === '寅' && day === '甲寅') ||
    (monthZhi === '卯' && day === '乙卯') ||
    (monthZhi === '辰' && day === '甲辰') ||
    (monthZhi === '巳' && day === '丁巳') ||
    (monthZhi === '午' && day === '丙午') ||
    (monthZhi === '未' && day === '丁未') ||
    (monthZhi === '申' && day === '庚申') ||
    (monthZhi === '酉' && day === '辛酉') ||
    (monthZhi === '戌' && day === '庚戌') ||
    (monthZhi === '亥' && day === '癸亥') ||
    (monthZhi === '子' && day === '壬子') ||
    (monthZhi === '丑' && day === '癸丑')
  ) {
    return true
  } else {
    return false
  }
}
//土瘟
const isTuWen = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '辰') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '午') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '申') ||
    (monthZhi === '未' && dayZhi === '酉') ||
    (monthZhi === '申' && dayZhi === '戌') ||
    (monthZhi === '酉' && dayZhi === '亥') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '丑') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '卯')
  ) {
    return true
  } else {
    return false
  }
}
//血忌
// const isXueJi = solar => {
//   const month = solar.format('cM')
//   const monthZhi = month[1]
//   const day = solar.format('cD')
//   const dayZhi = day[1]
//   if (
//     (monthZhi === '寅' && dayZhi === '丑') ||
//     (monthZhi === '卯' && dayZhi === '未') ||
//     (monthZhi === '辰' && dayZhi === '寅') ||
//     (monthZhi === '巳' && dayZhi === '申') ||
//     (monthZhi === '午' && dayZhi === '卯') ||
//     (monthZhi === '未' && dayZhi === '酉') ||
//     (monthZhi === '申' && dayZhi === '辰') ||
//     (monthZhi === '酉' && dayZhi === '戌') ||
//     (monthZhi === '戌' && dayZhi === '巳') ||
//     (monthZhi === '亥' && dayZhi === '亥') ||
//     (monthZhi === '子' && dayZhi === '午') ||
//     (monthZhi === '丑' && dayZhi === '子')
//   ) {
//     return true
//   } else {
//     return false
//   }
// }
//土府
const isTuFu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '寅') ||
    (monthZhi === '卯' && dayZhi === '卯') ||
    (monthZhi === '辰' && dayZhi === '辰') ||
    (monthZhi === '巳' && dayZhi === '巳') ||
    (monthZhi === '午' && dayZhi === '午') ||
    (monthZhi === '未' && dayZhi === '未') ||
    (monthZhi === '申' && dayZhi === '申') ||
    (monthZhi === '酉' && dayZhi === '酉') ||
    (monthZhi === '戌' && dayZhi === '戌') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '子') ||
    (monthZhi === '丑' && dayZhi === '丑')
  ) {
    return true
  } else {
    return false
  }
}
//土忌
const isTuJi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '寅') ||
    (monthZhi === '卯' && dayZhi === '巳') ||
    (monthZhi === '辰' && dayZhi === '申') ||
    (monthZhi === '巳' && dayZhi === '亥') ||
    (monthZhi === '午' && dayZhi === '卯') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '子') ||
    (monthZhi === '酉' && dayZhi === '酉') ||
    (monthZhi === '戌' && dayZhi === '辰') ||
    (monthZhi === '亥' && dayZhi === '未') ||
    (monthZhi === '子' && dayZhi === '戌') ||
    (monthZhi === '丑' && dayZhi === '丑')
  ) {
    return true
  } else {
    return false
  }
}

//天罡日
const isTianGang = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '子') ||
    (monthZhi === '辰' && dayZhi === '未') ||
    (monthZhi === '巳' && dayZhi === '寅') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '午') ||
    (monthZhi === '戌' && dayZhi === '丑') ||
    (monthZhi === '亥' && dayZhi === '申') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '戌')
  ) {
    return true
  } else {
    return false
  }
}
//天瘟日
const isTianWen = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '未') ||
    (monthZhi === '卯' && dayZhi === '戌') ||
    (monthZhi === '辰' && dayZhi === '辰') ||
    (monthZhi === '巳' && dayZhi === '寅') ||
    (monthZhi === '午' && dayZhi === '午') ||
    (monthZhi === '未' && dayZhi === '子') ||
    (monthZhi === '申' && dayZhi === '酉') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '巳') ||
    (monthZhi === '亥' && dayZhi === '亥') ||
    (monthZhi === '子' && dayZhi === '丑') ||
    (monthZhi === '丑' && dayZhi === '卯')
  ) {
    return true
  } else {
    return false
  }
}
//天吏日
const isTianLi = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '酉') ||
    (monthZhi === '卯' && dayZhi === '午') ||
    (monthZhi === '辰' && dayZhi === '卯') ||
    (monthZhi === '巳' && dayZhi === '子') ||
    (monthZhi === '午' && dayZhi === '酉') ||
    (monthZhi === '未' && dayZhi === '午') ||
    (monthZhi === '申' && dayZhi === '卯') ||
    (monthZhi === '酉' && dayZhi === '子') ||
    (monthZhi === '戌' && dayZhi === '酉') ||
    (monthZhi === '亥' && dayZhi === '午') ||
    (monthZhi === '子' && dayZhi === '卯') ||
    (monthZhi === '丑' && dayZhi === '子')
  ) {
    return true
  } else {
    return false
  }
}
//天狱日
const isTianYu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '子') ||
    (monthZhi === '卯' && dayZhi === '卯') ||
    (monthZhi === '辰' && dayZhi === '午') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '卯') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '酉') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '酉')
  ) {
    return true
  } else {
    return false
  }
}
//天棒日
const isTianBang = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '午') ||
    (monthZhi === '卯' && dayZhi === '申') ||
    (monthZhi === '辰' && dayZhi === '戌') ||
    (monthZhi === '巳' && dayZhi === '子') ||
    (monthZhi === '午' && dayZhi === '寅') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '申') ||
    (monthZhi === '戌' && dayZhi === '戌') ||
    (monthZhi === '亥' && dayZhi === '子') ||
    (monthZhi === '子' && dayZhi === '寅') ||
    (monthZhi === '丑' && dayZhi === '辰')
  ) {
    return true
  } else {
    return false
  }
}
//天狗日
const isTianGou = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '子') ||
    (monthZhi === '卯' && dayZhi === '丑') ||
    (monthZhi === '辰' && dayZhi === '寅') ||
    (monthZhi === '巳' && dayZhi === '卯') ||
    (monthZhi === '午' && dayZhi === '辰') ||
    (monthZhi === '未' && dayZhi === '巳') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '未') ||
    (monthZhi === '戌' && dayZhi === '申') ||
    (monthZhi === '亥' && dayZhi === '酉') ||
    (monthZhi === '子' && dayZhi === '戌') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//天转日
const isTianZhuan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['乙'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['丙'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['辛'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['壬'].includes(dayGan)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//地转日
const isDiZhuan = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  if (
    (['寅', '卯', '辰'].includes(monthZhi) && ['辛'].includes(dayGan)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['戊'].includes(dayGan)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['癸'].includes(dayGan)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['丙'].includes(dayGan)) ||
    (['寅', '卯', '辰'].includes(monthZhi) && ['卯'].includes(dayZhi)) ||
    (['巳', '午', '未'].includes(monthZhi) && ['午'].includes(dayZhi)) ||
    (['申', '酉', '戌'].includes(monthZhi) && ['酉'].includes(dayZhi)) ||
    (['亥', '子', '丑'].includes(monthZhi) && ['子'].includes(dayZhi))
  ) {
    return true
  } else {
    return false
  }
}
//天贼日
const isTianZei = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '辰') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '寅') ||
    (monthZhi === '巳' && dayZhi === '未') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '巳') ||
    (monthZhi === '申' && dayZhi === '戌') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '申') ||
    (monthZhi === '亥' && dayZhi === '丑') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '亥')
  ) {
    return true
  } else {
    return false
  }
}
//天火日
const isTianHuo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '子') ||
    (monthZhi === '卯' && dayZhi === '卯') ||
    (monthZhi === '辰' && dayZhi === '午') ||
    (monthZhi === '巳' && dayZhi === '酉') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '卯') ||
    (monthZhi === '申' && dayZhi === '午') ||
    (monthZhi === '酉' && dayZhi === '酉') ||
    (monthZhi === '戌' && dayZhi === '子') ||
    (monthZhi === '亥' && dayZhi === '卯') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '寅')
  ) {
    return true
  } else {
    return false
  }
}
//月火日
const isYueHuo = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '辰') ||
    (monthZhi === '辰' && dayZhi === '卯') ||
    (monthZhi === '巳' && dayZhi === '寅') ||
    (monthZhi === '午' && dayZhi === '丑') ||
    (monthZhi === '未' && dayZhi === '子') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '戌') ||
    (monthZhi === '戌' && dayZhi === '酉') ||
    (monthZhi === '亥' && dayZhi === '申') ||
    (monthZhi === '子' && dayZhi === '未') ||
    (monthZhi === '丑' && dayZhi === '午')
  ) {
    return true
  } else {
    return false
  }
}
//荒芜
const isHuangWu = solar => {
  const month = solar.format('cM')
  const monthZhi = month[1]
  const day = solar.format('cD')
  const dayZhi = day[1]
  if (
    (monthZhi === '寅' && dayZhi === '巳') ||
    (monthZhi === '卯' && dayZhi === '酉') ||
    (monthZhi === '辰' && dayZhi === '丑') ||
    (monthZhi === '巳' && dayZhi === '申') ||
    (monthZhi === '午' && dayZhi === '子') ||
    (monthZhi === '未' && dayZhi === '辰') ||
    (monthZhi === '申' && dayZhi === '亥') ||
    (monthZhi === '酉' && dayZhi === '卯') ||
    (monthZhi === '戌' && dayZhi === '未') ||
    (monthZhi === '亥' && dayZhi === '寅') ||
    (monthZhi === '子' && dayZhi === '午') ||
    (monthZhi === '丑' && dayZhi === '戌')
  ) {
    return true
  } else {
    return false
  }
}
