package com.alfa.gestion_mobile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Mouvement.
 */
@Entity
@Table(name = "mouvement")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "mouvement")
public class Mouvement implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sens")
    private String sens;

    @Column(name = "reference")
    private String reference;

    @Column(name = "jhi_date")
    private LocalDate date;

    @Column(name = "montant")
    private Double montant;

    @OneToMany(mappedBy = "mouvement")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Compte> comptes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSens() {
        return sens;
    }

    public Mouvement sens(String sens) {
        this.sens = sens;
        return this;
    }

    public void setSens(String sens) {
        this.sens = sens;
    }

    public String getReference() {
        return reference;
    }

    public Mouvement reference(String reference) {
        this.reference = reference;
        return this;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public LocalDate getDate() {
        return date;
    }

    public Mouvement date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Double getMontant() {
        return montant;
    }

    public Mouvement montant(Double montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public Set<Compte> getComptes() {
        return comptes;
    }

    public Mouvement comptes(Set<Compte> comptes) {
        this.comptes = comptes;
        return this;
    }

    public Mouvement addCompte(Compte compte) {
        this.comptes.add(compte);
        compte.setMouvement(this);
        return this;
    }

    public Mouvement removeCompte(Compte compte) {
        this.comptes.remove(compte);
        compte.setMouvement(null);
        return this;
    }

    public void setComptes(Set<Compte> comptes) {
        this.comptes = comptes;
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
        Mouvement mouvement = (Mouvement) o;
        if (mouvement.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mouvement.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Mouvement{" +
            "id=" + getId() +
            ", sens='" + getSens() + "'" +
            ", reference='" + getReference() + "'" +
            ", date='" + getDate() + "'" +
            ", montant=" + getMontant() +
            "}";
    }
}
