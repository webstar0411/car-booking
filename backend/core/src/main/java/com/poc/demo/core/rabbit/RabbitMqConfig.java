package com.poc.demo.core.rabbit;

import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.annotation.RabbitListenerConfigurer;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.MessageListenerContainer;
import org.springframework.amqp.rabbit.listener.RabbitListenerEndpointRegistrar;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.handler.annotation.support.DefaultMessageHandlerMethodFactory;
import org.springframework.messaging.handler.annotation.support.MessageHandlerMethodFactory;


@Slf4j
@Configuration
public class RabbitMqConfig implements RabbitListenerConfigurer {

    // queues
    @Bean
    Queue addQueue() {
        return new Queue("BookingAddQueue", false);
    }

    @Bean
    Queue editQueue() {
        return new Queue("BookingEditQueue", false);
    }

    @Bean
    Queue deleteQueue() {
        return new Queue("BookingDeleteQueue", false);
    }

    @Bean
    Queue auditQueue() {
        return new Queue("MessageAuditQueue", false);
    }


    // exchanges
    @Bean
    TopicExchange messageExchange() {
        return new TopicExchange("MessageExchange");
    }

    @Bean
    DirectExchange bookingExchange() {
        return new DirectExchange("BookingExchange");
    }


    // bindings
    @Bean
    Binding addBinding(Queue addQueue, DirectExchange bookingExchange) {
        return BindingBuilder.bind(addQueue).to(bookingExchange).with("booking.add");
    }

    @Bean
    Binding editBinding(Queue editQueue, DirectExchange bookingExchange) {
        return BindingBuilder.bind(editQueue).to(bookingExchange).with("booking.edit");
    }

    @Bean
    Binding deleteBinding(Queue deleteQueue, DirectExchange bookingExchange) {
        return BindingBuilder.bind(deleteQueue).to(bookingExchange).with("booking.delete");
    }

    @Bean
    Binding auditBinding(Queue auditQueue, TopicExchange messageExchange) {
        return BindingBuilder.bind(auditQueue).to(messageExchange).with("booking.*");
    }

    @Bean
    Binding exchangeBinding(DirectExchange bookingExchange, TopicExchange messageExchange) {
        return BindingBuilder.bind(bookingExchange).to(messageExchange).with("booking.*");
    }


    @Bean
    MessageListenerContainer messageListenerContainer(ConnectionFactory connectionFactory) {
        SimpleMessageListenerContainer simpleMessageListenerContainer = new SimpleMessageListenerContainer();
        simpleMessageListenerContainer.setConnectionFactory(connectionFactory);
        return simpleMessageListenerContainer;
    }


    @Bean
    public MappingJackson2MessageConverter jsonMessageConverter() {
        return new MappingJackson2MessageConverter();
    }

    @Override
    public void configureRabbitListeners(RabbitListenerEndpointRegistrar registrar) {
        registrar.setMessageHandlerMethodFactory(messageHandlerMethodFactory());
    }

    @Bean
    MessageHandlerMethodFactory messageHandlerMethodFactory() {
        DefaultMessageHandlerMethodFactory messageHandlerMethodFactory = new DefaultMessageHandlerMethodFactory();
        messageHandlerMethodFactory.setMessageConverter(jsonMessageConverter());
        return messageHandlerMethodFactory;
    }

}
