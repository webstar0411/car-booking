package com.poc.demo.core.booking;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = "/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    public ResponseEntity<Iterable<Booking>> getBookings() {
        log.info("Getting all bookings");

        return new ResponseEntity<>(bookingService.getBookings(), HttpStatus.OK);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Optional<Booking>> getBookingById(@PathVariable(name = "id") final Long id) {
        log.info("Getting booking with ID: " + id);
        return new ResponseEntity<>(bookingService.getBooking(id), HttpStatus.OK);
    }

}
