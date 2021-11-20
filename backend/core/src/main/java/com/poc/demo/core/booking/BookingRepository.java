package com.poc.demo.core.booking;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;


public interface BookingRepository extends PagingAndSortingRepository<Booking, Long> {

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

    @Override
    Page<Booking> findAll(Pageable pageable);

    Page<Booking> findAllByNameContaining(String name, Pageable pageable);
}
