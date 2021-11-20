package com.poc.demo.core.booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    BookingRepository bookingRepository;


    public Optional<Booking> getBooking(Long id) {
        return bookingRepository.findById(id);
    }

    public Iterable<Booking> getBookings() {
        return bookingRepository.findAll();
    }

    public Long getBookingsCount() {
        return bookingRepository.count();
    }
}
