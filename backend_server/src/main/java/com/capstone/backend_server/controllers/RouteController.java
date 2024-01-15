package com.capstone.backend_server.controllers;

import com.capstone.backend_server.DTOs.Root;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.models.Warehouse;
import com.capstone.backend_server.services.RouteService;
import okhttp3.Response;
import okhttp3.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.web.bind.annotation.*;

import java.io.IOError;
import java.io.IOException;
import java.net.MalformedURLException;
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

            return new ResponseEntity<>(routeService.optimiseRoutes(), HttpStatus.CREATED);
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
}
