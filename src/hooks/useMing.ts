import { useBaseStore } from '@/store/index'
import { ganList, zhiList } from './useDate'

export const useMing = () => {
  const baseStore = useBaseStore()
  const initMingList = () => {
    const mingList = baseStore.mingList
    const currentTime = baseStore.currentTime
    baseStore.$patch(state => {
      state.mingInfoList = []
    })
    mingList.forEach(ming => {
      const mingInfo = mingShenSha(currentTime, ming)
      const body = {
        ming,
        mingInfo,
      }
      baseStore.$patch(state => {
        state.mingInfoList.push(body)
      })
    })
  }
  return {
    initMingList,
  }
}

const mingShenSha = (currentTime, ming) => [
  {
    label: '本命相冲',
    value: isBenMingXiangChong(currentTime, ming),
    info: '大凶',
  },
  {
    label: '本命三煞',
    value: isSanShaByUser(currentTime, ming),
    info: '真三煞大凶绝不可用，假三煞权用',
  },
  {
    label: '本命三刑',
    value: isBenMingSanXin(currentTime, ming),
    info: '忌命支与日支三刑，六合堆贵进贵化解',
  },
  {
    label: '箭刃全',
    value: isJianRenQuan(currentTime, ming),
    info: '百日之内伤人，天德，月德，本命贵人，三合，六合化解',
  },
  {
    label: '回头贡',
    value: isHuiTouGong(currentTime, ming),
    info: '大凶',
  },
  {
    label: '堆贵',
    value: isDuiGui(currentTime, ming),
    info: '贵人',
  },
  {
    label: '进贵',
    value: isJinGui(currentTime, ming),
    info: '贵人',
  },
  {
    label: '堆长生',
    value: isDuiChangSheng(currentTime, ming),
    info: '长生',
  },
  {
    label: '进长生',
    value: isJinChangSheng(currentTime, ming),
    info: '长生',
  },
  {
    label: '堆禄',
    value: isDuiLu(currentTime, ming),
    info: '',
  },
  {
    label: '进禄',
    value: isJinLu(currentTime, ming),
    info: '',
  },
  {
    label: '堆旺',
    value: isDuiWang(currentTime, ming),
    info: '',
  },
  {
    label: '进旺',
    value: isJinWang(currentTime, ming),
    info: '',
  },
  {
    label: '堆马',
    value: isDuiMa(currentTime, ming),
    info: '',
  },
  {
    label: '进马',
    value: isJinMa(currentTime, ming),
    info: '',
  },
  {
    label: '真禄',
    value: isZhenLu(currentTime, ming),
    info: '',
  },
  {
    label: '阴贵人',
    value: isYinGuiRen(currentTime, ming),
    info: '',
  },
  {
    label: '阳贵人',
    value: isYangGuiRen(currentTime, ming),
    info: '',
  },
  {
    label: '真马',
    value: isZhenMa(currentTime, ming),
    info: '',
  },
]

//计算命三煞
const isSanShaByUser = (currentTime, ming) => {
  const year = currentTime.format('cY')
  const month = currentTime.format('cM')
  const day = currentTime.format('cD')
  const hour = currentTime.format('cH')
  const yearZhi = year[1]
  const monthZhi = month[1]
  const dayZhi = day[1]
  const hourZhi = hour[1]
  const dataList = [
    {
      yearZhi: ['子', '辰', '申'],
      list: ['巳', '午', '未'],
      bad: '未',
    },
    {
      yearZhi: ['丑', '巳', '酉'],
      list: ['寅', '卯', '辰'],
      bad: '辰',
    },
    {
      yearZhi: ['寅', '午', '戌'],
      list: ['亥', '子', '丑'],
      bad: '丑',
    },
    {
      yearZhi: ['卯', '亥', '未'],
      list: ['申', '酉', '戌'],
      bad: '戌',
    },
  ]
  //取年命地支
  const userZhi = ming[1]
  const sanshaList: string[] = []
  dataList.forEach(y => {
    if (y.yearZhi.includes(userZhi)) {
      if (y.list.includes(yearZhi)) {
        if (y.list.slice(-1)[0] === yearZhi && calWuhu(ming, year)) {
          sanshaList.push('真本命年三煞')
        } else {
          sanshaList.push('本命年三煞')
        }
      }
      if (y.list.includes(monthZhi)) {
        if (y.list.slice(-1)[0] === monthZhi && calWuhu(ming, month)) {
          sanshaList.push('真本命月三煞')
        } else {
          sanshaList.push('本命月三煞')
        }
      }
      if (y.list.includes(dayZhi)) {
        if (y.list.slice(-1)[0] === dayZhi && calWuhu(ming, day)) {
          sanshaList.push('真本命日三煞')
        } else {
          sanshaList.push('本命日三煞')
        }
      }
      if (y.list.includes(hourZhi)) {
        if (y.list.slice(-1)[0] === hourZhi && calWuhu(ming, hour)) {
          sanshaList.push('真本命时三煞')
        } else {
          sanshaList.push('本命时三煞')
        }
      }
    }
  })
  return sanshaList
}
const calWuhu = (userGanZhi: string, anyGanzhi: string) => {
  const userGan = userGanZhi[0]
  // const userZhi = userGanZhi[1]
  let array: Array<string> = []
  if (['甲', '己'].includes(userGan)) {
    array = [
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
    ]
  }
  if (['乙', '庚'].includes(userGan)) {
    array = [
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
    ]
  }
  if (['丙', '辛'].includes(userGan)) {
    array = [
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
    ]
  }
  if (['丁', '壬'].includes(userGan)) {
    array = [
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
    ]
  }
  if (['戊', '癸'].includes(userGan)) {
    array = [
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
      '甲子',
      '乙丑',
    ]
  }
  const item = array.find(item => item === anyGanzhi)
  if (item) {
    return true
  } else {
    return false
  }
}

//本命相冲
const isBenMingXiangChong = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayGan = day[0]
  const dayZhi = day[1]
  const hour = currentTime.format('cH')
  const hourGan = hour[0]
  const hourZhi = hour[1]
  const mingGan = ming[0]
  const mingZhi = ming[1]
  let dayData = ''
  let hourData = ''
  const zhiIndex = zhiList.findIndex(zhi => zhi === dayZhi)
  const ganIndex = ganList.findIndex(gan => gan === dayGan)
  const tempZhi = zhiList.concat(zhiList)
  const tempGan = ganList.concat(ganList)
  if (tempZhi[zhiIndex + 6] === mingZhi) {
    dayData = '日冲命主'
    if (tempGan[ganIndex] === mingGan) {
      dayData = '日真冲命主'
    }
    if (tempGan[ganIndex + 4] === mingGan) {
      dayData = '日正冲命主'
    }
  }
  const zhiHourIndex = zhiList.findIndex(zhi => zhi === hourZhi)
  const ganHourIndex = ganList.findIndex(gan => gan === hourGan)
  if (tempZhi[zhiHourIndex + 6] === mingZhi) {
    hourData = '时冲命主'
    if (tempGan[ganHourIndex] === mingGan) {
      hourData = '时真冲命主'
    }
    if (tempGan[ganHourIndex + 4] === mingGan) {
      hourData = '时正冲命主'
    }
  }
  return dayData + hourData
}
//本命三刑
const isBenMingSanXin = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  const mingZhi = ming[1]
  if (
    (dayZhi === '寅' && ['巳', '申'].includes(mingZhi)) ||
    (dayZhi === '巳' && ['寅', '申'].includes(mingZhi)) ||
    (dayZhi === '申' && ['寅', '巳'].includes(mingZhi))
  ) {
    return '寅巳申三刑，三合六合贵人可用'
  }
  if (
    (dayZhi === '未' && ['戌', '丑'].includes(mingZhi)) ||
    (dayZhi === '戌' && ['未', '丑'].includes(mingZhi)) ||
    (dayZhi === '丑' && ['未', '戌'].includes(mingZhi))
  ) {
    return '未戌丑三刑，三合六合贵人可用'
  }
  if (
    (dayZhi === '子' && ['卯'].includes(mingZhi)) ||
    (dayZhi === '卯' && ['子'].includes(mingZhi))
  ) {
    return '子卯刑，三合六合贵人可用'
  }
  if (
    (dayZhi === '辰' && ['辰'].includes(mingZhi)) ||
    (dayZhi === '午' && ['午'].includes(mingZhi)) ||
    (dayZhi === '酉' && ['酉'].includes(mingZhi)) ||
    (dayZhi === '亥' && ['亥'].includes(mingZhi))
  ) {
    return '辰午酉亥自刑，三合六合贵人可用'
  }
  return ''
}
//箭刃全煞
const isJianRenQuan = (currentTime, ming) => {
  const year = currentTime.format('cY')
  const month = currentTime.format('cM')
  const day = currentTime.format('cD')
  const hour = currentTime.format('cH')
  const sizhu = year + month + day + hour
  const mingGan = ming[0]
  // const mingZhi = ming[1]
  if (
    (['甲', '庚'].includes(mingGan) && sizhu.includes('卯') && sizhu.includes('酉')) ||
    (['乙', '辛'].includes(mingGan) && sizhu.includes('辰') && sizhu.includes('戌')) ||
    (['丙', '戊', '壬'].includes(mingGan) && sizhu.includes('子') && sizhu.includes('午')) ||
    (['丁', '己', '癸'].includes(mingGan) && sizhu.includes('丑') && sizhu.includes('未'))
  ) {
    return '犯箭刃全，可取柱中三合，六合或本命贵人化解'
  } else {
    return ''
  }
}
//回头贡煞
const isHuiTouGong = (currentTime, ming) => {
  const year = currentTime.format('cY')
  const month = currentTime.format('cM')
  const day = currentTime.format('cD')
  const hour = currentTime.format('cH')
  const sizhu = year + month + day + hour
  const mingGan = ming[0]
  const mingZhi = ming[1]
  if (
    (['辰'].includes(mingZhi) &&
      sizhu.includes('巳') &&
      sizhu.includes('酉') &&
      sizhu.includes('丑')) ||
    (['戌'].includes(mingGan) &&
      sizhu.includes('亥') &&
      sizhu.includes('卯') &&
      sizhu.includes('未')) ||
    (['丑'].includes(mingGan) &&
      sizhu.includes('寅') &&
      sizhu.includes('午') &&
      sizhu.includes('戌')) ||
    (['未'].includes(mingGan) &&
      sizhu.includes('申') &&
      sizhu.includes('子') &&
      sizhu.includes('辰'))
  ) {
    return '仅辰戌丑未四命，大凶不用。'
  } else {
    return ''
  }
}
//堆贵
const isDuiGui = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  const mingGan = ming[0]
  if (
    (['丑', '未'].includes(dayZhi) && ['甲', '午', '庚'].includes(mingGan)) ||
    (['申', '子'].includes(dayZhi) && ['乙', '己'].includes(mingGan)) ||
    (['亥', '酉'].includes(dayZhi) && ['丙', '丁'].includes(mingGan)) ||
    (['卯', '巳'].includes(dayZhi) && ['壬', '癸'].includes(mingGan)) ||
    (['午', '寅'].includes(dayZhi) && ['辛'].includes(mingGan))
  ) {
    return '堆贵 - 天乙贵人'
  } else {
    return ''
  }
}
//进贵
const isJinGui = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  // const hour = currentTime.format('cH')
  // const hourGan = hour[0]
  // const hourZhi = hour[1]
  // const mingGan = ming[0]
  const mingZhi = ming[1]
  if (
    (['丑', '未'].includes(mingZhi) && ['甲', '午', '庚'].includes(dayGan)) ||
    (['申', '子'].includes(mingZhi) && ['乙', '己'].includes(dayGan)) ||
    (['亥', '酉'].includes(mingZhi) && ['丙', '丁'].includes(dayGan)) ||
    (['卯', '巳'].includes(mingZhi) && ['壬', '癸'].includes(dayGan)) ||
    (['午', '寅'].includes(mingZhi) && ['辛'].includes(dayGan))
  ) {
    return '进贵 - 天乙贵人'
  } else {
    return ''
  }
}
//堆长生
const isDuiChangSheng = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  // const hour = currentTime.format('cH')
  const mingGan = ming[0]
  if (
    (mingGan === '甲' && dayZhi === '亥') ||
    (mingGan === '乙' && dayZhi === '午') ||
    (mingGan === '丙' && dayZhi === '寅') ||
    (mingGan === '丁' && dayZhi === '酉') ||
    (mingGan === '戊' && dayZhi === '寅') ||
    (mingGan === '己' && dayZhi === '酉') ||
    (mingGan === '庚' && dayZhi === '巳') ||
    (mingGan === '辛' && dayZhi === '子') ||
    (mingGan === '壬' && dayZhi === '申') ||
    (mingGan === '癸' && dayZhi === '卯')
  ) {
    return '堆长生-吉'
  } else {
    return ''
  }
}
//进长生
const isJinChangSheng = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  // const hour = currentTime.format('cH')
  // const hourGan = hour[0]
  // const hourZhi = hour[1]
  // const mingGan = ming[0]
  const mingZhi = ming[1]
  if (
    (dayGan === '甲' && mingZhi === '亥') ||
    (dayGan === '乙' && mingZhi === '午') ||
    (dayGan === '丙' && mingZhi === '寅') ||
    (dayGan === '丁' && mingZhi === '酉') ||
    (dayGan === '戊' && mingZhi === '寅') ||
    (dayGan === '己' && mingZhi === '酉') ||
    (dayGan === '庚' && mingZhi === '巳') ||
    (dayGan === '辛' && mingZhi === '子') ||
    (dayGan === '壬' && mingZhi === '申') ||
    (dayGan === '癸' && mingZhi === '卯')
  ) {
    return '进长生-吉'
  } else {
    return ''
  }
}
//堆禄
const isDuiLu = (currentTime, ming) => {
  const day = currentTime.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  // const hour = currentTime.format('cH')
  // const hourGan = hour[0]
  // const hourZhi = hour[1]
  const mingGan = ming[0]
  // const mingZhi = ming[1]
  if (
    (mingGan === '甲' && dayZhi === '寅') ||
    (mingGan === '乙' && dayZhi === '卯') ||
    (mingGan === '丙' && dayZhi === '巳') ||
    (mingGan === '丁' && dayZhi === '午') ||
    (mingGan === '戊' && dayZhi === '巳') ||
    (mingGan === '己' && dayZhi === '午') ||
    (mingGan === '庚' && dayZhi === '申') ||
    (mingGan === '辛' && dayZhi === '酉') ||
    (mingGan === '壬' && dayZhi === '亥') ||
    (mingGan === '癸' && dayZhi === '子')
  ) {
    return '堆禄-吉'
  } else {
    return ''
  }
}
//进禄
const isJinLu = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayGan = day[0]
  // const dayZhi = day[1]
  // const day = currentTime.format('cD')
  // const hourGan = hour[0]
  // const hourZhi = hour[1]
  // const mingGan = ming[0]
  const mingZhi = ming[1]
  if (
    (dayGan === '甲' && mingZhi === '寅') ||
    (dayGan === '乙' && mingZhi === '卯') ||
    (dayGan === '丙' && mingZhi === '巳') ||
    (dayGan === '丁' && mingZhi === '午') ||
    (dayGan === '戊' && mingZhi === '巳') ||
    (dayGan === '己' && mingZhi === '午') ||
    (dayGan === '庚' && mingZhi === '申') ||
    (dayGan === '辛' && mingZhi === '酉') ||
    (dayGan === '壬' && mingZhi === '亥') ||
    (dayGan === '癸' && mingZhi === '子')
  ) {
    return '进禄-吉'
  } else {
    return ''
  }
}
//堆旺
const isDuiWang = (currentTime, ming) => {
  const day = currentTime.format('cD')
  // const dayGan = day[0]
  const dayZhi = day[1]
  // const hour = dateStruct.GanZhiHour
  // const hourGan = hour[0]
  // const hourZhi = hour[1]
  const mingGan = ming[0]
  // const mingZhi = x[1]
  if (
    (mingGan === '甲' && dayZhi === '卯') ||
    (mingGan === '乙' && dayZhi === '寅') ||
    (mingGan === '丙' && dayZhi === '午') ||
    (mingGan === '丁' && dayZhi === '巳') ||
    (mingGan === '戊' && dayZhi === '午') ||
    (mingGan === '己' && dayZhi === '巳') ||
    (mingGan === '庚' && dayZhi === '酉') ||
    (mingGan === '辛' && dayZhi === '申') ||
    (mingGan === '壬' && dayZhi === '子') ||
    (mingGan === '癸' && dayZhi === '亥')
  ) {
    return '堆旺-吉'
  } else {
    return ''
  }
}
//进旺
const isJinWang = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayGan = day[0]
  const mingZhi = ming[1]
  if (
    (dayGan === '甲' && mingZhi === '卯') ||
    (dayGan === '乙' && mingZhi === '寅') ||
    (dayGan === '丙' && mingZhi === '午') ||
    (dayGan === '丁' && mingZhi === '巳') ||
    (dayGan === '戊' && mingZhi === '午') ||
    (dayGan === '己' && mingZhi === '巳') ||
    (dayGan === '庚' && mingZhi === '酉') ||
    (dayGan === '辛' && mingZhi === '申') ||
    (dayGan === '壬' && mingZhi === '子') ||
    (dayGan === '癸' && mingZhi === '亥')
  ) {
    return '进旺-吉'
  } else {
    return ''
  }
}
//堆马
const isDuiMa = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  const mingZhi = ming[1]
  if (
    (['亥', '卯', '未'].includes(mingZhi) && ['巳'].includes(dayZhi)) ||
    (['寅', '午', '戌'].includes(mingZhi) && ['申'].includes(dayZhi)) ||
    (['巳', '酉', '丑'].includes(mingZhi) && ['亥'].includes(dayZhi)) ||
    (['申', '子', '辰'].includes(mingZhi) && ['寅'].includes(dayZhi))
  ) {
    return '堆马'
  } else {
    return ''
  }
}
//进马
const isJinMa = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const dayZhi = day[1]
  const mingZhi = ming[1]
  if (
    (['亥', '卯', '未'].includes(dayZhi) && ['巳'].includes(mingZhi)) ||
    (['寅', '午', '戌'].includes(dayZhi) && ['申'].includes(mingZhi)) ||
    (['巳', '酉', '丑'].includes(dayZhi) && ['亥'].includes(mingZhi)) ||
    (['申', '子', '辰'].includes(dayZhi) && ['寅'].includes(mingZhi))
  ) {
    return '进马'
  } else {
    return ''
  }
}
//本命禄马贵人
const isZhenLu = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const userGan = ming[0]
  if (
    (userGan === '甲' && day === '丙寅') ||
    (userGan === '乙' && day === '己卯') ||
    (userGan === '丙' && day === '癸巳') ||
    (userGan === '丁' && day === '丙午') ||
    (userGan === '戊' && day === '丁巳') ||
    (userGan === '己' && day === '庚午') ||
    (userGan === '庚' && day === '甲申') ||
    (userGan === '辛' && day === '丁酉') ||
    (userGan === '壬' && day === '辛亥') ||
    (userGan === '癸' && day === '甲子')
  ) {
    return true
  } else {
    return false
  }
}
const isYinGuiRen = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const userGan = ming[0]
  if (
    (userGan === '甲' && day === '丁丑') ||
    (userGan === '乙' && day === '戊子') ||
    (userGan === '丙' && day === '己亥') ||
    (userGan === '丁' && day === '己酉') ||
    (userGan === '戊' && day === '己未') ||
    (userGan === '己' && day === '壬申') ||
    (userGan === '庚' && day === '癸未') ||
    (userGan === '辛' && day === '甲午') ||
    (userGan === '壬' && day === '乙巳') ||
    (userGan === '癸' && day === '乙卯')
  ) {
    return true
  } else {
    return false
  }
}
const isYangGuiRen = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const userGan = ming[0]
  if (
    (userGan === '甲' && day === '辛未') ||
    (userGan === '乙' && day === '甲申') ||
    (userGan === '丙' && day === '丁酉') ||
    (userGan === '丁' && day === '辛亥') ||
    (userGan === '戊' && day === '乙丑') ||
    (userGan === '己' && day === '丙子') ||
    (userGan === '庚' && day === '己丑') ||
    (userGan === '辛' && day === '庚寅') ||
    (userGan === '壬' && day === '癸卯') ||
    (userGan === '癸' && day === '丁巳')
  ) {
    return true
  } else {
    return false
  }
}
const isZhenMa = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const userGan = ming[0]
  const userZhi = ming[1]
  if (
    (userGan === '甲' && day === '壬申' && ['寅', '午', '戌'].includes(userZhi)) ||
    (userGan === '甲' && day === '丙寅' && ['申', '子', '辰'].includes(userZhi)) ||
    (userGan === '乙' && day === '丁亥' && ['巳', '酉', '丑'].includes(userZhi)) ||
    (userGan === '乙' && day === '辛巳' && ['亥', '卯', '未'].includes(userZhi)) ||
    (userGan === '丙' && day === '丙申' && ['寅', '午', '戌'].includes(userZhi)) ||
    (userGan === '丙' && day === '庚寅' && ['申', '子', '辰'].includes(userZhi)) ||
    (userGan === '丁' && day === '乙巳' && ['亥', '卯', '未'].includes(userZhi)) ||
    (userGan === '丁' && day === '辛亥' && ['巳', '酉', '丑'].includes(userZhi)) ||
    (userGan === '戊' && day === '庚申' && ['寅', '午', '戌'].includes(userZhi)) ||
    (userGan === '戊' && day === '甲寅' && ['申', '子', '辰'].includes(userZhi)) ||
    (userGan === '己' && day === '乙亥' && ['巳', '酉', '丑'].includes(userZhi)) ||
    (userGan === '己' && day === '己巳' && ['亥', '卯', '未'].includes(userZhi)) ||
    (userGan === '庚' && day === '甲申' && ['寅', '午', '戌'].includes(userZhi)) ||
    (userGan === '庚' && day === '戊寅' && ['申', '子', '辰'].includes(userZhi)) ||
    (userGan === '辛' && day === '己亥' && ['巳', '酉', '丑'].includes(userZhi)) ||
    (userGan === '辛' && day === '癸巳' && ['亥', '卯', '未'].includes(userZhi)) ||
    (userGan === '壬' && day === '戊申' && ['寅', '午', '戌'].includes(userZhi)) ||
    (userGan === '壬' && day === '壬寅' && ['申', '子', '辰'].includes(userZhi)) ||
    (userGan === '癸' && day === '癸亥' && ['巳', '酉', '丑'].includes(userZhi)) ||
    (userGan === '癸' && day === '丁巳' && ['亥', '卯', '未'].includes(userZhi))
  ) {
    return true
  } else {
    return false
  }
}
