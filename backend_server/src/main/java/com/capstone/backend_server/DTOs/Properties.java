package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Properties {
    public String mode;
    public Params params;
    public int agent_index;
    public int time;
    public int start_time;
    public int end_time;
    public int distance;
    public ArrayList<Leg> legs;
    public ArrayList<Action> actions;
    public ArrayList<Waypoint> waypoints;
}
