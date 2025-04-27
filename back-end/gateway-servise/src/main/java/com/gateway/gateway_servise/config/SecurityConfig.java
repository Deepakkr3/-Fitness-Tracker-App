package com.gateway.gateway_servise.config;




import com.gateway.gateway_servise.keycloac.UserSyncFilter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
@Slf4j
public class SecurityConfig {
    @Autowired
    UserSyncFilter userSyncFilter;

@Bean
public SecurityWebFilterChain securityFilterChain(ServerHttpSecurity http) throws Exception {


    log.info("security filter chain called  securityFilterChain http{} ",http);
    return http.csrf(csrf->csrf.disable()).
            authorizeExchange(exchange->exchange.
          //          pathMatchers("/actuate/**").permitAll().
                    anyExchange().authenticated()).
            oauth2ResourceServer(oauth->oauth.jwt(Customizer.withDefaults()))
            .addFilterBefore(userSyncFilter, SecurityWebFiltersOrder.AUTHORIZATION)
            .build();



    }
}
