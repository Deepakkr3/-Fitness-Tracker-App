package com.ai.aiservise.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class Activity {

    private String activityId;

    private String userId;
    private ActivityType activityType;
    private  Integer duration;
    private  Integer caleryburn;
    private LocalDateTime startTime;
    private LocalDateTime createAt;
    private LocalDateTime updatedAt;
    private Object activity;
}