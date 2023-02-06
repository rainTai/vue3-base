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
  // {
  //   label: '本命三煞',
  //   value: isSanShaByUser(currentTime, ming),
  //   info: '真三煞大凶绝不可用，假三煞权用',
  // },
  {
    label: '本命凶煞',
    value: isBenMingBad(currentTime, ming),
    info: '包含命破，三煞，天罡四杀，旬冲，正冲，寸土无光',
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

const isBenMingBad = (currentTime, ming) => {
  const day = currentTime.format('cD')
  const hour = currentTime.format('cH')
  const array = [
    {
      benMing: '甲子',
      mingPo: '庚午',
      sanSha: '己巳，庚午，辛未',
      xunChong: '庚午',
      zhengChong: '甲午',
      cunTuWuGuang: '戊午',
    },
    {
      benMing: '乙丑',
      mingPo: '癸未',
      sanSha: '戊寅，己卯，庚辰',
      xunChong: '辛未',
      zhengChong: '乙未',
      cunTuWuGuang: '己未',
    },
    {
      benMing: '丙寅',
      mingPo: '丙申',
      sanSha: '己亥，庚子，辛丑',
      xunChong: '壬申',
      zhengChong: '丙申',
      cunTuWuGuang: '甲申',
    },
    {
      benMing: '丁卯',
      mingPo: '己酉',
      sanSha: '戊申，己酉，庚戌',
      xunChong: '癸酉',
      zhengChong: '丁酉',
      cunTuWuGuang: '乙酉',
    },
    {
      benMing: '戊辰',
      mingPo: '壬戌',
      sanSha: '丁巳，戊午，己未',
      xunChong: '甲戌',
      zhengChong: '戊戌',
      cunTuWuGuang: '庚戌',
    },
    {
      benMing: '己巳',
      mingPo: '乙亥',
      sanSha: '丙寅，丁卯，戊辰',
      xunChong: '乙亥',
      zhengChong: '己亥',
      cunTuWuGuang: '辛亥',
    },
    {
      benMing: '庚午',
      mingPo: '戊子',
      sanSha: '丁亥，戊子，己丑',
      xunChong: '丙子',
      zhengChong: '庚子',
      cunTuWuGuang: '壬子',
    },
    {
      benMing: '辛未',
      mingPo: '辛丑',
      sanSha: '丙申，丁酉，戊戌',
      xunChong: '丁丑',
      zhengChong: '辛丑',
      cunTuWuGuang: '癸丑',
    },
    {
      benMing: '壬申',
      mingPo: '壬寅',
      sanSha: '乙巳，丙午，丁未',
      xunChong: '戊寅',
      zhengChong: '壬寅',
      cunTuWuGuang: '丙寅',
    },
    {
      benMing: '癸酉',
      mingPo: '乙卯',
      sanSha: '甲寅，乙卯，丙辰',
      xunChong: '己卯',
      zhengChong: '癸卯',
      cunTuWuGuang: '丁卯',
    },
    {
      benMing: '甲戌',
      mingPo: '戊辰',
      sanSha: '乙亥，丙子，丁丑',
      xunChong: '庚辰',
      zhengChong: '甲辰',
      cunTuWuGuang: '壬辰',
    },
    {
      benMing: '乙亥',
      mingPo: '辛巳',
      sanSha: '甲申，乙酉，丙戌',
      xunChong: '辛巳',
      zhengChong: '乙巳',
      cunTuWuGuang: '癸巳',
    },
    {
      benMing: '丙子',
      mingPo: '甲午',
      sanSha: '癸巳，甲午，乙未',
      xunChong: '壬午',
      zhengChong: '丙午',
      cunTuWuGuang: '庚午',
    },
    {
      benMing: '丁丑',
      mingPo: '丁未',
      sanSha: '壬寅，癸卯，甲辰',
      xunChong: '癸未',
      zhengChong: '丁未',
      cunTuWuGuang: '辛未',
    },
    {
      benMing: '戊寅',
      mingPo: '庚申',
      sanSha: '癸亥，甲子，乙丑',
      xunChong: '甲申',
      zhengChong: '戊申',
      cunTuWuGuang: '庚申',
    },
    {
      benMing: '己卯',
      mingPo: '癸酉',
      sanSha: '壬申，癸酉，甲戌',
      xunChong: '乙酉',
      zhengChong: '己酉',
      cunTuWuGuang: '辛酉',
    },
    {
      benMing: '庚辰',
      mingPo: '丙戌',
      sanSha: '辛巳，壬午，癸未',
      xunChong: '丙戌',
      zhengChong: '庚戌',
      cunTuWuGuang: '甲戌',
    },
    {
      benMing: '辛巳',
      mingPo: '己亥',
      sanSha: '庚寅，辛卯，壬辰',
      xunChong: '丁亥',
      zhengChong: '辛亥',
      cunTuWuGuang: '乙亥',
    },
    {
      benMing: '壬午',
      mingPo: '壬子',
      sanSha: '辛亥，壬子，癸丑',
      xunChong: '戊子',
      zhengChong: '壬子',
      cunTuWuGuang: '甲子',
    },
    {
      benMing: '癸未',
      mingPo: '乙丑',
      sanSha: '庚申，辛酉，壬戌',
      xunChong: '己丑',
      zhengChong: '癸丑',
      cunTuWuGuang: '乙丑',
    },
    {
      benMing: '甲申',
      mingPo: '丙寅',
      sanSha: '己巳，庚午，辛未',
      xunChong: '庚寅',
      zhengChong: '甲寅',
      cunTuWuGuang: '戊寅',
    },
    {
      benMing: '乙酉',
      mingPo: '己卯',
      sanSha: '戊寅，己卯，庚辰',
      xunChong: '辛卯',
      zhengChong: '乙卯',
      cunTuWuGuang: '己卯',
    },
    {
      benMing: '丙戌',
      mingPo: '壬辰',
      sanSha: '己亥，庚子，辛丑',
      xunChong: '壬辰',
      zhengChong: '丙辰',
      cunTuWuGuang: '戊辰',
    },
    {
      benMing: '丁亥',
      mingPo: '乙巳',
      sanSha: '戊申，己酉，庚戌',
      xunChong: '癸巳',
      zhengChong: '丁巳',
      cunTuWuGuang: '己巳',
    },
    {
      benMing: '戊子',
      mingPo: '戊午',
      sanSha: '丁巳，戊午，己未',
      xunChong: '甲午',
      zhengChong: '戊午',
      cunTuWuGuang: '丙午',
    },
    {
      benMing: '己丑',
      mingPo: '辛未',
      sanSha: '丙寅，丁卯，戊辰',
      xunChong: '乙未',
      zhengChong: '己未',
      cunTuWuGuang: '丁未',
    },
    {
      benMing: '庚寅',
      mingPo: '甲申',
      sanSha: '丁亥，戊子，己丑',
      xunChong: '丙申',
      zhengChong: '庚申',
      cunTuWuGuang: '壬申',
    },
    {
      benMing: '辛卯',
      mingPo: '丁酉',
      sanSha: '丙申，丁酉，戊戌',
      xunChong: '丁酉',
      zhengChong: '辛酉',
      cunTuWuGuang: '癸酉',
    },
    {
      benMing: '壬辰',
      mingPo: '庚戌',
      sanSha: '乙巳，丙午，丁未',
      xunChong: '戊戌',
      zhengChong: '壬戌',
      cunTuWuGuang: '丙戌',
    },
    {
      benMing: '癸巳',
      mingPo: '癸亥',
      sanSha: '甲寅，乙卯，丙辰',
      xunChong: '己亥',
      zhengChong: '癸亥',
      cunTuWuGuang: '丁亥',
    },
    {
      benMing: '甲午',
      mingPo: '丙子',
      sanSha: '乙亥，丙子，丁丑',
      xunChong: '庚子',
      zhengChong: '甲子',
      cunTuWuGuang: '戊子',
    },
    {
      benMing: '乙未',
      mingPo: '己丑',
      sanSha: '甲申，己酉，丙戌',
      xunChong: '辛丑',
      zhengChong: '乙丑',
      cunTuWuGuang: '己丑',
    },
    {
      benMing: '丙申',
      mingPo: '庚寅',
      sanSha: '癸巳，甲午，乙未',
      xunChong: '壬寅',
      zhengChong: '丙寅',
      cunTuWuGuang: '甲寅',
    },
    {
      benMing: '丁酉',
      mingPo: '癸卯',
      sanSha: '壬寅，癸卯，甲辰',
      xunChong: '癸卯',
      zhengChong: '丁卯',
      cunTuWuGuang: '乙卯',
    },
    {
      benMing: '戊戌',
      mingPo: '丙辰',
      sanSha: '癸亥，甲子，乙丑',
      xunChong: '甲辰',
      zhengChong: '戊辰',
      cunTuWuGuang: '庚辰',
    },
    {
      benMing: '己亥',
      mingPo: '己巳',
      sanSha: '壬申，癸酉，甲戌',
      xunChong: '乙巳',
      zhengChong: '己巳',
      cunTuWuGuang: '辛巳',
    },
    {
      benMing: '庚子',
      mingPo: '壬午',
      sanSha: '辛巳，壬午，癸未',
      xunChong: '丙午',
      zhengChong: '庚午',
      cunTuWuGuang: '壬午',
    },
    {
      benMing: '辛丑',
      mingPo: '乙未',
      sanSha: '庚寅，辛卯，壬辰',
      xunChong: '丁未',
      zhengChong: '辛未',
      cunTuWuGuang: '癸未',
    },
    {
      benMing: '壬寅',
      mingPo: '戊申',
      sanSha: '辛亥，壬子，癸丑',
      xunChong: '戊申',
      zhengChong: '壬申',
      cunTuWuGuang: '丙申',
    },
    {
      benMing: '癸卯',
      mingPo: '辛酉',
      sanSha: '庚申，辛酉，壬戌',
      xunChong: '己酉',
      zhengChong: '癸酉',
      cunTuWuGuang: '丁酉',
    },
    {
      benMing: '甲辰',
      mingPo: '甲戌',
      sanSha: '己巳，庚午，辛未',
      xunChong: '庚戌',
      zhengChong: '甲戌',
      cunTuWuGuang: '戊戌',
    },
    {
      benMing: '乙巳',
      mingPo: '丁亥',
      sanSha: '戊寅，己卯，庚辰',
      xunChong: '辛亥',
      zhengChong: '乙亥',
      cunTuWuGuang: '己亥',
    },
    {
      benMing: '丙午',
      mingPo: '庚子',
      sanSha: '己亥，庚子，辛丑',
      xunChong: '壬子',
      zhengChong: '丙子',
      cunTuWuGuang: '庚子',
    },
    {
      benMing: '丁未',
      mingPo: '癸丑',
      sanSha: '戊申，己酉，庚戌',
      xunChong: '癸丑',
      zhengChong: '丁丑',
      cunTuWuGuang: '辛丑',
    },
    {
      benMing: '戊申',
      mingPo: '甲寅',
      sanSha: '丁巳，戊午，己未',
      xunChong: '甲寅',
      zhengChong: '戊寅',
      cunTuWuGuang: '庚寅',
    },
    {
      benMing: '己酉',
      mingPo: '丁卯',
      sanSha: '丙寅，丁卯，戊辰',
      xunChong: '乙卯',
      zhengChong: '己卯',
      cunTuWuGuang: '辛卯',
    },
    {
      benMing: '庚戌',
      mingPo: '庚辰',
      sanSha: '丁亥，戊子，己丑',
      xunChong: '丙辰',
      zhengChong: '庚辰',
      cunTuWuGuang: '壬辰',
    },
    {
      benMing: '辛亥',
      mingPo: '癸巳',
      sanSha: '丙申，丁酉，戊戌',
      xunChong: '丁巳',
      zhengChong: '辛巳',
      cunTuWuGuang: '乙巳',
    },
    {
      benMing: '壬子',
      mingPo: '丙午',
      sanSha: '乙巳，丙午，丁未',
      xunChong: '戊午',
      zhengChong: '壬午',
      cunTuWuGuang: '甲午',
    },
    {
      benMing: '癸丑',
      mingPo: '己未',
      sanSha: '甲寅，乙卯，丙辰',
      xunChong: '己未',
      zhengChong: '癸未',
      cunTuWuGuang: '乙未',
    },
    {
      benMing: '甲寅',
      mingPo: '壬申',
      sanSha: '乙亥，丙子，丁丑',
      xunChong: '庚申',
      zhengChong: '甲申',
      cunTuWuGuang: '戊申',
    },
    {
      benMing: '乙卯',
      mingPo: '乙酉',
      sanSha: '甲申，乙酉，丙戌',
      xunChong: '辛酉',
      zhengChong: '乙酉',
      cunTuWuGuang: '己酉',
    },
    {
      benMing: '丙辰',
      mingPo: '戊戌',
      sanSha: '癸巳，甲午，乙未',
      xunChong: '壬戌',
      zhengChong: '丙戌',
      cunTuWuGuang: '戊戌',
    },
    {
      benMing: '丁巳',
      mingPo: '辛亥',
      sanSha: '壬寅，癸卯，甲辰',
      xunChong: '癸亥',
      zhengChong: '丁亥',
      cunTuWuGuang: '己亥',
    },
    {
      benMing: '戊午',
      mingPo: '甲子',
      sanSha: '癸亥，甲子，乙丑',
      xunChong: '甲子',
      zhengChong: '戊子',
      cunTuWuGuang: '丙子',
    },
    {
      benMing: '己未',
      mingPo: '丁丑',
      sanSha: '壬申，癸酉，甲戌',
      xunChong: '乙丑',
      zhengChong: '己丑',
      cunTuWuGuang: '丁丑',
    },
    {
      benMing: '庚申',
      mingPo: '戊寅',
      sanSha: '辛巳，壬午，癸未',
      xunChong: '丙寅',
      zhengChong: '庚寅',
      cunTuWuGuang: '壬寅',
    },
    {
      benMing: '辛酉',
      mingPo: '辛卯',
      sanSha: '庚寅，辛卯，壬辰',
      xunChong: '丁卯',
      zhengChong: '辛卯',
      cunTuWuGuang: '癸卯',
    },
    {
      benMing: '壬戌',
      mingPo: '甲辰',
      sanSha: '辛亥，壬子，癸丑',
      xunChong: '戊辰',
      zhengChong: '壬辰',
      cunTuWuGuang: '丙辰',
    },
    {
      benMing: '癸亥',
      mingPo: '丁巳',
      sanSha: '庚申，辛酉，壬戌',
      xunChong: '己巳',
      zhengChong: '癸巳',
      cunTuWuGuang: '丁巳',
    },
  ]
  const data: string[] = []
  array.forEach(x => {
    if (x.benMing === ming) {
      if (day === x.mingPo) {
        data.push('命破日')
      }
      if (hour === x.mingPo) {
        data.push('命破时')
      }
      if (x.sanSha.includes(day)) {
        data.push('真三煞日')
      }
      if (x.sanSha.includes(hour)) {
        data.push('真三煞时')
      }
      if (x.xunChong.includes(day)) {
        data.push('旬冲日')
      }
      if (x.xunChong.includes(hour)) {
        data.push('旬冲时')
      }
      if (x.zhengChong.includes(day)) {
        data.push('正冲日')
      }
      if (x.zhengChong.includes(hour)) {
        data.push('正冲时')
      }
      if (x.cunTuWuGuang.includes(day)) {
        data.push('寸土无光日（阴宅）')
      }
      if (x.cunTuWuGuang.includes(hour)) {
        data.push('寸土无光时（阴宅）')
      }
    }
  })
  return data.length > 0 ? data : ''
}

//计算命三煞
// const isSanShaByUser = (currentTime, ming) => {
//   const year = currentTime.format('cY')
//   const month = currentTime.format('cM')
//   const day = currentTime.format('cD')
//   const hour = currentTime.format('cH')
//   const yearZhi = year[1]
//   const monthZhi = month[1]
//   const dayZhi = day[1]
//   const hourZhi = hour[1]
//   const dataList = [
//     {
//       yearZhi: ['子', '辰', '申'],
//       list: ['巳', '午', '未'],
//       bad: '未',
//     },
//     {
//       yearZhi: ['丑', '巳', '酉'],
//       list: ['寅', '卯', '辰'],
//       bad: '辰',
//     },
//     {
//       yearZhi: ['寅', '午', '戌'],
//       list: ['亥', '子', '丑'],
//       bad: '丑',
//     },
//     {
//       yearZhi: ['卯', '亥', '未'],
//       list: ['申', '酉', '戌'],
//       bad: '戌',
//     },
//   ]
//   //取年命地支
//   const userZhi = ming[1]
//   const sanshaList: string[] = []
//   dataList.forEach(y => {
//     if (y.yearZhi.includes(userZhi)) {
//       if (y.list.includes(yearZhi)) {
//         if (y.list.slice(-1)[0] === yearZhi && calWuhu(ming, year)) {
//           sanshaList.push('真本命年三煞')
//         } else {
//           sanshaList.push('本命年三煞')
//         }
//       }
//       if (y.list.includes(monthZhi)) {
//         if (y.list.slice(-1)[0] === monthZhi && calWuhu(ming, month)) {
//           sanshaList.push('真本命月三煞')
//         } else {
//           sanshaList.push('本命月三煞')
//         }
//       }
//       if (y.list.includes(dayZhi)) {
//         if (y.list.slice(-1)[0] === dayZhi && calWuhu(ming, day)) {
//           sanshaList.push('真本命日三煞')
//         } else {
//           sanshaList.push('本命日三煞')
//         }
//       }
//       if (y.list.includes(hourZhi)) {
//         if (y.list.slice(-1)[0] === hourZhi && calWuhu(ming, hour)) {
//           sanshaList.push('真本命时三煞')
//         } else {
//           sanshaList.push('本命时三煞')
//         }
//       }
//     }
//   })
//   return sanshaList
// }
// const calWuhu = (userGanZhi: string, anyGanzhi: string) => {
//   const userGan = userGanZhi[0]
//   let array: Array<string> = []
//   if (['甲', '己'].includes(userGan)) {
//     array = [
//       '丙寅',
//       '丁卯',
//       '戊辰',
//       '己巳',
//       '庚午',
//       '辛未',
//       '壬申',
//       '癸酉',
//       '甲戌',
//       '乙亥',
//       '丙子',
//       '丁丑',
//     ]
//   }
//   if (['乙', '庚'].includes(userGan)) {
//     array = [
//       '戊寅',
//       '己卯',
//       '庚辰',
//       '辛巳',
//       '壬午',
//       '癸未',
//       '甲申',
//       '乙酉',
//       '丙戌',
//       '丁亥',
//       '戊子',
//       '己丑',
//     ]
//   }
//   if (['丙', '辛'].includes(userGan)) {
//     array = [
//       '庚寅',
//       '辛卯',
//       '壬辰',
//       '癸巳',
//       '甲午',
//       '乙未',
//       '丙申',
//       '丁酉',
//       '戊戌',
//       '己亥',
//       '庚子',
//       '辛丑',
//     ]
//   }
//   if (['丁', '壬'].includes(userGan)) {
//     array = [
//       '壬寅',
//       '癸卯',
//       '甲辰',
//       '乙巳',
//       '丙午',
//       '丁未',
//       '戊申',
//       '己酉',
//       '庚戌',
//       '辛亥',
//       '壬子',
//       '癸丑',
//     ]
//   }
//   if (['戊', '癸'].includes(userGan)) {
//     array = [
//       '甲寅',
//       '乙卯',
//       '丙辰',
//       '丁巳',
//       '戊午',
//       '己未',
//       '庚申',
//       '辛酉',
//       '壬戌',
//       '癸亥',
//       '甲子',
//       '乙丑',
//     ]
//   }
//   const item = array.find(item => item === anyGanzhi)
//   if (item) {
//     return true
//   } else {
//     return false
//   }
// }

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
