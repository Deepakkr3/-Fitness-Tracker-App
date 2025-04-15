package com.ai.aiservise.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;


@Document(collection = "recommendation")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Recommendation {
    @Id
    private String id;
    private String activityId;
    private String userId;
    private ActivityType activityType;
    private String recommendation;
    private List<String> suggetion;
    private List<String> impruvment;
    @CreatedDate
    private LocalDateTime createdAt;


}
