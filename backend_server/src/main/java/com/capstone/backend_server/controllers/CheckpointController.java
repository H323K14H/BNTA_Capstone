package com.capstone.backend_server.controllers;

import com.capstone.backend_server.models.Checkpoint;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.services.CheckpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/checkpoints")
public class CheckpointController {

    @Autowired
    CheckpointService checkpointService;

    @PatchMapping("/{id}")
    public ResponseEntity<Route> markAsCompleted(@PathVariable Long id){
       Route route = checkpointService.markAsCompleted(id);
       return new ResponseEntity<>(route, HttpStatus.OK);
    }

}
