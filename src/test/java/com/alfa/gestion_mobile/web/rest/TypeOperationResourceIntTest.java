package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.TypeOperation;
import com.alfa.gestion_mobile.repository.TypeOperationRepository;
import com.alfa.gestion_mobile.repository.search.TypeOperationSearchRepository;
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
 * Test class for the TypeOperationResource REST controller.
 *
 * @see TypeOperationResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class TypeOperationResourceIntTest {

    private static final String DEFAULT_RETRAIT = "AAAAAAAAAA";
    private static final String UPDATED_RETRAIT = "BBBBBBBBBB";

    private static final String DEFAULT_DEPOT = "AAAAAAAAAA";
    private static final String UPDATED_DEPOT = "BBBBBBBBBB";

    private static final String DEFAULT_ACHATCREDIT = "AAAAAAAAAA";
    private static final String UPDATED_ACHATCREDIT = "BBBBBBBBBB";

    @Autowired
    private TypeOperationRepository typeOperationRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.TypeOperationSearchRepositoryMockConfiguration
     */
    @Autowired
    private TypeOperationSearchRepository mockTypeOperationSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restTypeOperationMockMvc;

    private TypeOperation typeOperation;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TypeOperationResource typeOperationResource = new TypeOperationResource(typeOperationRepository, mockTypeOperationSearchRepository);
        this.restTypeOperationMockMvc = MockMvcBuilders.standaloneSetup(typeOperationResource)
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
    public static TypeOperation createEntity(EntityManager em) {
        TypeOperation typeOperation = new TypeOperation()
            .retrait(DEFAULT_RETRAIT)
            .depot(DEFAULT_DEPOT)
            .achatcredit(DEFAULT_ACHATCREDIT);
        return typeOperation;
    }

    @Before
    public void initTest() {
        typeOperation = createEntity(em);
    }

    @Test
    @Transactional
    public void createTypeOperation() throws Exception {
        int databaseSizeBeforeCreate = typeOperationRepository.findAll().size();

        // Create the TypeOperation
        restTypeOperationMockMvc.perform(post("/api/type-operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOperation)))
            .andExpect(status().isCreated());

        // Validate the TypeOperation in the database
        List<TypeOperation> typeOperationList = typeOperationRepository.findAll();
        assertThat(typeOperationList).hasSize(databaseSizeBeforeCreate + 1);
        TypeOperation testTypeOperation = typeOperationList.get(typeOperationList.size() - 1);
        assertThat(testTypeOperation.getRetrait()).isEqualTo(DEFAULT_RETRAIT);
        assertThat(testTypeOperation.getDepot()).isEqualTo(DEFAULT_DEPOT);
        assertThat(testTypeOperation.getAchatcredit()).isEqualTo(DEFAULT_ACHATCREDIT);

        // Validate the TypeOperation in Elasticsearch
        verify(mockTypeOperationSearchRepository, times(1)).save(testTypeOperation);
    }

    @Test
    @Transactional
    public void createTypeOperationWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = typeOperationRepository.findAll().size();

        // Create the TypeOperation with an existing ID
        typeOperation.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTypeOperationMockMvc.perform(post("/api/type-operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOperation)))
            .andExpect(status().isBadRequest());

        // Validate the TypeOperation in the database
        List<TypeOperation> typeOperationList = typeOperationRepository.findAll();
        assertThat(typeOperationList).hasSize(databaseSizeBeforeCreate);

        // Validate the TypeOperation in Elasticsearch
        verify(mockTypeOperationSearchRepository, times(0)).save(typeOperation);
    }

    @Test
    @Transactional
    public void getAllTypeOperations() throws Exception {
        // Initialize the database
        typeOperationRepository.saveAndFlush(typeOperation);

        // Get all the typeOperationList
        restTypeOperationMockMvc.perform(get("/api/type-operations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeOperation.getId().intValue())))
            .andExpect(jsonPath("$.[*].retrait").value(hasItem(DEFAULT_RETRAIT.toString())))
            .andExpect(jsonPath("$.[*].depot").value(hasItem(DEFAULT_DEPOT.toString())))
            .andExpect(jsonPath("$.[*].achatcredit").value(hasItem(DEFAULT_ACHATCREDIT.toString())));
    }
    
    @Test
    @Transactional
    public void getTypeOperation() throws Exception {
        // Initialize the database
        typeOperationRepository.saveAndFlush(typeOperation);

        // Get the typeOperation
        restTypeOperationMockMvc.perform(get("/api/type-operations/{id}", typeOperation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(typeOperation.getId().intValue()))
            .andExpect(jsonPath("$.retrait").value(DEFAULT_RETRAIT.toString()))
            .andExpect(jsonPath("$.depot").value(DEFAULT_DEPOT.toString()))
            .andExpect(jsonPath("$.achatcredit").value(DEFAULT_ACHATCREDIT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingTypeOperation() throws Exception {
        // Get the typeOperation
        restTypeOperationMockMvc.perform(get("/api/type-operations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTypeOperation() throws Exception {
        // Initialize the database
        typeOperationRepository.saveAndFlush(typeOperation);

        int databaseSizeBeforeUpdate = typeOperationRepository.findAll().size();

        // Update the typeOperation
        TypeOperation updatedTypeOperation = typeOperationRepository.findById(typeOperation.getId()).get();
        // Disconnect from session so that the updates on updatedTypeOperation are not directly saved in db
        em.detach(updatedTypeOperation);
        updatedTypeOperation
            .retrait(UPDATED_RETRAIT)
            .depot(UPDATED_DEPOT)
            .achatcredit(UPDATED_ACHATCREDIT);

        restTypeOperationMockMvc.perform(put("/api/type-operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTypeOperation)))
            .andExpect(status().isOk());

        // Validate the TypeOperation in the database
        List<TypeOperation> typeOperationList = typeOperationRepository.findAll();
        assertThat(typeOperationList).hasSize(databaseSizeBeforeUpdate);
        TypeOperation testTypeOperation = typeOperationList.get(typeOperationList.size() - 1);
        assertThat(testTypeOperation.getRetrait()).isEqualTo(UPDATED_RETRAIT);
        assertThat(testTypeOperation.getDepot()).isEqualTo(UPDATED_DEPOT);
        assertThat(testTypeOperation.getAchatcredit()).isEqualTo(UPDATED_ACHATCREDIT);

        // Validate the TypeOperation in Elasticsearch
        verify(mockTypeOperationSearchRepository, times(1)).save(testTypeOperation);
    }

    @Test
    @Transactional
    public void updateNonExistingTypeOperation() throws Exception {
        int databaseSizeBeforeUpdate = typeOperationRepository.findAll().size();

        // Create the TypeOperation

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTypeOperationMockMvc.perform(put("/api/type-operations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(typeOperation)))
            .andExpect(status().isBadRequest());

        // Validate the TypeOperation in the database
        List<TypeOperation> typeOperationList = typeOperationRepository.findAll();
        assertThat(typeOperationList).hasSize(databaseSizeBeforeUpdate);

        // Validate the TypeOperation in Elasticsearch
        verify(mockTypeOperationSearchRepository, times(0)).save(typeOperation);
    }

    @Test
    @Transactional
    public void deleteTypeOperation() throws Exception {
        // Initialize the database
        typeOperationRepository.saveAndFlush(typeOperation);

        int databaseSizeBeforeDelete = typeOperationRepository.findAll().size();

        // Get the typeOperation
        restTypeOperationMockMvc.perform(delete("/api/type-operations/{id}", typeOperation.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<TypeOperation> typeOperationList = typeOperationRepository.findAll();
        assertThat(typeOperationList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the TypeOperation in Elasticsearch
        verify(mockTypeOperationSearchRepository, times(1)).deleteById(typeOperation.getId());
    }

    @Test
    @Transactional
    public void searchTypeOperation() throws Exception {
        // Initialize the database
        typeOperationRepository.saveAndFlush(typeOperation);
        when(mockTypeOperationSearchRepository.search(queryStringQuery("id:" + typeOperation.getId())))
            .thenReturn(Collections.singletonList(typeOperation));
        // Search the typeOperation
        restTypeOperationMockMvc.perform(get("/api/_search/type-operations?query=id:" + typeOperation.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(typeOperation.getId().intValue())))
            .andExpect(jsonPath("$.[*].retrait").value(hasItem(DEFAULT_RETRAIT)))
            .andExpect(jsonPath("$.[*].depot").value(hasItem(DEFAULT_DEPOT)))
            .andExpect(jsonPath("$.[*].achatcredit").value(hasItem(DEFAULT_ACHATCREDIT)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TypeOperation.class);
        TypeOperation typeOperation1 = new TypeOperation();
        typeOperation1.setId(1L);
        TypeOperation typeOperation2 = new TypeOperation();
        typeOperation2.setId(typeOperation1.getId());
        assertThat(typeOperation1).isEqualTo(typeOperation2);
        typeOperation2.setId(2L);
        assertThat(typeOperation1).isNotEqualTo(typeOperation2);
        typeOperation1.setId(null);
        assertThat(typeOperation1).isNotEqualTo(typeOperation2);
    }
}
