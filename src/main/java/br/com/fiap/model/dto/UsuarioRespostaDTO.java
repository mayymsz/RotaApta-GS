package br.com.fiap.model.dto;

import java.time.LocalDateTime;

public record UsuarioRespostaDTO(
        Long idUsuario,
        String nome,
        String email,
        String tipoMobilidade,
        LocalDateTime dataCadastro,
        String status
) {
}
