import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';

dotenv.config();

export const SendEmail = async (email: string, link: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 465,
    secure: true,
    auth: {
      user: 'apikey',
      pass: process.env.SENDGRID_API_KEY,
    },
  });

  const info = await transporter.sendMail({
    from: 'kibalabonard1@gmail.com',
    to: email,
    subject: 'notre projet de test ✔',
    text: 'Bonjour tout le monde',
    html: `<b>Bonjour</b><br/>
    <p>Nous sommes myvip app. voici votre nouveau mot de passe</p><br/>
    <strong>${link}</strong>`,
  });

  // Preview only available when sending through an Ethereal account
  // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};
