package com.budgetify.Models;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "income")
@Data
@AllArgsConstructor
public class Income {
        @jakarta.persistence.Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer Id;
        private String name;
        private double amount;
        private String category;

        public Income(){}
}
