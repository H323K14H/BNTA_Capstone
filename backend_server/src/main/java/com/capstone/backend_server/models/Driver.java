package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

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
    @JsonIgnoreProperties({"driver","warehouse","upcomingCheckpointIndex", "checkpoints"})
    private List<Route> routes;

    @ManyToOne
    @JoinColumn(name= "warehouse_id")
    @JsonIgnoreProperties({"deliveryAddresses", "drivers", "routes"})
    private Warehouse warehouse;

    public Driver(String initials, int capacity, Warehouse warehouse) {
        this.initials = initials;
        this.capacity = capacity;
        this.routes = new ArrayList<>();
        this.warehouse = warehouse;
    }

    public Driver() {
    }

    public void addRoute(Route route){
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

    public List<Route> getRoutes() {
        return routes;
    }

    public void setRoutes(List<Route> routes) {
        this.routes = routes;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }
}
