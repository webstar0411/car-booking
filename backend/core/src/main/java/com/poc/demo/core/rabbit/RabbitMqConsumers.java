package com.poc.demo.core.rabbit;

import com.poc.demo.core.booking.Booking;
import com.poc.demo.core.booking.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class RabbitMqConsumers {

    @Autowired
    private BookingService bookingService;

    @RabbitListener(queues = "BookingAddQueue")
    public void addBooking(Booking booking) {
        log.info("Received Message From RabbitMQ(BookingAddQueue): " + booking);
        this.bookingService.saveBooking(booking);
    }

    @RabbitListener(queues = "BookingEditQueue")
    public void editBooking(Booking booking) {
        log.info("Received Message From RabbitMQ(BookingEditQueue): " + booking);
        this.bookingService.updateBooking(booking);
    }

    @RabbitListener(queues = "BookingDeleteQueue")
    public void deleteBooking(Long id) {
        log.info("Received Message From RabbitMQ(BookingDeleteQueue): " + id);
        this.bookingService.delete(id);
    }
}
