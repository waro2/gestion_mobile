package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.GroupeUser;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the GroupeUser entity.
 */
public interface GroupeUserSearchRepository extends ElasticsearchRepository<GroupeUser, Long> {
}
