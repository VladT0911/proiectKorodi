package com.vlad.erp_backend.dto;


import com.vlad.erp_backend.enums.ConveyorStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConveyorDTO {
    private Long id;
    private String name;
    private ConveyorStatus status;
}
