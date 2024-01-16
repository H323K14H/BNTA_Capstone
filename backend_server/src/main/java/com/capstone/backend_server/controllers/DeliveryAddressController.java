package com.capstone.backend_server.controllers;

import com.capstone.backend_server.models.DeliveryAddress;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.services.DeliveryAddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/delivery-addresses")
public class DeliveryAddressController {

    @Autowired
    DeliveryAddressService deliveryAddressService;

    @GetMapping
    public ResponseEntity<List<DeliveryAddress>> getAllDeliveryAddresses(){
        return new ResponseEntity<>(deliveryAddressService.getAllDeliveryAddresses(), HttpStatus.OK);
    }


}
