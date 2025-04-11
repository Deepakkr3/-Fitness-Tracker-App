package com.fitness.activity_service.service;

import com.fitness.activity_service.config.UserServiceValidator;
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

    @Autowired
    UserServiceValidator userServiceValidator;

    public ActivityResponse createActivity(ActivityRequest request) {
        Boolean isValidUserId=userServiceValidator.userValidator(request.getUserId());
        if(! isValidUserId){
            System.out.println("user not fouund in user validator!!!"+request.getUserId());
            return  null;
        }
        Activity activity = new Activity();
        activity.setActivityType(request.getActivityType());
        activity.setDuration(request.getDuration());
        activity.setUserId(request.getUserId());
        activity.setCaleryburn(request.getCalory());
        activity.setDuration(request.getDuration());
        activity.setStartTime(request.getStartTime());
        activity.setActivity(request.getActivity());

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

    public List<Activity> getActivityByUserId(String userid) {
        return repository.findByUserId(userid);

    }
}

