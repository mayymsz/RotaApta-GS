package br.com.fiap.model.entity;

import br.com.fiap.model.dto.PontoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import java.math.BigDecimal;

@Entity(name = "Ponto")
@Table(name = "TB_PONTO_RA")
public class Ponto {

    @Id
    @Column(name = "ID_PONTO")
    private Long idPonto;

    @Column(name = "NM_PONTO")
    private String nome;

    @Column(name = "DS_REFERENCIA")
    private String referencia;

    @Column(name = "NR_LATITUDE")
    private BigDecimal latitude;

    @Column(name = "NR_LONGITUDE")
    private BigDecimal longitude;

    public Ponto() {
    }

    public Ponto(PontoDTO pontoDTO) {
        this.idPonto = pontoDTO.idPonto();
        this.nome = pontoDTO.nome();
        this.referencia = pontoDTO.referencia();
        this.latitude = pontoDTO.latitude();
        this.longitude = pontoDTO.longitude();
    }

    public Long getIdPonto() {
        return idPonto;
    }

    public void setIdPonto(Long idPonto) {
        this.idPonto = idPonto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getReferencia() {
        return referencia;
    }

    public void setReferencia(String referencia) {
        this.referencia = referencia;
    }

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }
}
