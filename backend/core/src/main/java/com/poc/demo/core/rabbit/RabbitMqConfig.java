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
    DirectExchange exchange() {
        return new DirectExchange("BookingExchange");
    }

    @Bean
    Binding addBinding(Queue addQueue, DirectExchange exchange) {
        return BindingBuilder.bind(addQueue).to(exchange).with("addBooking");
    }

    @Bean
    Binding editBinding(Queue editQueue, DirectExchange exchange) {
        return BindingBuilder.bind(editQueue).to(exchange).with("editBooking");
    }

    @Bean
    Binding deleteBinding(Queue deleteQueue, DirectExchange exchange) {
        return BindingBuilder.bind(deleteQueue).to(exchange).with("deleteBooking");
    }


    @Bean
    Queue adminQueue() {
        return new Queue("adminQueue", false);
    }

    @Bean
    Binding adminBinding(Queue adminQueue, DirectExchange exchange) {
        return BindingBuilder.bind(adminQueue).to(exchange).with("admin");
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




//    public AmqpTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
//        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
//        rabbitTemplate.setMessageConverter(jsonMessageConverter());
//        return rabbitTemplate;
//    }
}
