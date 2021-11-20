package com.poc.demo.core.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;


    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public Page<Booking> getBookings(Pageable page) {
        return bookingRepository.findAll(page);
    }

    public Page<Booking> getBookingsFilterByName(String filter, Pageable page) {
        return bookingRepository.findAllByNameContaining(filter, page);
    }

    public Long getBookingsCount() {
        return bookingRepository.count();
    }
}
