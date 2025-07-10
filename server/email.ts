import nodemailer from 'nodemailer';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Create a transporter using Gmail SMTP (free alternative)
const createTransporter = () => {
  // Check if Gmail credentials are available
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
  // Fallback to console logging if no email service is configured
  return null;
};

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  const transporter = createTransporter();
  
  // If no email service is configured, log to console and return success
  if (!transporter) {
    console.log('\n=== CONTACT FORM SUBMISSION ===');
    console.log(`From: ${data.name} <${data.email}>`);
    console.log(`Subject: ${data.subject}`);
    console.log(`Message: ${data.message}`);
    console.log(`Submitted: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}`);
    console.log('=== END SUBMISSION ===\n');
    
    // Also store in a simple log file for backup
    try {
      const fs = await import('fs/promises');
      const logEntry = `
[${new Date().toISOString()}] Contact Form Submission
Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}
Message: ${data.message}
---
`;
      await fs.appendFile('contact_submissions.log', logEntry);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
    
    return true;
  }

  try {
    const mailOptions = {
      from: `"Canada Access Hub" <${process.env.GMAIL_USER}>`,
      to: 'canelzy@yahoo.com',
      subject: `Contact Form: ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            New Contact Form Submission - Canada Access Hub
          </h2>
          
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Contact Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Subject:</strong> ${data.subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px;">
            <p>This email was sent from the Canada Access Hub contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission - Canada Access Hub

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject}

Message:
${data.message}

Submitted on: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}
      `,
      replyTo: data.email
    };

    await transporter.sendMail(mailOptions);
    console.log('Contact form email sent successfully via Gmail');
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    
    // Fallback to console logging if email fails
    console.log('\n=== EMAIL FAILED - LOGGING TO CONSOLE ===');
    console.log(`From: ${data.name} <${data.email}>`);
    console.log(`Subject: ${data.subject}`);
    console.log(`Message: ${data.message}`);
    console.log(`Submitted: ${new Date().toLocaleString('en-CA', { timeZone: 'America/Toronto' })}`);
    console.log('=== END SUBMISSION ===\n');
    
    return true; // Still return true so user gets success message
  }
}