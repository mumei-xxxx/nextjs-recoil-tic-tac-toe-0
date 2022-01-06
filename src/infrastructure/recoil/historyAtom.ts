import { atom } from 'recoil'

/**
 * @description ゲーム履歴配列のstate
 */
export const historyState = atom<GameHistoryArrType>({
  key: 'tic-tac-toe/historyState',
  default: new Array({ squares: Array(9).fill(null) })
})

