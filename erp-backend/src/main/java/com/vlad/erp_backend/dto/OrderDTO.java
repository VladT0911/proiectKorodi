package com.vlad.erp_backend.dto;

import com.vlad.erp_backend.enums.Status;
import com.vlad.erp_backend.model.Conveyor;
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
    private String name;
    private Status status;
    private String product;
    private int quantity;
    private Date createdAt;
    private Long conveyorId;
    private String conveyorName;
}
