package com.capstone.backend_server.models;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    private Driver driver;

    @Column
    private Long upcomingCheckpointIndex;

    @OneToMany(mappedBy = "route")
    //Json ignore?
    private ArrayList<Checkpoint> checkpoints;

    public Route(Warehouse warehouse) {
        this.warehouse = warehouse;
        this.driver = null;
        this.upcomingCheckpointIndex = 0L;
        this.checkpoints = new ArrayList<>();
    }

    public Route() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Warehouse getWarehouse() {
        return warehouse;
    }

    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Driver getDriver() {
        return driver;
    }

    public void setDriver(Driver driver) {
        this.driver = driver;
    }

    public Long getUpcomingCheckpointIndex() {
        return upcomingCheckpointIndex;
    }

    public void setUpcomingCheckpointIndex(Long upcomingCheckpointIndex) {
        this.upcomingCheckpointIndex = upcomingCheckpointIndex;
    }

    public ArrayList<Checkpoint> getCheckpoints() {
        return checkpoints;
    }

    public void setCheckpoints(ArrayList<Checkpoint> checkpoints) {
        this.checkpoints = checkpoints;
    }
}
