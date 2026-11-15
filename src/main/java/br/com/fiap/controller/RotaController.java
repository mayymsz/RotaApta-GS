package br.com.fiap.controller;

import br.com.fiap.model.dto.RotaDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.fiap.model.entity.Rota;
import br.com.fiap.model.repository.RotaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rotas")
public class RotaController {

    @Autowired
    private RotaRepository rotaRepository;

    @GetMapping
    public List<Rota> consultar() {
        return rotaRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Rota> rota = rotaRepository.findById(id);

        if (rota.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(rota.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rota não encontrada");
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid RotaDTO rotaDTO) {
        try {
            if (rotaRepository.existsById(rotaDTO.idRota())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de rota já cadastrado.");
            }

            Rota rota = new Rota(rotaDTO);
            rotaRepository.save(rota);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(rota);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar a rota.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (rotaRepository.existsById(id)) {
            rotaRepository.deleteById(id);
            return ResponseEntity.ok("Rota deletada com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Rota não encontrada");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid RotaDTO rotaDTO) {
        try {
            if (!rotaRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Rota não encontrada");
            }

            Rota rota = new Rota(rotaDTO);
            rota.setIdRota(id);
            rotaRepository.save(rota);

            return ResponseEntity.ok("Rota atualizada com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar a rota.");
        }
    }
}
