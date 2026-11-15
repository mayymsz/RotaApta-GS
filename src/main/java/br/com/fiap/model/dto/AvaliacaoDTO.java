package br.com.fiap.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

public record AvaliacaoDTO(

        @NotNull
        Long idAvaliacao,

        @NotNull
        Long idTrecho,

        @NotNull
        Long idUsuario,

        @NotNull
        @Min(1)
        @Max(5)
        Integer nota,

        @Size(max = 250)
        String comentario,

        @NotNull
        LocalDateTime dataAvaliacao

) {
}
