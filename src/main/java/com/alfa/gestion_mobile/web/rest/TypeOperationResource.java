package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.TypeOperation;
import com.alfa.gestion_mobile.repository.TypeOperationRepository;
import com.alfa.gestion_mobile.repository.search.TypeOperationSearchRepository;
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
 * REST controller for managing TypeOperation.
 */
@RestController
@RequestMapping("/api")
public class TypeOperationResource {

    private final Logger log = LoggerFactory.getLogger(TypeOperationResource.class);

    private static final String ENTITY_NAME = "typeOperation";

    private final TypeOperationRepository typeOperationRepository;

    private final TypeOperationSearchRepository typeOperationSearchRepository;

    public TypeOperationResource(TypeOperationRepository typeOperationRepository, TypeOperationSearchRepository typeOperationSearchRepository) {
        this.typeOperationRepository = typeOperationRepository;
        this.typeOperationSearchRepository = typeOperationSearchRepository;
    }

    /**
     * POST  /type-operations : Create a new typeOperation.
     *
     * @param typeOperation the typeOperation to create
     * @return the ResponseEntity with status 201 (Created) and with body the new typeOperation, or with status 400 (Bad Request) if the typeOperation has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/type-operations")
    @Timed
    public ResponseEntity<TypeOperation> createTypeOperation(@RequestBody TypeOperation typeOperation) throws URISyntaxException {
        log.debug("REST request to save TypeOperation : {}", typeOperation);
        if (typeOperation.getId() != null) {
            throw new BadRequestAlertException("A new typeOperation cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TypeOperation result = typeOperationRepository.save(typeOperation);
        typeOperationSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/type-operations/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /type-operations : Updates an existing typeOperation.
     *
     * @param typeOperation the typeOperation to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated typeOperation,
     * or with status 400 (Bad Request) if the typeOperation is not valid,
     * or with status 500 (Internal Server Error) if the typeOperation couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/type-operations")
    @Timed
    public ResponseEntity<TypeOperation> updateTypeOperation(@RequestBody TypeOperation typeOperation) throws URISyntaxException {
        log.debug("REST request to update TypeOperation : {}", typeOperation);
        if (typeOperation.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TypeOperation result = typeOperationRepository.save(typeOperation);
        typeOperationSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, typeOperation.getId().toString()))
            .body(result);
    }

    /**
     * GET  /type-operations : get all the typeOperations.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of typeOperations in body
     */
    @GetMapping("/type-operations")
    @Timed
    public List<TypeOperation> getAllTypeOperations() {
        log.debug("REST request to get all TypeOperations");
        return typeOperationRepository.findAll();
    }

    /**
     * GET  /type-operations/:id : get the "id" typeOperation.
     *
     * @param id the id of the typeOperation to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the typeOperation, or with status 404 (Not Found)
     */
    @GetMapping("/type-operations/{id}")
    @Timed
    public ResponseEntity<TypeOperation> getTypeOperation(@PathVariable Long id) {
        log.debug("REST request to get TypeOperation : {}", id);
        Optional<TypeOperation> typeOperation = typeOperationRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(typeOperation);
    }

    /**
     * DELETE  /type-operations/:id : delete the "id" typeOperation.
     *
     * @param id the id of the typeOperation to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/type-operations/{id}")
    @Timed
    public ResponseEntity<Void> deleteTypeOperation(@PathVariable Long id) {
        log.debug("REST request to delete TypeOperation : {}", id);

        typeOperationRepository.deleteById(id);
        typeOperationSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/type-operations?query=:query : search for the typeOperation corresponding
     * to the query.
     *
     * @param query the query of the typeOperation search
     * @return the result of the search
     */
    @GetMapping("/_search/type-operations")
    @Timed
    public List<TypeOperation> searchTypeOperations(@RequestParam String query) {
        log.debug("REST request to search TypeOperations for query {}", query);
        return StreamSupport
            .stream(typeOperationSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
