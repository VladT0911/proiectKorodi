package com.vlad.erp_backend.service;

import com.vlad.erp_backend.dto.OrderDTO;
import com.vlad.erp_backend.mapper.OrderMapper;
import com.vlad.erp_backend.model.Order;
import com.vlad.erp_backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;

    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDTO)
                .toList();
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        var order = orderMapper.toEntity(orderDTO);
        var savedOrder = orderRepository.save(order);
        return orderMapper.toDTO(savedOrder);
    }

    public OrderDTO updateOrder(Long id,OrderDTO orderDTO)
    {

        Order existing = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        orderDTO.setId(id);
        orderDTO.setCreatedAt(existing.getCreatedAt());
        return orderMapper.toDTO(orderRepository.save(orderMapper.toEntity(orderDTO)));
    }

    public void deleteOrder(Long id)
    {
        orderRepository.deleteById(id);
    }


}

