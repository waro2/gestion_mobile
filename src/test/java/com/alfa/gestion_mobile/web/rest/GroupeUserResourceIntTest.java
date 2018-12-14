package com.alfa.gestion_mobile.web.rest;

import com.alfa.gestion_mobile.GestionMobileApp;

import com.alfa.gestion_mobile.domain.GroupeUser;
import com.alfa.gestion_mobile.repository.GroupeUserRepository;
import com.alfa.gestion_mobile.repository.search.GroupeUserSearchRepository;
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
 * Test class for the GroupeUserResource REST controller.
 *
 * @see GroupeUserResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GestionMobileApp.class)
public class GroupeUserResourceIntTest {

    private static final String DEFAULT_GROUPEUTILISATEUR = "AAAAAAAAAA";
    private static final String UPDATED_GROUPEUTILISATEUR = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private GroupeUserRepository groupeUserRepository;

    /**
     * This repository is mocked in the com.alfa.gestion_mobile.repository.search test package.
     *
     * @see com.alfa.gestion_mobile.repository.search.GroupeUserSearchRepositoryMockConfiguration
     */
    @Autowired
    private GroupeUserSearchRepository mockGroupeUserSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGroupeUserMockMvc;

    private GroupeUser groupeUser;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupeUserResource groupeUserResource = new GroupeUserResource(groupeUserRepository, mockGroupeUserSearchRepository);
        this.restGroupeUserMockMvc = MockMvcBuilders.standaloneSetup(groupeUserResource)
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
    public static GroupeUser createEntity(EntityManager em) {
        GroupeUser groupeUser = new GroupeUser()
            .groupeutilisateur(DEFAULT_GROUPEUTILISATEUR)
            .date(DEFAULT_DATE);
        return groupeUser;
    }

    @Before
    public void initTest() {
        groupeUser = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupeUser() throws Exception {
        int databaseSizeBeforeCreate = groupeUserRepository.findAll().size();

        // Create the GroupeUser
        restGroupeUserMockMvc.perform(post("/api/groupe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupeUser)))
            .andExpect(status().isCreated());

        // Validate the GroupeUser in the database
        List<GroupeUser> groupeUserList = groupeUserRepository.findAll();
        assertThat(groupeUserList).hasSize(databaseSizeBeforeCreate + 1);
        GroupeUser testGroupeUser = groupeUserList.get(groupeUserList.size() - 1);
        assertThat(testGroupeUser.getGroupeutilisateur()).isEqualTo(DEFAULT_GROUPEUTILISATEUR);
        assertThat(testGroupeUser.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the GroupeUser in Elasticsearch
        verify(mockGroupeUserSearchRepository, times(1)).save(testGroupeUser);
    }

    @Test
    @Transactional
    public void createGroupeUserWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupeUserRepository.findAll().size();

        // Create the GroupeUser with an existing ID
        groupeUser.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupeUserMockMvc.perform(post("/api/groupe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupeUser)))
            .andExpect(status().isBadRequest());

        // Validate the GroupeUser in the database
        List<GroupeUser> groupeUserList = groupeUserRepository.findAll();
        assertThat(groupeUserList).hasSize(databaseSizeBeforeCreate);

        // Validate the GroupeUser in Elasticsearch
        verify(mockGroupeUserSearchRepository, times(0)).save(groupeUser);
    }

    @Test
    @Transactional
    public void getAllGroupeUsers() throws Exception {
        // Initialize the database
        groupeUserRepository.saveAndFlush(groupeUser);

        // Get all the groupeUserList
        restGroupeUserMockMvc.perform(get("/api/groupe-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupeUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].groupeutilisateur").value(hasItem(DEFAULT_GROUPEUTILISATEUR.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getGroupeUser() throws Exception {
        // Initialize the database
        groupeUserRepository.saveAndFlush(groupeUser);

        // Get the groupeUser
        restGroupeUserMockMvc.perform(get("/api/groupe-users/{id}", groupeUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupeUser.getId().intValue()))
            .andExpect(jsonPath("$.groupeutilisateur").value(DEFAULT_GROUPEUTILISATEUR.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGroupeUser() throws Exception {
        // Get the groupeUser
        restGroupeUserMockMvc.perform(get("/api/groupe-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupeUser() throws Exception {
        // Initialize the database
        groupeUserRepository.saveAndFlush(groupeUser);

        int databaseSizeBeforeUpdate = groupeUserRepository.findAll().size();

        // Update the groupeUser
        GroupeUser updatedGroupeUser = groupeUserRepository.findById(groupeUser.getId()).get();
        // Disconnect from session so that the updates on updatedGroupeUser are not directly saved in db
        em.detach(updatedGroupeUser);
        updatedGroupeUser
            .groupeutilisateur(UPDATED_GROUPEUTILISATEUR)
            .date(UPDATED_DATE);

        restGroupeUserMockMvc.perform(put("/api/groupe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupeUser)))
            .andExpect(status().isOk());

        // Validate the GroupeUser in the database
        List<GroupeUser> groupeUserList = groupeUserRepository.findAll();
        assertThat(groupeUserList).hasSize(databaseSizeBeforeUpdate);
        GroupeUser testGroupeUser = groupeUserList.get(groupeUserList.size() - 1);
        assertThat(testGroupeUser.getGroupeutilisateur()).isEqualTo(UPDATED_GROUPEUTILISATEUR);
        assertThat(testGroupeUser.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the GroupeUser in Elasticsearch
        verify(mockGroupeUserSearchRepository, times(1)).save(testGroupeUser);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupeUser() throws Exception {
        int databaseSizeBeforeUpdate = groupeUserRepository.findAll().size();

        // Create the GroupeUser

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupeUserMockMvc.perform(put("/api/groupe-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupeUser)))
            .andExpect(status().isBadRequest());

        // Validate the GroupeUser in the database
        List<GroupeUser> groupeUserList = groupeUserRepository.findAll();
        assertThat(groupeUserList).hasSize(databaseSizeBeforeUpdate);

        // Validate the GroupeUser in Elasticsearch
        verify(mockGroupeUserSearchRepository, times(0)).save(groupeUser);
    }

    @Test
    @Transactional
    public void deleteGroupeUser() throws Exception {
        // Initialize the database
        groupeUserRepository.saveAndFlush(groupeUser);

        int databaseSizeBeforeDelete = groupeUserRepository.findAll().size();

        // Get the groupeUser
        restGroupeUserMockMvc.perform(delete("/api/groupe-users/{id}", groupeUser.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GroupeUser> groupeUserList = groupeUserRepository.findAll();
        assertThat(groupeUserList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the GroupeUser in Elasticsearch
        verify(mockGroupeUserSearchRepository, times(1)).deleteById(groupeUser.getId());
    }

    @Test
    @Transactional
    public void searchGroupeUser() throws Exception {
        // Initialize the database
        groupeUserRepository.saveAndFlush(groupeUser);
        when(mockGroupeUserSearchRepository.search(queryStringQuery("id:" + groupeUser.getId())))
            .thenReturn(Collections.singletonList(groupeUser));
        // Search the groupeUser
        restGroupeUserMockMvc.perform(get("/api/_search/groupe-users?query=id:" + groupeUser.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupeUser.getId().intValue())))
            .andExpect(jsonPath("$.[*].groupeutilisateur").value(hasItem(DEFAULT_GROUPEUTILISATEUR)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupeUser.class);
        GroupeUser groupeUser1 = new GroupeUser();
        groupeUser1.setId(1L);
        GroupeUser groupeUser2 = new GroupeUser();
        groupeUser2.setId(groupeUser1.getId());
        assertThat(groupeUser1).isEqualTo(groupeUser2);
        groupeUser2.setId(2L);
        assertThat(groupeUser1).isNotEqualTo(groupeUser2);
        groupeUser1.setId(null);
        assertThat(groupeUser1).isNotEqualTo(groupeUser2);
    }
}
