package com.alfa.gestion_mobile.repository;

import com.alfa.gestion_mobile.domain.GroupeUser;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GroupeUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupeUserRepository extends JpaRepository<GroupeUser, Long> {

}
