package com.fitness.activity_service.service;

import com.fitness.activity_service.dto.ActivityRequest;
import com.fitness.activity_service.dto.ActivityResponse;
import com.fitness.activity_service.model.Activity;
import com.fitness.activity_service.repo.ActivityRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class ActivityService {

    @Autowired
    ActivityRepo repository;

    public ActivityResponse createActivity(ActivityRequest request) {
        Activity activity = new Activity();
        activity.setActivityType(request.getActivityType());
        activity.setDuration(request.getDuration());
        activity.setUserId(request.getUserid());
        activity.setCaleryburn(request.getCalory());
        activity.setDuration(request.getDuration());
        activity.setStartTime(request.getStartTime());

        Activity savedActivity = repository.save(activity);
        ActivityResponse res = new ActivityResponse(savedActivity);
        return res;

    }

    public ActivityResponse getActivityById(String id) {

        Activity activity = repository.findById(id).orElseThrow(() -> new RuntimeException("activity not found"));
        return new ActivityResponse(activity);
    }

    public List<Activity> getAll() {
        return repository.findAll();
    }
}

