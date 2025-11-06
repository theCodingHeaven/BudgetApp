package com.budgetify.Interfaces;

import com.budgetify.Models.Expense;
import java.util.List;


public interface IExpenseService {

    public List<Expense> getAllExpenses();
    public Expense addNewExpense(Expense expense);
    public String RemoveExpense(Integer id);
    public Expense UpdateExpense(Expense expense);
}
