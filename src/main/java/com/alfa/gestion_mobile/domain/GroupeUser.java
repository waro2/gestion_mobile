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
 * A GroupeUser.
 */
@Entity
@Table(name = "groupe_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "groupeuser")
public class GroupeUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "groupeutilisateur")
    private String groupeutilisateur;

    @Column(name = "jhi_date")
    private LocalDate date;

    @OneToMany(mappedBy = "groupeUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Groupe> groupes = new HashSet<>();
    @OneToMany(mappedBy = "groupeUser")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Utilisateur> utilisateurs = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupeutilisateur() {
        return groupeutilisateur;
    }

    public GroupeUser groupeutilisateur(String groupeutilisateur) {
        this.groupeutilisateur = groupeutilisateur;
        return this;
    }

    public void setGroupeutilisateur(String groupeutilisateur) {
        this.groupeutilisateur = groupeutilisateur;
    }

    public LocalDate getDate() {
        return date;
    }

    public GroupeUser date(LocalDate date) {
        this.date = date;
        return this;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Set<Groupe> getGroupes() {
        return groupes;
    }

    public GroupeUser groupes(Set<Groupe> groupes) {
        this.groupes = groupes;
        return this;
    }

    public GroupeUser addGroupes(Groupe groupe) {
        this.groupes.add(groupe);
        groupe.setGroupeUser(this);
        return this;
    }

    public GroupeUser removeGroupes(Groupe groupe) {
        this.groupes.remove(groupe);
        groupe.setGroupeUser(null);
        return this;
    }

    public void setGroupes(Set<Groupe> groupes) {
        this.groupes = groupes;
    }

    public Set<Utilisateur> getUtilisateurs() {
        return utilisateurs;
    }

    public GroupeUser utilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
        return this;
    }

    public GroupeUser addUtilisateurs(Utilisateur utilisateur) {
        this.utilisateurs.add(utilisateur);
        utilisateur.setGroupeUser(this);
        return this;
    }

    public GroupeUser removeUtilisateurs(Utilisateur utilisateur) {
        this.utilisateurs.remove(utilisateur);
        utilisateur.setGroupeUser(null);
        return this;
    }

    public void setUtilisateurs(Set<Utilisateur> utilisateurs) {
        this.utilisateurs = utilisateurs;
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
        GroupeUser groupeUser = (GroupeUser) o;
        if (groupeUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), groupeUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GroupeUser{" +
            "id=" + getId() +
            ", groupeutilisateur='" + getGroupeutilisateur() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
