package com.vlad.erp_backend.service;

import com.vlad.erp_backend.dto.OrderDTO;
import com.vlad.erp_backend.mapper.OrderMapper;
import com.vlad.erp_backend.model.Order;
import com.vlad.erp_backend.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderMapper orderMapper;
    private final RestTemplate restTemplate;
    private static final String UNS_URL = "http://25.36.18.89:10000/api/orders";


    public List<OrderDTO> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(orderMapper::toDTO)
                .toList();
    }

    public OrderDTO createOrder(OrderDTO orderDTO) {
        var order = orderMapper.toEntity(orderDTO);
        var savedOrder = orderRepository.save(order);
        var createdDTO = orderMapper.toDTO(savedOrder);
        sendToUNS(createdDTO);
        return createdDTO;

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
    private void sendToUNS(OrderDTO order) {
        try {
            log.info(" Sending new order to UNS: {}", order);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<OrderDTO> request = new HttpEntity<>(order, headers);

            log.info(" Connecting to UNS at: {}", UNS_URL);

            ResponseEntity<String> response = restTemplate.postForEntity(UNS_URL, request, String.class);

            log.info(" Successfully sent order #{} to UNS. Status: {}", order.getId(), response.getStatusCode());
            log.info(" UNS Response body: {}", response.getBody());

        } catch (Exception e) {
            log.warn(" Failed to send order to UNS at {}. Error: {}", UNS_URL, e.getMessage());
            log.warn(" Order that failed to send: {}", order);
        }
    }


}

