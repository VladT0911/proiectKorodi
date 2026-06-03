package com.vlad.erp_backend.model;

import com.vlad.erp_backend.enums.Status;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String name;
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Status status;
    @Column
    private String product;
    @Column
    private int quantity;
    @Column
    private Date createdAt;
    @ManyToOne
    @JoinColumn(name = "conveyor_id")
    private Conveyor conveyor;


}
