package com.poc.demo.core.waypoint;

import com.poc.demo.core.booking.Booking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = "/api/waypoints")
public class WaypointController {

    @Autowired
    WaypointService waypointService;


    @GetMapping("/")
    public ResponseEntity<Iterable<Waypoint>> getWaypoints() {
        log.info("Getting all Waypoints");

        return new ResponseEntity<>(waypointService.getWaypoints(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Waypoint>> getWaypoint(@PathVariable(name = "id") final Long id) {
        log.info("Getting Waypoint with ID: " + id);
        return new ResponseEntity<>(waypointService.getWaypoint(id), HttpStatus.OK);
    }

}
