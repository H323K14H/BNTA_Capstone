package com.capstone.backend_server.services;

import com.capstone.backend_server.models.Route;
import com.capstone.backend_server.repositories.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class RouteService {

    @Autowired
    RouteRepository routeRepository;

    public RouteService() {
    }

    public void optimiseRoutes() {

//        HashMap<String, Object> carAttributes = new HashMap<>();
//        carAttributes.put("year", 2019);
//        carAttributes.put("price", 49999.99);
//        carAttributes.put("colour", "blue");
//        Car car1 = new Car("BWM x5", carAttributes);
//        ObjectMapper objectMapper = new ObjectMapper();
//        String requestBody = objectMapper.writeValueAsString(car1);
//
//        URL url = new URL("https://api.restful-api.dev/objects");
//        HttpsURLConnection conn = (HttpsURLConnection) url.openConnection();
//        conn.setRequestMethod("POST");
//        conn.setDoOutput(true);
//        conn.setRequestProperty("Content-Type", "application/json");
//        conn.setRequestProperty("User-Agent", "Mozilla/5.0");
//
//        // Send request to an API
//        try (DataOutputStream dos = new DataOutputStream(conn.getOutputStream())) {
//            dos.writeBytes(requestBody);
//        }
//
//        System.out.println("Response code: " + conn.getResponseCode());
//
//        // Read Response from and API
//        try (BufferedReader bf = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
//            String line;
//            while ((line = bf.readLine()) != null) {
//                System.out.println(line);
//            }
//        }

    }

    public List<Route> getAllRoutes() {
        return routeRepository.findAll();
    }

    public Optional<Route> getRouteById(Long id) {
        return routeRepository.findById(id);
    }
}
