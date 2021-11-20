package com.poc.demo.amqproducer.rabbit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping(value = "/amq")
public class RabbitMqWebController {
    private static final String exchangeName = "MessageExchange";

    @Autowired
    private AmqpTemplate amqpTemplate;

    @PostMapping("/bookings")
    public ResponseEntity<Object> createBooking(@RequestBody Object booking) {
        try {
            log.info("Creating a new Booking: {}", booking);
            amqpTemplate.convertAndSend(exchangeName, "booking.add", booking);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (AmqpException e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Fail to create new booking", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/bookings/{id}")
    public ResponseEntity<Object> updateBooking(@RequestBody Object booking,
                                                @PathVariable(name = "id") final Long id) {
        log.info("Updating  Booking: {}", booking);
        try {
            amqpTemplate.convertAndSend(exchangeName, "booking.edit", booking);
            return new ResponseEntity<>(booking, HttpStatus.OK);
        } catch (AmqpException e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Error updating booking entry.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<String> createBooking(@PathVariable(name = "id") final Long id) {
        log.info("Deleting  Booking: {}", id);
        try {
            amqpTemplate.convertAndSend(exchangeName, "booking.delete", id);
            return new ResponseEntity<>("Booking entry deleted with success.", HttpStatus.OK);
        } catch (AmqpException e) {
            log.error(e.getMessage());
            return new ResponseEntity<>("Error deleting booking entry.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
