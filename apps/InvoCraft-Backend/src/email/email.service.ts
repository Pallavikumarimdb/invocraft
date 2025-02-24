import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  constructor(private configService: ConfigService) {}
  async sendEmail(
    content: string,
    subject: string,
    email: string,
  ): Promise<boolean> {
    const resend = new Resend(this.configService.get('RESEND_KEY'));
    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: subject,
      html: content,
    });

    if (error) {
      return false;
    }
    return true;
  }
}
