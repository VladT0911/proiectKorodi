package com.vlad.erp_backend.controller;

import com.vlad.erp_backend.dto.OrderDTO;
import com.vlad.erp_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping
    public List<OrderDTO> getAll()
    {
        return orderService.getAllOrders();
    }


    @PostMapping
    public ResponseEntity<OrderDTO>create(@RequestBody OrderDTO orderDTO)
    {
        return ResponseEntity.ok(orderService.createOrder(orderDTO));

    }

    @DeleteMapping("/{id}")
    void deleteOrder(@PathVariable Long id)
    {
         orderService.deleteOrder(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderDTO> update(@PathVariable Long id, @RequestBody OrderDTO dto)
    {
        return ResponseEntity.ok(orderService.updateOrder(id,dto));
    }




}
