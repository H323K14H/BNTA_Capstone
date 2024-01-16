package com.capstone.backend_server.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
@Table(name = "checkpoints")
public class Checkpoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "route_id")
    @JsonIgnore
    private Route route;

    @ManyToOne
    @JoinColumn(name = "address_id")
    @JsonIgnoreProperties({"checkpoints", "routes", "drivers", "deliveryAddresses"})
//    @JsonIgnore
    Address address;

    public Checkpoint(Route route, Address address) {
        this.route = route;
        this.address = address;
    }

    public Checkpoint() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }
}
