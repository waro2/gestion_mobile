package com.alfa.gestion_mobile.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.alfa.gestion_mobile.domain.GroupeUser;
import com.alfa.gestion_mobile.repository.GroupeUserRepository;
import com.alfa.gestion_mobile.repository.search.GroupeUserSearchRepository;
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
 * REST controller for managing GroupeUser.
 */
@RestController
@RequestMapping("/api")
public class GroupeUserResource {

    private final Logger log = LoggerFactory.getLogger(GroupeUserResource.class);

    private static final String ENTITY_NAME = "groupeUser";

    private final GroupeUserRepository groupeUserRepository;

    private final GroupeUserSearchRepository groupeUserSearchRepository;

    public GroupeUserResource(GroupeUserRepository groupeUserRepository, GroupeUserSearchRepository groupeUserSearchRepository) {
        this.groupeUserRepository = groupeUserRepository;
        this.groupeUserSearchRepository = groupeUserSearchRepository;
    }

    /**
     * POST  /groupe-users : Create a new groupeUser.
     *
     * @param groupeUser the groupeUser to create
     * @return the ResponseEntity with status 201 (Created) and with body the new groupeUser, or with status 400 (Bad Request) if the groupeUser has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/groupe-users")
    @Timed
    public ResponseEntity<GroupeUser> createGroupeUser(@RequestBody GroupeUser groupeUser) throws URISyntaxException {
        log.debug("REST request to save GroupeUser : {}", groupeUser);
        if (groupeUser.getId() != null) {
            throw new BadRequestAlertException("A new groupeUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        GroupeUser result = groupeUserRepository.save(groupeUser);
        groupeUserSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/groupe-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /groupe-users : Updates an existing groupeUser.
     *
     * @param groupeUser the groupeUser to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated groupeUser,
     * or with status 400 (Bad Request) if the groupeUser is not valid,
     * or with status 500 (Internal Server Error) if the groupeUser couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/groupe-users")
    @Timed
    public ResponseEntity<GroupeUser> updateGroupeUser(@RequestBody GroupeUser groupeUser) throws URISyntaxException {
        log.debug("REST request to update GroupeUser : {}", groupeUser);
        if (groupeUser.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        GroupeUser result = groupeUserRepository.save(groupeUser);
        groupeUserSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, groupeUser.getId().toString()))
            .body(result);
    }

    /**
     * GET  /groupe-users : get all the groupeUsers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of groupeUsers in body
     */
    @GetMapping("/groupe-users")
    @Timed
    public List<GroupeUser> getAllGroupeUsers() {
        log.debug("REST request to get all GroupeUsers");
        return groupeUserRepository.findAll();
    }

    /**
     * GET  /groupe-users/:id : get the "id" groupeUser.
     *
     * @param id the id of the groupeUser to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the groupeUser, or with status 404 (Not Found)
     */
    @GetMapping("/groupe-users/{id}")
    @Timed
    public ResponseEntity<GroupeUser> getGroupeUser(@PathVariable Long id) {
        log.debug("REST request to get GroupeUser : {}", id);
        Optional<GroupeUser> groupeUser = groupeUserRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(groupeUser);
    }

    /**
     * DELETE  /groupe-users/:id : delete the "id" groupeUser.
     *
     * @param id the id of the groupeUser to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/groupe-users/{id}")
    @Timed
    public ResponseEntity<Void> deleteGroupeUser(@PathVariable Long id) {
        log.debug("REST request to delete GroupeUser : {}", id);

        groupeUserRepository.deleteById(id);
        groupeUserSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/groupe-users?query=:query : search for the groupeUser corresponding
     * to the query.
     *
     * @param query the query of the groupeUser search
     * @return the result of the search
     */
    @GetMapping("/_search/groupe-users")
    @Timed
    public List<GroupeUser> searchGroupeUsers(@RequestParam String query) {
        log.debug("REST request to search GroupeUsers for query {}", query);
        return StreamSupport
            .stream(groupeUserSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .collect(Collectors.toList());
    }

}
