import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';
import { TRANSACTION_EMAIL_SENDER } from '../config/constants';

const region = process.env.AWS_REGION!;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
const accessKeyId = process.env.AWS_ACCESS_KEY!;
const appUrl = process.env.APP_URL!;

const client = new SESClient({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

const getEmailHtml = ({ template, args }: { template: string; args: any }) => {
  const layout = fs.readFileSync(path.resolve(__dirname, '../templates/email/layout.hbs'));
  const content = fs.readFileSync(path.resolve(__dirname, `../templates/email/${template}`));
  handlebars.registerPartial('layout', layout.toString());
  return handlebars.compile(content.toString())(args);
};

const EmailService = {
  async sendWelcomeEmail({ name, email }: { name: string; email: string }) {
    const html = getEmailHtml({ template: 'welcome.hbs', args: { name } });
    const command = new SendEmailCommand({
      Destination: { ToAddresses: [email] },
      Source: TRANSACTION_EMAIL_SENDER,
      Message: {
        Subject: { Data: 'Welcome to Buyhub' },
        Body: {
          Html: { Data: html },
        },
      },
    });
    await client.send(command);
  },
  // async sendVerificationEmail({ email, name, otp }: { email: string; name: string; otp: string }) {
  //   const html = getEmailHtml({ template: 'email-verification.hbs', args: { name, otp } });
  //   const command = new SendEmailCommand({
  //     Destination: { ToAddresses: [email] },
  //     Source: `Statisense <${TRANSACTION_EMAIL_SENDER}>`,
  //     Message: {
  //       Subject: { Data: 'Verify your email address' },
  //       Body: {
  //         Html: { Data: html },
  //       },
  //     },
  //   });
  //   await client.send(command);
  // },
  // async sendNewsletterVerificationEmail({
  //   name,
  //   email,
  //   link,
  // }: {
  //   name: string;
  //   email: string;
  //   link: string;
  // }) {
  //   const html = getEmailHtml({
  //     template: 'newsletter-subscription-verification.hbs',
  //     args: { name, email, link },
  //   });
  //   const command = new SendEmailCommand({
  //     Destination: { ToAddresses: [email] },
  //     Source: `Statisense <${TRANSACTION_EMAIL_SENDER}>`,
  //     Message: {
  //       Subject: { Data: 'Confirm your subscription' },
  //       Body: {
  //         Html: { Data: html },
  //       },
  //     },
  //   });
  //   await client.send(command);
  // },
  // async sendResetPasswordEmail({ email, name, otp }: { email: string; name: string; otp: string }) {
  //   const html = getEmailHtml({ template: 'reset-password.hbs', args: { name, otp } });
  //   const command = new SendEmailCommand({
  //     Destination: { ToAddresses: [email] },
  //     Source: `Statisense <${TRANSACTION_EMAIL_SENDER}>`,
  //     Message: {
  //       Subject: { Data: 'Reset Your Password' },
  //       Body: {
  //         Html: { Data: html },
  //       },
  //     },
  //   });
  //   await client.send(command);
  // },
  // async setBusinessInvitationEmail({
  //   business,
  //   role,
  //   email,
  //   id,
  // }: {
  //   business: string;
  //   role: string;
  //   email: string;
  //   id: string;
  // }) {
  //   const html = getEmailHtml({
  //     template: 'business-invitation.hbs',
  //     args: { business, role, link: `${appUrl}/invitation/${id}` },
  //   });
  //   const command = new SendEmailCommand({
  //     Destination: { ToAddresses: [email] },
  //     Source: `Statisense <${TRANSACTION_EMAIL_SENDER}>`,
  //     Message: {
  //       Subject: { Data: 'Business Invitation' },
  //       Body: {
  //         Html: { Data: html },
  //       },
  //     },
  //   });
  //   await client.send(command);
  // },
};

export default EmailService;

