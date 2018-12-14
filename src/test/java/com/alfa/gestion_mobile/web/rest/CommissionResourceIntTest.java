package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.Commission;
import com.alfa.gestion_mobile.repository.CommissionRepository;
import com.alfa.gestion_mobile.repository.search.CommissionSearchRepository;
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
 * Test class for the CommissionResource REST controller.
 *
 * @see CommissionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class CommissionResourceIntTest {

    private static final Double DEFAULT_MONTANTMIN = 1D;
    private static final Double UPDATED_MONTANTMIN = 2D;

    private static final Double DEFAULT_MONTANTMAX = 1D;
    private static final Double UPDATED_MONTANTMAX = 2D;

    private static final Double DEFAULT_COMMISSION = 1D;
    private static final Double UPDATED_COMMISSION = 2D;

    @Autowired
    private CommissionRepository commissionRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.CommissionSearchRepositoryMockConfiguration
     */
    @Autowired
    private CommissionSearchRepository mockCommissionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCommissionMockMvc;

    private Commission commission;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommissionResource commissionResource = new CommissionResource(commissionRepository, mockCommissionSearchRepository);
        this.restCommissionMockMvc = MockMvcBuilders.standaloneSetup(commissionResource)
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
    public static Commission createEntity(EntityManager em) {
        Commission commission = new Commission()
            .montantmin(DEFAULT_MONTANTMIN)
            .montantmax(DEFAULT_MONTANTMAX)
            .commission(DEFAULT_COMMISSION);
        return commission;
    }

    @Before
    public void initTest() {
        commission = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommission() throws Exception {
        int databaseSizeBeforeCreate = commissionRepository.findAll().size();

        // Create the Commission
        restCommissionMockMvc.perform(post("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isCreated());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeCreate + 1);
        Commission testCommission = commissionList.get(commissionList.size() - 1);
        assertThat(testCommission.getMontantmin()).isEqualTo(DEFAULT_MONTANTMIN);
        assertThat(testCommission.getMontantmax()).isEqualTo(DEFAULT_MONTANTMAX);
        assertThat(testCommission.getCommission()).isEqualTo(DEFAULT_COMMISSION);

        // Validate the Commission in Elasticsearch
        verify(mockCommissionSearchRepository, times(1)).save(testCommission);
    }

    @Test
    @Transactional
    public void createCommissionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commissionRepository.findAll().size();

        // Create the Commission with an existing ID
        commission.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommissionMockMvc.perform(post("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isBadRequest());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeCreate);

        // Validate the Commission in Elasticsearch
        verify(mockCommissionSearchRepository, times(0)).save(commission);
    }

    @Test
    @Transactional
    public void getAllCommissions() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        // Get all the commissionList
        restCommissionMockMvc.perform(get("/api/commissions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commission.getId().intValue())))
            .andExpect(jsonPath("$.[*].montantmin").value(hasItem(DEFAULT_MONTANTMIN.doubleValue())))
            .andExpect(jsonPath("$.[*].montantmax").value(hasItem(DEFAULT_MONTANTMAX.doubleValue())))
            .andExpect(jsonPath("$.[*].commission").value(hasItem(DEFAULT_COMMISSION.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        // Get the commission
        restCommissionMockMvc.perform(get("/api/commissions/{id}", commission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commission.getId().intValue()))
            .andExpect(jsonPath("$.montantmin").value(DEFAULT_MONTANTMIN.doubleValue()))
            .andExpect(jsonPath("$.montantmax").value(DEFAULT_MONTANTMAX.doubleValue()))
            .andExpect(jsonPath("$.commission").value(DEFAULT_COMMISSION.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingCommission() throws Exception {
        // Get the commission
        restCommissionMockMvc.perform(get("/api/commissions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        int databaseSizeBeforeUpdate = commissionRepository.findAll().size();

        // Update the commission
        Commission updatedCommission = commissionRepository.findById(commission.getId()).get();
        // Disconnect from session so that the updates on updatedCommission are not directly saved in db
        em.detach(updatedCommission);
        updatedCommission
            .montantmin(UPDATED_MONTANTMIN)
            .montantmax(UPDATED_MONTANTMAX)
            .commission(UPDATED_COMMISSION);

        restCommissionMockMvc.perform(put("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommission)))
            .andExpect(status().isOk());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeUpdate);
        Commission testCommission = commissionList.get(commissionList.size() - 1);
        assertThat(testCommission.getMontantmin()).isEqualTo(UPDATED_MONTANTMIN);
        assertThat(testCommission.getMontantmax()).isEqualTo(UPDATED_MONTANTMAX);
        assertThat(testCommission.getCommission()).isEqualTo(UPDATED_COMMISSION);

        // Validate the Commission in Elasticsearch
        verify(mockCommissionSearchRepository, times(1)).save(testCommission);
    }

    @Test
    @Transactional
    public void updateNonExistingCommission() throws Exception {
        int databaseSizeBeforeUpdate = commissionRepository.findAll().size();

        // Create the Commission

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommissionMockMvc.perform(put("/api/commissions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commission)))
            .andExpect(status().isBadRequest());

        // Validate the Commission in the database
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Commission in Elasticsearch
        verify(mockCommissionSearchRepository, times(0)).save(commission);
    }

    @Test
    @Transactional
    public void deleteCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);

        int databaseSizeBeforeDelete = commissionRepository.findAll().size();

        // Get the commission
        restCommissionMockMvc.perform(delete("/api/commissions/{id}", commission.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Commission> commissionList = commissionRepository.findAll();
        assertThat(commissionList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Commission in Elasticsearch
        verify(mockCommissionSearchRepository, times(1)).deleteById(commission.getId());
    }

    @Test
    @Transactional
    public void searchCommission() throws Exception {
        // Initialize the database
        commissionRepository.saveAndFlush(commission);
        when(mockCommissionSearchRepository.search(queryStringQuery("id:" + commission.getId())))
            .thenReturn(Collections.singletonList(commission));
        // Search the commission
        restCommissionMockMvc.perform(get("/api/_search/commissions?query=id:" + commission.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commission.getId().intValue())))
            .andExpect(jsonPath("$.[*].montantmin").value(hasItem(DEFAULT_MONTANTMIN.doubleValue())))
            .andExpect(jsonPath("$.[*].montantmax").value(hasItem(DEFAULT_MONTANTMAX.doubleValue())))
            .andExpect(jsonPath("$.[*].commission").value(hasItem(DEFAULT_COMMISSION.doubleValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commission.class);
        Commission commission1 = new Commission();
        commission1.setId(1L);
        Commission commission2 = new Commission();
        commission2.setId(commission1.getId());
        assertThat(commission1).isEqualTo(commission2);
        commission2.setId(2L);
        assertThat(commission1).isNotEqualTo(commission2);
        commission1.setId(null);
        assertThat(commission1).isNotEqualTo(commission2);
    }
}
