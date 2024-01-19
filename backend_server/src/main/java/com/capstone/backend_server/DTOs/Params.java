package com.capstone.backend_server.DTOs;

import java.util.ArrayList;

public class Params {
    public String mode;
    public ArrayList<Agent> agents;
    public ArrayList<Shipment> shipments;
    public ArrayList<Location> locations;

    public Params() {
    }

    public Params(ArrayList<Agent> agents, ArrayList<Shipment> shipments, ArrayList<Location> locations) {
        this.mode = "drive";
        this.agents = agents;
        this.shipments = shipments;
        this.locations = locations;
    }

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public ArrayList<Agent> getAgents() {
        return agents;
    }

    public void setAgents(ArrayList<Agent> agents) {
        this.agents = agents;
    }

    public ArrayList<Shipment> getShipments() {
        return shipments;
    }

    public void setShipments(ArrayList<Shipment> shipments) {
        this.shipments = shipments;
    }

    public ArrayList<Location> getLocations() {
        return locations;
    }

    public void setLocations(ArrayList<Location> locations) {
        this.locations = locations;
    }
}
