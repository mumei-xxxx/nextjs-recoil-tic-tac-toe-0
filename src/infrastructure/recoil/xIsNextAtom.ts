import { atom } from 'recoil'

/**
 * @description X（先手）の手番なら、true。
 */
export const xIsNextState = atom<boolean>({
  key: 'tic-tac-toe/xIsNextState',
  default: true
})
