package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Leg {
    public int time;
    public int distance;
    public int from_waypoint_index;
    public int to_waypoint_index;
    public ArrayList<Step> steps;
}
