package com.poc.demo.core.waypoint;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.poc.demo.core.booking.Booking;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;


@Entity(name = "waypoints")
@Data
public class Waypoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Column(nullable = false)
    private String locality;

    @Column(nullable = false)
    private double latitude;

    @Column(nullable = false)
    private double longitude;


    @Id
    @Column(name = "id")
    private Long id;

    @JsonIgnore
    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Booking booking;

}
