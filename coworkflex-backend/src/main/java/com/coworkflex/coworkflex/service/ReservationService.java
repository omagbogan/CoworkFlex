package com.coworkflex.coworkflex.service;

import com.coworkflex.coworkflex.entity.Desk;
import com.coworkflex.coworkflex.entity.Reservation;
import com.coworkflex.coworkflex.entity.ReservationStatus;
import com.coworkflex.coworkflex.repository.DeskRepository;
import com.coworkflex.coworkflex.repository.ReservationRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final DeskRepository deskRepository;

    public ReservationService(ReservationRepository reservationRepository, DeskRepository deskRepository) {
        this.reservationRepository = reservationRepository;
        this.deskRepository = deskRepository;
    }

    public Reservation createReservation(Long userId, Long deskId, LocalDateTime start, LocalDateTime end) {

        // Vérification 1 : date de début avant date de fin
        if (!start.isBefore(end)) {
            throw new IllegalArgumentException("La date de debut doit etre avant la date de fin");
        }

        // Vérification 2 : date de début dans le futur
        if (start.isBefore(LocalDateTime.now())) {
            throw new IllegalArgumentException("La date de debut doit etre dans le futur");
        }

        // Vérification 3 : bureau existe
        Desk desk = deskRepository.findById(deskId)
                .orElseThrow(() -> new IllegalArgumentException("Bureau introuvable"));

        // Vérification 4 : pas de conflit de réservation
        List<Reservation> conflicts = reservationRepository
                .findByDeskIdAndStatusAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
                        deskId, ReservationStatus.CONFIRMED, end, start);

        if (!conflicts.isEmpty()) {
            throw new IllegalStateException("Ce bureau est deja reserve sur cette periode");
        }

        Reservation reservation = new Reservation();
        reservation.setUserId(userId);
        reservation.setDesk(desk);
        reservation.setStartDateTime(start);
        reservation.setEndDateTime(end);
        reservation.setStatus(ReservationStatus.CONFIRMED);

        return reservationRepository.save(reservation);
    }

    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }

    public void cancelReservation(Long reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new IllegalArgumentException("Reservation introuvable"));

        LocalDateTime now = LocalDateTime.now();
        if (reservation.getStartDateTime().isBefore(now.plusHours(24))) {
            throw new IllegalStateException("Impossible d'annuler une reservation qui commence dans moins de 24h");
        }

        reservation.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(reservation);
    }
}