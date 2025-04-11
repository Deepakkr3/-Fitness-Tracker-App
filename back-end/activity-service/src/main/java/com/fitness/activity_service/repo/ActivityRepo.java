package com.fitness.activity_service.repo;

import com.fitness.activity_service.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ActivityRepo extends MongoRepository<Activity,String> {
    List<Activity> findByUserId(String userid);
}
