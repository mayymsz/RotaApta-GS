package br.com.fiap.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;

import java.time.LocalDateTime;

public record ObstaculoDTO(

        @NotNull
        Long idObstaculo,

        @NotNull
        Long idTrecho,

        @NotNull
        Long idUsuario,

        @NotBlank
        @Pattern(regexp = "CALCADA_DANIFICADA|SEM_RAMPA|ESCADA|OBRA|OBSTRUCAO|OUTRO")
        String tipoObstaculo,

        @NotBlank
        String descricao,

        @NotNull
        @Min(1)
        @Max(5)
        Integer severidade,

        @NotNull
        LocalDateTime dataReporte,

        @NotBlank
        @Pattern(regexp = "ATIVO|RESOLVIDO")
        String status

) {
}
