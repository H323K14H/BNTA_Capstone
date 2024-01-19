package com.capstone.backend_server.DTOs;

import java.util.ArrayList;
import java.util.Arrays;

public class Agent {
    public ArrayList<Double> start_location;

    public Agent() {
    }

    public Agent(ArrayList<Double> start_location) {
        this.start_location = start_location;
    }

    public ArrayList<Double> getStart_location() {
        return start_location;
    }

    public void setStart_location(ArrayList<Double> start_location) {
        this.start_location = start_location;
    }
}
