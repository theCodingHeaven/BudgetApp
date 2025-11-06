package com.budgetify.Services;

import com.budgetify.Data.IExpenseRepository;
import com.budgetify.Interfaces.IExpenseService;
import com.budgetify.Models.Expense;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExpenseService implements IExpenseService {

    public final IExpenseRepository repository;

    public ExpenseService(IExpenseRepository repo){
        this.repository = repo;
    }

    @Override
    public List<Expense> getAllExpenses() {

        return repository.findAll();
    }

    @Override
    public Expense addNewExpense(Expense expense) {

        try{
            return repository.save(expense);
        }
        catch (Exception ex){
            throw new RuntimeException("Can't save expense");
        }
    }
}
