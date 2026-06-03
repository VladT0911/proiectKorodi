package com.vlad.erp_backend.controller;

import com.vlad.erp_backend.dto.ConveyorDTO;
import com.vlad.erp_backend.service.ConveyorService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/conveyors")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class ConveyorController {
    private final ConveyorService conveyorService;

    @GetMapping
    public List<ConveyorDTO> getAll() {
        return conveyorService.getAllConveyors();
    }
}