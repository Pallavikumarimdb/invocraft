import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from './entities/paddle.entity';
import { CreatePaddleDto } from './dto/create-paddle.dto';
import * as crypto from 'crypto';


@Injectable()
export class PaddleService {
  private readonly paddleAPIUrl = 'https://vendors.paddle.com/api/2.0/';
  private readonly vendorId = 'PADDLE_VENDOR_ID';
  private readonly apiKey = 'PADDLE_API_KEY';

  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>,
  ) {}

  async generatePaymentLink(createPaddleDto: CreatePaddleDto) {
    const { planId, userId, quantity = 1 } = createPaddleDto;

    try {
      const response = await axios.post(`${this.paddleAPIUrl}product/generate_pay_link`, {
        vendor_id: this.vendorId,
        api_key: this.apiKey,
        product_id: planId,
        customer_email: userId,
        quantity,
      });

      if (response.data.success) {
        return { url: response.data.response.url };
      } else {
        throw new Error('Failed to generate payment link');
      }
    } catch (error) {
      throw new Error(`Error generating Paddle payment link: ${error.message}`);
    }
  }

  async handleWebhook(data: any) {
    const isValid = await this.verifyWebhookSignature(data);

    if (!isValid) {
      console.error('Invalid webhook signature');
      return;
    }

    const { alert_name, subscription_id, status, user_id, price, plan_id } = data;

    switch (alert_name) {
      case 'subscription_created':
        await this.handleSubscriptionCreated(user_id, price, subscription_id, plan_id);
        break;
      case 'subscription_payment_succeeded':
        await this.handlePaymentSucceeded(subscription_id, user_id, price);
        break;
      case 'subscription_cancelled':
        await this.handleSubscriptionCancelled(subscription_id);
        break;
      default:
        console.log('Unknown webhook alert:', alert_name);
        break;
    }
  }

  async verifyWebhookSignature(data: any): Promise<boolean> {
    const receivedSignature = data.p_signature;
    if (!receivedSignature) return false;
  
    const dataCopy = { ...data };
    delete dataCopy.p_signature;
  
    const secretKey = 'webhook-secret';
  
    // Create the string to be hashed
    const sortedString = Object.keys(dataCopy)
      .sort()
      .map((key) => `${key}=${dataCopy[key]}`)
      .join('&');
  
    // Compute the HMAC hash using SHA256
    const computedHash = crypto
      .createHmac('sha256', secretKey)
      .update(sortedString)
      .digest('hex');
  
    // Compare the computed hash with the received signature
    return receivedSignature === computedHash;
  }
  
  private async handleSubscriptionCreated(userId: string, price: string, subscriptionId: string, planId: string) {
    const newSubscription = new this.subscriptionModel({
      userId,
      price,
      subscriptionId,
      planId,
      status: 'active',
    });
  
    await newSubscription.save();
  }

   async handlePaymentSucceeded(subscriptionId: string, userId: string, price: string) {
    await this.subscriptionModel.findOneAndUpdate({ subscriptionId }, { status: 'paid' });
  }

   async handleSubscriptionCancelled(subscriptionId: string) {
    await this.subscriptionModel.findOneAndUpdate({ subscriptionId }, { status: 'cancelled' });
  }
}

