package com.gateway.gateway_servise.keycloac;


import com.gateway.gateway_servise.uservalidation.UserService;
import com.nimbusds.jwt.JWTClaimNames;
import com.nimbusds.jwt.JWTClaimsSet;

import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

@Component
@Slf4j
@RequiredArgsConstructor
public class UserSyncFilter implements WebFilter {
    @Autowired
    UserService userService;


    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        log.info("filter in user sync filter for api gatway called");

      String userId=exchange.getRequest().getHeaders().getFirst("X-User-ID");
        String token=exchange.getRequest().getHeaders().getFirst("Authorization");
        log.info("user id in filter01 {} token in filter01 {}",userId,token);

        RegisterRequest requestObject=getUserDetail(token);
        log.info("request object in filter01 {}",requestObject);
        if(userId==null){
            userId=requestObject.getKeycklockId();
        }
         if(userId!=null  && token!=null){
             String finalUserId = userId;
             return userService.userValidator(userId).flatMap(exist->{
                 //Register user is not exist
                 if(!exist){

                     if(requestObject!=null){
                        return  userService.registerRequest(requestObject).then(Mono.empty());
                     }
                     else{
                         log.info("register user object is not exist {}",requestObject);
                         return Mono.empty();
                     }
                 }
                 else {
                     log.info("user is exist {} in sunc ",finalUserId);
                     return  Mono.empty();
                 }

             }).then(Mono.defer(()->{
                 ServerHttpRequest mutetedRequest=exchange.getRequest().mutate().
                         header("X-User-ID", finalUserId).build();
                 return chain.filter(exchange.mutate().request(mutetedRequest).build());
             }));
         }

        return chain.filter(exchange);
    }

    private RegisterRequest getUserDetail(String token) {

     try{

         String tokenWithoutBearer=token.replace("Bearer ","").trim();
         SignedJWT signedJWT= SignedJWT.parse(tokenWithoutBearer);
         JWTClaimsSet claimsSet=signedJWT.getJWTClaimsSet();

         RegisterRequest registerRequest=new RegisterRequest();
         registerRequest.setEmail(claimsSet.getStringClaim("email"));
         registerRequest.setFirstName(claimsSet.getStringClaim("given_name"));
         registerRequest.setLastName(claimsSet.getStringClaim("family_name"));
         registerRequest.setKeycklockId(claimsSet.getStringClaim("sub"));
         registerRequest.setPassword("dummy@123");
         log.info("register request in dfilter chain {}",registerRequest);
         return  registerRequest;
     }catch(Exception e){
          e.printStackTrace();
          return  null;

     }
    }
}
