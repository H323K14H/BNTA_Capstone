package com.capstone.backend_server.services;

import com.capstone.backend_server.DTOs.DeliveryAddressDTO;
import com.capstone.backend_server.models.DeliveryAddress;
import com.capstone.backend_server.models.Warehouse;
import com.capstone.backend_server.repositories.DeliveryAddressRepository;
import com.capstone.backend_server.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAddressService {

    @Autowired
    DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    public DeliveryAddressService() {
    }

    public List<DeliveryAddress> getAllDeliveryAddresses() {
        return deliveryAddressRepository.findAll();
    }

    public DeliveryAddress addDeliveryAddress(DeliveryAddressDTO deliveryAddressDTO) {
        Warehouse warehouse = warehouseRepository.findById(deliveryAddressDTO.getWarehouseId()).get();
        DeliveryAddress deliveryAddress = new DeliveryAddress(
                deliveryAddressDTO.getLongitude(),
                deliveryAddressDTO.getLatitude(),
                deliveryAddressDTO.getName(),
                warehouse
        );
        deliveryAddressRepository.save(deliveryAddress);
        return deliveryAddress;
    }
}
