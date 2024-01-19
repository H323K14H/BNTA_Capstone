package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Location {
    public String id;
    public ArrayList<Double> location;

    public Location() {
    }

    public Location(String id, ArrayList<Double> location) {
        this.id = id;
        this.location = location;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ArrayList<Double> getLocation() {
        return location;
    }

    public void setLocation(ArrayList<Double> location) {
        this.location = location;
    }
}
