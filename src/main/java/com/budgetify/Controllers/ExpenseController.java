package com.budgetify.Controllers;

import com.budgetify.Interfaces.IExpenseService;
import com.budgetify.Models.Expense;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expenses")
public class ExpenseController {

    private final IExpenseService expenseService;

    public ExpenseController(IExpenseService  exService){
        this.expenseService = exService;
    }

    @GetMapping
    public List<Expense> getExpensesList(){

        return expenseService.getAllExpenses();
    }

    @PostMapping("/addExpense")
    public Expense addExpense (@RequestBody Expense newExpense){

        return expenseService.addNewExpense(newExpense);
    }
    @DeleteMapping("/removeExpense/{id}")
    public String removeExpense(@PathVariable Integer id){

        return expenseService.RemoveExpense(id);
    }

    @PutMapping("/updateExpense/{id}")
    public Expense updateExpense(@RequestBody Expense expense){

        return expenseService.UpdateExpense(expense);
    }
}
