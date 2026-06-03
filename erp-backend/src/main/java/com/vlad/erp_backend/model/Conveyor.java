package com.vlad.erp_backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.vlad.erp_backend.enums.ConveyorStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor



@Entity
@Table(name="conveyor")
public class Conveyor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name; // e.g. "Conveyor A", "Conveyor B"

    @Enumerated(EnumType.STRING)
    private ConveyorStatus status; // e.g. IDLE, RUNNING, FAULT

    @JsonIgnore
    @OneToMany(mappedBy = "conveyor", cascade = CascadeType.ALL)
    private List<Order> orders;




}
