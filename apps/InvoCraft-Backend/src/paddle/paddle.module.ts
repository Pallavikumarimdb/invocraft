import { Module } from '@nestjs/common';
import { PaddleController } from './paddle.controller';
import { PaddleService } from './paddle.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Subscription, SubscriptionSchema } from './entities/paddle.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }]),
  ],
  controllers: [PaddleController],
  providers: [PaddleService],
})
export class PaddleModule {}
