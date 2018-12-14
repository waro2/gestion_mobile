package com.alfa.gestion_mobile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Commission.
 */
@Entity
@Table(name = "commission")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "commission")
public class Commission implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "montantmin")
    private Double montantmin;

    @Column(name = "montantmax")
    private Double montantmax;

    @Column(name = "commission")
    private Double commission;

    @OneToMany(mappedBy = "commission")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Compte> comptes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMontantmin() {
        return montantmin;
    }

    public Commission montantmin(Double montantmin) {
        this.montantmin = montantmin;
        return this;
    }

    public void setMontantmin(Double montantmin) {
        this.montantmin = montantmin;
    }

    public Double getMontantmax() {
        return montantmax;
    }

    public Commission montantmax(Double montantmax) {
        this.montantmax = montantmax;
        return this;
    }

    public void setMontantmax(Double montantmax) {
        this.montantmax = montantmax;
    }

    public Double getCommission() {
        return commission;
    }

    public Commission commission(Double commission) {
        this.commission = commission;
        return this;
    }

    public void setCommission(Double commission) {
        this.commission = commission;
    }

    public Set<Compte> getComptes() {
        return comptes;
    }

    public Commission comptes(Set<Compte> comptes) {
        this.comptes = comptes;
        return this;
    }

    public Commission addComptes(Compte compte) {
        this.comptes.add(compte);
        compte.setCommission(this);
        return this;
    }

    public Commission removeComptes(Compte compte) {
        this.comptes.remove(compte);
        compte.setCommission(null);
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
        Commission commission = (Commission) o;
        if (commission.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), commission.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Commission{" +
            "id=" + getId() +
            ", montantmin=" + getMontantmin() +
            ", montantmax=" + getMontantmax() +
            ", commission=" + getCommission() +
            "}";
    }
}
