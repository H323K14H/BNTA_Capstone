package com.capstone.backend_server.controllers;

import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.services.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/routes")
public class RouteController {

    @Autowired
    RouteService routeService;

    @PostMapping("/start")
    public ResponseEntity<Route> createRoutes() {
        try {
            Route route = routeService.optimiseRoutes();
            return new ResponseEntity<>(
                    route,
                    route == null ? HttpStatus.BAD_REQUEST : HttpStatus.CREATED
            );
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }

    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        return new ResponseEntity<>(routeService.getAllRoutes(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> getRouteById(@PathVariable Long id) {
        Optional<Route> routeByID = routeService.getRouteById(id);
        return new ResponseEntity<>(
                routeByID.orElse(null),
                routeByID.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK
        );
    }

    @PatchMapping("/{routeId}")
    public ResponseEntity<Route> assignDriver(@PathVariable Long routeId,@RequestParam Long driverId){
        Route route = routeService.assignDriver(routeId, driverId);
        return new ResponseEntity<>(route, HttpStatus.OK);
    }
}
