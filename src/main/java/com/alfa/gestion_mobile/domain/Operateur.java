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
 * A Operateur.
 */
@Entity
@Table(name = "operateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "operateur")
public class Operateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "datecreation")
    private LocalDate datecreation;

    @OneToMany(mappedBy = "operateur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Compte> comptes = new HashSet<>();
    @OneToMany(mappedBy = "operateur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Operateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public LocalDate getDatecreation() {
        return datecreation;
    }

    public Operateur datecreation(LocalDate datecreation) {
        this.datecreation = datecreation;
        return this;
    }

    public void setDatecreation(LocalDate datecreation) {
        this.datecreation = datecreation;
    }

    public Set<Compte> getComptes() {
        return comptes;
    }

    public Operateur comptes(Set<Compte> comptes) {
        this.comptes = comptes;
        return this;
    }

    public Operateur addComptes(Compte compte) {
        this.comptes.add(compte);
        compte.setOperateur(this);
        return this;
    }

    public Operateur removeComptes(Compte compte) {
        this.comptes.remove(compte);
        compte.setOperateur(null);
        return this;
    }

    public void setComptes(Set<Compte> comptes) {
        this.comptes = comptes;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Operateur clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Operateur addClients(Client client) {
        this.clients.add(client);
        client.setOperateur(this);
        return this;
    }

    public Operateur removeClients(Client client) {
        this.clients.remove(client);
        client.setOperateur(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
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
        Operateur operateur = (Operateur) o;
        if (operateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), operateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Operateur{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", datecreation='" + getDatecreation() + "'" +
            "}";
    }
}
