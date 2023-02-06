import { onMounted } from 'vue'
import { useBaseStore } from '@/store/index'
import { sixtyList, zhiList } from './useDate'
export const useGong = () => {
  const baseStore = useBaseStore()
  onMounted(() => {
    initGongList()
  })
  const initGongList = () => {
    const { currentTime, mingList, zuoshan } = baseStore
    const gongList = initGongListFunc(currentTime, mingList, zuoshan)
    baseStore.$patch(state => {
      state.gongList = gongList
    })
  }
  return { initGongList }
}

const initGongListFunc = (currentTime, mingList, zuoshan) => {
  const gongList: any[] = []
  gongName.forEach((x, i) => {
    const body = {
      name: x,
      inside: gongChildName[i],
      bad: {
        sanYuanYear: getSanYuanYear(currentTime, i),
        sanYuanMonth: getSanYuanMonth(currentTime, i),
        xiaoYueJian: getXiaoYueJian(currentTime, i),
        wuJiDuTian: getWuJiDuTian(currentTime, i),
        zhengYinFu: getZhengYinFu(currentTime, i, zuoshan),
        pangYinFu: getPangYinFu(currentTime, i, zuoshan),
        zuoShanYaoSha: getZuoShanYaoSha(currentTime, i, zuoshan),
        xingYaoSha: getXinYaoSha(currentTime, i, zuoshan),
        longShangBaSha: getLongShangBaSha(currentTime, i, zuoshan),
        jianFengsha: getJianFengSha(currentTime, i, zuoshan),
        taiSui: getTaiSui(currentTime, i),
        suiPo: getSuiPo(currentTime, i),
        sanSha: getSanSha(currentTime, i),
      },
      luMaGui: getLuMaGui(currentTime, i, mingList),
      good: {
        taiyang: getTaiYang(currentTime, i),
        // taiyin: getTaiYin(currentTime, i),
        sanqi: getSanQi(currentTime, i),
        yuede: getYueDe(currentTime, i),
        tiande: getTianDe(currentTime, i),
        yuedehe: getYueDeHe(currentTime, i),
        tiandehe: getTianDeHe(currentTime, i),
      },
    }
    gongList.push(body)
  })
  return gongList
}

//太阳
const getTaiYang = (currentTime: any, i: number) => {
  const jieqi = currentTime.jieqi.split(',')[0]
  const array = [
    {
      mountain: '壬',
      to: '立秋',
    },
    {
      mountain: '子',
      to: '大暑',
    },
    {
      mountain: '癸',
      to: '小暑',
    },
    {
      mountain: '丑',
      to: '夏至',
    },
    {
      mountain: '艮',
      to: '芒种',
    },
    {
      mountain: '寅',
      to: '小滿',
    },
    {
      mountain: '甲',
      to: '立夏',
    },
    {
      mountain: '卯',
      to: '穀雨',
    },
    {
      mountain: '乙',
      to: '清明',
    },
    {
      mountain: '辰',
      to: '春分',
    },
    {
      mountain: '巽',
      to: '驚蟄',
    },
    {
      mountain: '巳',
      to: '雨水',
    },
    {
      mountain: '丙',
      to: '立春',
    },
    {
      mountain: '午',
      to: '大寒',
    },
    {
      mountain: '丁',
      to: '小寒',
    },
    {
      mountain: '未',
      to: '冬至',
    },
    {
      mountain: '坤',
      to: '大雪',
    },
    {
      mountain: '申',
      to: '小雪',
    },
    {
      mountain: '庚',
      to: '立冬',
    },
    {
      mountain: '酉',
      to: '霜降',
    },
    {
      mountain: '辛',
      to: '寒露',
    },
    {
      mountain: '戌',
      to: '秋分',
    },
    {
      mountain: '乾',
      to: '白露',
    },
    {
      mountain: '亥',
      to: '處暑',
    },
  ]
  // console.log(jieqi, 'why')
  const data = array.filter(x => x.to === jieqi)[0].mountain
  if (gongChildName[i].includes(data)) {
    return data + '山太阳到向'
  } else {
    return ''
  }
}
//太阴
// const getTaiYin = (currentTime: any, i: number) => {}
//三奇(以三奇方为用)
const getSanQi = (currentTime: any, i: number) => {
  const jieqi = currentTime.jieqi.split(',')[0]
  const year = currentTime.format('cY')
  const array = [
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坎',
      year: '甲子,己酉,乙亥,丙戌,丁酉,庚申,戊申',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坎',
      year: '甲子,己酉,乙丑,丙子,丁亥,戊戌,庚戌,辛酉',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坤',
      year: '甲子,己酉,乙丑,丙子,丁亥,戊戌,庚戌,辛酉',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '乙丑,丙子,丁亥,戊戌,庚戌,辛酉',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坎',
      year: '乙丑,丙子,丁亥,戊戌,庚戌,辛酉',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坤',
      year: '乙丑,丙子,丁亥,戊戌,庚戌,辛酉',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '己亥',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '己亥',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坎',
      year: '己亥',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '丙寅，丁丑，戊子，庚子，辛亥，壬戌',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '丙寅，丁丑，戊子，庚子，辛亥，壬戌',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '坎',
      year: '丙寅，丁丑，戊子，庚子，辛亥，壬戌',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '己丑',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '己丑',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '己丑',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '兑',
      year: '丁卯，戊寅，庚寅，辛丑，壬子，癸亥',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '丁卯，戊寅，庚寅，辛丑，壬子，癸亥',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '离',
      year: '丁卯，戊寅，庚寅，辛丑，壬子，癸亥',
      qi: '丁',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '兑',
      year: '己卯',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '兑',
      year: '己卯',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '己卯',
      qi: '丁',
    },
    {
      jieqi: '立春,雨水,惊蛰',
      mountain: '',
    },
    {
      jieqi: '春分,清明,谷雨',
    },
    {
      jieqi: '立夏,小满,芒种',
    },
    {
      jieqi: '夏至,小暑,大暑',
    },
    {
      jieqi: '立秋,处暑,白露',
    },
    {
      jieqi: '秋分,寒露,霜降',
    },
    {
      jieqi: '立冬,小雪,大雪',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '乾',
      year: '辛卯,壬寅,戊辰,癸丑,庚辰',
      qi: '乙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '兑',
      year: '辛卯,壬寅,戊辰,癸丑,庚辰',
      qi: '丙',
    },
    {
      jieqi: '冬至,小寒,大寒',
      mountain: '艮',
      year: '辛卯,壬寅,戊辰,癸丑,庚辰',
      qi: '丁',
    },
  ]
  const data = [] as any
  array.forEach(x => {
    // 如果节气属于当前节气,年份属于当前年份
    if (x.jieqi.includes(jieqi) && x.year?.includes(year)) {
      const body = {
        qi: x.qi,
        mountain: x.mountain,
      }
      data.push(body)
    }
  })
  if (data.some(x => gongName[i].includes(x.mountain))) {
    const qi = data.filter(x => gongName[i].includes(x.mountain))[0].qi
    return qi + '奇'
  } else {
    return ''
  }
}
//天德
const getTianDe = (currentTime: any, i: number) => {
  const month = currentTime.format('cM')
  const monthZhi = month[1]
  const array = [
    {
      mountain: '丁',
      month: '寅',
    },
    {
      mountain: '坤',
      month: '卯',
    },
    {
      mountain: '壬',
      month: '辰',
    },
    {
      mountain: '辛',
      month: '巳',
    },
    {
      mountain: '乾',
      month: '午',
    },
    {
      mountain: '甲',
      month: '未',
    },
    {
      mountain: '癸',
      month: '申',
    },
    {
      mountain: '艮',
      month: '酉',
    },
    {
      mountain: '丙',
      month: '戌',
    },
    {
      mountain: '乙',
      month: '亥',
    },
    {
      mountain: '巽',
      month: '子',
    },
    {
      mountain: '庚',
      month: '丑',
    },
  ]
  const data = array.filter(x => x.month === monthZhi)[0].mountain
  if (gongChildName[i].includes(data)) {
    return data + '山天德'
  } else {
    return ''
  }
}

//天德合
const getTianDeHe = (currentTime: any, i: number) => {
  const month = currentTime.format('cM')
  const monthZhi = month[1]
  const array = [
    {
      mountain: '壬',
      month: '寅',
    },
    {
      mountain: '巽',
      month: '卯',
    },
    {
      mountain: '丁',
      month: '辰',
    },
    {
      mountain: '丙',
      month: '巳',
    },
    {
      mountain: '艮',
      month: '午',
    },
    {
      mountain: '己',
      month: '未',
    },
    {
      mountain: '戊',
      month: '申',
    },
    {
      mountain: '乾',
      month: '酉',
    },
    {
      mountain: '辛',
      month: '戌',
    },
    {
      mountain: '庚',
      month: '亥',
    },
    {
      mountain: '坤',
      month: '子',
    },
    {
      mountain: '乙',
      month: '丑',
    },
  ]
  const data = array.filter(x => x.month === monthZhi)[0].mountain
  if (gongChildName[i].includes(data)) {
    return data + '山天德合'
  } else {
    return ''
  }
}
//月德
const getYueDe = (currentTime: any, i: number) => {
  const month = currentTime.format('cM')
  const monthZhi = month[1]
  const array = [
    {
      mountain: '丙',
      month: '寅',
    },
    {
      mountain: '甲',
      month: '卯',
    },
    {
      mountain: '壬',
      month: '辰',
    },
    {
      mountain: '庚',
      month: '巳',
    },
    {
      mountain: '丙',
      month: '午',
    },
    {
      mountain: '甲',
      month: '未',
    },
    {
      mountain: '壬',
      month: '申',
    },
    {
      mountain: '庚',
      month: '酉',
    },
    {
      mountain: '丙',
      month: '戌',
    },
    {
      mountain: '甲',
      month: '亥',
    },
    {
      mountain: '壬',
      month: '子',
    },
    {
      mountain: '庚',
      month: '丑',
    },
  ]
  const data = array.filter(x => x.month === monthZhi)[0].mountain
  if (gongChildName[i].includes(data)) {
    return data + '山月德'
  } else {
    return ''
  }
}
//月德合
const getYueDeHe = (currentTime: any, i: number) => {
  const month = currentTime.format('cM')
  const monthZhi = month[1]
  const array = [
    {
      mountain: '辛',
      month: '寅',
    },
    {
      mountain: '己',
      month: '卯',
    },
    {
      mountain: '丁',
      month: '辰',
    },
    {
      mountain: '乙',
      month: '巳',
    },
    {
      mountain: '辛',
      month: '午',
    },
    {
      mountain: '己',
      month: '未',
    },
    {
      mountain: '丁',
      month: '申',
    },
    {
      mountain: '乙',
      month: '酉',
    },
    {
      mountain: '辛',
      month: '戌',
    },
    {
      mountain: '己',
      month: '亥',
    },
    {
      mountain: '丁',
      month: '子',
    },
    {
      mountain: '乙',
      month: '丑',
    },
  ]
  const data = array.filter(x => x.month === monthZhi)[0].mountain
  if (gongChildName[i].includes(data)) {
    return data + '山月德合'
  } else {
    return ''
  }
}

const getTaiSui = (currentTime: any, i: number) => {
  const year = currentTime.format('cY')
  const yearZhi = year[1]

  if (gongChildName[i].includes(yearZhi)) {
    return yearZhi + '方太岁'
  } else {
    return ''
  }
}

const getSuiPo = (currentTime: any, i: number) => {
  const year = currentTime.format('cY')
  const yearZhi = year[1]
  const dizhiList = zhiList.concat(zhiList)
  const yearZhiIndex = zhiList.findIndex(x => x === yearZhi)
  const suiPo = dizhiList[yearZhiIndex + 6]

  if (gongChildName[i].includes(suiPo)) {
    return suiPo + '方岁破'
  } else {
    return ''
  }
}

const getSanSha = (currentTime: any, i: number) => {
  const year = currentTime.format('cY')
  const yearZhi = year[1]
  if (
    ['申', '子', '辰'].includes(yearZhi) &&
    ['巳', '丙', '午', '丁', '未'].filter(x => gongChildName[i].includes(x))
  ) {
    const data = ['巳', '丙', '午', '丁', '未'].filter(x => gongChildName[i].includes(x))
    return data.length ? data + '方三煞' : ''
  }
  if (
    ['寅', '午', '戌'].includes(yearZhi) &&
    ['亥', '壬', '子', '癸', '丑'].filter(x => gongChildName[i].includes(x))
  ) {
    const data = ['亥', '壬', '子', '癸', '丑'].filter(x => gongChildName[i].includes(x))
    return data.length ? data + '方三煞' : ''
  }
  if (
    ['巳', '酉', '丑'].includes(yearZhi) &&
    ['寅', '甲', '卯', '乙', '辰'].filter(x => gongChildName[i].includes(x))
  ) {
    const data = ['寅', '甲', '卯', '乙', '辰'].filter(x => gongChildName[i].includes(x))
    return data.length ? data + '方三煞' : ''
  }
  if (
    ['亥', '卯', '未'].includes(yearZhi) &&
    ['辛', '庚', '酉', '申', '戌'].filter(x => gongChildName[i].includes(x))
  ) {
    const data = ['辛', '庚', '酉', '申', '戌'].filter(x => gongChildName[i].includes(x))
    return data.length ? data + '方三煞' : ''
  }
}

// 获取三元年
const getSanYuanYear = (currentTime: any, i: number) => {
  const year = currentTime.format('YYYY')
  const yearShi = +(year + '')[2]
  const yearGe = +(year + '')[3]
  let baseNum = 10
  if (+year > 2000) {
    baseNum = 9
  }
  let firstNum = baseNum - (yearShi + yearGe)
  if (firstNum < 5) {
    firstNum = firstNum + 9 - 5
  } else {
    firstNum = firstNum - 5
  }
  // const list = ['一白', '二黑', '三碧', '四绿', '五黄', '六白', '七赤', '八白', '九紫']
  const list = ['', '', '', '', '年五黄', '', '', '', '']
  const tempArray = list.concat(list).slice(firstNum, firstNum + 9)
  return tempArray[i]
}

// 获取三元月
const getSanYuanMonth = (currentTime: any, i: number) => {
  // 子午卯酉八白宫,辰成丑未五黄中。
  // 寅申已亥二黑位,正月逆数是为宗。
  const year = currentTime.format('cY')
  const yearZhi = year[1]
  const monthZhi = currentTime.format('cM')[1]
  const monthZhiList = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']
  const month = monthZhiList.findIndex(x => x === monthZhi)
  let list: number[] = []
  if (['子', '午', '卯', '酉'].includes(yearZhi)) {
    list = [8, 7, 6, 5, 4, 3, 2, 1, 9, 8, 7, 6]
  }
  if (['辰', '戌', '丑', '未'].includes(yearZhi)) {
    list = [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3]
  }
  if (['寅', '申', '巳', '亥'].includes(yearZhi)) {
    list = [2, 1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 9]
  }
  const firstNum = list[month]

  if (firstNum - 1 === i) {
    return '月五黄/大月建'
  } else {
    return ''
  }
}

//小月建
const getXiaoYueJian = (currentTime: any, i: number) => {
  const year = currentTime.format('cY')
  const yearGan = year[0]
  const monthZhi = currentTime.format('cM')[1]
  const monthZhiList = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑']
  const month = monthZhiList.findIndex(x => x === monthZhi)
  let list: number[] = []
  if (['甲', '丙', '戊', '庚', '壬'].includes(yearGan)) {
    list = [5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7]
  }
  if (['乙', '丁', '己', '辛', '癸'].includes(yearGan)) {
    list = [9, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2]
  }
  const firstNum = list[month]
  if (firstNum - 1 === i) {
    return '小月建'
  } else {
    return ''
  }
}

//戊己都天大煞
const getWuJiDuTian = (currentTime: any, i: number) => {
  const year = currentTime.format('cY')
  const yearGan = year[0]
  const wuJiDuTianList: string[] = []
  let isTaiSuiDuiHuang = false
  if (['甲', '己'].includes(yearGan)) {
    if (['甲辰', '己巳'].includes(year)) {
      wuJiDuTianList.push(...['辰', '巳', '巽'])
      isTaiSuiDuiHuang = true
    } else {
      wuJiDuTianList.push(...['辰', '巳', '巽'])
    }
  }

  if (['乙', '庚'].includes(yearGan)) {
    if (['庚子', '庚寅', '乙丑', '乙卯'].includes(year)) {
      wuJiDuTianList.push(...['子', '丑', '寅', '卯', '癸', '甲'])
      isTaiSuiDuiHuang = true
    } else {
      wuJiDuTianList.push(...['子', '丑', '寅', '卯', '癸', '甲'])
    }
  }
  if (['丙', '辛'].includes(yearGan)) {
    if (['丙戌', '辛亥'].includes(year)) {
      wuJiDuTianList.push(...['戌', '亥', '乾'])
      isTaiSuiDuiHuang = true
    } else {
      wuJiDuTianList.push(...['戌', '亥', '乾'])
    }
  }
  if (['丁', '壬'].includes(yearGan)) {
    if (['丁酉', '壬申'].includes(year)) {
      wuJiDuTianList.push(...['申', '酉', '庚'])
      isTaiSuiDuiHuang = true
    } else {
      wuJiDuTianList.push(...['申', '酉', '庚'])
    }
  }
  if (['戊', '癸'].includes(yearGan)) {
    if (['戊午', '癸未'].includes(year)) {
      wuJiDuTianList.push(...['午', '未', '丁'])
      isTaiSuiDuiHuang = true
    } else {
      wuJiDuTianList.push(...['午', '未', '丁'])
    }
  }
  let struct = ''

  wuJiDuTianList.forEach(y => {
    if (gongChildName[i].includes(y)) {
      struct += y
    }
  })

  if (struct.length) {
    struct += '方戊己煞'
  }
  if (struct.length && isTaiSuiDuiHuang) {
    struct += '+太岁堆黄!'
  }
  return struct
  console.log(struct, 'struct')
  // if (zuoshan && gongChildName[i].includes(zuoshan)) {
  //   return struct
  // } else {
  //   return ''
  // }
}

//正阴府 开山忌
const getZhengYinFu = (currentTime: any, i: number, zuoshan: string) => {
  const year = currentTime.format('cY')
  const yearGan = year[0]
  let yinFuList: string[] = []
  if (['甲', '己'].includes(yearGan)) {
    yinFuList = ['丑', '艮', '寅', '辰', '巳', '巽']
  }
  if (['乙', '庚'].includes(yearGan)) {
    yinFuList = ['戌', '亥', '乾', '庚', '酉', '辛']
  }
  if (['丙', '辛'].includes(yearGan)) {
    yinFuList = ['申', '未', '坤', '壬', '子', '癸']
  }
  if (['丁', '壬'].includes(yearGan)) {
    yinFuList = ['丙', '午', '丁']
  }
  if (['戊', '癸'].includes(yearGan)) {
    yinFuList = ['甲', '卯', '乙']
  }
  let struct = ''
  yinFuList.forEach(y => {
    if (gongChildName[i].includes(y)) {
      struct += y
    }
  })

  if (struct.length) {
    struct += '方犯正阴府(开山,不忌修方)'
  }
  if (zuoshan && gongChildName[i].includes(zuoshan)) {
    return struct
  } else {
    return ''
  }
}

//旁阴府
const getPangYinFu = (currentTime: any, i: number, zuoshan: string) => {
  const year = currentTime.format('cY')
  const yearGan = year[0]
  let pangYinFuList: string[] = []
  if (['甲', '己'].includes(yearGan)) {
    pangYinFuList = ['丙', '辛']
  }
  if (['乙', '庚'].includes(yearGan)) {
    pangYinFuList = ['巳', '丑', '丁', '壬']
  }
  if (['丙', '辛'].includes(yearGan)) {
    pangYinFuList = ['癸', '申', '辰']
  }
  if (['丁', '壬'].includes(yearGan)) {
    pangYinFuList = ['甲', '寅', '戌']
  }
  if (['戊', '癸'].includes(yearGan)) {
    pangYinFuList = ['乙', '庚', '亥', '未']
  }
  let struct = ''

  pangYinFuList.forEach(y => {
    if (gongChildName[i].includes(y)) {
      struct += y
    }
  })
  if (struct.length) {
    struct += '方犯旁阴府(开山,不忌修方)'
  }
  if (zuoshan && gongChildName[i].includes(zuoshan)) {
    return struct
  } else {
    return ''
  }
}
//坐山曜煞
const getZuoShanYaoSha = (currentTime: any, i: number, zuoshan: string) => {
  const date = currentTime.format('cD')
  const array = [
    ['戊辰', '戊戌'],
    ['乙卯', '癸卯'],
    ['庚申'],
    ['辛酉'],
    [],
    ['甲午', '壬午'],
    ['丁巳'],
    ['丙寅'],
    ['己亥'],
  ]
  if (array[i].includes(date) && zuoshan && gongChildName[i].includes(zuoshan)) {
    return gongName[i] + '宫犯坐山耀煞'
  } else {
    return ''
  }
}
//星曜煞
const getXinYaoSha = (currentTime: any, i: number, zuoshan: string) => {
  const day = currentTime.format('cD')
  let data = ''
  if (
    ['亥', '壬', '子', '癸'].includes(zuoshan) &&
    ['戊辰', '己未', '戊戌', '己丑'].includes(day)
  ) {
    data += zuoshan
  }
  if (['寅', '甲', '卯', '乙', '巽'].includes(zuoshan) && ['庚申', '辛酉'].includes(day)) {
    data += zuoshan
  }
  if (['巳', '午', '丙', '丁'].includes(zuoshan) && ['癸亥', '壬子'].includes(day)) {
    data += zuoshan
  }
  if (['申', '庚', '辛', '乾'].includes(zuoshan) && ['丁巳', '丙午'].includes(day)) {
    data += zuoshan
  }
  if (['辰', '未', '坤', '戊', '丑', '艮'].includes(zuoshan) && ['甲寅', '乙卯'].includes(day)) {
    data += zuoshan
  }

  if (data.length > 0) {
    data += '方犯星耀煞(修山修方)'
  }

  if (gongChildName[i].includes(zuoshan)) {
    return data
  } else {
    return ''
  }
}
//龙上八煞
const getLongShangBaSha = (currentTime: any, i: number, zuoshan: string) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  let data = ''
  if (['癸', '壬', '子'].includes(zuoshan) && ['辰'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['未', '坤', '申'].includes(zuoshan) && ['卯'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['甲', '卯', '乙'].includes(zuoshan) && ['申'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['辰', '巽', '巳'].includes(zuoshan) && ['酉'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['戌', '乾', '亥'].includes(zuoshan) && ['午'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['庚', '酉', '辛'].includes(zuoshan) && ['巳'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['丑', '艮', '寅'].includes(zuoshan) && ['寅'].includes(dayZhi)) {
    data += zuoshan
  }
  if (['午', '丙', '丁'].includes(zuoshan) && ['亥'].includes(dayZhi)) {
    data += zuoshan
  }

  if (data.length > 0) {
    data += '犯龙上八煞'
  }

  if (gongChildName[i].includes(zuoshan)) {
    return data
  } else {
    return ''
  }
}
//剑锋煞
const getJianFengSha = (currentTime: any, i: number, zuoshan: string) => {
  const year = currentTime.format('cY')
  const month = currentTime.format('cM')
  const yearZhi = year[1]
  const monthZhi = month[1]
  let data = ''
  if (yearZhi === '申' && monthZhi === '寅' && zuoshan === '甲') {
    data = '甲山犯剑峰煞'
  }
  if (yearZhi === '酉' && monthZhi === '卯' && zuoshan === '乙') {
    data = '乙山犯剑峰煞'
  }
  if (yearZhi === '亥' && monthZhi === '巳' && zuoshan === '丙') {
    data = '丙山犯剑峰煞'
  }
  if (yearZhi === '子' && monthZhi === '午' && zuoshan === '丁') {
    data = '丁山犯剑峰煞'
  }
  if (yearZhi === '寅' && monthZhi === '申' && zuoshan === '庚') {
    data = '庚山犯剑峰煞'
  }
  if (yearZhi === '卯' && monthZhi === '酉' && zuoshan === '辛') {
    data = '辛山犯剑峰煞'
  }
  if (yearZhi === '巳' && monthZhi === '亥' && zuoshan === '壬') {
    data = '壬山犯剑峰煞'
  }
  if (yearZhi === '午' && monthZhi === '子' && zuoshan === '癸') {
    data = '癸山犯剑峰煞'
  }
  if (yearZhi === '辰' && monthZhi === '戌' && zuoshan === '乾') {
    data = '乾山犯剑峰煞'
  }
  if (yearZhi === '未' && monthZhi === '丑' && zuoshan === '艮') {
    data = '艮山犯剑峰煞'
  }
  if (yearZhi === '戌' && monthZhi === '辰' && zuoshan === '巽') {
    data = '巽山犯剑峰煞'
  }
  if (yearZhi === '丑' && monthZhi === '未' && zuoshan === '坤') {
    data = '坤山犯剑峰煞'
  }
  if (month === '戊子' && zuoshan === '子') {
    data = '子山犯剑锋煞'
  }
  if (month === '己丑' && zuoshan === '丑') {
    data = '丑山犯剑锋煞'
  }
  if (month === '戊寅' && zuoshan === '寅') {
    data = '寅山犯剑锋煞'
  }
  if (month === '己卯' && zuoshan === '卯') {
    data = '卯山犯剑锋煞'
  }
  if (month === '戊辰' && zuoshan === '辰') {
    data = '辰山犯剑锋煞'
  }
  if (month === '己巳' && zuoshan === '巳') {
    data = '巳山犯剑锋煞'
  }
  if (month === '戊午' && zuoshan === '午') {
    data = '午山犯剑锋煞'
  }
  if (month === '己未' && zuoshan === '未') {
    data = '未山犯剑锋煞'
  }
  if (month === '戊申' && zuoshan === '申') {
    data = '申山犯剑锋煞'
  }
  if (month === '己酉' && zuoshan === '酉') {
    data = '酉山犯剑锋煞'
  }
  if (month === '戊戌' && zuoshan === '戌') {
    data = '戌山犯剑锋煞'
  }
  if (month === '己亥' && zuoshan === '亥') {
    data = '亥山犯剑锋煞'
  }
  if (gongChildName[i].includes(zuoshan)) {
    return data ? data + '忌阴宅此月凶' : ''
  } else {
    return ''
  }
}

const getLuMaGui = (currentTime: any, i: number, mingList: string[]) => {
  const year = currentTime.format('cY')
  const yearIndex = sixtyList.findIndex(x => x === year)
  const tempSixtyList = sixtyList.concat(sixtyList).slice(yearIndex, yearIndex + 60) //获取入中的60甲子
  const tempSixtyList2 = tempSixtyList.concat(tempSixtyList)
  const filterSixtyList = tempSixtyList2.slice(
    tempSixtyList2.length - 64,
    tempSixtyList2.length - 4,
  )
  const userList = mingList
  //9宫排60甲子,分析出年命的禄马贵干支,然后找到归属的方位,返回给宫位
  const dataList: any[] = []
  let dataStruct: any
  userList.forEach(x => {
    dataStruct = {
      GanZhi: x, //年命
      gong: getZhenLu(filterSixtyList, x), //坎宫
      value: '真禄', //类型
    }
    dataList.push(dataStruct)
    dataStruct = {
      GanZhi: x, //年命
      gong: getZhenMa(filterSixtyList, x), //坎宫
      value: '真马', //类型
    }
    dataList.push(dataStruct)
    dataStruct = {
      GanZhi: x, //年命
      gong: getYangGuiRen(filterSixtyList, x), //坎宫
      value: '阳贵人', //类型
    }
    dataList.push(dataStruct)
    dataStruct = {
      GanZhi: x, //年命
      gong: getYinGuiRen(filterSixtyList, x), //坎宫
      value: '阴贵人', //类型
    }
    dataList.push(dataStruct)
  })

  return dataList.filter(x => x.gong === i)
}

//查询真禄的index
const getZhenLu = (filterSixtyList: string[], x: string) => {
  const userGan = x[0]
  const ganLu = [
    {
      gan: '甲',
      lu: '丙寅',
    },
    {
      gan: '乙',
      lu: '己卯',
    },
    {
      gan: '丙',
      lu: '癸巳',
    },
    {
      gan: '丁',
      lu: '丙午',
    },
    {
      gan: '戊',
      lu: '丁巳',
    },
    {
      gan: '己',
      lu: '庚午',
    },
    {
      gan: '庚',
      lu: '甲申',
    },
    {
      gan: '辛',
      lu: '丁酉',
    },
    {
      gan: '壬',
      lu: '辛亥',
    },
    {
      gan: '癸',
      lu: '甲子',
    },
  ]
  let lu = ''
  ganLu.forEach(item => {
    if (item.gan === userGan) {
      lu = item.lu
    }
  })
  const luIndex = filterSixtyList.findIndex(x => x === lu)
  // console.log(luIndex, "luIndex", lu, filterSixtyList);
  return luIndex % 9
}
//真马
const getZhenMa = (filterSixtyList: string[], x: string) => {
  const userGan = x[0]
  const userZhi = x[1]
  const ganLu = [
    {
      gan: '甲',
      lu: '壬申',
      zhi: ['寅', '午', '戌'],
    },
    {
      gan: '甲',
      lu: '丙寅',
      zhi: ['申', '子', '辰'],
    },
    {
      gan: '乙',
      lu: '丁亥',
      zhi: ['巳', '酉', '丑'],
    },
    {
      gan: '乙',
      lu: '辛巳',
      zhi: ['亥', '卯', '未'],
    },
    {
      gan: '丙',
      lu: '丙申',
      zhi: ['寅', '午', '戌'],
    },
    {
      gan: '丙',
      lu: '庚寅',
      zhi: ['申', '子', '辰'],
    },
    {
      gan: '丁',
      lu: '乙巳',
      zhi: ['亥', '卯', '未'],
    },
    {
      gan: '丁',
      lu: '辛亥',
      zhi: ['巳', '酉', '丑'],
    },
    {
      gan: '戊',
      lu: '庚申',
      zhi: ['寅', '午', '戌'],
    },
    {
      gan: '戊',
      lu: '甲寅',
      zhi: ['申', '子', '辰'],
    },
    {
      gan: '己',
      lu: '乙亥',
      zhi: ['巳', '酉', '丑'],
    },
    {
      gan: '己',
      lu: '己巳',
      zhi: ['亥', '卯', '未'],
    },
    {
      gan: '庚',
      lu: '甲申',
      zhi: ['寅', '午', '戌'],
    },
    {
      gan: '庚',
      lu: '戊寅',
      zhi: ['申', '子', '辰'],
    },
    {
      gan: '辛',
      lu: '己亥',
      zhi: ['巳', '酉', '丑'],
    },
    {
      gan: '辛',
      lu: '癸巳',
      zhi: ['亥', '卯', '未'],
    },
    {
      gan: '壬',
      lu: '戊申',
      zhi: ['寅', '午', '戌'],
    },
    {
      gan: '壬',
      lu: '壬寅',
      zhi: ['申', '子', '辰'],
    },
    {
      gan: '癸',
      lu: '癸亥',
      zhi: ['巳', '酉', '丑'],
    },
    {
      gan: '癸',
      lu: '丁巳',
      zhi: ['亥', '卯', '未'],
    },
  ]
  let lu = ''
  ganLu.forEach(item => {
    if (item.gan === userGan && item.zhi.includes(userZhi)) {
      lu = item.lu
    }
  })
  const luIndex = filterSixtyList.findIndex(x => x === lu)
  // console.log(luIndex, "luIndex", lu, filterSixtyList);
  return luIndex % 9
}
//阳贵人
const getYangGuiRen = (filterSixtyList: string[], x: string) => {
  const userGan = x[0]
  const ganLu = [
    {
      gan: '甲',
      lu: '辛未',
    },
    {
      gan: '乙',
      lu: '甲申',
    },
    {
      gan: '丙',
      lu: '丁酉',
    },
    {
      gan: '丁',
      lu: '辛亥',
    },
    {
      gan: '戊',
      lu: '乙丑',
    },
    {
      gan: '己',
      lu: '丙子',
    },
    {
      gan: '庚',
      lu: '己丑',
    },
    {
      gan: '辛',
      lu: '庚寅',
    },
    {
      gan: '壬',
      lu: '癸卯',
    },
    {
      gan: '癸',
      lu: '丁巳',
    },
  ]
  let lu = ''
  ganLu.forEach(item => {
    if (item.gan === userGan) {
      lu = item.lu
    }
  })
  const luIndex = filterSixtyList.findIndex(x => x === lu)
  return luIndex % 9
}
//阴贵人
const getYinGuiRen = (filterSixtyList: string[], x: string) => {
  const userGan = x[0]
  const ganLu = [
    {
      gan: '甲',
      lu: '丁丑',
    },
    {
      gan: '乙',
      lu: '戊子',
    },
    {
      gan: '丙',
      lu: '己亥',
    },
    {
      gan: '丁',
      lu: '己酉',
    },
    {
      gan: '戊',
      lu: '己未',
    },
    {
      gan: '己',
      lu: '壬申',
    },
    {
      gan: '庚',
      lu: '癸未',
    },
    {
      gan: '辛',
      lu: '甲午',
    },
    {
      gan: '壬',
      lu: '乙巳',
    },
    {
      gan: '癸',
      lu: '乙卯',
    },
  ]
  let lu = ''
  ganLu.forEach(item => {
    if (item.gan === userGan) {
      lu = item.lu
    }
  })
  const luIndex = filterSixtyList.findIndex(x => x === lu)
  return luIndex % 9
}

const gongName = ['坎', '坤', '震', '巽', '中', '乾', '兑', '艮', '离']
const gongChildName = [
  '壬子癸',
  '未坤申',
  '甲卯乙',
  '辰巽巳',
  '戊己',
  '戌乾亥',
  '庚酉辛',
  '丑艮寅',
  '丙午丁',
]
