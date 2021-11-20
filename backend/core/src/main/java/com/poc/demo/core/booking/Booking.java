package com.poc.demo.core.booking;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.poc.demo.core.waypoint.Waypoint;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;


@Entity(name = "bookings")
@Data
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "varchar(255) NOT NULL")
    private String name;

    @Column(columnDefinition = "varchar(20) NOT NULL")
    private String phone;

    private Timestamp pickup_time = Timestamp.valueOf(LocalDateTime.now());

    private Timestamp waiting_time = Timestamp.valueOf(LocalDateTime.now());

    private Boolean asap = true;

    private Integer number_of_passengers = 1;

    private Float price = 0.0f;

    private Float rating = 0f;

    private Date created_on  = Date.valueOf(LocalDate.now());

    private Date modified_on = Date.valueOf(LocalDate.now());

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Waypoint waypoint;
}
