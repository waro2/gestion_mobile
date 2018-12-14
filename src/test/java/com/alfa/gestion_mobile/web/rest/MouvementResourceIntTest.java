package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.Mouvement;
import com.alfa.gestion_mobile.repository.MouvementRepository;
import com.alfa.gestion_mobile.repository.search.MouvementSearchRepository;
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
 * Test class for the MouvementResource REST controller.
 *
 * @see MouvementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class MouvementResourceIntTest {

    private static final String DEFAULT_SENS = "AAAAAAAAAA";
    private static final String UPDATED_SENS = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCE = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Double DEFAULT_MONTANT = 1D;
    private static final Double UPDATED_MONTANT = 2D;

    @Autowired
    private MouvementRepository mouvementRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.MouvementSearchRepositoryMockConfiguration
     */
    @Autowired
    private MouvementSearchRepository mockMouvementSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMouvementMockMvc;

    private Mouvement mouvement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MouvementResource mouvementResource = new MouvementResource(mouvementRepository, mockMouvementSearchRepository);
        this.restMouvementMockMvc = MockMvcBuilders.standaloneSetup(mouvementResource)
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
    public static Mouvement createEntity(EntityManager em) {
        Mouvement mouvement = new Mouvement()
            .sens(DEFAULT_SENS)
            .reference(DEFAULT_REFERENCE)
            .date(DEFAULT_DATE)
            .montant(DEFAULT_MONTANT);
        return mouvement;
    }

    @Before
    public void initTest() {
        mouvement = createEntity(em);
    }

    @Test
    @Transactional
    public void createMouvement() throws Exception {
        int databaseSizeBeforeCreate = mouvementRepository.findAll().size();

        // Create the Mouvement
        restMouvementMockMvc.perform(post("/api/mouvements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvement)))
            .andExpect(status().isCreated());

        // Validate the Mouvement in the database
        List<Mouvement> mouvementList = mouvementRepository.findAll();
        assertThat(mouvementList).hasSize(databaseSizeBeforeCreate + 1);
        Mouvement testMouvement = mouvementList.get(mouvementList.size() - 1);
        assertThat(testMouvement.getSens()).isEqualTo(DEFAULT_SENS);
        assertThat(testMouvement.getReference()).isEqualTo(DEFAULT_REFERENCE);
        assertThat(testMouvement.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testMouvement.getMontant()).isEqualTo(DEFAULT_MONTANT);

        // Validate the Mouvement in Elasticsearch
        verify(mockMouvementSearchRepository, times(1)).save(testMouvement);
    }

    @Test
    @Transactional
    public void createMouvementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mouvementRepository.findAll().size();

        // Create the Mouvement with an existing ID
        mouvement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMouvementMockMvc.perform(post("/api/mouvements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvement)))
            .andExpect(status().isBadRequest());

        // Validate the Mouvement in the database
        List<Mouvement> mouvementList = mouvementRepository.findAll();
        assertThat(mouvementList).hasSize(databaseSizeBeforeCreate);

        // Validate the Mouvement in Elasticsearch
        verify(mockMouvementSearchRepository, times(0)).save(mouvement);
    }

    @Test
    @Transactional
    public void getAllMouvements() throws Exception {
        // Initialize the database
        mouvementRepository.saveAndFlush(mouvement);

        // Get all the mouvementList
        restMouvementMockMvc.perform(get("/api/mouvements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mouvement.getId().intValue())))
            .andExpect(jsonPath("$.[*].sens").value(hasItem(DEFAULT_SENS.toString())))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getMouvement() throws Exception {
        // Initialize the database
        mouvementRepository.saveAndFlush(mouvement);

        // Get the mouvement
        restMouvementMockMvc.perform(get("/api/mouvements/{id}", mouvement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mouvement.getId().intValue()))
            .andExpect(jsonPath("$.sens").value(DEFAULT_SENS.toString()))
            .andExpect(jsonPath("$.reference").value(DEFAULT_REFERENCE.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.montant").value(DEFAULT_MONTANT.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingMouvement() throws Exception {
        // Get the mouvement
        restMouvementMockMvc.perform(get("/api/mouvements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMouvement() throws Exception {
        // Initialize the database
        mouvementRepository.saveAndFlush(mouvement);

        int databaseSizeBeforeUpdate = mouvementRepository.findAll().size();

        // Update the mouvement
        Mouvement updatedMouvement = mouvementRepository.findById(mouvement.getId()).get();
        // Disconnect from session so that the updates on updatedMouvement are not directly saved in db
        em.detach(updatedMouvement);
        updatedMouvement
            .sens(UPDATED_SENS)
            .reference(UPDATED_REFERENCE)
            .date(UPDATED_DATE)
            .montant(UPDATED_MONTANT);

        restMouvementMockMvc.perform(put("/api/mouvements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMouvement)))
            .andExpect(status().isOk());

        // Validate the Mouvement in the database
        List<Mouvement> mouvementList = mouvementRepository.findAll();
        assertThat(mouvementList).hasSize(databaseSizeBeforeUpdate);
        Mouvement testMouvement = mouvementList.get(mouvementList.size() - 1);
        assertThat(testMouvement.getSens()).isEqualTo(UPDATED_SENS);
        assertThat(testMouvement.getReference()).isEqualTo(UPDATED_REFERENCE);
        assertThat(testMouvement.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testMouvement.getMontant()).isEqualTo(UPDATED_MONTANT);

        // Validate the Mouvement in Elasticsearch
        verify(mockMouvementSearchRepository, times(1)).save(testMouvement);
    }

    @Test
    @Transactional
    public void updateNonExistingMouvement() throws Exception {
        int databaseSizeBeforeUpdate = mouvementRepository.findAll().size();

        // Create the Mouvement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMouvementMockMvc.perform(put("/api/mouvements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mouvement)))
            .andExpect(status().isBadRequest());

        // Validate the Mouvement in the database
        List<Mouvement> mouvementList = mouvementRepository.findAll();
        assertThat(mouvementList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Mouvement in Elasticsearch
        verify(mockMouvementSearchRepository, times(0)).save(mouvement);
    }

    @Test
    @Transactional
    public void deleteMouvement() throws Exception {
        // Initialize the database
        mouvementRepository.saveAndFlush(mouvement);

        int databaseSizeBeforeDelete = mouvementRepository.findAll().size();

        // Get the mouvement
        restMouvementMockMvc.perform(delete("/api/mouvements/{id}", mouvement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Mouvement> mouvementList = mouvementRepository.findAll();
        assertThat(mouvementList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Mouvement in Elasticsearch
        verify(mockMouvementSearchRepository, times(1)).deleteById(mouvement.getId());
    }

    @Test
    @Transactional
    public void searchMouvement() throws Exception {
        // Initialize the database
        mouvementRepository.saveAndFlush(mouvement);
        when(mockMouvementSearchRepository.search(queryStringQuery("id:" + mouvement.getId())))
            .thenReturn(Collections.singletonList(mouvement));
        // Search the mouvement
        restMouvementMockMvc.perform(get("/api/_search/mouvements?query=id:" + mouvement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mouvement.getId().intValue())))
            .andExpect(jsonPath("$.[*].sens").value(hasItem(DEFAULT_SENS)))
            .andExpect(jsonPath("$.[*].reference").value(hasItem(DEFAULT_REFERENCE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].montant").value(hasItem(DEFAULT_MONTANT.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mouvement.class);
        Mouvement mouvement1 = new Mouvement();
        mouvement1.setId(1L);
        Mouvement mouvement2 = new Mouvement();
        mouvement2.setId(mouvement1.getId());
        assertThat(mouvement1).isEqualTo(mouvement2);
        mouvement2.setId(2L);
        assertThat(mouvement1).isNotEqualTo(mouvement2);
        mouvement1.setId(null);
        assertThat(mouvement1).isNotEqualTo(mouvement2);
    }
}
