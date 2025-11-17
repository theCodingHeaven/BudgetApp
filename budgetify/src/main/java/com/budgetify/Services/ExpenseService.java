package com.budgetify.Services;

import com.budgetify.Data.IExpenseRepository;
import com.budgetify.Interfaces.IExpenseService;
import com.budgetify.Models.Expense;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public String RemoveExpense(Integer id){
        try{
            this.repository.deleteById(id);
            return "The expense was removed";
        }
        catch (Exception er){
            return "Could not remove the expense";
        }
    }

    @Override
    public Expense UpdateExpense(Expense expense){

        Optional<Expense> currentExpense = repository.findById(expense.getId());
        if(currentExpense.isPresent()){
            Expense fetchedExpense = currentExpense.get();
            fetchedExpense.setName(expense.getName());
            fetchedExpense.setAmount(expense.getAmount());
            fetchedExpense.setCategory(expense.getCategory());
            try{
                return repository.save(fetchedExpense);
            }
            catch (Exception ex){
                throw new RuntimeException("Can't update expense");
            }
        }
        else {
            throw new RuntimeException("The expense does not exist");
        }

    }
}
