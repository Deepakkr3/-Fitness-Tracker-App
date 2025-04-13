package com.ai.aiservise.controller;


import com.ai.aiservise.model.Recommendation;
import com.ai.aiservise.servese.RecommedationServise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {


    @Autowired
    RecommedationServise recSesvise;

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Recommendation>> getReccommendationByUserId(@PathVariable String userId){
        return ResponseEntity.ok(recSesvise.getRecommendationByUserId(userId));
    }
    @GetMapping("/activity/{activityId}")
    public ResponseEntity<Recommendation> getRecommendationByActivityId(@PathVariable String activityId){
        return  ResponseEntity.ok(recSesvise.getRecommendationByActivityId(activityId));
    }


}
