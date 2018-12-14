package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.Compte;
import com.alfa.gestion_mobile.repository.CompteRepository;
import com.alfa.gestion_mobile.repository.search.CompteSearchRepository;
import com.alfa.gestion_mobile.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Collections;
import java.util.List;


import static com.alfa.gestion_mobile.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CompteResource REST controller.
 *
 * @see CompteResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class CompteResourceIntTest {

    private static final String DEFAULT_NUMCOMPTE = "AAAAAAAAAA";
    private static final String UPDATED_NUMCOMPTE = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATECREATION = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATECREATION = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final LocalDate DEFAULT_DATEDERNIEREOPERATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATEDERNIEREOPERATION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private CompteRepository compteRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.CompteSearchRepositoryMockConfiguration
     */
    @Autowired
    private CompteSearchRepository mockCompteSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCompteMockMvc;

    private Compte compte;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CompteResource compteResource = new CompteResource(compteRepository, mockCompteSearchRepository);
        this.restCompteMockMvc = MockMvcBuilders.standaloneSetup(compteResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Compte createEntity(EntityManager em) {
        Compte compte = new Compte()
            .numcompte(DEFAULT_NUMCOMPTE)
            .datecreation(DEFAULT_DATECREATION)
            .datederniereoperation(DEFAULT_DATEDERNIEREOPERATION);
        return compte;
    }

    @Before
    public void initTest() {
        compte = createEntity(em);
    }

    @Test
    @Transactional
    public void createCompte() throws Exception {
        int databaseSizeBeforeCreate = compteRepository.findAll().size();

        // Create the Compte
        restCompteMockMvc.perform(post("/api/comptes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compte)))
            .andExpect(status().isCreated());

        // Validate the Compte in the database
        List<Compte> compteList = compteRepository.findAll();
        assertThat(compteList).hasSize(databaseSizeBeforeCreate + 1);
        Compte testCompte = compteList.get(compteList.size() - 1);
        assertThat(testCompte.getNumcompte()).isEqualTo(DEFAULT_NUMCOMPTE);
        assertThat(testCompte.getDatecreation()).isEqualTo(DEFAULT_DATECREATION);
        assertThat(testCompte.getDatederniereoperation()).isEqualTo(DEFAULT_DATEDERNIEREOPERATION);

        // Validate the Compte in Elasticsearch
        verify(mockCompteSearchRepository, times(1)).save(testCompte);
    }

    @Test
    @Transactional
    public void createCompteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = compteRepository.findAll().size();

        // Create the Compte with an existing ID
        compte.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCompteMockMvc.perform(post("/api/comptes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compte)))
            .andExpect(status().isBadRequest());

        // Validate the Compte in the database
        List<Compte> compteList = compteRepository.findAll();
        assertThat(compteList).hasSize(databaseSizeBeforeCreate);

        // Validate the Compte in Elasticsearch
        verify(mockCompteSearchRepository, times(0)).save(compte);
    }

    @Test
    @Transactional
    public void getAllComptes() throws Exception {
        // Initialize the database
        compteRepository.saveAndFlush(compte);

        // Get all the compteList
        restCompteMockMvc.perform(get("/api/comptes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compte.getId().intValue())))
            .andExpect(jsonPath("$.[*].numcompte").value(hasItem(DEFAULT_NUMCOMPTE.toString())))
            .andExpect(jsonPath("$.[*].datecreation").value(hasItem(DEFAULT_DATECREATION.toString())))
            .andExpect(jsonPath("$.[*].datederniereoperation").value(hasItem(DEFAULT_DATEDERNIEREOPERATION.toString())));
    }
    
    @Test
    @Transactional
    public void getCompte() throws Exception {
        // Initialize the database
        compteRepository.saveAndFlush(compte);

        // Get the compte
        restCompteMockMvc.perform(get("/api/comptes/{id}", compte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(compte.getId().intValue()))
            .andExpect(jsonPath("$.numcompte").value(DEFAULT_NUMCOMPTE.toString()))
            .andExpect(jsonPath("$.datecreation").value(DEFAULT_DATECREATION.toString()))
            .andExpect(jsonPath("$.datederniereoperation").value(DEFAULT_DATEDERNIEREOPERATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCompte() throws Exception {
        // Get the compte
        restCompteMockMvc.perform(get("/api/comptes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCompte() throws Exception {
        // Initialize the database
        compteRepository.saveAndFlush(compte);

        int databaseSizeBeforeUpdate = compteRepository.findAll().size();

        // Update the compte
        Compte updatedCompte = compteRepository.findById(compte.getId()).get();
        // Disconnect from session so that the updates on updatedCompte are not directly saved in db
        em.detach(updatedCompte);
        updatedCompte
            .numcompte(UPDATED_NUMCOMPTE)
            .datecreation(UPDATED_DATECREATION)
            .datederniereoperation(UPDATED_DATEDERNIEREOPERATION);

        restCompteMockMvc.perform(put("/api/comptes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCompte)))
            .andExpect(status().isOk());

        // Validate the Compte in the database
        List<Compte> compteList = compteRepository.findAll();
        assertThat(compteList).hasSize(databaseSizeBeforeUpdate);
        Compte testCompte = compteList.get(compteList.size() - 1);
        assertThat(testCompte.getNumcompte()).isEqualTo(UPDATED_NUMCOMPTE);
        assertThat(testCompte.getDatecreation()).isEqualTo(UPDATED_DATECREATION);
        assertThat(testCompte.getDatederniereoperation()).isEqualTo(UPDATED_DATEDERNIEREOPERATION);

        // Validate the Compte in Elasticsearch
        verify(mockCompteSearchRepository, times(1)).save(testCompte);
    }

    @Test
    @Transactional
    public void updateNonExistingCompte() throws Exception {
        int databaseSizeBeforeUpdate = compteRepository.findAll().size();

        // Create the Compte

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCompteMockMvc.perform(put("/api/comptes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(compte)))
            .andExpect(status().isBadRequest());

        // Validate the Compte in the database
        List<Compte> compteList = compteRepository.findAll();
        assertThat(compteList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Compte in Elasticsearch
        verify(mockCompteSearchRepository, times(0)).save(compte);
    }

    @Test
    @Transactional
    public void deleteCompte() throws Exception {
        // Initialize the database
        compteRepository.saveAndFlush(compte);

        int databaseSizeBeforeDelete = compteRepository.findAll().size();

        // Get the compte
        restCompteMockMvc.perform(delete("/api/comptes/{id}", compte.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Compte> compteList = compteRepository.findAll();
        assertThat(compteList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Compte in Elasticsearch
        verify(mockCompteSearchRepository, times(1)).deleteById(compte.getId());
    }

    @Test
    @Transactional
    public void searchCompte() throws Exception {
        // Initialize the database
        compteRepository.saveAndFlush(compte);
        when(mockCompteSearchRepository.search(queryStringQuery("id:" + compte.getId())))
            .thenReturn(Collections.singletonList(compte));
        // Search the compte
        restCompteMockMvc.perform(get("/api/_search/comptes?query=id:" + compte.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(compte.getId().intValue())))
            .andExpect(jsonPath("$.[*].numcompte").value(hasItem(DEFAULT_NUMCOMPTE)))
            .andExpect(jsonPath("$.[*].datecreation").value(hasItem(DEFAULT_DATECREATION.toString())))
            .andExpect(jsonPath("$.[*].datederniereoperation").value(hasItem(DEFAULT_DATEDERNIEREOPERATION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Compte.class);
        Compte compte1 = new Compte();
        compte1.setId(1L);
        Compte compte2 = new Compte();
        compte2.setId(compte1.getId());
        assertThat(compte1).isEqualTo(compte2);
        compte2.setId(2L);
        assertThat(compte1).isNotEqualTo(compte2);
        compte1.setId(null);
        assertThat(compte1).isNotEqualTo(compte2);
    }
}
