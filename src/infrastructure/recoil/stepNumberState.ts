import { atom } from 'recoil'

/**
 * @description 現在のステップ数（何手目か）のstate
 */
export const stepNumberState = atom<number>({
  key: 'tic-tac-toe/stepNumberState',
  default: 0
})
