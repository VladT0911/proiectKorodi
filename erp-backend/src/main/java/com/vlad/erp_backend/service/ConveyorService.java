package com.vlad.erp_backend.service;

import com.vlad.erp_backend.dto.ConveyorDTO;
import com.vlad.erp_backend.mapper.ConveyorMapper;
import com.vlad.erp_backend.repository.ConveyorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ConveyorService {
    private final ConveyorRepository conveyorRepository;
    private final ConveyorMapper conveyorMapper;

    public List<ConveyorDTO> getAllConveyors() {
        return conveyorRepository.findAll()
                .stream()
                .map(conveyorMapper::toDTO)
                .toList();
    }
}