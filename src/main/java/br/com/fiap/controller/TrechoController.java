package br.com.fiap.controller;

import br.com.fiap.model.dto.TrechoDTO;
import br.com.fiap.model.entity.Trecho;
import br.com.fiap.model.repository.TrechoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trechos")
public class TrechoController {

    @Autowired
    private TrechoRepository trechoRepository;

    @GetMapping
    public List<Trecho> consultar() {
        return trechoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Trecho> trecho = trechoRepository.findById(id);

        if (trecho.isPresent()) {
            return ResponseEntity.ok(trecho.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Trecho não encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<String> cadastrar(@RequestBody @Valid TrechoDTO trechoDTO) {
        try {
            if (trechoRepository.existsById(trechoDTO.idTrecho())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de trecho já cadastrado.");
            }

            Trecho trecho = new Trecho(trechoDTO);
            trechoRepository.save(trecho);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Trecho cadastrado com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar o trecho.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (trechoRepository.existsById(id)) {
            trechoRepository.deleteById(id);
            return ResponseEntity.ok("Trecho deletado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Trecho não encontrado");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid TrechoDTO trechoDTO) {
        try {
            if (!trechoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Trecho não encontrado");
            }

            Trecho trecho = new Trecho(trechoDTO);
            trecho.setIdTrecho(id);
            trechoRepository.save(trecho);

            return ResponseEntity.ok("Trecho atualizado com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar o trecho.");
        }
    }
}
