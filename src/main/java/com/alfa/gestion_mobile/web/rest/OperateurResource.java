package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.Operateur;
import com.alfa.gestion_mobile.repository.OperateurRepository;
import com.alfa.gestion_mobile.repository.search.OperateurSearchRepository;
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
 * REST controller for managing Operateur.
 */
@RestController
@RequestMapping("/api")
public class OperateurResource {

    private final Logger log = LoggerFactory.getLogger(OperateurResource.class);

    private static final String ENTITY_NAME = "operateur";

    private final OperateurRepository operateurRepository;

    private final OperateurSearchRepository operateurSearchRepository;

    public OperateurResource(OperateurRepository operateurRepository, OperateurSearchRepository operateurSearchRepository) {
        this.operateurRepository = operateurRepository;
        this.operateurSearchRepository = operateurSearchRepository;
    }

    /**
     * POST  /operateurs : Create a new operateur.
     *
     * @param operateur the operateur to create
     * @return the ResponseEntity with status 201 (Created) and with body the new operateur, or with status 400 (Bad Request) if the operateur has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/operateurs")
    @Timed
    public ResponseEntity<Operateur> createOperateur(@RequestBody Operateur operateur) throws URISyntaxException {
        log.debug("REST request to save Operateur : {}", operateur);
        if (operateur.getId() != null) {
            throw new BadRequestAlertException("A new operateur cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Operateur result = operateurRepository.save(operateur);
        operateurSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/operateurs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /operateurs : Updates an existing operateur.
     *
     * @param operateur the operateur to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated operateur,
     * or with status 400 (Bad Request) if the operateur is not valid,
     * or with status 500 (Internal Server Error) if the operateur couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/operateurs")
    @Timed
    public ResponseEntity<Operateur> updateOperateur(@RequestBody Operateur operateur) throws URISyntaxException {
        log.debug("REST request to update Operateur : {}", operateur);
        if (operateur.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Operateur result = operateurRepository.save(operateur);
        operateurSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, operateur.getId().toString()))
            .body(result);
    }

    /**
     * GET  /operateurs : get all the operateurs.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of operateurs in body
     */
    @GetMapping("/operateurs")
    @Timed
    public List<Operateur> getAllOperateurs() {
        log.debug("REST request to get all Operateurs");
        return operateurRepository.findAll();
    }

    /**
     * GET  /operateurs/:id : get the "id" operateur.
     *
     * @param id the id of the operateur to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the operateur, or with status 404 (Not Found)
     */
    @GetMapping("/operateurs/{id}")
    @Timed
    public ResponseEntity<Operateur> getOperateur(@PathVariable Long id) {
        log.debug("REST request to get Operateur : {}", id);
        Optional<Operateur> operateur = operateurRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(operateur);
    }

    /**
     * DELETE  /operateurs/:id : delete the "id" operateur.
     *
     * @param id the id of the operateur to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/operateurs/{id}")
    @Timed
    public ResponseEntity<Void> deleteOperateur(@PathVariable Long id) {
        log.debug("REST request to delete Operateur : {}", id);

        operateurRepository.deleteById(id);
        operateurSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/operateurs?query=:query : search for the operateur corresponding
     * to the query.
     *
     * @param query the query of the operateur search
     * @return the result of the search
     */
    @GetMapping("/_search/operateurs")
    @Timed
    public List<Operateur> searchOperateurs(@RequestParam String query) {
        log.debug("REST request to search Operateurs for query {}", query);
        return StreamSupport
            .stream(operateurSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
