package com.vlad.erp_backend.mapper;


import com.vlad.erp_backend.dto.ConveyorDTO;
import com.vlad.erp_backend.model.Conveyor;
import org.springframework.stereotype.Component;

@Component
public class ConveyorMapper {
    public ConveyorDTO toDTO(Conveyor conveyor)
    {
        return ConveyorDTO.builder()
                .id(conveyor.getId())
                .name(conveyor.getName())
                .status(conveyor.getStatus())
                .build();

    }
}
