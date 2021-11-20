package com.poc.demo.core.booking;

import com.poc.demo.core.waypoint.Waypoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
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

    public Booking saveBooking(Booking booking) {
        Waypoint waypoint = booking.getWaypoint();
        booking.setWaypoint(null);
        Booking newBooking = this.bookingRepository.save(booking);
        waypoint.setBooking(newBooking);
        newBooking.setWaypoint(waypoint);
        return this.bookingRepository.save(booking);
    }

    public Booking updateBooking(Booking booking) {
        return this.bookingRepository.save(booking);
    }

    public Long getBookingsCount() {
        return bookingRepository.count();
    }

    public Optional<Object> delete(Long id) {
        try {
            this.bookingRepository.deleteById(id);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
        return Optional.of("Booking Deleted");
    }
}
