package com.alfa.gestion_mobile.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Utilisateur.
 */
@Entity
@Table(name = "utilisateur")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "utilisateur")
public class Utilisateur implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "login")
    private String login;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenoms")
    private String prenoms;

    @Column(name = "motdepass")
    private String motdepass;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "adresse")
    private String adresse;

    @ManyToOne
    @JsonIgnoreProperties("utilisateurs")
    private Operation operation;

    @OneToMany(mappedBy = "utilisateur")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Client> clients = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("utilisateurs")
    private GroupeUser groupeUser;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public Utilisateur login(String login) {
        this.login = login;
        return this;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getNom() {
        return nom;
    }

    public Utilisateur nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenoms() {
        return prenoms;
    }

    public Utilisateur prenoms(String prenoms) {
        this.prenoms = prenoms;
        return this;
    }

    public void setPrenoms(String prenoms) {
        this.prenoms = prenoms;
    }

    public String getMotdepass() {
        return motdepass;
    }

    public Utilisateur motdepass(String motdepass) {
        this.motdepass = motdepass;
        return this;
    }

    public void setMotdepass(String motdepass) {
        this.motdepass = motdepass;
    }

    public String getTelephone() {
        return telephone;
    }

    public Utilisateur telephone(String telephone) {
        this.telephone = telephone;
        return this;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getAdresse() {
        return adresse;
    }

    public Utilisateur adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public Operation getOperation() {
        return operation;
    }

    public Utilisateur operation(Operation operation) {
        this.operation = operation;
        return this;
    }

    public void setOperation(Operation operation) {
        this.operation = operation;
    }

    public Set<Client> getClients() {
        return clients;
    }

    public Utilisateur clients(Set<Client> clients) {
        this.clients = clients;
        return this;
    }

    public Utilisateur addClients(Client client) {
        this.clients.add(client);
        client.setUtilisateur(this);
        return this;
    }

    public Utilisateur removeClients(Client client) {
        this.clients.remove(client);
        client.setUtilisateur(null);
        return this;
    }

    public void setClients(Set<Client> clients) {
        this.clients = clients;
    }

    public GroupeUser getGroupeUser() {
        return groupeUser;
    }

    public Utilisateur groupeUser(GroupeUser groupeUser) {
        this.groupeUser = groupeUser;
        return this;
    }

    public void setGroupeUser(GroupeUser groupeUser) {
        this.groupeUser = groupeUser;
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
        Utilisateur utilisateur = (Utilisateur) o;
        if (utilisateur.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), utilisateur.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Utilisateur{" +
            "id=" + getId() +
            ", login='" + getLogin() + "'" +
            ", nom='" + getNom() + "'" +
            ", prenoms='" + getPrenoms() + "'" +
            ", motdepass='" + getMotdepass() + "'" +
            ", telephone='" + getTelephone() + "'" +
            ", adresse='" + getAdresse() + "'" +
            "}";
    }
}
