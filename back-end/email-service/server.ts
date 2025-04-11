import express, { Request, Response } from 'express';
import { Eureka } from 'eureka-js-client';

const app = express();
const port = 3001;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Node.js service!');
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Service running on port ${port}`);
});




const client = new Eureka({
    instance: {
      app: 'notification-service',
      instanceId: 'notification-service-1',
      hostName: 'localhost',
      ipAddr: '127.0.0.1',
      statusPageUrl: `http://localhost:${port}`,
      healthCheckUrl: `http://localhost:${port}/health`,
      port: {
        $: port,
        '@enabled': true,
      },
      vipAddress: 'notification-service',
      dataCenterInfo: {
        '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
        name: 'MyOwn',
      },
    },
    eureka: {
      host: 'localhost',
      port: 8761,
      servicePath: '/eureka/apps/',
    },
  });
  
  client.start((error:any) => {
    console.log(error || '✅ Registered with Eureka');
  });