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

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private Timestamp pickup_time = Timestamp.valueOf(LocalDateTime.now());

    @Column(columnDefinition = "INTEGER default 1.0")
    private Integer waiting_time = 0;

    @Column(columnDefinition = "BOOLEAN default TRUE")
    private Boolean asap = true;

    @Column(columnDefinition = "INTEGER default 1")
    private Integer number_of_passengers = 1;

    @Column(columnDefinition = "DECIMAL default 0.0")
    private Float price = 0.0f;

    @Column(columnDefinition = "DECIMAL default 1.0")
    private Float rating = 1.0f;

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP")
    private Timestamp created_on  = Timestamp.valueOf(LocalDateTime.now());

    @Column(columnDefinition = "TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP")
    private Timestamp modified_on = Timestamp.valueOf(LocalDateTime.now());

    @OneToOne(mappedBy = "booking", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Waypoint waypoint;
}
