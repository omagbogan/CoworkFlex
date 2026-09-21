package com.coworkflex.coworkflex.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ReservationRequest {

    @NotNull(message = "L'identifiant utilisateur est obligatoire")
    private Long userId;

    @NotNull(message = "L'identifiant du bureau est obligatoire")
    private Long deskId;

    @NotNull(message = "La date de début est obligatoire")
    private LocalDateTime startDateTime;

    @NotNull(message = "La date de fin est obligatoire")
    private LocalDateTime endDateTime;
}