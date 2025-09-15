import { TransactionalEmailsApi, TransactionalEmailsApiApiKeys } from '@getbrevo/brevo';

if (!process.env.BREVO_API_KEY) {
  throw new Error("BREVO_API_KEY environment variable must be set");
}

const brevoApi = new TransactionalEmailsApi();
brevoApi.setApiKey(TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Test the API key by logging it (remove in production)
console.log('Brevo API Key configured:', process.env.BREVO_API_KEY ? 'Yes (length: ' + process.env.BREVO_API_KEY.length + ')' : 'No');

interface EmailParams {
  to: string;
  toName?: string;
  from: string;
  fromName?: string;
  subject: string;
  htmlContent?: string;
  textContent?: string;
  templateId?: number;
  params?: Record<string, any>;
}

export async function sendEmail(emailParams: EmailParams): Promise<boolean> {
  try {
    // Log email attempt for debugging
    console.log('📧 Attempting to send email:', {
      to: emailParams.to,
      subject: emailParams.subject,
      from: emailParams.from
    });
    
    const emailPayload: any = {
      to: [{ 
        email: emailParams.to,
        name: emailParams.toName || emailParams.to.split('@')[0]
      }],
      sender: { 
        email: emailParams.from,
        name: emailParams.fromName || 'Butterfly Providers'
      }
    };

    // Use template if provided, otherwise use content
    if (emailParams.templateId) {
      emailPayload.templateId = emailParams.templateId;
      if (emailParams.params) {
        emailPayload.params = emailParams.params;
      }
      // Subject can still be overridden when using templates
      if (emailParams.subject) {
        emailPayload.subject = emailParams.subject;
      }
    } else {
      emailPayload.subject = emailParams.subject;
      if (emailParams.htmlContent) {
        emailPayload.htmlContent = emailParams.htmlContent;
      }
      if (emailParams.textContent) {
        emailPayload.textContent = emailParams.textContent;
      }
    }

    const result = await brevoApi.sendTransacEmail(emailPayload);
    
    console.log('✅ Brevo email sent successfully:', {
      messageId: result.body.messageId,
      to: emailParams.to,
      subject: emailParams.subject || 'Template email'
    });
    
    return true;
  } catch (error: any) {
    console.error('❌ Brevo email send failed:', {
      error: error.message,
      to: emailParams.to,
      subject: emailParams.subject,
      statusCode: error.response?.status,
      responseBody: error.response?.body
    });
    
    // For now, log the email content so we can see what would have been sent
    console.log('📋 Email content that would have been sent:');
    console.log('Subject:', emailParams.subject);
    console.log('To:', emailParams.to);
    console.log('From:', emailParams.from);
    if (emailParams.htmlContent) {
      console.log('HTML preview (first 200 chars):', emailParams.htmlContent.substring(0, 200) + '...');
    }
    
    return false;
  }
}

// Pre-configured email templates for common use cases
export const EmailTemplates = {
  // Welcome email for new registrations
  welcome: async (to: string, firstName: string) => {
    return sendEmail({
      to,
      toName: firstName,
      from: 'no-reply@butterflyproviders.com',
      fromName: 'Butterfly Providers Team',
      subject: `Welcome to Butterfly Providers, ${firstName}!`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #059669; margin-bottom: 10px;">Welcome to Butterfly Providers!</h1>
            <p style="color: #6B7280; font-size: 16px;">Quality Non-Medical Home Care Services</p>
          </div>
          
          <div style="background: #F0FDF4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #065F46; margin-top: 0;">Hello ${firstName},</h2>
            <p style="color: #374151; line-height: 1.6;">
              Thank you for joining Butterfly Providers! We're excited to help you access our comprehensive 
              non-medical home care services.
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #059669;">What's Next?</h3>
            <ul style="color: #374151; line-height: 1.8;">
              <li>📋 Complete your care assessment</li>
              <li>👥 Meet your dedicated care team</li>
              <li>📅 Schedule your first service appointment</li>
              <li>💬 Access our 24/7 support portal</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://butterflyproviders.com" 
               style="background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Access Your Portal
            </a>
          </div>
          
          <div style="border-top: 1px solid #E5E7EB; padding-top: 20px; text-align: center;">
            <p style="color: #6B7280; font-size: 14px;">
              Questions? Contact us at <a href="tel:602-830-0966" style="color: #059669;">602-830-0966</a><br>
              <strong>Office Hours:</strong> Monday-Friday 8:00 AM - 5:00 PM
            </p>
            <p style="color: #9CA3AF; font-size: 12px; margin-top: 15px;">
              Butterfly Providers | 10720 West Indian School Rd. Phoenix, AZ 85037
            </p>
          </div>
        </div>
      `,
      textContent: `
Welcome to Butterfly Providers, ${firstName}!

Thank you for joining our family! We're excited to help you access our comprehensive non-medical home care services.

What's Next?
- Complete your care assessment  
- Meet your dedicated care team
- Schedule your first service appointment
- Access our 24/7 support portal

Visit https://butterflyproviders.com to access your portal.

Questions? Contact us at 602-830-0966
Office Hours: Monday-Friday 8:00 AM - 5:00 PM

Butterfly Providers
10720 West Indian School Rd. Phoenix, AZ 85037
      `
    });
  },

  // Appointment confirmation
  appointmentConfirmation: async (to: string, appointmentDetails: {
    clientName: string;
    date: string;
    time: string;
    service: string;
    caregiver: string;
  }) => {
    return sendEmail({
      to,
      toName: appointmentDetails.clientName,
      from: 'no-reply@butterflyproviders.com',
      fromName: 'Butterfly Providers Scheduling',
      subject: 'Appointment Confirmed - Butterfly Providers',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #059669; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0;">✅ Appointment Confirmed</h1>
          </div>
          
          <div style="background: #F0FDF4; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #065F46; margin-top: 0;">Hello ${appointmentDetails.clientName},</h2>
            <p style="color: #374151;">Your care appointment has been confirmed! Here are the details:</p>
            
            <div style="background: white; padding: 15px; border-radius: 6px; margin-top: 15px;">
              <p style="margin: 5px 0;"><strong>📅 Date:</strong> ${appointmentDetails.date}</p>
              <p style="margin: 5px 0;"><strong>⏰ Time:</strong> ${appointmentDetails.time}</p>
              <p style="margin: 5px 0;"><strong>🏥 Service:</strong> ${appointmentDetails.service}</p>
              <p style="margin: 5px 0;"><strong>👩‍⚕️ Caregiver:</strong> ${appointmentDetails.caregiver}</p>
            </div>
          </div>
          
          <div style="border: 1px solid #FCD34D; background: #FFFBEB; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
            <p style="color: #92400E; margin: 0;"><strong>📞 Need to reschedule?</strong> Please call us at 602-830-0966 at least 24 hours in advance.</p>
          </div>
          
          <div style="text-align: center;">
            <p style="color: #6B7280;">Questions? We're here to help!</p>
            <a href="tel:602-830-0966" style="color: #059669; font-weight: bold; text-decoration: none;">602-830-0966</a>
          </div>
        </div>
      `,
      textContent: `
Appointment Confirmed - Butterfly Providers

Hello ${appointmentDetails.clientName},

Your care appointment has been confirmed! Here are the details:

📅 Date: ${appointmentDetails.date}
⏰ Time: ${appointmentDetails.time}  
🏥 Service: ${appointmentDetails.service}
👩‍⚕️ Caregiver: ${appointmentDetails.caregiver}

Need to reschedule? Please call us at 602-830-0966 at least 24 hours in advance.

Questions? Contact us at 602-830-0966

Butterfly Providers
10720 West Indian School Rd. Phoenix, AZ 85037
      `
    });
  },

  // Consultation request notification to admin team
  consultationNotification: async (adminEmail: string, consultationData: {
    name: string;
    email?: string;
    phone: string;
    serviceType?: string;
    urgency?: string;
    preferredDate?: string;
    preferredTime?: string;
    additionalInfo?: string;
    submittedAt: string;
  }) => {
    return sendEmail({
      to: adminEmail,
      from: 'no-reply@butterflyproviders.com',
      fromName: 'Butterfly Providers Website',
      subject: `🔔 New Consultation Request from ${consultationData.name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #EF4444; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 20px;">🔔 New Consultation Request</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Immediate attention required</p>
          </div>
          
          <div style="background: #F9FAFB; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #374151; margin-top: 0;">Client Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td style="padding: 8px 0;">${consultationData.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td style="padding: 8px 0;">${consultationData.phone}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;">${consultationData.email || 'Not provided'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Service Type:</td><td style="padding: 8px 0;">${consultationData.serviceType || 'Not specified'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Urgency:</td><td style="padding: 8px 0;"><strong style="color: ${consultationData.urgency === 'immediately' ? '#EF4444' : '#059669'};">${consultationData.urgency?.replace('-', ' ') || 'within week'}</strong></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Date:</td><td style="padding: 8px 0;">${consultationData.preferredDate || 'Any date'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Preferred Time:</td><td style="padding: 8px 0;">${consultationData.preferredTime || 'Anytime'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Submitted:</td><td style="padding: 8px 0;">${consultationData.submittedAt}</td></tr>
            </table>
          </div>
          
          ${consultationData.additionalInfo ? `
          <div style="background: #FFFBEB; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #F59E0B;">
            <h3 style="color: #92400E; margin-top: 0;">Additional Information:</h3>
            <p style="color: #374151; line-height: 1.6; margin: 0;">${consultationData.additionalInfo}</p>
          </div>
          ` : ''}
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #F0FDF4; border-radius: 8px;">
            <p style="color: #065F46; margin: 0; font-weight: bold;">
              📞 Call ${consultationData.name} at ${consultationData.phone} to schedule their consultation
            </p>
            ${consultationData.urgency === 'immediately' ? 
              '<p style="color: #EF4444; margin: 10px 0 0 0; font-weight: bold;">⚠️ URGENT: Client needs care within 24-48 hours</p>' : 
              ''
            }
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #F3F4F6; border-radius: 8px; font-size: 12px; color: #6B7280;">
            <p style="margin: 0;">Butterfly Providers | 10720 West Indian School Rd, Phoenix, AZ 85037 | (602) 830-0966</p>
          </div>
        </div>
      `,
      textContent: `
New Consultation Request - ${consultationData.name}

Client Information:
- Name: ${consultationData.name}
- Phone: ${consultationData.phone}
- Email: ${consultationData.email || 'Not provided'}
- Service Type: ${consultationData.serviceType || 'Not specified'}
- Urgency: ${consultationData.urgency?.replace('-', ' ') || 'within week'}
- Preferred Date: ${consultationData.preferredDate || 'Any date'}
- Preferred Time: ${consultationData.preferredTime || 'Anytime'}
- Submitted: ${consultationData.submittedAt}

${consultationData.additionalInfo ? `
Additional Information:
${consultationData.additionalInfo}
` : ''}

Action Required: Call ${consultationData.name} at ${consultationData.phone} to schedule their consultation.

${consultationData.urgency === 'immediately' ? 'URGENT: Client needs care within 24-48 hours!' : ''}

Butterfly Providers
10720 West Indian School Rd, Phoenix, AZ 85037
(602) 830-0966
      `
    });
  },

  // Contact form notification to admin team
  contactNotification: async (adminEmail: string, contactData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    submittedAt: string;
  }) => {
    return sendEmail({
      to: adminEmail,
      from: 'no-reply@butterflyproviders.com',
      fromName: 'Butterfly Providers Website',
      subject: `New Contact Form Submission from ${contactData.name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1E40AF; color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <h1 style="margin: 0;">📧 New Contact Form Submission</h1>
          </div>
          
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px;">
            <h2 style="color: #1E293B; margin-top: 0;">Contact Details</h2>
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${contactData.email}" style="color: #059669;">${contactData.email}</a></p>
            ${contactData.phone ? `<p><strong>Phone:</strong> <a href="tel:${contactData.phone}" style="color: #059669;">${contactData.phone}</a></p>` : ''}
            <p><strong>Submitted:</strong> ${contactData.submittedAt}</p>
            
            <div style="margin-top: 20px; padding: 15px; background: white; border-left: 4px solid #059669; border-radius: 4px;">
              <p style="margin: 0;"><strong>Message:</strong></p>
              <p style="margin: 10px 0 0 0; line-height: 1.6;">${contactData.message}</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px;">
            <a href="mailto:${contactData.email}" 
               style="background: #059669; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-right: 10px;">
              Reply via Email
            </a>
            ${contactData.phone ? `<a href="tel:${contactData.phone}" style="background: #1E40AF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Call Client</a>` : ''}
          </div>
        </div>
      `,
      textContent: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}
Submitted: ${contactData.submittedAt}

Message:
${contactData.message}

Reply to: ${contactData.email}
      `
    });
  }
};

export default brevoApi;