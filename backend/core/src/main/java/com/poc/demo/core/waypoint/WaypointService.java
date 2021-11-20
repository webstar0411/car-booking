package com.poc.demo.core.waypoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class WaypointService {

    @Autowired
    WaypointRepository waypointRepository;

    public Optional<Waypoint> getWaypoint(Long id) {
        return waypointRepository.findById(id);
    }

    public Iterable<Waypoint> getWaypoints() {
        return waypointRepository.findAll();
    }
}
