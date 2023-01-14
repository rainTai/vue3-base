import { defineStore } from 'pinia'

export const useBaseStore = defineStore({
  id: 'baseStore',
  state: () => ({
    tempData: '测试',
    baseDate: {} as any,
  }),
  getters: {},
  actions: {},
})
