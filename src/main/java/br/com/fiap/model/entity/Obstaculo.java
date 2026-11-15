package br.com.fiap.model.entity;

import br.com.fiap.model.dto.ObstaculoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

@Entity(name = "Obstaculo")
@Table(name = "TB_OBSTACULO_RA")
public class Obstaculo {

    @Id
    @Column(name = "ID_OBSTACULO")
    private Long idObstaculo;

    @Column(name = "ID_TRECHO")
    private Long idTrecho;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "TP_OBSTACULO")
    private String tipoObstaculo;

    @Column(name = "DS_OBSTACULO")
    private String descricao;

    @Column(name = "NR_SEVERIDADE")
    private Integer severidade;

    @Column(name = "DT_REPORTE")
    private LocalDateTime dataReporte;

    @Column(name = "ST_OBSTACULO")
    private String status;

    public Obstaculo() {
    }

    public Obstaculo(ObstaculoDTO dto) {
        this.idObstaculo = dto.idObstaculo();
        this.idTrecho = dto.idTrecho();
        this.idUsuario = dto.idUsuario();
        this.tipoObstaculo = dto.tipoObstaculo();
        this.descricao = dto.descricao();
        this.severidade = dto.severidade();
        this.dataReporte = dto.dataReporte();
        this.status = dto.status();
    }

    public Long getIdObstaculo() {
        return idObstaculo;
    }

    public void setIdObstaculo(Long idObstaculo) {
        this.idObstaculo = idObstaculo;
    }

    public Long getIdTrecho() {
        return idTrecho;
    }

    public void setIdTrecho(Long idTrecho) {
        this.idTrecho = idTrecho;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getTipoObstaculo() {
        return tipoObstaculo;
    }

    public void setTipoObstaculo(String tipoObstaculo) {
        this.tipoObstaculo = tipoObstaculo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Integer getSeveridade() {
        return severidade;
    }

    public void setSeveridade(Integer severidade) {
        this.severidade = severidade;
    }

    public LocalDateTime getDataReporte() {
        return dataReporte;
    }

    public void setDataReporte(LocalDateTime dataReporte) {
        this.dataReporte = dataReporte;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
