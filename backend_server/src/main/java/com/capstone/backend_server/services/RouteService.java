package com.capstone.backend_server.services;

import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.repositories.RouteRepository;

import org.springframework.beans.factory.annotation.Autowired;
//
import org.springframework.stereotype.Service;
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
    RouteRepository routeRepository;

    public RouteService() {
    }

    public void optimiseRoutes() throws IOException {

        String requestBody = "{\"mode\":\"drive\",\"agents\":[{\"start_location\":[10.985736727197894,48.2649593],\"end_location\":[10.896261152517647,48.33227795],\"pickup_capacity\":5}],\"jobs\":[{\"location\":[10.98698105,48.25615875],\"duration\":300,\"pickup_amount\":1},{\"location\":[10.9845547,48.26311145],\"duration\":300,\"pickup_amount\":1},{\"location\":[10.984630924828402,48.263248250000004],\"duration\":300,\"pickup_amount\":2},{\"location\":[10.968364837855287,48.262043399999996],\"duration\":300,\"pickup_amount\":1},{\"location\":[10.984364769628737,48.25542385],\"duration\":300,\"pickup_amount\":1}]}";

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(requestBody, mediaType);
        Request request = new Request.Builder()
                .url("https://api.geoapify.com/v1/routeplanner?apiKey=OUR_KEY")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()){
            System.out.println(response.body());
        } catch (IOException e){
            throw new IOException(e);
        }
        
    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }
}
