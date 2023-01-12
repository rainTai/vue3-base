import { defineStore } from 'pinia'

export const useBaseStore = defineStore({
  id: 'editorStore',
  state: () => ({
    tempData: '测试',
  }),
  getters: {},
  actions: {},
})
