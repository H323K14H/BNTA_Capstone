package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "warehouses")
public class Warehouse extends Address {

//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<Route> routes;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<Driver> drivers;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<DeliveryAddress> deliveryAddresses;

//    @OneToMany(mappedBy = "location")
//    @JsonIgnore
//    private List<Checkpoint> checkpoints;

    @Column
    private boolean isWarehouse;

    public Warehouse(double longitude, double latitude, String address) {
        super(longitude, latitude, address);
        this.routes = new ArrayList<Route>();
        this.drivers = new ArrayList<Driver>();
        this.deliveryAddresses = new ArrayList<DeliveryAddress>();
//        this.checkpoints = new ArrayList<>();
        this.isWarehouse = true;
    }

    public Warehouse() {
    }

    public void addRoute(Route route){
        this.routes.add(route);
    }

    public void removeRoute(Route route){
        this.routes.remove(route);
    }

    public void addDriver(Driver driver){
        this.drivers.add(driver);
    }

    public void removeDriver(Driver driver){
        this.drivers.remove(driver);
    }

    public void addDeliveryAddress(DeliveryAddress deliveryAddress){
        this.deliveryAddresses.add(deliveryAddress);
    }

    public void removeDeliveryAddress(DeliveryAddress deliveryAddress){
        this.deliveryAddresses.remove(deliveryAddress);
    }

//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }


    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public List<Driver> getDrivers() {
        return drivers;
    }

    public void setDrivers(List<Driver> drivers) {
        this.drivers = drivers;
    }

    public List<DeliveryAddress> getDeliveryAddresses() {
        return deliveryAddresses;
    }

    public void setDeliveryAddresses(List<DeliveryAddress> deliveryAddresses) {
        this.deliveryAddresses = deliveryAddresses;
    }

//    public List<Checkpoint> getCheckpoints() {
//        return checkpoints;
//    }
//
//    public void setCheckpoints(List<Checkpoint> checkpoints) {
//        this.checkpoints = checkpoints;
//    }


    public boolean getIsWarehouse() {
        return isWarehouse;
    }

    public void setIsWarehouse(boolean warehouse) {
        isWarehouse = warehouse;
    }
}
