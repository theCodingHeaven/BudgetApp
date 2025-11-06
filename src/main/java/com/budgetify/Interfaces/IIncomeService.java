package com.budgetify.Interfaces;

import com.budgetify.Models.Expense;
import com.budgetify.Models.Income;

import java.util.List;

public interface IIncomeService {

    public List<Income> getAllIncomeSources();

    public Income addNewIncomeSource(Income incomeSource);

    public String RemoveIncomeSource(Integer id);

    public Income UpdateIncomeSource(Income income);
}