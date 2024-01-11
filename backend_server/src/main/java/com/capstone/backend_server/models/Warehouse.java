package com.capstone.backend_server.models;

import jakarta.persistence.*;

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


}
