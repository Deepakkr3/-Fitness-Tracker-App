package com.ai.aiservise.servese;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
public class GeminiServise {
    @Value("${gemini.api.url}")
   private String gemniniapi;
    private  final WebClient webClient;

    public GeminiServise(WebClient.Builder webClientBuilder) {
       this. webClient = webClientBuilder.build();
    }

    public String getGemini(String promt){

        Map<String,Object> reqbody=Map.of("contents",new Object[]{
                Map.of("parts",new Object[]{
                        Map.of("text",promt)
                })
        });
                String response=webClient.post().uri(gemniniapi).
                        header("Content-Type","application/json").
                        bodyValue(reqbody).
                        retrieve().
                        bodyToMono(String.class).
                        block();

        return  response;

    }
}
