package com.alfa.gestion_mobile.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of GroupeSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class GroupeSearchRepositoryMockConfiguration {

    @MockBean
    private GroupeSearchRepository mockGroupeSearchRepository;

}
