package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "warehouse_id")
    @JsonIgnoreProperties({"deliveryAddresses", "drivers", "longitude", "latitude", "address", "routes", "checkpoints"})
    private Warehouse warehouse;

    @ManyToOne
    @JoinColumn(name = "driver_id")
    @JsonIgnoreProperties({"routes", "warehouse"})
    private Driver driver;

    @Column
    private Long upcomingCheckpointIndex;

    @OneToMany(mappedBy = "route")
    @JsonIgnoreProperties({"route"})
    private List<Checkpoint> checkpoints;

    public Route(Warehouse warehouse) {
        this.warehouse = warehouse;
        this.driver = null;
        this.upcomingCheckpointIndex = 0L;
        this.checkpoints = new ArrayList<>();
    }

    public Route() {
    }

    public void addCheckpoint(Checkpoint checkpoint) {
        this.checkpoints.add(checkpoint);
    }

    public void removeCheckpoint(Checkpoint checkpoint) {
        this.checkpoints.remove(checkpoint);
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

    public List<Checkpoint> getCheckpoints() {
        this.checkpoints.sort((a, b) -> Math.toIntExact(
                (a.getId() - b.getId())
        ));
        return this.checkpoints;
    }


    public void setCheckpoints(List<Checkpoint> checkpoints) {
        this.checkpoints = checkpoints;
    }
}
