package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Mouvement;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Mouvement entity.
 */
public interface MouvementSearchRepository extends ElasticsearchRepository<Mouvement, Long> {
}
