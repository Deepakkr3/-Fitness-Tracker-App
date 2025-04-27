package com.gateway.gateway_servise.uservalidation;


import com.gateway.gateway_servise.keycloac.RegisterRequest;
import com.gateway.gateway_servise.keycloac.UserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class UserService {

    @Autowired
    WebClient webClient;

    public Mono<Boolean> userValidator(String userId){

            return webClient.get().
                    uri("/api/user/{userId}/validate", userId)
                    .retrieve()
                    .bodyToMono(Boolean.class)
                    .onErrorResume(WebClientResponseException.class,e->{
                        if(e.getStatusCode()== HttpStatus.NOT_FOUND){
                            return Mono.error(new RuntimeException("User Not found 404"));
                        }
                        else if(e.getStatusCode()==HttpStatus.BAD_REQUEST){
                            return Mono.error(new RuntimeException("Bad resuest"));

                        }
                        return Mono.error(new RuntimeException("unexpacted error "));
                    });



    }

    public  Mono<UserResponse> registerRequest(RegisterRequest requestObject) {
    log.info("registr user servise claa in api gatway requestObjet{}",requestObject);
        return webClient.post().
                uri("/api/user/register", requestObject)
                .bodyValue(requestObject)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class,e->{

                    if(e.getStatusCode()==HttpStatus.BAD_REQUEST){
                        return Mono.error(new RuntimeException("Bad resuest"));

                    }
                    else if(e.getStatusCode()==HttpStatus.INTERNAL_SERVER_ERROR){
                        return Mono.error(new RuntimeException("Internal server error  "));
                    }
                    return Mono.error(new RuntimeException("unexpacted error "));
                });


    }
}
