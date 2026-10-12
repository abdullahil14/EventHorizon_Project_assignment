const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // true for 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false, // <-- FIXES self-signed error
  }
});

exports.sendVerificationEmail = async (to, rawToken) => {
  const link = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;
  
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Verify your email',
    html: `<p>Click to verify: <a href="${link}">${link}</a></p><p>Expires in 1 hour</p>`
  });

  console.log('Verification link (if email not sent):', link);

  tls: { rejectUnauthorized: false }
  
};