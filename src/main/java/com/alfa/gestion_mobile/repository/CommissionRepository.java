package com.alfa.gestion_mobile.repository;

import com.alfa.gestion_mobile.domain.Commission;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Commission entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommissionRepository extends JpaRepository<Commission, Long> {

}
