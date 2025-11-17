import { useState } from 'react'
import { RadioGroup, FormControlLabel, Radio } from '@mui/material'
import CancelIcon from '@mui/icons-material/Cancel'
import type { Expense, Income } from '@/routes/expenses'

type AddEntryProps = {
  refreshUI: (item: Expense | Income, type: string) => void
}

const AddNewEntryBtn = ({ refreshUI }: AddEntryProps) => {
  const [displayForm, setFormDisplay] = useState(false)
  const [selectedBtn, setSelectedBtn] = useState('income')

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const body = {
      name: e.target.title.value,
      amount: e.target.amount.value,
      category: e.target.category.value,
      date: e.target.date.value,
    }

    // Call API
    // /expenses and /income
    let endpoint = selectedBtn[0].toUpperCase() + selectedBtn.slice(1)

    const response = await fetch(
      `http://localhost:8080/${selectedBtn.toLowerCase()}/add${endpoint}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    )
    const data = await response.json()
    setFormDisplay(false)
    refreshUI(body, endpoint)
  }

  return (
    <section>
      {displayForm && (
        <div
          className="  fixed inset-0 
  flex items-center justify-center
  backdrop-blur-md bg-black/40 
  z-50"
        >
          <form
            className="flex flex-col gap-5 bg-white p-6 rounded-3xl shadow-lg w-full max-w-md mx-auto"
            onSubmit={handleSubmit}
          >
            <h2 className="text-3xl font-bold  text-gray-800 flex justify-between items-center">
              <span>
                Add New {selectedBtn[0].toUpperCase() + selectedBtn.slice(1)}
              </span>
              <CancelIcon
                sx={{ color: '#DF3A3A' }}
                onClick={() => setFormDisplay(false)}
              ></CancelIcon>
            </h2>
            <label className="text-lg font-semibold text-gray-700">
              Select type:
            </label>
            <RadioGroup
              name="budget-type"
              value={selectedBtn}
              onChange={(e) => setSelectedBtn(e.target.value)}
            >
              <div className="flex items-center gap-4">
                <FormControlLabel
                  value="income"
                  control={<Radio color="warning" />}
                  label="Income"
                />

                <FormControlLabel
                  value="expense"
                  control={<Radio color="warning" />}
                  label="Expense"
                />
              </div>
            </RadioGroup>
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                {selectedBtn[0].toUpperCase() + selectedBtn.slice(1)} Title
              </label>
              <input
                type="text"
                required
                name="title"
                className="w-sm border-2 border-gray-300 rounded-xl px-4 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none"
              />
            </div>

            <div>
              <label className="block text- font-semibold text-gray-700 mb-1">
                Category
              </label>
              <input
                type="text"
                required
                name="category"
                className="w-sm border-2 border-gray-300 rounded-xl px-4 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                required
                name="amount"
                className="w-sm border-2 border-gray-300 rounded-xl px-4 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none"
              />
            </div>

            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              name="date"
              className="w-sm border-2 border-gray-300 rounded-xl px-4 py-2 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-300 outline-none"
            />
            <button
              type="submit"
              className="block my-4 w-sm border-4 text-2xl bg-[#f3de2c] rounded-3xl px-5 py-2 font-semibold"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {!displayForm && (
        <button
          className=" m-auto w-sm border-4 text-2xl bg-[#f3de2c] rounded-3xl px-5 py-2 font-semibold"
          onClick={() => setFormDisplay((prev) => !prev)}
        >
          ADD NEW ENTRY
        </button>
      )}
    </section>
  )
}

export default AddNewEntryBtn
