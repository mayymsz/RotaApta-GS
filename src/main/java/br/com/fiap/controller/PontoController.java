package br.com.fiap.controller;

import br.com.fiap.model.dto.PontoDTO;
import br.com.fiap.model.entity.Ponto;
import br.com.fiap.model.repository.PontoRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pontos")
public class PontoController {

    @Autowired
    private PontoRepository pontoRepository;

    @GetMapping
    public List<Ponto> consultar() {
        return pontoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Ponto> ponto = pontoRepository.findById(id);

        if (ponto.isPresent()) {
            return ResponseEntity.ok(ponto.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Ponto não encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid PontoDTO pontoDTO) {
        try {
            if (pontoRepository.existsById(pontoDTO.idPonto())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de ponto já cadastrado.");
            }

            Ponto ponto = new Ponto(pontoDTO);
            pontoRepository.save(ponto);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ponto);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar o ponto.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (pontoRepository.existsById(id)) {
            pontoRepository.deleteById(id);
            return ResponseEntity.ok("Ponto deletado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Ponto não encontrado");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid PontoDTO pontoDTO) {
        try {
            if (!pontoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Ponto não encontrado");
            }

            Ponto ponto = new Ponto(pontoDTO);
            ponto.setIdPonto(id);
            pontoRepository.save(ponto);

            return ResponseEntity.ok("Ponto atualizado com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar o ponto.");
        }
    }

}
