package com.capstone.backend_server.services;

import com.capstone.backend_server.DTOs.*;
import com.capstone.backend_server.models.Checkpoint;
import com.capstone.backend_server.models.DeliveryAddress;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.models.Warehouse;
import com.capstone.backend_server.repositories.CheckpointRepository;
import com.capstone.backend_server.repositories.DeliveryAddressRepository;
import com.capstone.backend_server.repositories.RouteRepository;

import com.capstone.backend_server.repositories.WarehouseRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
//
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

//extra imports
import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

@Service
public class RouteService {

    @Autowired
    CheckpointRepository checkpointRepository;

    @Autowired
    RouteRepository routeRepository;

    @Autowired
    WarehouseRepository warehouseRepository;

    @Autowired
    DeliveryAddressRepository deliveryAddressRepository;

    public String createRequestBody(){

        Warehouse warehouse = warehouseRepository.findById(1L).get();
        ArrayList<Double> warehouseStartLocation = new ArrayList<>(Arrays.asList(warehouse.getLongitude(), warehouse.getLatitude()));

        Agent agent = new Agent(warehouseStartLocation);

        ArrayList<Shipment> shipments = new ArrayList<>();

        for (DeliveryAddress deliveryAddress : warehouse.getDeliveryAddresses()) {
            Delivery delivery = new Delivery(new ArrayList<>(Arrays.asList(deliveryAddress.getLongitude(), deliveryAddress.getLatitude())));
            Shipment shipment = new Shipment(deliveryAddress.getId().toString(), new Pickup(), delivery);

            shipments.add(shipment);
        }

        Location location = new Location(warehouse.getId().toString(), warehouseStartLocation);

        Params params = new Params(new ArrayList<>(List.of(agent)),shipments, new ArrayList<>(List.of(location)));

        ObjectMapper objectMapper = new ObjectMapper();

        try {
            return objectMapper.writeValueAsString(params);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public Route optimiseRoutes() throws IOException {

        String requestBody = createRequestBody();

        System.out.println(requestBody);

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(requestBody, mediaType);
        Request request = new Request.Builder()
                .url("https://api.geoapify.com/v1/routeplanner?apiKey=44de521bdc594b12a3cba072ccaabace")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()) {
            ObjectMapper objectMapper = new ObjectMapper();
            assert response.body() != null;
            Root root = objectMapper.readValue(response.body().string(), Root.class);
            System.out.println(root.toString());
//            ArrayList<ArrayList<ArrayList<Double>>> coordinates = root.features.get(0).geometry.coordinates;

//            return coordinates2Route(root.features.get(0).geometry.coordinates);
            return waypoints2Route(root.features.get(0).properties.waypoints);
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    private Route waypoints2Route(ArrayList<Waypoint> waypoints) {
        Route route = new Route(warehouseRepository.findById(1L).get());
        routeRepository.save(route);

        Checkpoint warehouse = new Checkpoint(route,
                waypoints.get(0).location.get(0),
                waypoints.get(0).location.get(1),
                route.getWarehouse().getAddress());

        checkpointRepository.save(warehouse);
        route.addCheckpoint(warehouse);

        for (Waypoint waypoint : waypoints.subList(1, waypoints.size())) {
            Long deliveryAddressId = waypoint.actions.get(0).shipment_id;

            Checkpoint checkpoint = new Checkpoint(route,
                    waypoint.location.get(0),
                    waypoint.location.get(1),
                    deliveryAddressRepository.findById(deliveryAddressId).get().getAddress()
            );

            checkpointRepository.save(checkpoint);
            route.addCheckpoint(checkpoint);
        }

        routeRepository.save(route);

        return route;


    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }

    public Route coordinates2Route(ArrayList<ArrayList<ArrayList<Double>>> coordinates) {
        ArrayList<Checkpoint> checkpoints = new ArrayList<>();
        Route route = new Route(warehouseRepository.findById(1L).get());
        routeRepository.save(route);

        Checkpoint warehouse = new Checkpoint(route,
                coordinates.get(0).get(0).get(0),
                coordinates.get(0).get(0).get(1),
                route.getWarehouse().getAddress());

        checkpointRepository.save(warehouse);
        route.addCheckpoint(warehouse);

        for (ArrayList<ArrayList<Double>> coordinate : coordinates) {
            Checkpoint checkpoint = new Checkpoint(route,
                    coordinate.get(0).get(0),
                    coordinate.get(0).get(1),
                    ""
                    );

            checkpointRepository.save(checkpoint);
            route.addCheckpoint(checkpoint);
        }

        routeRepository.save(route);

        return route;
    }
}
