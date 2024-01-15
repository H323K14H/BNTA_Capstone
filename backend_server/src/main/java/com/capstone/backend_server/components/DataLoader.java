package com.capstone.backend_server.components;

import com.capstone.backend_server.models.DeliveryAddress;
import com.capstone.backend_server.models.Driver;
import com.capstone.backend_server.models.Warehouse;
import com.capstone.backend_server.repositories.DeliveryAddressRepository;
import com.capstone.backend_server.repositories.DriverRepository;
import com.capstone.backend_server.repositories.WarehouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements ApplicationRunner {

    @Autowired
    DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    DriverRepository driverRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    public DataLoader(){}
    @Override
    public void run(ApplicationArguments args) throws Exception {

        Warehouse warehouse1 = new Warehouse(-0.0765148, 51.5166653, "Bright Network, 5th floor, 80 Middlesex St, London E1 7EZ");
        warehouseRepository.save(warehouse1);

        DeliveryAddress deliveryAddress1 = new DeliveryAddress(warehouse1,-0.12463613175773046,51.50079595927124, "Big Ben, Westminster, London SW1A 2JR" );
        warehouse1.addDeliveryAddress(deliveryAddress1);

        DeliveryAddress deliveryAddress2 = new DeliveryAddress(warehouse1, -0.08384882579080091,-51.516050601098655, "LBG, 33 Old Broad St, London EC2N 3AH" );
        warehouse1.addDeliveryAddress(deliveryAddress2);

        Driver postmanPat = new Driver("PP",5, warehouse1);

        deliveryAddressRepository.save(deliveryAddress1);
        deliveryAddressRepository.save(deliveryAddress2);
        driverRepository.save(postmanPat);
        warehouseRepository.save(warehouse1);
    }
}
