package com.poc.demo.core.booking;

import org.springframework.http.HttpStatus;

public class BookingNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public BookingNotFoundException(HttpStatus badRequest, final String message, Throwable e) {
        super(message);
    }
}
