package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Commission;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Commission entity.
 */
public interface CommissionSearchRepository extends ElasticsearchRepository<Commission, Long> {
}
