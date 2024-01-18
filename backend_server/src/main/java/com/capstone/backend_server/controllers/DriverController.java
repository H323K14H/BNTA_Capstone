package com.capstone.backend_server.controllers;

import com.capstone.backend_server.models.Driver;
import com.capstone.backend_server.services.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/drivers")
public class DriverController {

    @Autowired
    DriverService driverService;

    @GetMapping("/{id}")
    public ResponseEntity<Driver> getDriverById(@PathVariable Long id) {
        Optional<Driver> driverByID = driverService.getDriverById(id);
        return new ResponseEntity<>(
                driverByID.orElse(null),
                driverByID.isEmpty() ? HttpStatus.NOT_FOUND : HttpStatus.OK
        );
    }

    @GetMapping
    public ResponseEntity<List<Driver>> getAllDrivers(){
        return new ResponseEntity<>(driverService.getAllDrivers(), HttpStatus.OK);
    }
}
