package com.capstone.backend_server.models;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "drivers")
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String initials;

    @Column
    private int capacity;

    @OneToMany(mappedBy = "driver")
    //Json ignore?
    private ArrayList<Route> routes;

    @ManyToOne
    @JoinColumn(name= "warehouse_id")
    private Warehouse warehouse;

    public Driver(String initials, int capacity, Warehouse warehouse) {
        this.initials = initials;
        this.capacity = capacity;
        this.routes = new ArrayList<>();
        this.warehouse = warehouse;
    }

    public Driver() {
    }

    private void addRoute(Route route){
        this.routes.add(route);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getInitials() {
        return initials;
    }

    public void setInitials(String initials) {
        this.initials = initials;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public ArrayList<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(ArrayList<Route> routes) {
        this.routes = routes;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
