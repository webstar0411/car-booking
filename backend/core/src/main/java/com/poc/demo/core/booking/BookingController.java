package com.poc.demo.core.booking;

import com.poc.demo.core.waypoint.Waypoint;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.Optional;

@Slf4j
@RestController
@RequestMapping(value = "/api")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        log.info("Creating new Booking: {}", booking);
        return new ResponseEntity<>(this.bookingService.saveBooking(booking), HttpStatus.OK);
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<Booking> updateBooking(@RequestBody Booking booking,
                                                 @PathVariable(name = "id") final Long id) {
        log.info("Updating  Booking: {}", booking);
        return new ResponseEntity<>(this.bookingService.updateBooking(booking), HttpStatus.OK);
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<Object> deleteBooking(@PathVariable(name = "id") final Long id) {
        log.info("Deleting  Booking: {}", id);
        this.bookingService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/bookings/{id}")
    public ResponseEntity<Optional<Booking>> getBookingById(@PathVariable(name = "id") final Long id) {
        log.info("Getting booking with ID: " + id);
        Optional<Booking> booking = bookingService.getBooking(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }


    @GetMapping("/bookings")
    public ResponseEntity<Page<Booking>> getBookings(
            @RequestParam(name = "filter") String filter,
            @RequestParam(name = "sortField") String sortField,
            @RequestParam(name = "sortOrder") String sortOrder,
            @RequestParam(name = "pageNumber") Integer pageNumber,
            @RequestParam(name = "pageSize") Integer pageSize
    ) {
        log.info("Getting all bookings: filter[{}],sortField[{}],sortOrder[{}],pageNumber[{}],pageSize[{}]",
                filter, sortField, sortOrder, pageNumber, pageSize);

        Sort sort = Sort.by(Sort.Direction.fromString(sortOrder), sortField);
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize, sort);

        Page<Booking> bookings;
        if (!Objects.equals(filter, "")) {
            bookings = bookingService.getBookingsFilterByName(filter, pageRequest);
        } else {
            bookings = bookingService.getBookings(pageRequest);
        }
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }


    @GetMapping("/bookings/count")
    public ResponseEntity<Long> getBookingsCount() {
        log.info("Getting number of bookings");

        return new ResponseEntity<>(bookingService.getBookingsCount(), HttpStatus.OK);
    }

}
