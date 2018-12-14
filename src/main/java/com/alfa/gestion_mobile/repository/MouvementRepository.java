package com.alfa.gestion_mobile.repository;

import com.alfa.gestion_mobile.domain.Mouvement;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mouvement entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MouvementRepository extends JpaRepository<Mouvement, Long> {

}
