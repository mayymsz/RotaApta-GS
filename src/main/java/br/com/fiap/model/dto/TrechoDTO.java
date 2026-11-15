package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record TrechoDTO(

        @NotNull
        Long idTrecho,

        @NotNull
        Long idPontoOrigem,

        @NotNull
        Long idPontoDestino,

        @NotBlank
        String logradouro,

        @NotNull
        BigDecimal distancia,

        @NotNull
        @PositiveOrZero
        BigDecimal inclinacao,

        @NotNull
        @Min(0)
        @Max(100)
        Integer notaAcessibilidade,

        @NotBlank
        String status
) {
}
