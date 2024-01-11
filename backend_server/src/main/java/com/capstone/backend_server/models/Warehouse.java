package com.capstone.backend_server.models;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "warehouses")
public class Warehouse {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private double longitude;
    @Column
    private double latitude;

    @OneToMany(mappedBy = "warehouse")
    //Json ignore?
    private ArrayList<Route> routes;

    @OneToMany(mappedBy = "warehouse")
    //Json ignore?
    private ArrayList<Driver> drivers;

    @OneToMany(mappedBy = "warehouse")
    //Json ignore?
    private ArrayList<DeliveryAddress> deliveryAddresses;

    public Warehouse(double longitude, double latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.routes = new ArrayList<>();
        this.drivers = new ArrayList<>();
        this.deliveryAddresses = new ArrayList<>();
    }

    public Warehouse() {
    }

    private void addRoute(Route route){
        this.routes.add(route);
    }

    private void removeRoute(Route route){
        this.routes.remove(route);
    }

    private void addDriver(Driver driver){
        this.drivers.add(driver);
    }

    private void removeDriver(Driver driver){
        this.drivers.remove(driver);
    }

    private void addDeliveryAddress(DeliveryAddress deliveryAddress){
        this.deliveryAddresses.add(deliveryAddress);
    }

    private void removeDeliveryAddress(DeliveryAddress deliveryAddress){
        this.deliveryAddresses.remove(deliveryAddress);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public ArrayList<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(ArrayList<Route> routes) {
        this.routes = routes;
    }

    public ArrayList<Driver> getDrivers() {
        return drivers;
    }

    public void setDrivers(ArrayList<Driver> drivers) {
        this.drivers = drivers;
    }

    public ArrayList<DeliveryAddress> getDeliveryAddresses() {
        return deliveryAddresses;
    }

    public void setDeliveryAddresses(ArrayList<DeliveryAddress> deliveryAddresses) {
        this.deliveryAddresses = deliveryAddresses;
    }
}
