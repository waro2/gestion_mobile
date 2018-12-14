package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.TypeOperation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the TypeOperation entity.
 */
public interface TypeOperationSearchRepository extends ElasticsearchRepository<TypeOperation, Long> {
}
