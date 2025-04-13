package com.ai.aiservise.servese;


import com.ai.aiservise.model.Recommendation;
import com.ai.aiservise.repo.RecommendationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommedationServise {

    @Autowired
    RecommendationRepo repo;

    public List<Recommendation> getRecommendationByUserId(String userId) {
        List<Recommendation> recommendations=repo.findByUserId(userId);
        return recommendations;
    }

    public Recommendation getRecommendationByActivityId(String activityId) {
        Recommendation recommendation=  repo.findByActivityId(activityId);

        return  recommendation;
    }
}
