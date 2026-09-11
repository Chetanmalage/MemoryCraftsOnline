package com.memorycrafts.memorycrafts_backend.service;

import com.memorycrafts.memorycrafts_backend.entity.Order;
import com.memorycrafts.memorycrafts_backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }

    public Optional<Order> getOrderById(String id) {
        return orderRepository.findById(id);
    }
}