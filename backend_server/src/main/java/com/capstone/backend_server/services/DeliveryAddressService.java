package com.capstone.backend_server.services;

import com.capstone.backend_server.models.DeliveryAddress;
import com.capstone.backend_server.repositories.DeliveryAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAddressService {

    @Autowired
    DeliveryAddressRepository deliveryAddressRepository;

    public DeliveryAddressService() {
    }

    public List<DeliveryAddress> getAllDeliveryAddresses() {
        return deliveryAddressRepository.findAll();
    }
}
