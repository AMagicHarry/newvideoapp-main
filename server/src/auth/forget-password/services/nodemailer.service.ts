import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();


@Injectable()
export class NodemailerService {
  private readonly transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  async sendMail(options: nodemailer.SendMailOptions): Promise<void> {
    await this.transport.sendMail(options);
  }
}

// import { Injectable } from '@nestjs/common';
// import * as sgMail from '@sendgrid/mail';
// import { config } from 'dotenv';

// config();

// @Injectable()
// export class SendGridService {
//   constructor() {
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
//   }

//   async sendMail(options: sgMail.MailDataRequired): Promise<void> {
//     await sgMail.send(options);
//   }
// }