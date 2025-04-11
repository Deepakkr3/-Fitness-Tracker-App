package com.fitness.activity_service.controller;


import com.fitness.activity_service.dto.ActivityRequest;
import com.fitness.activity_service.dto.ActivityResponse;
import com.fitness.activity_service.model.Activity;
import com.fitness.activity_service.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activity")
public class AtivityController {
    @Autowired
    private ActivityService activityService;

    @PostMapping("/create")
    public ResponseEntity<ActivityResponse> createActivity(@RequestBody ActivityRequest request) {
       return ResponseEntity.ok(activityService.createActivity(request));
    }
    @GetMapping("/{id}")
    public  ResponseEntity<ActivityResponse> getActivityById(@PathVariable String id){
        return ResponseEntity.ok(activityService.getActivityById(id));
    }
    @GetMapping
    public ResponseEntity<List<Activity>> getAll(){
        return ResponseEntity.ok(activityService.getAll());
    }
    @GetMapping("/user")
    public ResponseEntity<List<Activity>> getActivityByUserId(@RequestHeader("X-User-Id") String userid){
        return ResponseEntity.ok(activityService.getActivityByUserId(userid));
    }
}
