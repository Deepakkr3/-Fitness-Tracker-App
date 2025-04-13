package com.ai.aiservise.servese;


import com.ai.aiservise.model.Activity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@ReadingConverter
public class ActivityMSQConsumer {

    @Value("${rabbitmq.queue.name}")

    private  String queueName;
  @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void  retriveActivity(Activity activity){
        log.info("recived activity for processinng {}",activity);
    }


}
