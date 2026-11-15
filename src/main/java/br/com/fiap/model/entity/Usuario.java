package br.com.fiap.model.entity;

import br.com.fiap.model.dto.UsuarioDTO;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

@Entity(name = "Usuario")
@Table(name = "TB_USUARIO_RA")
public class Usuario {

    @Id
    @Column(name = "ID_USUARIO")
    private Long idUsuario;

    @Column(name = "NM_USUARIO")
    private String nome;

    @Column(name = "DS_EMAIL")
    private String email;

    @Column(name = "DS_SENHA_HASH")
    private String senhaHash;

    @Column(name = "TP_MOBILIDADE")
    private String tipoMobilidade;

    @Column(name = "DT_CADASTRO")
    private LocalDateTime dataCadastro;

    @Column(name = "ST_USUARIO")
    private String status;

    public Usuario() {
    }

    public Usuario(UsuarioDTO usuarioDTO) {
        this.idUsuario = usuarioDTO.idUsuario();
        this.nome = usuarioDTO.nome();
        this.email = usuarioDTO.email();
        this.senhaHash = usuarioDTO.senhaHash();
        this.tipoMobilidade = usuarioDTO.tipoMobilidade();
        this.dataCadastro = usuarioDTO.dataCadastro();
        this.status = usuarioDTO.status();
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenhaHash() {
        return senhaHash;
    }

    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    public String getTipoMobilidade() {
        return tipoMobilidade;
    }

    public void setTipoMobilidade(String tipoMobilidade) {
        this.tipoMobilidade = tipoMobilidade;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
