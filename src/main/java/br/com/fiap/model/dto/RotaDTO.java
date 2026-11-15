package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public record RotaDTO(

        @NotNull
        Long idRota,

        @NotNull
        Long idUsuario,

        @NotNull
        Long idPontoOrigem,

        @NotNull
        Long idPontoDestino,

        @NotNull
        LocalDateTime dataSolicitacao,

        @NotNull
        @Positive
        BigDecimal distanciaTotal,

        @NotNull
        @Min(0)
        @Max(100)
        Integer notaAcessibilidade,

        @NotBlank
        String status

) {
}
