import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  if (!process.env.SENDGRID_API_KEY) {
    console.error('SendGrid API key not configured');
    return false;
  }

  try {
    const msg = {
      to: 'canelzy@yahoo.com',
      from: 'noreply@canadaaccesshub.com', // You can change this to your domain
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
      `
    };

    await sgMail.send(msg);
    console.log('Contact form email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return false;
  }
}