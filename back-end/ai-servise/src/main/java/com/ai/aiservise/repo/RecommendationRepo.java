package com.ai.aiservise.repo;

import com.ai.aiservise.model.Recommendation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface RecommendationRepo  extends MongoRepository<Recommendation,String> {
    List<Recommendation> findByUserId(String userId);

    Recommendation findByActivityId(String activityId);
}
