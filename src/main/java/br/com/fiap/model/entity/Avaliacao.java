package br.com.fiap.model.entity;

import br.com.fiap.model.dto.AvaliacaoDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

@Entity(name = "Avaliacao")
@Table(name = "TB_AVALIACAO_RA")
public class Avaliacao {

    @Id
    @Column(name = "ID_AVALIACAO")
    private Long idAvaliacao;

    @Column(name = "ID_TRECHO")
    private Long idTrecho;

    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NR_NOTA")
    private Integer nota;

    @Column(name = "DS_COMENTARIO")
    private String comentario;

    @Column(name = "DT_AVALIACAO")
    private LocalDateTime dataAvaliacao;

    public Avaliacao() {
    }

    public Avaliacao(AvaliacaoDTO dto) {
        this.idAvaliacao = dto.idAvaliacao();
        this.idTrecho = dto.idTrecho();
        this.idUsuario = dto.idUsuario();
        this.nota = dto.nota();
        this.comentario = dto.comentario();
        this.dataAvaliacao = dto.dataAvaliacao();
    }

    public Long getIdAvaliacao() {
        return idAvaliacao;
    }

    public void setIdAvaliacao(Long idAvaliacao) {
        this.idAvaliacao = idAvaliacao;
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

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }

    public LocalDateTime getDataAvaliacao() {
        return dataAvaliacao;
    }

    public void setDataAvaliacao(LocalDateTime dataAvaliacao) {
        this.dataAvaliacao = dataAvaliacao;
    }
}
