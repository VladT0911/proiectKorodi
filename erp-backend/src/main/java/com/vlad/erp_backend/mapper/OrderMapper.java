package com.vlad.erp_backend.mapper;

import com.vlad.erp_backend.dto.OrderDTO;
import com.vlad.erp_backend.model.Conveyor;
import com.vlad.erp_backend.model.Order;
import com.vlad.erp_backend.repository.ConveyorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class OrderMapper {
    private final ConveyorRepository conveyorRepository;

    public OrderDTO toDTO(Order order)
    {
        return OrderDTO.builder()
                .id(order.getId())
                .name(order.getName())
                .status(order.getStatus())
                .product(order.getProduct())
                .quantity(order.getQuantity())
                .createdAt(order.getCreatedAt())
                .conveyorId(order.getConveyor() != null ? order.getConveyor().getId() : null)
            .conveyorName(order.getConveyor() != null ? order.getConveyor().getName() : null)
                .build();

    }
    public Order toEntity(OrderDTO dto)
    {
        Conveyor conveyor = null;
        if (dto.getConveyorId() != null) {
            conveyor = conveyorRepository.findById(dto.getConveyorId())
                    .orElseThrow(() -> new RuntimeException("Conveyor not found with id: " + dto.getConveyorId()));
        }
        return Order.builder()
                .id(dto.getId())
                .name(dto.getName())
                .status(dto.getStatus())
                .product(dto.getProduct())
                .quantity(dto.getQuantity())
                .createdAt(dto.getCreatedAt())
                .conveyor(conveyor)
                .build();

    }
}
