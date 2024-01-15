package com.capstone.backend_server.services;

import com.capstone.backend_server.DTOs.Root;
import com.capstone.backend_server.models.Checkpoint;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.models.Warehouse;
import com.capstone.backend_server.repositories.CheckpointRepository;
import com.capstone.backend_server.repositories.RouteRepository;

import com.capstone.backend_server.repositories.WarehouseRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
//
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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

    public RouteService() {
    }

    public Route optimiseRoutes() throws IOException {

        String requestBody = "{\"mode\":\"drive\",\"agents\":[{\"start_location\":[-2.1587939,51.8469543],\"time_windows\":[[0,7200]]}],\"shipments\":[{\"id\":\"order_1\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_2\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_3\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_4\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.1565255499999996,51.8484407],\"duration\":120}},{\"id\":\"order_5\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.1565255499999996,51.8484407],\"duration\":120}}],\"locations\":[{\"id\":\"warehouse-0\",\"location\":[-2.1587939,51.8469543]}]}";

        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(requestBody, mediaType);
        Request request = new Request.Builder()
                .url("https://api.geoapify.com/v1/routeplanner?apiKey=51593e6fc4e64c918b4c087de41eafe0")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()) {
//            System.out.println(response.body().string());
            ObjectMapper objectMapper = new ObjectMapper();
//            ResponseBody responseBody = client.newCall(request).execute().body();
            Root root = objectMapper.readValue(response.body().string(), Root.class);
            System.out.println(root);
            ArrayList<ArrayList<ArrayList<Double>>> coordinates = root.features.get(0).geometry.coordinates;
//            Assert.assertNotNull(entity);
//            Assert.assertEquals(sampleResponse.getName(), entity.getName());

            return coordinates2Route(coordinates);
        } catch (IOException e) {
            throw new IOException(e);
        }
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
                    "");

            checkpointRepository.save(checkpoint);
            route.addCheckpoint(checkpoint);
        }

        routeRepository.save(route);

        return route;
    }
}
