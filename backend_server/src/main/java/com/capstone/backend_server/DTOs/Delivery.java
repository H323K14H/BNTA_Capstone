package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Delivery {
    public ArrayList<Double> location;
    public int duration;

    public Delivery() {
    }

    public Delivery(ArrayList<Double> location) {
        this.location = location;
        this.duration = 120;
    }

    public ArrayList<Double> getLocation() {
        return location;
    }

    public void setLocation(ArrayList<Double> location) {
        this.location = location;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
