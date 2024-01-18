package com.capstone.backend_server.DTOs;

public class DeliveryAddressDTO {

    private double longitude;

    private double latitude;

    private String name;

    private Long warehouseId;

    public DeliveryAddressDTO(double longitude, double latitude, String name, Long warehouseId) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.name = name;
        this.warehouseId = warehouseId;
    }

    public DeliveryAddressDTO() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getWarehouseId() {
        return warehouseId;
    }

    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }
}
