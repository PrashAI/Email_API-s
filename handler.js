'use strict';
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

module.exports.sendEmail = async (event) => {
  const { receiver_email, subject, body_text } = JSON.parse(event.body);

  if (!receiver_email || !subject || !body_text) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'Missing required fields',
      }),
    };
  }

  try {
    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        region: 'us-east-1',
      }),
    });

    // Send email
    await transporter.sendMail({
      from: 'your-email@example.com',
      to: receiver_email,
      subject: subject,
      text: body_text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully',
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to send email',
        error: error.message,
      }),
    };
  }
};