package com.capstone.backend_server.DTOs;

public class Pickup {
    public int location_index;
    public int duration;

    public Pickup() {
        this.location_index = 0;
        this.duration = 120;
    }

    public int getLocation_index() {
        return location_index;
    }

    public void setLocation_index(int location_index) {
        this.location_index = location_index;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }
}
