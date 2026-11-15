package br.com.fiap.model.repository;

import br.com.fiap.model.entity.RotaTrecho;
import br.com.fiap.model.entity.RotaTrechoId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RotaTrechoRepository extends JpaRepository<RotaTrecho, RotaTrechoId> {
}
