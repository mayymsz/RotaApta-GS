package br.com.fiap.controller;

import br.com.fiap.model.entity.RotaTrecho;
import br.com.fiap.model.repository.RotaTrechoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import br.com.fiap.model.entity.RotaTrechoId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import br.com.fiap.model.dto.RotaTrechoDTO;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.Optional;

import java.util.List;

@RestController
@RequestMapping("/rotas-trechos")
public class RotaTrechoController {

    @Autowired
    private RotaTrechoRepository rotaTrechoRepository;

    @GetMapping
    public List<RotaTrecho> consultar() {
        return rotaTrechoRepository.findAll();
    }

    @GetMapping("/{idRota}/{idTrecho}")
    public ResponseEntity<?> consultarPorId(@PathVariable Long idRota,
                                            @PathVariable Long idTrecho) {

        RotaTrechoId id = new RotaTrechoId(idRota, idTrecho);

        Optional<RotaTrecho> rotaTrecho = rotaTrechoRepository.findById(id);

        if (rotaTrecho.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(rotaTrecho.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Associação entre rota e trecho não encontrada");
        }
    }

    @PostMapping
    public ResponseEntity<String> cadastrar(@RequestBody @Valid RotaTrechoDTO rotaTrechoDTO) {
        try {
            RotaTrechoId id = new RotaTrechoId(
                    rotaTrechoDTO.idRota(),
                    rotaTrechoDTO.idTrecho()
            );

            if (rotaTrechoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Associação entre rota e trecho já cadastrada.");
            }

            RotaTrecho rotaTrecho = new RotaTrecho(rotaTrechoDTO);
            rotaTrechoRepository.save(rotaTrecho);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Associação cadastrada com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao cadastrar a associação.");
        }
    }

    @DeleteMapping("/{idRota}/{idTrecho}")
    public ResponseEntity<String> excluir(@PathVariable Long idRota,
                                          @PathVariable Long idTrecho) {

        RotaTrechoId id = new RotaTrechoId(idRota, idTrecho);

        if (rotaTrechoRepository.existsById(id)) {
            rotaTrechoRepository.deleteById(id);
            return ResponseEntity.ok("Associação deletada com sucesso!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Associação entre rota e trecho não encontrada");
        }
    }


    @PutMapping("/{idRota}/{idTrecho}")
    public ResponseEntity<String> atualizar(@PathVariable Long idRota,
                                            @PathVariable Long idTrecho,
                                            @RequestBody @Valid RotaTrechoDTO rotaTrechoDTO) {
        try {
            RotaTrechoId id = new RotaTrechoId(idRota, idTrecho);

            if (!rotaTrechoRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Associação entre rota e trecho não encontrada");
            }

            RotaTrecho rotaTrecho = new RotaTrecho(rotaTrechoDTO);
            rotaTrecho.setIdRota(idRota);
            rotaTrecho.setIdTrecho(idTrecho);

            rotaTrechoRepository.save(rotaTrecho);

            return ResponseEntity.ok("Associação atualizada com sucesso!");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Erro ao atualizar a associação.");
        }
    }
}
