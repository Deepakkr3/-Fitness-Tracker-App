package com.fitness.activity_service.config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class UserServiceValidator {

    @Autowired
    WebClient webClient;

    public boolean userValidator(String userId){
        try{
            return Boolean.TRUE.equals(webClient.get().uri("/api/user/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .block());
        }catch (Exception e){

            System.out.println(e);
            return  false;
        }


    }
}
