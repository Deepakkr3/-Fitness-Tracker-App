package com.fitness.activity_service.dto;

import com.fitness.activity_service.model.Activity;
import com.fitness.activity_service.model.ActivityType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActivityResponse {
    private String activityId;
    private  String id;
    private String userId;
    private ActivityType activityType;
    private  Integer duration;
    private  Integer caleryburn;
    private LocalDateTime startTime;

    private LocalDateTime createAt;

    private LocalDateTime updatedAt;

    public ActivityResponse(Activity savedActivity) {
        this.activityType=savedActivity.getActivityType();
        this.activityId=savedActivity.getActivityId();
        this.id=savedActivity.getId();
        this.createAt=savedActivity.getCreateAt();
        this.updatedAt=savedActivity.getUpdatedAt();
        this.startTime=savedActivity.getStartTime();
        this.duration=savedActivity.getDuration();
        this.caleryburn=savedActivity.getCaleryburn();

    }
}
