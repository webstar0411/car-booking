package com.poc.demo.core.waypoint;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface WaypointRepository extends CrudRepository<Waypoint, Long> {

    @Override
    <S extends Waypoint> S save(S entity);

    @Override
    Optional<Waypoint> findById(Long aLong);

    @Override
    Iterable<Waypoint> findAll();

    @Override
    void deleteById(Long aLong);
}
