package com.alfa.gestion_mobile.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.alfa.gestion_mobile.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Compte.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operateur.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operateur.class.getName() + ".comptes", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operateur.class.getName() + ".clients", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operation.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operation.class.getName() + ".utilisateurs", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Operation.class.getName() + ".typeoperations", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.TypeOperation.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Utilisateur.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Utilisateur.class.getName() + ".clients", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Client.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Groupe.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.GroupeUser.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.GroupeUser.class.getName() + ".groupes", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.GroupeUser.class.getName() + ".utilisateurs", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Commission.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Commission.class.getName() + ".comptes", jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Mouvement.class.getName(), jcacheConfiguration);
            cm.createCache(com.alfa.gestion_mobile.domain.Mouvement.class.getName() + ".comptes", jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
