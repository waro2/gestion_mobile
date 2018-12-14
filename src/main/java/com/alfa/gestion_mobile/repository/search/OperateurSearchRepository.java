package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Operateur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Operateur entity.
 */
public interface OperateurSearchRepository extends ElasticsearchRepository<Operateur, Long> {
}
