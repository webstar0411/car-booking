package com.poc.demo.core.rabbit;

import com.poc.demo.core.booking.Booking;
import com.poc.demo.core.booking.BookingService;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
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
        try {
            this.bookingService.saveBooking(booking);
        } catch (Exception e) {
            log.error("Fail to add booking: {}", e.getMessage());
        }
    }

    @RabbitListener(queues = "BookingEditQueue")
    public void editBooking(Booking booking) {
        log.info("Received Message From RabbitMQ(BookingEditQueue): " + booking);
        try {
            this.bookingService.updateBooking(booking);
        } catch (Exception e) {
            log.error("Fail to update booking: {}", e.getMessage());
        }
    }

    @RabbitListener(queues = "BookingDeleteQueue")
    public void deleteBooking(Long id) {
        log.info("Received Message From RabbitMQ(BookingDeleteQueue): " + id);
        try {
            this.bookingService.delete(id);
        } catch (Exception e) {
            log.error("Fail to delete booking: {}", e.getMessage());
        }
    }

    @RabbitListener(queues = "MessageAuditQueue")
    public void auditMessage(Object bo) {
        log.info("Received Message From RabbitMQ(MessageAuditQueue): " + bo);
    }
}
