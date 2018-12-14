package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.Mouvement;
import com.alfa.gestion_mobile.repository.MouvementRepository;
import com.alfa.gestion_mobile.repository.search.MouvementSearchRepository;
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
 * REST controller for managing Mouvement.
 */
@RestController
@RequestMapping("/api")
public class MouvementResource {

    private final Logger log = LoggerFactory.getLogger(MouvementResource.class);

    private static final String ENTITY_NAME = "mouvement";

    private final MouvementRepository mouvementRepository;

    private final MouvementSearchRepository mouvementSearchRepository;

    public MouvementResource(MouvementRepository mouvementRepository, MouvementSearchRepository mouvementSearchRepository) {
        this.mouvementRepository = mouvementRepository;
        this.mouvementSearchRepository = mouvementSearchRepository;
    }

    /**
     * POST  /mouvements : Create a new mouvement.
     *
     * @param mouvement the mouvement to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mouvement, or with status 400 (Bad Request) if the mouvement has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/mouvements")
    @Timed
    public ResponseEntity<Mouvement> createMouvement(@RequestBody Mouvement mouvement) throws URISyntaxException {
        log.debug("REST request to save Mouvement : {}", mouvement);
        if (mouvement.getId() != null) {
            throw new BadRequestAlertException("A new mouvement cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mouvement result = mouvementRepository.save(mouvement);
        mouvementSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/mouvements/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /mouvements : Updates an existing mouvement.
     *
     * @param mouvement the mouvement to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mouvement,
     * or with status 400 (Bad Request) if the mouvement is not valid,
     * or with status 500 (Internal Server Error) if the mouvement couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/mouvements")
    @Timed
    public ResponseEntity<Mouvement> updateMouvement(@RequestBody Mouvement mouvement) throws URISyntaxException {
        log.debug("REST request to update Mouvement : {}", mouvement);
        if (mouvement.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mouvement result = mouvementRepository.save(mouvement);
        mouvementSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mouvement.getId().toString()))
            .body(result);
    }

    /**
     * GET  /mouvements : get all the mouvements.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of mouvements in body
     */
    @GetMapping("/mouvements")
    @Timed
    public List<Mouvement> getAllMouvements() {
        log.debug("REST request to get all Mouvements");
        return mouvementRepository.findAll();
    }

    /**
     * GET  /mouvements/:id : get the "id" mouvement.
     *
     * @param id the id of the mouvement to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mouvement, or with status 404 (Not Found)
     */
    @GetMapping("/mouvements/{id}")
    @Timed
    public ResponseEntity<Mouvement> getMouvement(@PathVariable Long id) {
        log.debug("REST request to get Mouvement : {}", id);
        Optional<Mouvement> mouvement = mouvementRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mouvement);
    }

    /**
     * DELETE  /mouvements/:id : delete the "id" mouvement.
     *
     * @param id the id of the mouvement to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/mouvements/{id}")
    @Timed
    public ResponseEntity<Void> deleteMouvement(@PathVariable Long id) {
        log.debug("REST request to delete Mouvement : {}", id);

        mouvementRepository.deleteById(id);
        mouvementSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/mouvements?query=:query : search for the mouvement corresponding
     * to the query.
     *
     * @param query the query of the mouvement search
     * @return the result of the search
     */
    @GetMapping("/_search/mouvements")
    @Timed
    public List<Mouvement> searchMouvements(@RequestParam String query) {
        log.debug("REST request to search Mouvements for query {}", query);
        return StreamSupport
            .stream(mouvementSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
