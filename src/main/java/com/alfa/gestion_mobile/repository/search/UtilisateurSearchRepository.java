package com.alfa.gestion_mobile.repository.search;

import com.alfa.gestion_mobile.domain.Utilisateur;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Utilisateur entity.
 */
public interface UtilisateurSearchRepository extends ElasticsearchRepository<Utilisateur, Long> {
}
