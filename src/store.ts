import { atom } from 'recoil'

export const tracksState = atom<any[]>({
  key: 'tracks',
  default: [],
})

export const addDialogOpen = atom<boolean>({
  key: 'addDialogOpen',
  default: false,
})

export const logModalOpen = atom<boolean>({
  key: 'logModalOpen',
  default: false,
})

export const currentState = atom<any>({
  key: 'currentState',
  default: null,
})

export const dirState = atom<string>({
  key: 'dir',
  default: '',
})

export const formatState = atom<string>({
  key: 'format',
  default: 'mp4',
})

export const audioProgressState = atom<number>({
  key: 'audioProgress',
  default: 0,
})

export const videoProgressState = atom<number>({
  key: 'videoProgress',
  default: 0,
})
