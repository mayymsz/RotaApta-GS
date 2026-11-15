package br.com.fiap.model.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

public record UsuarioDTO(
        @NotNull
        Long idUsuario,

        @NotBlank
        String nome,

        @NotBlank
        String email,

        @NotBlank
        String senhaHash,

        @NotBlank
        String tipoMobilidade,

        @NotNull
        LocalDateTime dataCadastro,

        @NotBlank
        String status
) {
}
