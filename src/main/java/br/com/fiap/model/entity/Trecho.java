package br.com.fiap.model.entity;

import br.com.fiap.model.dto.TrechoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.math.BigDecimal;

@Entity(name = "Trecho")
@Table(name = "TB_TRECHO_RA")
public class Trecho {

    @Id
    @Column(name = "ID_TRECHO")
    private Long idTrecho;

    @Column(name = "ID_PONTO_ORIGEM")
    private Long idPontoOrigem;

    @Column(name = "ID_PONTO_DESTINO")
    private Long idPontoDestino;

    @Column(name = "DS_LOGRADOURO")
    private String logradouro;

    @Column(name = "NR_DISTANCIA_M")
    private BigDecimal distancia;

    @Column(name = "NR_INCLINACAO_PCT")
    private BigDecimal inclinacao;

    @Column(name = "NR_NOTA_ACESSIBILIDADE")
    private Integer notaAcessibilidade;

    @Column(name = "ST_TRECHO")
    private String status;

    public Trecho() {
    }

    public Trecho(TrechoDTO trechoDTO) {
        this.idTrecho = trechoDTO.idTrecho();
        this.idPontoOrigem = trechoDTO.idPontoOrigem();
        this.idPontoDestino = trechoDTO.idPontoDestino();
        this.logradouro = trechoDTO.logradouro();
        this.distancia = trechoDTO.distancia();
        this.inclinacao = trechoDTO.inclinacao();
        this.notaAcessibilidade = trechoDTO.notaAcessibilidade();
        this.status = trechoDTO.status();
    }

    public Long getIdTrecho() {
        return idTrecho;
    }

    public void setIdTrecho(Long idTrecho) {
        this.idTrecho = idTrecho;
    }

    public Long getIdPontoOrigem() {
        return idPontoOrigem;
    }

    public void setIdPontoOrigem(Long idPontoOrigem) {
        this.idPontoOrigem = idPontoOrigem;
    }

    public Long getIdPontoDestino() {
        return idPontoDestino;
    }

    public void setIdPontoDestino(Long idPontoDestino) {
        this.idPontoDestino = idPontoDestino;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public BigDecimal getDistancia() {
        return distancia;
    }

    public void setDistancia(BigDecimal distancia) {
        this.distancia = distancia;
    }

    public BigDecimal getInclinacao() {
        return inclinacao;
    }

    public void setInclinacao(BigDecimal inclinacao) {
        this.inclinacao = inclinacao;
    }

    public Integer getNotaAcessibilidade() {
        return notaAcessibilidade;
    }

    public void setNotaAcessibilidade(Integer notaAcessibilidade) {
        this.notaAcessibilidade = notaAcessibilidade;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
