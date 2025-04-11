package com.fitness.activity_service.model;



import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDateTime;





@Document(collection = "activity")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Activity {
   @Id
    private String activityId;

    private String userId;
    private ActivityType activityType;
    private  Integer duration;
    private  Integer caleryburn;
    private LocalDateTime startTime;


@CreatedDate

    private LocalDateTime createAt;
@LastModifiedDate
    private LocalDateTime updatedAt;
    private Object activity;
}
