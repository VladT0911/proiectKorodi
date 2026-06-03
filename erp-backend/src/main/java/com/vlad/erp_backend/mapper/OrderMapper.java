package com.vlad.erp_backend.mapper;

import com.vlad.erp_backend.dto.OrderDTO;
import com.vlad.erp_backend.model.Order;
import org.springframework.stereotype.Component;

@Component
public class OrderMapper {
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
        return Order.builder()
                .id(dto.getId())
                .name(dto.getName())
                .status(dto.getStatus())
                .product(dto.getProduct())
                .quantity(dto.getQuantity())
                .build();

    }
}
