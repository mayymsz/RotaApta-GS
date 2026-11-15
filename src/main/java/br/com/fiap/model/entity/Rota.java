package br.com.fiap.model.entity;

import br.com.fiap.model.dto.RotaDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity(name = "Rota")
@Table(name = "TB_ROTA_RA")
public class Rota {

    @Id
    @Column(name = "ID_ROTA")
    private Long idRota;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "ID_PONTO_ORIGEM")
    private Long idPontoOrigem;

    @Column(name = "ID_PONTO_DESTINO")
    private Long idPontoDestino;

    @Column(name = "DT_SOLICITACAO")
    private LocalDateTime dataSolicitacao;

    @Column(name = "NR_DISTANCIA_TOTAL_M")
    private BigDecimal distanciaTotal;

    @Column(name = "NR_NOTA_ACESSIBILIDADE")
    private Integer notaAcessibilidade;

    @Column(name = "ST_ROTA")
    private String status;

    public Rota() {
    }

    public Rota(RotaDTO dto) {
        this.idRota = dto.idRota();
        this.idUsuario = dto.idUsuario();
        this.idPontoOrigem = dto.idPontoOrigem();
        this.idPontoDestino = dto.idPontoDestino();
        this.dataSolicitacao = dto.dataSolicitacao();
        this.distanciaTotal = dto.distanciaTotal();
        this.notaAcessibilidade = dto.notaAcessibilidade();
        this.status = dto.status();
    }

    public Long getIdRota() {
        return idRota;
    }

    public void setIdRota(Long idRota) {
        this.idRota = idRota;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
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

    public LocalDateTime getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(LocalDateTime dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public BigDecimal getDistanciaTotal() {
        return distanciaTotal;
    }

    public void setDistanciaTotal(BigDecimal distanciaTotal) {
        this.distanciaTotal = distanciaTotal;
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
