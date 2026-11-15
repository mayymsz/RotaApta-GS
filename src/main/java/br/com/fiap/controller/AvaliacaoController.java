package br.com.fiap.controller;

import br.com.fiap.model.dto.AvaliacaoDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.fiap.model.entity.Avaliacao;
import br.com.fiap.model.repository.AvaliacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Optional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @GetMapping
    public List<Avaliacao> consultar() {
        return avaliacaoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Avaliacao> avaliacao = avaliacaoRepository.findById(id);

        if (avaliacao.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(avaliacao.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Avaliação não encontrada");
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid AvaliacaoDTO avaliacaoDTO) {
        try {
            if (avaliacaoRepository.existsById(avaliacaoDTO.idAvaliacao())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de avaliação já cadastrado.");
            }

            Avaliacao avaliacao = new Avaliacao(avaliacaoDTO);
            avaliacaoRepository.save(avaliacao);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(avaliacao);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar a avaliação.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (avaliacaoRepository.existsById(id)) {
            avaliacaoRepository.deleteById(id);
            return ResponseEntity.ok("Avaliação deletada com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Avaliação não encontrada");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid AvaliacaoDTO avaliacaoDTO) {
        try {
            if (!avaliacaoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Avaliação não encontrada");
            }

            Avaliacao avaliacao = new Avaliacao(avaliacaoDTO);
            avaliacao.setIdAvaliacao(id);
            avaliacaoRepository.save(avaliacao);

            return ResponseEntity.ok("Avaliação atualizada com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar a avaliação.");
        }
    }
}
