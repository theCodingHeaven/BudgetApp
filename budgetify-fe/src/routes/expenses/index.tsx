import AddNewEntryBtn from '@/Components/AddNewEntryBtn'
import BackButton from '@/Components/backButton'
import SpendingDashBoard from '@/Components/SpendingDashBoard'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import BudgetLists from '@/Components/BudgetLists'

export const Route = createFileRoute('/expenses/')({
  component: ExpensesPage,
})

export type Expense = {
  id: number
  name: string
  category: string
  amount: number
  date: string
}

export type Income = {
  id: number
  name: string
  category: string
  amount: number
  date: string
}

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const [incomes, setIncomes] = useState<Income[]>([])

  useEffect(() => {
    fetchBudget()
  }, [])

  const refreshUI = (newItem: Expense | Income, type: string) => {
    if (type == 'Expense') {
      setExpenses((prev) => [...prev, newItem])
    } else {
      setIncomes((prev) => [...prev, newItem])
    }
  }

  const updateEntry = async (item: Expense | Income, type: string) => {
    if (type == 'expense') {
      const response = await fetch(`http://localhost:8080/expense`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
    } else {
      const response = await fetch(`http://localhost:8080/income`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
    }
  }

  const deleteEntry = async (id: number, type: string) => {
    if (type == 'expense') {
      let response = await fetch(
        `http://localhost:8080/expense/removeExpense/${id}`,
        { method: 'DELETE' },
      )
      setExpenses(expenses.filter((ex) => ex.id != id))
    } else {
      let response = await fetch(
        `http://localhost:8080/income/removeIncome/${id}`,
        { method: 'DELETE' },
      )
      setIncomes(incomes.filter((inc) => inc.id != id))
    }
  }

  const fetchBudget = async () => {
    const expenses = await fetch('http://localhost:8080/expense')
    const expensesData = await expenses.json()
    setExpenses(expensesData)

    const income = await fetch('http://localhost:8080/income')
    const incomeData = await income.json()
    setIncomes(incomeData)
  }

  return (
    <div className="p-6  mx-auto">
      <BackButton />
      <h1 className="text-3xl font-bold text-[#0d3a5c]  ml-6 mt-9">
        CURRENT CASH FLOW
      </h1>
      <section className="flex gap-10 ml-5 mb-10">
        <div>
          <h2 className="text-2xl font-bold text-[#0d3a5c] ml-2 my-5">
            Expenses
          </h2>
          <BudgetLists
            list={expenses}
            type="expense"
            updateEntry={updateEntry}
            deleteListItem={deleteEntry}
          ></BudgetLists>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#0d3a5c]   my-5">Income</h2>
          <BudgetLists
            list={incomes}
            type="income"
            updateEntry={updateEntry}
            deleteListItem={deleteEntry}
          ></BudgetLists>
        </div>
        <div>
          <SpendingDashBoard
            expenses={expenses}
            income={incomes}
          ></SpendingDashBoard>
        </div>
      </section>

      <section className="flex justify-between items-center">
        <AddNewEntryBtn refreshUI={refreshUI}></AddNewEntryBtn>
      </section>
    </div>
  )
}
