package com.fitness.activity_service.dto;


import com.fitness.activity_service.model.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ActivityRequest {
    private String userId;
    private ActivityType activityType;
    private  Integer duration;
    private  Integer calory;
    private LocalDateTime startTime;
    private Object activity;
}
