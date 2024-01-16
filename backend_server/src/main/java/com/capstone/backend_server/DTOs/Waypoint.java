package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Waypoint{
    public ArrayList<Double> original_location;
    public ArrayList<Double> location;
    public int start_time;
    public int duration;
    public ArrayList<Action> actions;
    public int next_leg_index;
    public int original_location_index;
    public String original_location_id;
    public int prev_leg_index;
}