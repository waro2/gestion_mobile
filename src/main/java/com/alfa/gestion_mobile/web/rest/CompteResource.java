package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.Compte;
import com.alfa.gestion_mobile.repository.CompteRepository;
import com.alfa.gestion_mobile.repository.search.CompteSearchRepository;
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
 * REST controller for managing Compte.
 */
@RestController
@RequestMapping("/api")
public class CompteResource {

    private final Logger log = LoggerFactory.getLogger(CompteResource.class);

    private static final String ENTITY_NAME = "compte";

    private final CompteRepository compteRepository;

    private final CompteSearchRepository compteSearchRepository;

    public CompteResource(CompteRepository compteRepository, CompteSearchRepository compteSearchRepository) {
        this.compteRepository = compteRepository;
        this.compteSearchRepository = compteSearchRepository;
    }

    /**
     * POST  /comptes : Create a new compte.
     *
     * @param compte the compte to create
     * @return the ResponseEntity with status 201 (Created) and with body the new compte, or with status 400 (Bad Request) if the compte has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/comptes")
    @Timed
    public ResponseEntity<Compte> createCompte(@RequestBody Compte compte) throws URISyntaxException {
        log.debug("REST request to save Compte : {}", compte);
        if (compte.getId() != null) {
            throw new BadRequestAlertException("A new compte cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Compte result = compteRepository.save(compte);
        compteSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/comptes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /comptes : Updates an existing compte.
     *
     * @param compte the compte to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated compte,
     * or with status 400 (Bad Request) if the compte is not valid,
     * or with status 500 (Internal Server Error) if the compte couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/comptes")
    @Timed
    public ResponseEntity<Compte> updateCompte(@RequestBody Compte compte) throws URISyntaxException {
        log.debug("REST request to update Compte : {}", compte);
        if (compte.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Compte result = compteRepository.save(compte);
        compteSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, compte.getId().toString()))
            .body(result);
    }

    /**
     * GET  /comptes : get all the comptes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of comptes in body
     */
    @GetMapping("/comptes")
    @Timed
    public List<Compte> getAllComptes() {
        log.debug("REST request to get all Comptes");
        return compteRepository.findAll();
    }

    /**
     * GET  /comptes/:id : get the "id" compte.
     *
     * @param id the id of the compte to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the compte, or with status 404 (Not Found)
     */
    @GetMapping("/comptes/{id}")
    @Timed
    public ResponseEntity<Compte> getCompte(@PathVariable Long id) {
        log.debug("REST request to get Compte : {}", id);
        Optional<Compte> compte = compteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(compte);
    }

    /**
     * DELETE  /comptes/:id : delete the "id" compte.
     *
     * @param id the id of the compte to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/comptes/{id}")
    @Timed
    public ResponseEntity<Void> deleteCompte(@PathVariable Long id) {
        log.debug("REST request to delete Compte : {}", id);

        compteRepository.deleteById(id);
        compteSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/comptes?query=:query : search for the compte corresponding
     * to the query.
     *
     * @param query the query of the compte search
     * @return the result of the search
     */
    @GetMapping("/_search/comptes")
    @Timed
    public List<Compte> searchComptes(@RequestParam String query) {
        log.debug("REST request to search Comptes for query {}", query);
        return StreamSupport
            .stream(compteSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
