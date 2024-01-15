package com.capstone.backend_server.services;

import com.capstone.backend_server.DTOs.Root;
import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.repositories.RouteRepository;

import com.fasterxml.jackson.databind.ObjectMapper;
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

    public Root optimiseRoutes() throws IOException {

        String requestBody = "{\"mode\":\"drive\",\"agents\":[{\"start_location\":[-2.1652807680507853,51.845712750000004],\"time_windows\":[[0,7200]]}],\"shipments\":[{\"id\":\"order_1\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_2\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_3\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.156448191502295,51.84770025],\"duration\":120}},{\"id\":\"order_4\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.1565255499999996,51.8484407],\"duration\":120}},{\"id\":\"order_5\",\"pickup\":{\"location_index\":0,\"duration\":120},\"delivery\":{\"location\":[-2.1565255499999996,51.8484407],\"duration\":120}}],\"locations\":[{\"id\":\"warehouse-0\",\"location\":[-2.1587939,51.8469543]}]}";

        OkHttpClient client = new OkHttpClient().newBuilder()
                .build();
        MediaType mediaType = MediaType.parse("application/json");
        RequestBody body = RequestBody.create(requestBody, mediaType);
        Request request = new Request.Builder()
                .url("https://api.geoapify.com/v1/routeplanner?apiKey=ede22844945a44a28479f25cf8b53c52")
                .method("POST", body)
                .addHeader("Content-Type", "application/json")
                .build();
        try (Response response = client.newCall(request).execute()){
//            System.out.println(response.body().string());
            ObjectMapper objectMapper = new ObjectMapper();
//            ResponseBody responseBody = client.newCall(request).execute().body();
            Root root = objectMapper.readValue(response.body().string(), Root.class);
            System.out.println(root);
//            Assert.assertNotNull(entity);
//            Assert.assertEquals(sampleResponse.getName(), entity.getName());
            return root;

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
