
package br.com.fiap.controller;

import br.com.fiap.model.dto.UsuarioDTO;
import br.com.fiap.model.dto.UsuarioRespostaDTO;
import br.com.fiap.model.entity.Usuario;
import br.com.fiap.model.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @GetMapping
    public List<UsuarioRespostaDTO> consultar() {

        List<UsuarioRespostaDTO> usuarios = new ArrayList<>();

        for (Usuario usuario : usuarioRepository.findAll()) {
            usuarios.add(new UsuarioRespostaDTO(
                    usuario.getIdUsuario(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getTipoMobilidade(),
                    usuario.getDataCadastro(),
                    usuario.getStatus()
            ));
        }

        return usuarios;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Usuario> usuario = usuarioRepository.findById(id);

        if (usuario.isPresent()) {
            Usuario u = usuario.get();

            UsuarioRespostaDTO resposta = new UsuarioRespostaDTO(
                    u.getIdUsuario(),
                    u.getNome(),
                    u.getEmail(),
                    u.getTipoMobilidade(),
                    u.getDataCadastro(),
                    u.getStatus()
            );

            return ResponseEntity.ok(resposta);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid UsuarioDTO usuarioDTO) {

        try {
            if (usuarioRepository.existsById(usuarioDTO.idUsuario())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de usuário já cadastrado.");
            }

            Usuario usuario = new Usuario(usuarioDTO);
            usuarioRepository.save(usuario);

            UsuarioRespostaDTO resposta = new UsuarioRespostaDTO(
                    usuario.getIdUsuario(),
                    usuario.getNome(),
                    usuario.getEmail(),
                    usuario.getTipoMobilidade(),
                    usuario.getDataCadastro(),
                    usuario.getStatus()
            );

            return ResponseEntity.status(HttpStatus.CREATED).body(resposta);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao salvar o usuário.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.ok("Usuário deletado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Usuário não encontrado");
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid UsuarioDTO usuarioDTO) {
        try {
            if (!usuarioRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Usuário não encontrado");
            }

            Usuario usuario = new Usuario(usuarioDTO);
            usuario.setIdUsuario(id);
            usuarioRepository.save(usuario);

            return ResponseEntity.ok("Usuário atualizado com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar o usuário.");
        }
    }
}
