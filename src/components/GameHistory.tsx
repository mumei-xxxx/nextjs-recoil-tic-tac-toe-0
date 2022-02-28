import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from 'recoil'

import { historyState, stepNumberState, xIsNextState } from '@/infrastructure/recoil'
import { calculateWinner } from '@/useCases/calculateWinner'

/**
 * @description 三目ならべのゲーム履歴機能のコンポーネント
 */
export const GameHistory: React.FC = () => {
  // ゲーム履歴の配列
  const historyArr: GameHistoryArrType = useRecoilValue(historyState)

  // 現在のステップ数（何手目か。）
  const stepNumber: number = useRecoilValue(stepNumberState)
  const setStepNumber: SetterOrUpdater<number> = useSetRecoilState(stepNumberState)

  // X（先手）の手番か。
  const xIsNext: boolean = useRecoilValue(xIsNextState)
  const setXIsNext: SetterOrUpdater<boolean> = useSetRecoilState(xIsNextState)

  const current: { squares: SquareValueType[] } = historyArr[stepNumber]

  // 勝者判定
  const winner: SquareValueType = calculateWinner(current.squares)

  const jumpTo = (step: number): void => {
    setStepNumber(step)
    const isXNext = step % 2 === 0
    setXIsNext(isXNext)
  }

  // N手目に戻る。or ゲームを最初から始める。
  const moves: JSX.Element[] = historyArr.map((step, moveNumber: number) => {
    const description: string = moveNumber ? `Go to move #${moveNumber}` : 'Go to game start'

    return (
      <li key={moveNumber}>
        <button
          onClick={() => {
            jumpTo(moveNumber)
          }}
        >
          {description}
        </button>
      </li>
    )
  })

  // 勝者 or 次の手番の表示
  const getStatus = (winnerStr: SquareValueType): string => {
    if (winnerStr) {
      return 'Winner: ' + winnerStr
    }
    return 'Next player: ' + (xIsNext ? 'X' : 'O')
  }

  const status: string = getStatus(winner)

  return (
    <div className="game-info">
      <div>{status}</div>
      <ol>{moves}</ol>
    </div>
  )
}
