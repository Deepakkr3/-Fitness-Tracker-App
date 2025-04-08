package com.fitness.activity_service.repo;

import com.fitness.activity_service.model.Activity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ActivityRepo extends MongoRepository<Activity,String> {
}
