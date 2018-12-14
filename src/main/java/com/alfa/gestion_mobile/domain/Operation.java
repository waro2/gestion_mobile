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
 * A Operation.
 */
@Entity
@Table(name = "operation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "operation")
public class Operation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "montant")
    private Double montant;

    @Column(name = "fraiscommission")
    private Double fraiscommission;

    @Column(name = "dateoperations")
    private LocalDate dateoperations;

    @OneToMany(mappedBy = "operation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Utilisateur> utilisateurs = new HashSet<>();
    @OneToMany(mappedBy = "operation")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<TypeOperation> typeoperations = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getMontant() {
        return montant;
    }

    public Operation montant(Double montant) {
        this.montant = montant;
        return this;
    }

    public void setMontant(Double montant) {
        this.montant = montant;
    }

    public Double getFraiscommission() {
        return fraiscommission;
    }

    public Operation fraiscommission(Double fraiscommission) {
        this.fraiscommission = fraiscommission;
        return this;
    }

    public void setFraiscommission(Double fraiscommission) {
        this.fraiscommission = fraiscommission;
    }

    public LocalDate getDateoperations() {
        return dateoperations;
    }

    public Operation dateoperations(LocalDate dateoperations) {
        this.dateoperations = dateoperations;
        return this;
    }

    public void setDateoperations(LocalDate dateoperations) {
        this.dateoperations = dateoperations;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public Operation utilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public Operation addUtilisateurs(Utilisateur utilisateur) {
        this.utilisateurs.add(utilisateur);
        utilisateur.setOperation(this);
        return this;
    }

    public Operation removeUtilisateurs(Utilisateur utilisateur) {
        this.utilisateurs.remove(utilisateur);
        utilisateur.setOperation(null);
        return this;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
    }

    public Set<TypeOperation> getTypeoperations() {
        return typeoperations;
    }

    public Operation typeoperations(Set<TypeOperation> typeOperations) {
        this.typeoperations = typeOperations;
        return this;
    }

    public Operation addTypeoperations(TypeOperation typeOperation) {
        this.typeoperations.add(typeOperation);
        typeOperation.setOperation(this);
        return this;
    }

    public Operation removeTypeoperations(TypeOperation typeOperation) {
        this.typeoperations.remove(typeOperation);
        typeOperation.setOperation(null);
        return this;
    }

    public void setTypeoperations(Set<TypeOperation> typeOperations) {
        this.typeoperations = typeOperations;
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
        Operation operation = (Operation) o;
        if (operation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operation{" +
            "id=" + getId() +
            ", montant=" + getMontant() +
            ", fraiscommission=" + getFraiscommission() +
            ", dateoperations='" + getDateoperations() + "'" +
            "}";
    }
}
