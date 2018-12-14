package com.alfa.gestion_mobile.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Compte.
 */
@Entity
@Table(name = "compte")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "compte")
public class Compte implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "numcompte")
    private String numcompte;

    @Column(name = "datecreation")
    private Instant datecreation;

    @Column(name = "datederniereoperation")
    private LocalDate datederniereoperation;

    @ManyToOne
    @JsonIgnoreProperties("comptes")
    private Operateur operateur;

    @ManyToOne
    @JsonIgnoreProperties("comptes")
    private Commission commission;

    @ManyToOne
    @JsonIgnoreProperties("comptes")
    private Mouvement mouvement;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumcompte() {
        return numcompte;
    }

    public Compte numcompte(String numcompte) {
        this.numcompte = numcompte;
        return this;
    }

    public void setNumcompte(String numcompte) {
        this.numcompte = numcompte;
    }

    public Instant getDatecreation() {
        return datecreation;
    }

    public Compte datecreation(Instant datecreation) {
        this.datecreation = datecreation;
        return this;
    }

    public void setDatecreation(Instant datecreation) {
        this.datecreation = datecreation;
    }

    public LocalDate getDatederniereoperation() {
        return datederniereoperation;
    }

    public Compte datederniereoperation(LocalDate datederniereoperation) {
        this.datederniereoperation = datederniereoperation;
        return this;
    }

    public void setDatederniereoperation(LocalDate datederniereoperation) {
        this.datederniereoperation = datederniereoperation;
    }

    public Operateur getOperateur() {
        return operateur;
    }

    public Compte operateur(Operateur operateur) {
        this.operateur = operateur;
        return this;
    }

    public void setOperateur(Operateur operateur) {
        this.operateur = operateur;
    }

    public Commission getCommission() {
        return commission;
    }

    public Compte commission(Commission commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Commission commission) {
        this.commission = commission;
    }

    public Mouvement getMouvement() {
        return mouvement;
    }

    public Compte mouvement(Mouvement mouvement) {
        this.mouvement = mouvement;
        return this;
    }

    public void setMouvement(Mouvement mouvement) {
        this.mouvement = mouvement;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Compte compte = (Compte) o;
        if (compte.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), compte.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Compte{" +
            "id=" + getId() +
            ", numcompte='" + getNumcompte() + "'" +
            ", datecreation='" + getDatecreation() + "'" +
            ", datederniereoperation='" + getDatederniereoperation() + "'" +
            "}";
    }
}
