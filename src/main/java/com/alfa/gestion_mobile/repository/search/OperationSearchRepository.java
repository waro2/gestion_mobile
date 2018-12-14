package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Operation;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Operation entity.
 */
public interface OperationSearchRepository extends ElasticsearchRepository<Operation, Long> {
}
