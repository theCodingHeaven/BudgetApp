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
    public List<Income> getExpensesList(){

        return incomeService.getAllIncomeSources();
    }

    @PostMapping("/addIncomeSource")
    public Income addExpense (@RequestBody Income incomeSource){

        return incomeService.addNewIncomeSource(incomeSource);
    }
}
