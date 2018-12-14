package com.alfa.gestion_mobile.repository;

import com.alfa.gestion_mobile.domain.Operateur;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Operateur entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OperateurRepository extends JpaRepository<Operateur, Long> {

}
