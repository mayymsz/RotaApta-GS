package br.com.fiap.model.entity;

import br.com.fiap.model.dto.RotaTrechoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Column;

import java.math.BigDecimal;

@Entity(name = "RotaTrecho")
@Table(name = "TB_ROTA_TRECHO_RA")
@IdClass(RotaTrechoId.class)
public class RotaTrecho {

    @Id
    @Column(name = "ID_ROTA")
    private Long idRota;

    @Id
    @Column(name = "ID_TRECHO")
    private Long idTrecho;

    @Column(name = "NR_ORDEM")
    private Integer ordem;

    @Column(name = "NR_CUSTO_ACESSIBILIDADE")
    private BigDecimal custoAcessibilidade;

    public RotaTrecho() {
    }

    public RotaTrecho(RotaTrechoDTO dto) {
        this.idRota = dto.idRota();
        this.idTrecho = dto.idTrecho();
        this.ordem = dto.ordem();
        this.custoAcessibilidade = dto.custoAcessibilidade();
    }

    public Long getIdRota() {
        return idRota;
    }

    public void setIdRota(Long idRota) {
        this.idRota = idRota;
    }

    public Long getIdTrecho() {
        return idTrecho;
    }

    public void setIdTrecho(Long idTrecho) {
        this.idTrecho = idTrecho;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public BigDecimal getCustoAcessibilidade() {
        return custoAcessibilidade;
    }

    public void setCustoAcessibilidade(BigDecimal custoAcessibilidade) {
        this.custoAcessibilidade = custoAcessibilidade;
    }
}
