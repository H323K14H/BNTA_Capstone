package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @Column
    private String address;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<Route> routes;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<Driver> drivers;

    @OneToMany(mappedBy = "warehouse")
    @JsonIgnoreProperties({"warehouse"})
    private List<DeliveryAddress> deliveryAddresses;

    public Warehouse(double longitude, double latitude, String address) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.address = address;
        this.routes = new ArrayList<Route>();
        this.drivers = new ArrayList<Driver>();
        this.deliveryAddresses = new ArrayList<DeliveryAddress>();
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
