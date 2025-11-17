package com.budgetify.Controllers;

import com.budgetify.Models.Expense;
import com.budgetify.Models.Income;
import com.budgetify.Interfaces.IIncomeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/income")
public class IncomeController {
    private final IIncomeService incomeService;

    public IncomeController(IIncomeService inService){
        this.incomeService = inService;
    }

    @GetMapping
    public List<Income> getIncomeList(){

        return incomeService.getAllIncomeSources();
    }

    @PostMapping("/addIncomeSource")
    public Income addIncome (@RequestBody Income incomeSource){

        return incomeService.addNewIncomeSource(incomeSource);
    }

    @DeleteMapping("/removeIncome/{id}")
    public String removeIncome(@PathVariable Integer id){

        return incomeService.RemoveIncomeSource(id);
    }

    @PutMapping("/updateIncome")
    public Income updateIncome(@RequestBody Income income){

        return incomeService.UpdateIncomeSource(income);
    }
}
