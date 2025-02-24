import { Controller, Post, Body, Res, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PaddleService } from './paddle.service';
import { CreatePaddleDto } from './dto/create-paddle.dto';
import { Request, Response } from 'express';

@Controller('paddle')
export class PaddleController {
  constructor(private readonly paddleService: PaddleService) {}

  @Post('generate-payment-link')
  async generatePaymentLink(@Body() createPaddleDto: CreatePaddleDto) {
    try {
      const paymentLink = await this.paddleService.generatePaymentLink(createPaddleDto);
      return { paymentLink };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const data = req.body;

    try {
      // Signature verification handled by service
      const isValidSignature = await this.paddleService.verifyWebhookSignature(data);

      if (!isValidSignature) {
        return res.status(400).send('Invalid signature');
      }

      console.log('Webhook verified and processed:', data);

      return res.status(200).send('Webhook processed successfully');
    } catch (error) {
      console.error('Webhook processing error:', error.message);
      return res.status(500).send('Internal server error');
    }
  }


   // Webhook route for handling payment success
   @Post('payment-succeeded')
   async handlePaymentSucceeded(@Body() data: any, @Res() res: Response) {
     try {
       const { subscriptionId, userId, price } = data;
 
       if (!subscriptionId || !userId || !price) {
         throw new HttpException('Missing necessary data', HttpStatus.BAD_REQUEST);
       }
 
       // Call the service method to handle payment success
       await this.paddleService.handlePaymentSucceeded(subscriptionId, userId, price);
       return res.status(200).send('Payment succeeded and subscription updated');
     } catch (error) {
       console.error('Error handling payment succeeded:', error);
       return res.status(500).send('Internal server error');
     }
   }
 
   // Webhook route for handling subscription cancellation
   @Post('subscription-cancelled')
   async handleSubscriptionCancelled(@Body() data: any, @Res() res: Response) {
     try {
       const { subscriptionId } = data;
 
       if (!subscriptionId) {
         throw new HttpException('Missing subscriptionId', HttpStatus.BAD_REQUEST);
       }
 
       // Call the service method to handle subscription cancellation
       await this.paddleService.handleSubscriptionCancelled(subscriptionId);
       return res.status(200).send('Subscription cancelled and status updated');
     } catch (error) {
       console.error('Error handling subscription cancelled:', error);
       return res.status(500).send('Internal server error');
     }
   }
 
}
