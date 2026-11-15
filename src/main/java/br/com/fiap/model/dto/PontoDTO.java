package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public record PontoDTO(
        @NotNull
        Long idPonto,

        @NotBlank
        String nome,

        String referencia,

        @NotNull
        BigDecimal latitude,

        @NotNull
        BigDecimal longitude
) {
}
