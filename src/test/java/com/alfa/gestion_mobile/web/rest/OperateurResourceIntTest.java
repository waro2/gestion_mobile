package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.Operateur;
import com.alfa.gestion_mobile.repository.OperateurRepository;
import com.alfa.gestion_mobile.repository.search.OperateurSearchRepository;
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
import java.time.ZoneId;
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
 * Test class for the OperateurResource REST controller.
 *
 * @see OperateurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class OperateurResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATECREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATECREATION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private OperateurRepository operateurRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.OperateurSearchRepositoryMockConfiguration
     */
    @Autowired
    private OperateurSearchRepository mockOperateurSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restOperateurMockMvc;

    private Operateur operateur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OperateurResource operateurResource = new OperateurResource(operateurRepository, mockOperateurSearchRepository);
        this.restOperateurMockMvc = MockMvcBuilders.standaloneSetup(operateurResource)
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
    public static Operateur createEntity(EntityManager em) {
        Operateur operateur = new Operateur()
            .nom(DEFAULT_NOM)
            .datecreation(DEFAULT_DATECREATION);
        return operateur;
    }

    @Before
    public void initTest() {
        operateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createOperateur() throws Exception {
        int databaseSizeBeforeCreate = operateurRepository.findAll().size();

        // Create the Operateur
        restOperateurMockMvc.perform(post("/api/operateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operateur)))
            .andExpect(status().isCreated());

        // Validate the Operateur in the database
        List<Operateur> operateurList = operateurRepository.findAll();
        assertThat(operateurList).hasSize(databaseSizeBeforeCreate + 1);
        Operateur testOperateur = operateurList.get(operateurList.size() - 1);
        assertThat(testOperateur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testOperateur.getDatecreation()).isEqualTo(DEFAULT_DATECREATION);

        // Validate the Operateur in Elasticsearch
        verify(mockOperateurSearchRepository, times(1)).save(testOperateur);
    }

    @Test
    @Transactional
    public void createOperateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = operateurRepository.findAll().size();

        // Create the Operateur with an existing ID
        operateur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOperateurMockMvc.perform(post("/api/operateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operateur)))
            .andExpect(status().isBadRequest());

        // Validate the Operateur in the database
        List<Operateur> operateurList = operateurRepository.findAll();
        assertThat(operateurList).hasSize(databaseSizeBeforeCreate);

        // Validate the Operateur in Elasticsearch
        verify(mockOperateurSearchRepository, times(0)).save(operateur);
    }

    @Test
    @Transactional
    public void getAllOperateurs() throws Exception {
        // Initialize the database
        operateurRepository.saveAndFlush(operateur);

        // Get all the operateurList
        restOperateurMockMvc.perform(get("/api/operateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].datecreation").value(hasItem(DEFAULT_DATECREATION.toString())));
    }
    
    @Test
    @Transactional
    public void getOperateur() throws Exception {
        // Initialize the database
        operateurRepository.saveAndFlush(operateur);

        // Get the operateur
        restOperateurMockMvc.perform(get("/api/operateurs/{id}", operateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(operateur.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.datecreation").value(DEFAULT_DATECREATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOperateur() throws Exception {
        // Get the operateur
        restOperateurMockMvc.perform(get("/api/operateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOperateur() throws Exception {
        // Initialize the database
        operateurRepository.saveAndFlush(operateur);

        int databaseSizeBeforeUpdate = operateurRepository.findAll().size();

        // Update the operateur
        Operateur updatedOperateur = operateurRepository.findById(operateur.getId()).get();
        // Disconnect from session so that the updates on updatedOperateur are not directly saved in db
        em.detach(updatedOperateur);
        updatedOperateur
            .nom(UPDATED_NOM)
            .datecreation(UPDATED_DATECREATION);

        restOperateurMockMvc.perform(put("/api/operateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOperateur)))
            .andExpect(status().isOk());

        // Validate the Operateur in the database
        List<Operateur> operateurList = operateurRepository.findAll();
        assertThat(operateurList).hasSize(databaseSizeBeforeUpdate);
        Operateur testOperateur = operateurList.get(operateurList.size() - 1);
        assertThat(testOperateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testOperateur.getDatecreation()).isEqualTo(UPDATED_DATECREATION);

        // Validate the Operateur in Elasticsearch
        verify(mockOperateurSearchRepository, times(1)).save(testOperateur);
    }

    @Test
    @Transactional
    public void updateNonExistingOperateur() throws Exception {
        int databaseSizeBeforeUpdate = operateurRepository.findAll().size();

        // Create the Operateur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOperateurMockMvc.perform(put("/api/operateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(operateur)))
            .andExpect(status().isBadRequest());

        // Validate the Operateur in the database
        List<Operateur> operateurList = operateurRepository.findAll();
        assertThat(operateurList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Operateur in Elasticsearch
        verify(mockOperateurSearchRepository, times(0)).save(operateur);
    }

    @Test
    @Transactional
    public void deleteOperateur() throws Exception {
        // Initialize the database
        operateurRepository.saveAndFlush(operateur);

        int databaseSizeBeforeDelete = operateurRepository.findAll().size();

        // Get the operateur
        restOperateurMockMvc.perform(delete("/api/operateurs/{id}", operateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Operateur> operateurList = operateurRepository.findAll();
        assertThat(operateurList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Operateur in Elasticsearch
        verify(mockOperateurSearchRepository, times(1)).deleteById(operateur.getId());
    }

    @Test
    @Transactional
    public void searchOperateur() throws Exception {
        // Initialize the database
        operateurRepository.saveAndFlush(operateur);
        when(mockOperateurSearchRepository.search(queryStringQuery("id:" + operateur.getId())))
            .thenReturn(Collections.singletonList(operateur));
        // Search the operateur
        restOperateurMockMvc.perform(get("/api/_search/operateurs?query=id:" + operateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(operateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].datecreation").value(hasItem(DEFAULT_DATECREATION.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Operateur.class);
        Operateur operateur1 = new Operateur();
        operateur1.setId(1L);
        Operateur operateur2 = new Operateur();
        operateur2.setId(operateur1.getId());
        assertThat(operateur1).isEqualTo(operateur2);
        operateur2.setId(2L);
        assertThat(operateur1).isNotEqualTo(operateur2);
        operateur1.setId(null);
        assertThat(operateur1).isNotEqualTo(operateur2);
    }
}
