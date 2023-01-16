import { defineStore } from 'pinia'

export const useBaseStore = defineStore({
  id: 'baseStore',
  state: () => ({
    year: '', // 年
    month: '', // 月
    date: '', // 日
    hour: '', // 时
    tempData: '测试',
    baseDate: {} as any,
    dayList: [] as any,
    hourList: [] as any,
    gongList: [
      {
        name: '坎',
        inside: '癸子壬',
        bad: {
          sanYuanYear: '', // 年五黄
          sanYuanMonth: '', // 月五黄(大月建)
          xiaoYueJian: '', // 小月建
          wuJiDuTian: '', // 戊己都天
          zhengYinFu: '', //正阴府
          pangYinFu: '', // 旁阴府
          zuoShanYaoSha: '', // 坐山耀煞
          xinYaoSha: '', // 星耀煞
          jianFengSha: '', //剑锋煞
        },
        good: {},
      },
      {
        name: '坤',
        inside: '未坤申',
      },
      {
        name: '震',
        inside: '甲卯乙',
      },
      {
        name: '巽',
        inside: '辰巽巳',
      },
      {
        name: '中',
        inside: '',
      },
      {
        name: '乾',
        inside: '亥乾戌',
      },
      {
        name: '兑',
        inside: '庚酉辛',
      },
      {
        name: '艮',
        inside: '寅艮丑',
      },
      {
        name: '离',
        inside: '丙午丁',
      },
    ] as any, // 九宫
    currentTime: {} as any,
    filterGan: [] as string[],
    filterZhi: [] as string[],
    zuoshan: '',
    mingList: [] as string[],
    type: '',
  }),
  getters: {},
  actions: {},
})
