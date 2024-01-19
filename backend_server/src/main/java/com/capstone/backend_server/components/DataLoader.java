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

        DeliveryAddress deliveryAddress1 = new DeliveryAddress(-0.12463613175773046,51.50079595927124, "Big Ben, Westminster, London SW1A 2JR",warehouse1 );
        warehouse1.addDeliveryAddress(deliveryAddress1);

        DeliveryAddress deliveryAddress2 = new DeliveryAddress( -0.08384882579080091,51.516050601098655, "Lloyds Bank, 33 Old Broad St, London EC2N 3AH",warehouse1 );
        warehouse1.addDeliveryAddress(deliveryAddress2);

        DeliveryAddress deliveryAddress3 = new DeliveryAddress( -0.1233395278971216,51.513224223459744, "Lloyds Bank, Villiers House, 48-49 Strand, London WC2N 5LL",warehouse1 );
        warehouse1.addDeliveryAddress(deliveryAddress3);

        DeliveryAddress deliveryAddress4 = new DeliveryAddress( -0.14945860485133247,51.517373907119996, "Lloyds Bank, 399 Oxford St, London W1C 2BU",warehouse1 );
        warehouse1.addDeliveryAddress(deliveryAddress4);

        Driver postmanPat = new Driver("PP",10, warehouse1, false);
        Driver driver2 = new Driver("NP",10, warehouse1, false);
        Driver driver3 = new Driver("FF",10, warehouse1, false);
        Driver driver4 = new Driver("RM",10, warehouse1, false);

        Driver phatController = new Driver("H323", 0, warehouse1, true);

        deliveryAddressRepository.save(deliveryAddress1);
        deliveryAddressRepository.save(deliveryAddress2);
        deliveryAddressRepository.save(deliveryAddress3);
        deliveryAddressRepository.save(deliveryAddress4);
        driverRepository.save(postmanPat);
        driverRepository.save(phatController);
        driverRepository.save(driver2);
        driverRepository.save(driver3);
        driverRepository.save(driver4);
        warehouseRepository.save(warehouse1);
    }
}
