package br.com.fiap.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.PositiveOrZero;

import java.math.BigDecimal;

public record RotaTrechoDTO(

        @NotNull
        Long idRota,

        @NotNull
        Long idTrecho,

        @NotNull
        @Min(1)
        Integer ordem,

        @NotNull
        @PositiveOrZero
        BigDecimal custoAcessibilidade

) {
}
