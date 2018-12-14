package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Groupe;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Groupe entity.
 */
public interface GroupeSearchRepository extends ElasticsearchRepository<Groupe, Long> {
}
