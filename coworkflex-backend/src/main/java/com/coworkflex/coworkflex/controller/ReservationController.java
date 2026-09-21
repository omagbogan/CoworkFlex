package com.coworkflex.coworkflex.controller;

import com.coworkflex.coworkflex.dto.ReservationRequest;
import com.coworkflex.coworkflex.entity.Reservation;
import com.coworkflex.coworkflex.service.ReservationService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping
    public Reservation createReservation(@Valid @RequestBody ReservationRequest request) {
        return reservationService.createReservation(
                request.getUserId(),
                request.getDeskId(),
                request.getStartDateTime(),
                request.getEndDateTime()
        );
    }

    @GetMapping("/user/{userId}")
    public List<Reservation> getUserReservations(@PathVariable Long userId) {
        return reservationService.getReservationsByUser(userId);
    }

    @DeleteMapping("/{id}")
    public void cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
    }
}