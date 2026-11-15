package br.com.fiap.model.entity;

import java.io.Serializable;
import java.util.Objects;

public class RotaTrechoId implements Serializable {

    private Long idRota;
    private Long idTrecho;

    public RotaTrechoId() {
    }

    public RotaTrechoId(Long idRota, Long idTrecho) {
        this.idRota = idRota;
        this.idTrecho = idTrecho;
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

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }

        if (!(obj instanceof RotaTrechoId)) {
            return false;
        }

        RotaTrechoId outro = (RotaTrechoId) obj;

        return Objects.equals(idRota, outro.idRota)
                && Objects.equals(idTrecho, outro.idTrecho);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idRota, idTrecho);
    }
}
