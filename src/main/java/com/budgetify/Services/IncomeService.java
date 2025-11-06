package com.budgetify.Services;


import com.budgetify.Data.IIncomeRepository;
import com.budgetify.Interfaces.IIncomeService;
import com.budgetify.Models.Expense;
import com.budgetify.Models.Income;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IncomeService implements IIncomeService {

    private final IIncomeRepository repository;

    public IncomeService(IIncomeRepository repo){
        this.repository = repo;
    }

    @Override
    public List<Income> getAllIncomeSources(){
        return repository.findAll();
    }
    @Override
    public Income addNewIncomeSource(Income incomeSource){

        try{
            return repository.save(incomeSource);
        }
        catch (Exception ex){
            throw new RuntimeException("Can't save income");
        }
    }
}
