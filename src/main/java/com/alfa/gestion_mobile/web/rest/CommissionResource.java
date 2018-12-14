package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.Commission;
import com.alfa.gestion_mobile.repository.CommissionRepository;
import com.alfa.gestion_mobile.repository.search.CommissionSearchRepository;
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
 * REST controller for managing Commission.
 */
@RestController
@RequestMapping("/api")
public class CommissionResource {

    private final Logger log = LoggerFactory.getLogger(CommissionResource.class);

    private static final String ENTITY_NAME = "commission";

    private final CommissionRepository commissionRepository;

    private final CommissionSearchRepository commissionSearchRepository;

    public CommissionResource(CommissionRepository commissionRepository, CommissionSearchRepository commissionSearchRepository) {
        this.commissionRepository = commissionRepository;
        this.commissionSearchRepository = commissionSearchRepository;
    }

    /**
     * POST  /commissions : Create a new commission.
     *
     * @param commission the commission to create
     * @return the ResponseEntity with status 201 (Created) and with body the new commission, or with status 400 (Bad Request) if the commission has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/commissions")
    @Timed
    public ResponseEntity<Commission> createCommission(@RequestBody Commission commission) throws URISyntaxException {
        log.debug("REST request to save Commission : {}", commission);
        if (commission.getId() != null) {
            throw new BadRequestAlertException("A new commission cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commission result = commissionRepository.save(commission);
        commissionSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/commissions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /commissions : Updates an existing commission.
     *
     * @param commission the commission to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated commission,
     * or with status 400 (Bad Request) if the commission is not valid,
     * or with status 500 (Internal Server Error) if the commission couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/commissions")
    @Timed
    public ResponseEntity<Commission> updateCommission(@RequestBody Commission commission) throws URISyntaxException {
        log.debug("REST request to update Commission : {}", commission);
        if (commission.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commission result = commissionRepository.save(commission);
        commissionSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, commission.getId().toString()))
            .body(result);
    }

    /**
     * GET  /commissions : get all the commissions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of commissions in body
     */
    @GetMapping("/commissions")
    @Timed
    public List<Commission> getAllCommissions() {
        log.debug("REST request to get all Commissions");
        return commissionRepository.findAll();
    }

    /**
     * GET  /commissions/:id : get the "id" commission.
     *
     * @param id the id of the commission to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the commission, or with status 404 (Not Found)
     */
    @GetMapping("/commissions/{id}")
    @Timed
    public ResponseEntity<Commission> getCommission(@PathVariable Long id) {
        log.debug("REST request to get Commission : {}", id);
        Optional<Commission> commission = commissionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(commission);
    }

    /**
     * DELETE  /commissions/:id : delete the "id" commission.
     *
     * @param id the id of the commission to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/commissions/{id}")
    @Timed
    public ResponseEntity<Void> deleteCommission(@PathVariable Long id) {
        log.debug("REST request to delete Commission : {}", id);

        commissionRepository.deleteById(id);
        commissionSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/commissions?query=:query : search for the commission corresponding
     * to the query.
     *
     * @param query the query of the commission search
     * @return the result of the search
     */
    @GetMapping("/_search/commissions")
    @Timed
    public List<Commission> searchCommissions(@RequestParam String query) {
        log.debug("REST request to search Commissions for query {}", query);
        return StreamSupport
            .stream(commissionSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
