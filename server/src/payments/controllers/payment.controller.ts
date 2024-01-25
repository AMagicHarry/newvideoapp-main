// payment.controller.ts
import { Controller, Post, NotFoundException, Param, Get, Body } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

@Controller('stripe')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}


  @Get('/create-checkout-session')
  async createCheckoutSession(): Promise<{ sessionId: string }> {
    const priceId = process.env.STRIPE_PLAN_ID
    const mode = 'subscription'; 

    const sessionId = await this.paymentService.createCheckoutSession(priceId,mode);
    return { sessionId };
  }

  // @Get(':sessionId')
  // async getPaymentDetails(@Param('sessionId') sessionId: string): Promise<any> {
  //   const sessionData = await this.paymentService.getSessionData(sessionId);

  //   if (!sessionData) {
  //     throw new NotFoundException('Session not found');
  //   }

  //   const customerId = await this.paymentService.getCustomerBySessionId(sessionId);

  //   if (!customerId) {
  //     throw new NotFoundException('Customer not found');
  //   }

  //   const paymentMethods = await this.paymentService.getPaymentMethodsByCustomerId(customerId);

  //   return {
  //     sessionId,
  //     sessionData,
  //     customerId,
  //     paymentMethods: paymentMethods.data,
  //   };
  // }
  @Post(':sessionId')
  async savePaymentDetails(@Param('sessionId') sessionId: string, @Body() body: { userId: string }): Promise<any> {
    try {
      const sessionData = await this.paymentService.getSessionData(sessionId);

      if (!sessionData) {
        throw new NotFoundException('Session not found');
      }

      const customerId = await this.paymentService.getCustomerBySessionId(sessionId);

      if (!customerId) {
        throw new NotFoundException('Customer not found');
      }

      const paymentMethods = await this.paymentService.getPaymentMethodsByCustomerId(customerId);
      const userId = body.userId;

      // Save payment details to MongoDB
      if (paymentMethods.data.length > 0) {
        const paymentDetails = paymentMethods.data[0];
        await this.paymentService.savePaymentDetails(paymentDetails, userId);
      }

      return {
        sessionId,
        sessionData,
        customerId,
        paymentMethods: paymentMethods.data,
      };
    } catch (error) {
      throw new NotFoundException('Error retrieving payment details');
    }
  }

  @Get(':userId')
  async getStripeDataByUserId(@Param('userId') userId: string): Promise<any> {
    try {
      const stripeData = await this.paymentService.getStripeDataByUserId(userId);

      return {
        userId,
        stripeData,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('No payments found for the user');
      }
      throw new NotFoundException('Error retrieving Stripe data');
    }
  }



}


