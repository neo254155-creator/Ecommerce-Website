//package com.SpringStore.Ecommerce.service;
////........//
//import java.time.LocalDateTime;
//import java.util.List;
//
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import com.SpringStore.Ecommerce.Repository.Carts_ItemRepository;
//import com.SpringStore.Ecommerce.Repository.OrdersRepository;
//import com.SpringStore.Ecommerce.entity.Orders;
//import com.SpringStore.Ecommerce.entity.Type.Status;
//
//@Component
//public class OrderStatusScheduler {
//
//    private final OrdersRepository ordersRepository;
//
//    public OrderStatusScheduler(OrdersRepository ordersRepository) {
//        this.ordersRepository = ordersRepository;
//    }
//
//    @Scheduled(cron = "0 0 * * * *")  
//    public void autoUpdateOrderStatus() {
//        LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
//        LocalDateTime twoDaysAgo = LocalDateTime.now().minusDays(2);
//
//        List<Orders> pendingOrders = ordersRepository.findByStatusAndOrderDateBefore(
//                Status.Shipped, oneDayAgo);
//        for (Orders order : pendingOrders) {
//            order.setStatus(Status.Shipped);
//        }
//        ordersRepository.saveAll(pendingOrders);
//
//        List<Orders> confirmedOrders = Carts_ItemRepository.findByStatusAndOrderDateBefore(
//                Status.Out_For_Delivery, twoDaysAgo);
//        for (Orders order : confirmedOrders) {
//        	order.setStatus(Status.Out_For_Delivery);
//        }
//        Carts_ItemRepository.saveAll(confirmedOrders);
//    }
//}
