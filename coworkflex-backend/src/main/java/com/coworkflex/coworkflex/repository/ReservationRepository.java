package com.coworkflex.coworkflex.repository;

import com.coworkflex.coworkflex.entity.Reservation;
import com.coworkflex.coworkflex.entity.ReservationStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findByUserId(Long userId);

    List<Reservation> findByDeskIdAndStatusAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
            Long deskId, ReservationStatus status, LocalDateTime end, LocalDateTime start);
}