package com.alfa.gestion_mobile.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.Objects;

/**
 * A TypeOperation.
 */
@Entity
@Table(name = "type_operation")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "typeoperation")
public class TypeOperation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "retrait")
    private String retrait;

    @Column(name = "depot")
    private String depot;

    @Column(name = "achatcredit")
    private String achatcredit;

    @ManyToOne
    @JsonIgnoreProperties("typeoperations")
    private Operation operation;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRetrait() {
        return retrait;
    }

    public TypeOperation retrait(String retrait) {
        this.retrait = retrait;
        return this;
    }

    public void setRetrait(String retrait) {
        this.retrait = retrait;
    }

    public String getDepot() {
        return depot;
    }

    public TypeOperation depot(String depot) {
        this.depot = depot;
        return this;
    }

    public void setDepot(String depot) {
        this.depot = depot;
    }

    public String getAchatcredit() {
        return achatcredit;
    }

    public TypeOperation achatcredit(String achatcredit) {
        this.achatcredit = achatcredit;
        return this;
    }

    public void setAchatcredit(String achatcredit) {
        this.achatcredit = achatcredit;
    }

    public Operation getOperation() {
        return operation;
    }

    public TypeOperation operation(Operation operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
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
        TypeOperation typeOperation = (TypeOperation) o;
        if (typeOperation.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), typeOperation.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TypeOperation{" +
            "id=" + getId() +
            ", retrait='" + getRetrait() + "'" +
            ", depot='" + getDepot() + "'" +
            ", achatcredit='" + getAchatcredit() + "'" +
            "}";
    }
}
