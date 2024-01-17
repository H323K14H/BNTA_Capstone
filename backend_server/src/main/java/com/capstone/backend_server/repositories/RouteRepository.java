package com.capstone.backend_server.repositories;

import com.capstone.backend_server.models.Checkpoint;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.models.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    List<Route> findAllByCheckpointsInAndWarehouseId(List<Checkpoint> checkpoints, Long warehouseId);

}
