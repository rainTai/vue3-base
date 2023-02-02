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
    gongList: [] as any[], // 九宫
    mingInfoList: [] as any[],
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
