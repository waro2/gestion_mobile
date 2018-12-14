package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Compte;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Compte entity.
 */
public interface CompteSearchRepository extends ElasticsearchRepository<Compte, Long> {
}
