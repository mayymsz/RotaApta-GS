package br.com.fiap.model.repository;

import br.com.fiap.model.entity.Ponto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PontoRepository extends JpaRepository<Ponto, Long> {

}
