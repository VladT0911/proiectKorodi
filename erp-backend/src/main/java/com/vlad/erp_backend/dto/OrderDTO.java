package com.vlad.erp_backend.dto;

import com.vlad.erp_backend.enums.Status;
import com.vlad.erp_backend.model.Conveyor;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @NotBlank(message = "Order name cannot be empty")
    private String name;

    @NotNull(message = "Status is required")
    private Status status;

    @NotBlank(message = "Product name cannot be empty")
    private String product;

    @Min(value = 1, message = "Quantity must be at least 1")
    private int quantity;


    private Date createdAt;

    @NotNull(message = "Conveyor must be selected")
    private Long conveyorId;
    private String conveyorName;
}
