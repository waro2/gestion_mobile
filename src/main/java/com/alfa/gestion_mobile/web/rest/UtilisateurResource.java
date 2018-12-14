package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.Utilisateur;
import com.alfa.gestion_mobile.repository.UtilisateurRepository;
import com.alfa.gestion_mobile.repository.search.UtilisateurSearchRepository;
import com.alfa.gestion_mobile.web.rest.errors.BadRequestAlertException;
import com.alfa.gestion_mobile.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Utilisateur.
 */
@RestController
@RequestMapping("/api")
public class UtilisateurResource {

    private final Logger log = LoggerFactory.getLogger(UtilisateurResource.class);

    private static final String ENTITY_NAME = "utilisateur";

    private final UtilisateurRepository utilisateurRepository;

    private final UtilisateurSearchRepository utilisateurSearchRepository;

    public UtilisateurResource(UtilisateurRepository utilisateurRepository, UtilisateurSearchRepository utilisateurSearchRepository) {
        this.utilisateurRepository = utilisateurRepository;
        this.utilisateurSearchRepository = utilisateurSearchRepository;
    }

    /**
     * POST  /utilisateurs : Create a new utilisateur.
     *
     * @param utilisateur the utilisateur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new utilisateur, or with status 400 (Bad Request) if the utilisateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/utilisateurs")
    @Timed
    public ResponseEntity<Utilisateur> createUtilisateur(@RequestBody Utilisateur utilisateur) throws URISyntaxException {
        log.debug("REST request to save Utilisateur : {}", utilisateur);
        if (utilisateur.getId() != null) {
            throw new BadRequestAlertException("A new utilisateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Utilisateur result = utilisateurRepository.save(utilisateur);
        utilisateurSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/utilisateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /utilisateurs : Updates an existing utilisateur.
     *
     * @param utilisateur the utilisateur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated utilisateur,
     * or with status 400 (Bad Request) if the utilisateur is not valid,
     * or with status 500 (Internal Server Error) if the utilisateur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/utilisateurs")
    @Timed
    public ResponseEntity<Utilisateur> updateUtilisateur(@RequestBody Utilisateur utilisateur) throws URISyntaxException {
        log.debug("REST request to update Utilisateur : {}", utilisateur);
        if (utilisateur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Utilisateur result = utilisateurRepository.save(utilisateur);
        utilisateurSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, utilisateur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /utilisateurs : get all the utilisateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of utilisateurs in body
     */
    @GetMapping("/utilisateurs")
    @Timed
    public List<Utilisateur> getAllUtilisateurs() {
        log.debug("REST request to get all Utilisateurs");
        return utilisateurRepository.findAll();
    }

    /**
     * GET  /utilisateurs/:id : get the "id" utilisateur.
     *
     * @param id the id of the utilisateur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the utilisateur, or with status 404 (Not Found)
     */
    @GetMapping("/utilisateurs/{id}")
    @Timed
    public ResponseEntity<Utilisateur> getUtilisateur(@PathVariable Long id) {
        log.debug("REST request to get Utilisateur : {}", id);
        Optional<Utilisateur> utilisateur = utilisateurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(utilisateur);
    }

    /**
     * DELETE  /utilisateurs/:id : delete the "id" utilisateur.
     *
     * @param id the id of the utilisateur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/utilisateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Long id) {
        log.debug("REST request to delete Utilisateur : {}", id);

        utilisateurRepository.deleteById(id);
        utilisateurSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/utilisateurs?query=:query : search for the utilisateur corresponding
     * to the query.
     *
     * @param query the query of the utilisateur search
     * @return the result of the search
     */
    @GetMapping("/_search/utilisateurs")
    @Timed
    public List<Utilisateur> searchUtilisateurs(@RequestParam String query) {
        log.debug("REST request to search Utilisateurs for query {}", query);
        return StreamSupport
            .stream(utilisateurSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
