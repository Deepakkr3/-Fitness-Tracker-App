package com.ai.aiservise.servese;


import com.ai.aiservise.model.Activity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@ReadingConverter
public class ActivityMSQConsumer {

    @Autowired
    ActivityAiServise activityAiServise;

    @Value("${rabbitmq.queue.name}")

    private  String queueName;
  @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void  retriveActivity(Activity activity){
      activityAiServise.getActivityFromAi(activity);
      log.info("recived activity for ai processinng {}",activity);
        log.info("recived activity for processinng {}",activity);
    }


}
