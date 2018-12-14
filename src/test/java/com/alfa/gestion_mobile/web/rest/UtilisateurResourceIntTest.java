package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.Utilisateur;
import com.alfa.gestion_mobile.repository.UtilisateurRepository;
import com.alfa.gestion_mobile.repository.search.UtilisateurSearchRepository;
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
 * Test class for the UtilisateurResource REST controller.
 *
 * @see UtilisateurResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class UtilisateurResourceIntTest {

    private static final String DEFAULT_LOGIN = "AAAAAAAAAA";
    private static final String UPDATED_LOGIN = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOMS = "AAAAAAAAAA";
    private static final String UPDATED_PRENOMS = "BBBBBBBBBB";

    private static final String DEFAULT_MOTDEPASS = "AAAAAAAAAA";
    private static final String UPDATED_MOTDEPASS = "BBBBBBBBBB";

    private static final String DEFAULT_TELEPHONE = "AAAAAAAAAA";
    private static final String UPDATED_TELEPHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.UtilisateurSearchRepositoryMockConfiguration
     */
    @Autowired
    private UtilisateurSearchRepository mockUtilisateurSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUtilisateurMockMvc;

    private Utilisateur utilisateur;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UtilisateurResource utilisateurResource = new UtilisateurResource(utilisateurRepository, mockUtilisateurSearchRepository);
        this.restUtilisateurMockMvc = MockMvcBuilders.standaloneSetup(utilisateurResource)
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
    public static Utilisateur createEntity(EntityManager em) {
        Utilisateur utilisateur = new Utilisateur()
            .login(DEFAULT_LOGIN)
            .nom(DEFAULT_NOM)
            .prenoms(DEFAULT_PRENOMS)
            .motdepass(DEFAULT_MOTDEPASS)
            .telephone(DEFAULT_TELEPHONE)
            .adresse(DEFAULT_ADRESSE);
        return utilisateur;
    }

    @Before
    public void initTest() {
        utilisateur = createEntity(em);
    }

    @Test
    @Transactional
    public void createUtilisateur() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Create the Utilisateur
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isCreated());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate + 1);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getLogin()).isEqualTo(DEFAULT_LOGIN);
        assertThat(testUtilisateur.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testUtilisateur.getPrenoms()).isEqualTo(DEFAULT_PRENOMS);
        assertThat(testUtilisateur.getMotdepass()).isEqualTo(DEFAULT_MOTDEPASS);
        assertThat(testUtilisateur.getTelephone()).isEqualTo(DEFAULT_TELEPHONE);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(DEFAULT_ADRESSE);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).save(testUtilisateur);
    }

    @Test
    @Transactional
    public void createUtilisateurWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = utilisateurRepository.findAll().size();

        // Create the Utilisateur with an existing ID
        utilisateur.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUtilisateurMockMvc.perform(post("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeCreate);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(0)).save(utilisateur);
    }

    @Test
    @Transactional
    public void getAllUtilisateurs() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get all the utilisateurList
        restUtilisateurMockMvc.perform(get("/api/utilisateurs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].prenoms").value(hasItem(DEFAULT_PRENOMS.toString())))
            .andExpect(jsonPath("$.[*].motdepass").value(hasItem(DEFAULT_MOTDEPASS.toString())))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE.toString())))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE.toString())));
    }
    
    @Test
    @Transactional
    public void getUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(utilisateur.getId().intValue()))
            .andExpect(jsonPath("$.login").value(DEFAULT_LOGIN.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.prenoms").value(DEFAULT_PRENOMS.toString()))
            .andExpect(jsonPath("$.motdepass").value(DEFAULT_MOTDEPASS.toString()))
            .andExpect(jsonPath("$.telephone").value(DEFAULT_TELEPHONE.toString()))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingUtilisateur() throws Exception {
        // Get the utilisateur
        restUtilisateurMockMvc.perform(get("/api/utilisateurs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Update the utilisateur
        Utilisateur updatedUtilisateur = utilisateurRepository.findById(utilisateur.getId()).get();
        // Disconnect from session so that the updates on updatedUtilisateur are not directly saved in db
        em.detach(updatedUtilisateur);
        updatedUtilisateur
            .login(UPDATED_LOGIN)
            .nom(UPDATED_NOM)
            .prenoms(UPDATED_PRENOMS)
            .motdepass(UPDATED_MOTDEPASS)
            .telephone(UPDATED_TELEPHONE)
            .adresse(UPDATED_ADRESSE);

        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUtilisateur)))
            .andExpect(status().isOk());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);
        Utilisateur testUtilisateur = utilisateurList.get(utilisateurList.size() - 1);
        assertThat(testUtilisateur.getLogin()).isEqualTo(UPDATED_LOGIN);
        assertThat(testUtilisateur.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testUtilisateur.getPrenoms()).isEqualTo(UPDATED_PRENOMS);
        assertThat(testUtilisateur.getMotdepass()).isEqualTo(UPDATED_MOTDEPASS);
        assertThat(testUtilisateur.getTelephone()).isEqualTo(UPDATED_TELEPHONE);
        assertThat(testUtilisateur.getAdresse()).isEqualTo(UPDATED_ADRESSE);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).save(testUtilisateur);
    }

    @Test
    @Transactional
    public void updateNonExistingUtilisateur() throws Exception {
        int databaseSizeBeforeUpdate = utilisateurRepository.findAll().size();

        // Create the Utilisateur

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUtilisateurMockMvc.perform(put("/api/utilisateurs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(utilisateur)))
            .andExpect(status().isBadRequest());

        // Validate the Utilisateur in the database
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeUpdate);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(0)).save(utilisateur);
    }

    @Test
    @Transactional
    public void deleteUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);

        int databaseSizeBeforeDelete = utilisateurRepository.findAll().size();

        // Get the utilisateur
        restUtilisateurMockMvc.perform(delete("/api/utilisateurs/{id}", utilisateur.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Utilisateur> utilisateurList = utilisateurRepository.findAll();
        assertThat(utilisateurList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the Utilisateur in Elasticsearch
        verify(mockUtilisateurSearchRepository, times(1)).deleteById(utilisateur.getId());
    }

    @Test
    @Transactional
    public void searchUtilisateur() throws Exception {
        // Initialize the database
        utilisateurRepository.saveAndFlush(utilisateur);
        when(mockUtilisateurSearchRepository.search(queryStringQuery("id:" + utilisateur.getId())))
            .thenReturn(Collections.singletonList(utilisateur));
        // Search the utilisateur
        restUtilisateurMockMvc.perform(get("/api/_search/utilisateurs?query=id:" + utilisateur.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(utilisateur.getId().intValue())))
            .andExpect(jsonPath("$.[*].login").value(hasItem(DEFAULT_LOGIN)))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenoms").value(hasItem(DEFAULT_PRENOMS)))
            .andExpect(jsonPath("$.[*].motdepass").value(hasItem(DEFAULT_MOTDEPASS)))
            .andExpect(jsonPath("$.[*].telephone").value(hasItem(DEFAULT_TELEPHONE)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Utilisateur.class);
        Utilisateur utilisateur1 = new Utilisateur();
        utilisateur1.setId(1L);
        Utilisateur utilisateur2 = new Utilisateur();
        utilisateur2.setId(utilisateur1.getId());
        assertThat(utilisateur1).isEqualTo(utilisateur2);
        utilisateur2.setId(2L);
        assertThat(utilisateur1).isNotEqualTo(utilisateur2);
        utilisateur1.setId(null);
        assertThat(utilisateur1).isNotEqualTo(utilisateur2);
    }
}
