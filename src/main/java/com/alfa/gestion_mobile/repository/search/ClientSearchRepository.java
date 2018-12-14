package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Client;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Client entity.
 */
public interface ClientSearchRepository extends ElasticsearchRepository<Client, Long> {
}
