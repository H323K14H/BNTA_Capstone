package com.capstone.backend_server.DTOs;

public class Shipment {
    public String id;
    public Pickup pickup;
    public Delivery delivery;

    public Shipment() {
    }

    public Shipment(String id, Pickup pickup, Delivery delivery) {
        this.id = id;
        this.pickup = pickup;
        this.delivery = delivery;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Pickup getPickup() {
        return pickup;
    }

    public void setPickup(Pickup pickup) {
        this.pickup = pickup;
    }

    public Delivery getDelivery() {
        return delivery;
    }

    public void setDelivery(Delivery delivery) {
        this.delivery = delivery;
    }
}
