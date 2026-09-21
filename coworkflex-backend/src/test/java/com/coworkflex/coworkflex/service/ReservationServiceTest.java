package com.coworkflex.coworkflex.service;

import com.coworkflex.coworkflex.entity.*;
import com.coworkflex.coworkflex.repository.DeskRepository;
import com.coworkflex.coworkflex.repository.ReservationRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ReservationServiceTest {

    @Mock
    private ReservationRepository reservationRepository;

    @Mock
    private DeskRepository deskRepository;

    @InjectMocks
    private ReservationService reservationService;

    private Desk desk;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        desk = new Desk();
        desk.setId(1L);
        desk.setType(DeskType.OPEN_SPACE);
        desk.setPrice(15.0);
    }

    @Test
    void createReservation_shouldSucceed_whenNoConflict() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.plusHours(2);

        when(deskRepository.findById(1L)).thenReturn(Optional.of(desk));
        when(reservationRepository.findByDeskIdAndStatusAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
                eq(1L), eq(ReservationStatus.CONFIRMED), eq(end), eq(start)))
                .thenReturn(List.of());
        when(reservationRepository.save(any(Reservation.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        Reservation result = reservationService.createReservation(1L, 1L, start, end);

        assertNotNull(result);
        assertEquals(ReservationStatus.CONFIRMED, result.getStatus());
        verify(reservationRepository, times(1)).save(any(Reservation.class));
    }

    @Test
    void createReservation_shouldThrowException_whenConflictExists() {
        LocalDateTime start = LocalDateTime.now().plusDays(2);
        LocalDateTime end = start.plusHours(2);

        Reservation existing = new Reservation();
        existing.setId(99L);

        when(deskRepository.findById(1L)).thenReturn(Optional.of(desk));
        when(reservationRepository.findByDeskIdAndStatusAndStartDateTimeLessThanAndEndDateTimeGreaterThan(
                eq(1L), eq(ReservationStatus.CONFIRMED), eq(end), eq(start)))
                .thenReturn(List.of(existing));

        assertThrows(IllegalStateException.class, () ->
                reservationService.createReservation(1L, 1L, start, end));

        verify(reservationRepository, never()).save(any(Reservation.class));
    }

    @Test
    void cancelReservation_shouldThrowException_whenLessThan24hBefore() {
        Reservation reservation = new Reservation();
        reservation.setId(1L);
        reservation.setStartDateTime(LocalDateTime.now().plusHours(5));
        reservation.setStatus(ReservationStatus.CONFIRMED);

        when(reservationRepository.findById(1L)).thenReturn(Optional.of(reservation));

        assertThrows(IllegalStateException.class, () ->
                reservationService.cancelReservation(1L));

        verify(reservationRepository, never()).save(any(Reservation.class));
    }
}