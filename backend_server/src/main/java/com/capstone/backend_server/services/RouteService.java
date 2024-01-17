package com.capstone.backend_server.services;

import com.capstone.backend_server.DTOs.*;
import com.capstone.backend_server.models.*;
import com.capstone.backend_server.repositories.*;

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

    @Autowired
    DriverRepository driverRepository;

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
                .url("https://api.geoapify.com/v1/routeplanner?apiKey=7a358ff69f73407ca1c7404e6e7b0261")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()) {
            ObjectMapper objectMapper = new ObjectMapper();
            assert response.body() != null;
            Root root = objectMapper.readValue(response.body().string(), Root.class);
            System.out.println(root.toString());


            return waypoints2Route(root.features.get(0).properties.waypoints);
        } catch (IOException e) {
            throw new IOException(e);
        }
    }

    private Route waypoints2Route(ArrayList<Waypoint> waypoints) {

        List<Checkpoint> checkpoints = new ArrayList<>();

        Route route = new Route(warehouseRepository.findById(1L).get());
//        routeRepository.save(route);

        Checkpoint warehouse = new Checkpoint(route, route.getWarehouse());

        checkpoints.add(warehouse);

//        checkpointRepository.save(warehouse);
//        route.addCheckpoint(warehouse);

        for (Waypoint waypoint : waypoints.subList(1, waypoints.size())) {
            Long deliveryAddressId = waypoint.actions.get(0).shipment_id;

            Checkpoint checkpoint = new Checkpoint(route,deliveryAddressRepository.findById(deliveryAddressId).get());

//            checkpointRepository.save(checkpoint);
//            route.addCheckpoint(checkpoint);

            checkpoints.add(checkpoint);
        }
//        route.setCheckpoints(checkpoints);

//
//        for (Waypoint waypoint : waypoints.subList(1, waypoints.size())) {
//            Long deliveryAddressId = waypoint.actions.get(0).shipment_id;
//
//            Checkpoint checkpoint = new Checkpoint(route,deliveryAddressRepository.findById(deliveryAddressId).get());
//
//            checkpointRepository.save(checkpoint);
//            route.addCheckpoint(checkpoint);
//        }
//
        Route checkRoute = checkRoute(checkpoints);

        if (checkRoute != null){
            return checkRoute;
        }

        routeRepository.save(route);

        for (Checkpoint checkpoint : checkpoints){
            checkpointRepository.save(checkpoint);
            route.addCheckpoint(checkpoint);
        }

        return route;


    }

    public Route checkRoute(List<Checkpoint> checkpoints){
        List<Route> routes = routeRepository.findAll();

        if (routes.isEmpty()){
            return null;
        }

        for (Route route : routes){
            if (route.getCheckpoints().size() != checkpoints.size()){
                routes.remove(route);
            }
        }

        if (routes.isEmpty()){
            return null;
        }

        for (Route route : routes) {
            boolean isSameRoute = true;
            for (int i = 0; i < route.getCheckpoints().size(); i++) {
                System.out.println(i);
                if (route.getCheckpoints().get(i).getAddress().getLatitude() != checkpoints.get(i).getAddress().getLatitude() ){
                    isSameRoute = false;
                    break;
                }
                if (route.getCheckpoints().get(i).getAddress().getLongitude() != checkpoints.get(i).getAddress().getLongitude() ){
                    isSameRoute = false;
                    break;
                }
//                if (i == route.getCheckpoints().size()-1){
//                    return route;
//                }
            }
            if (isSameRoute){
                return route;
            }
        }
        return null;
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }


    public Route assignDriver(Long routeId, Long driverId) {
        Route route = routeRepository.findById(routeId).get();
        Driver driver = driverRepository.findById(driverId).get();

        if (route.getWarehouse().getId().equals(driver.getWarehouse().getId())){
            route.setDriver(driver);
            routeRepository.save(route);

            return route;
        }

        return null;
    }

}
