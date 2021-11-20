package com.poc.demo.core.booking;

import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface BookingRepository extends CrudRepository<Booking, Long> {

    @Override
    <S extends Booking> S save(S entity);

    @Override
    Optional<Booking> findById(Long aLong);

    @Override
    Iterable<Booking> findAll();

    @Override
    void deleteById(Long aLong);

    @Override
    long count();
}
