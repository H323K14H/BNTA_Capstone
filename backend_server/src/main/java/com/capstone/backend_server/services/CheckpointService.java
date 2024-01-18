package com.capstone.backend_server.services;

import com.capstone.backend_server.models.Checkpoint;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.repositories.CheckpointRepository;
import com.capstone.backend_server.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CheckpointService {

    @Autowired
    CheckpointRepository checkpointRepository;

    @Autowired
    RouteRepository routeRepository;

    public Route markAsCompleted(Long id) {
        Checkpoint checkpoint = checkpointRepository.findById(id).get();
        checkpoint.setCompleted(true);
        checkpointRepository.save(checkpoint);
        Route route = checkpoint.getRoute();
        routeRepository.save(route);
        route.setUpcomingCheckpointIndex(route.getUpcomingCheckpointIndex() + 1 );
        routeRepository.save(route);

        return route; //checkpointRepository.findAllByRouteIdAndCompleted(route.getId(), true);
    }
}
