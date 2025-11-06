package com.budgetify.Services;


import com.budgetify.Data.IIncomeRepository;
import com.budgetify.Interfaces.IIncomeService;
import com.budgetify.Models.Expense;
import com.budgetify.Models.Income;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    @Override
    public String RemoveIncomeSource(Integer id) {
        try{
            this.repository.deleteById(id);
            return "The income source was removed";
        }
        catch (Exception er){
            return "Could not remove the income source";
        }
    }

    @Override
    public Income UpdateIncomeSource(Income income) {
        Optional<Income> currentIncome = repository.findById(income.getId());
        if(currentIncome.isPresent()){
            Income fetchedIncome = currentIncome.get();
            fetchedIncome.setName(income.getName());
            fetchedIncome.setAmount(income.getAmount());
            fetchedIncome.setCategory(income.getCategory());
            try{
                return repository.save(fetchedIncome);
            }
            catch (Exception ex){
                throw new RuntimeException("Can't update income source");
            }
        }
        else {
            throw new RuntimeException("The income source does not exist");
        }
    }
}
