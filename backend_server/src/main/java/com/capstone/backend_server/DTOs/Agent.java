package com.capstone.backend_server.DTOs;

import java.util.ArrayList;
import java.util.Arrays;

public class Agent {
    public ArrayList<Double> start_location;
//    public ArrayList<ArrayList<Integer>> time_windows;

    public Agent() {
    }

    public Agent(ArrayList<Double> start_location) {
        this.start_location = start_location;
//        this.time_windows = null;
    }

    public ArrayList<Double> getStart_location() {
        return start_location;
    }

    public void setStart_location(ArrayList<Double> start_location) {
        this.start_location = start_location;
    }

//    public ArrayList<ArrayList<Integer>> getTime_windows() {
//        return time_windows;
//    }
//
//    public void setTime_windows(ArrayList<ArrayList<Integer>> time_windows) {
//        this.time_windows = time_windows;
//    }
}
