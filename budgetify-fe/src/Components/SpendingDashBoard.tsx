import type { Expense, Income } from '@/routes/expenses'

type SpendingDashBoardProps = {
  expenses: Expense[]
  income: Income[]
}
export default function SpendingDashBoard({
  expenses,
  income,
}: SpendingDashBoardProps) {
  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0)
  const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0)
  const overspending = totalExpenses > totalIncome

  return (
    <div className="max-w-6xlg ">
      {/* Summary */}
      <div className="mb-6 p-6 rounded-lg text-[#0d3a5c] flex justify-center items-center">
        <div>
          <p className="text-xl font-bold text-center">
            Total Income: <span className='text-emerald-400'>${totalIncome}</span>
          </p>
          <p className="text-xl font-bold text-center ">
            Total Expenses: ${totalExpenses}
          </p>
        </div>
      </div>
      <div className="text-xl font-semibold text-center mt-5">
        {overspending ? (
          <p className="text-red-600">Overspending! Time to cut Expenses</p>
        ) : (
          <p className="text-green-600">Within Budget. Doing Great!</p>
        )}
        <img
          alt="budget line"
          className="w-lg mt-5"
          src={totalExpenses > totalIncome ? 'wallet.svg' : 'coin-stack.svg'}
        />
      </div>
    </div>
  )
}
