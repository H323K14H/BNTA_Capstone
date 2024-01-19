package com.capstone.backend_server.repositories;

import com.capstone.backend_server.models.Checkpoint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckpointRepository extends JpaRepository<Checkpoint, Long> {
    List<Checkpoint> findAllByRouteIdAndCompleted(Long routeId, boolean completed);
}
