package com.vlad.erp_backend.repository;

import com.vlad.erp_backend.model.Conveyor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConveyorRepository extends JpaRepository<Conveyor, Long> {}