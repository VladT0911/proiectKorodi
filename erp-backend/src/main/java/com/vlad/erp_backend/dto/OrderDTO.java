package com.vlad.erp_backend.dto;

import com.vlad.erp_backend.enums.Status;
import com.vlad.erp_backend.model.Conveyor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDTO {
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;


    private Status status;

    @NotBlank(message = "Product name is required")
    private String product;
    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;
    private Date createdAt;

    private Long conveyorId;
    private String conveyorName;
}
