package br.com.fiap.controller;

import br.com.fiap.model.dto.ObstaculoDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import br.com.fiap.model.entity.Obstaculo;
import br.com.fiap.model.repository.ObstaculoRepository;
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
@RequestMapping("/obstaculos")
public class ObstaculoController {

    @Autowired
    private ObstaculoRepository obstaculoRepository;

    @GetMapping
    public List<Obstaculo> consultar() {
        return obstaculoRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long id) {

        Optional<Obstaculo> obstaculo = obstaculoRepository.findById(id);

        if (obstaculo.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(obstaculo.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Obstáculo não encontrado");
        }
    }

    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody @Valid ObstaculoDTO obstaculoDTO) {
        try {
            if (obstaculoRepository.existsById(obstaculoDTO.idObstaculo())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("ID de obstáculo já cadastrado.");
            }

            Obstaculo obstaculo = new Obstaculo(obstaculoDTO);
            obstaculoRepository.save(obstaculo);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(obstaculo);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar o obstáculo.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable Long id) {

        if (obstaculoRepository.existsById(id)) {
            obstaculoRepository.deleteById(id);
            return ResponseEntity.ok("Obstáculo deletado com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Obstáculo não encontrado");
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizar(@PathVariable Long id,
                                            @RequestBody @Valid ObstaculoDTO obstaculoDTO) {
        try {
            if (!obstaculoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Obstáculo não encontrado");
            }

            Obstaculo obstaculo = new Obstaculo(obstaculoDTO);
            obstaculo.setIdObstaculo(id);
            obstaculoRepository.save(obstaculo);

            return ResponseEntity.ok("Obstáculo atualizado com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar o obstáculo.");
        }
    }
}
