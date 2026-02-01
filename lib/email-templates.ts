interface VerificationEmailParams {
  url: string;
  name: string;
}

interface ApprovalEmailParams {
  name: string;
  signInUrl: string;
}

interface NewsletterEmailParams {
  name: string;
  title: string;
  content: string;
  newsletterUrl: string;
  unsubscribeUrl: string;
}

export const getVerificationEmailTemplate = ({
  url,
  name,
}: VerificationEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Verify Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Email Verification</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Verify Your Email Address</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Thank you for registering with Porto Space Team. Please click the button below to verify your email address and complete your registration.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 8px 0 24px 0;">
                    <a href="${url}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">Verify Email Address</a>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666; line-height: 1.6;">If the button above does not work, copy and paste the following URL into your browser:</p>
                    <p style="margin: 0 0 24px 0; font-size: 12px; color: #8b4513; word-break: break-all; line-height: 1.6;">${url}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #e5e5e5;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; padding: 16px;">
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">After verifying your email, your account will be pending approval by an administrator. You will be notified once your access has been approved.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">If you did not create an account with Porto Space Team, you can safely ignore this email.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getApprovalEmailTemplate = ({
  name,
  signInUrl,
}: ApprovalEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Account Approved</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Account Approved</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Welcome to Porto Space Team</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Great news! Your account has been approved by an administrator. You now have full access to the Porto Space Team admin panel.</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 8px 0 24px 0;">
                    <a href="${signInUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">Sign In Now</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px; border-top: 1px solid #e5e5e5;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; padding: 16px;">
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">You can sign in using the email and password you created during registration.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">If you have any questions, please contact the team administrators.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

interface ContactConfirmationEmailParams {
  name: string;
  ticketId: string;
  subject: string;
  message: string;
}

interface ContactNotificationEmailParams {
  ticketId: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  adminUrl: string;
}

export const getContactConfirmationEmailTemplate = ({
  name,
  ticketId,
  subject,
  message,
}: ContactConfirmationEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Message Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Message Received</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Thank You for Contacting Us</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">We have received your message and will get back to you as soon as possible. Please keep your ticket ID for reference.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Your Ticket ID:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b4513; font-family: monospace;">${ticketId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Subject:</p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">${subject}</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Your Message:</p>
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">This is an automated confirmation. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getContactNotificationEmailTemplate = ({
  ticketId,
  name,
  email,
  subject,
  message,
  adminUrl,
}: ContactNotificationEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">New Contact</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">New Contact Message Received</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Ticket ID:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b4513; font-family: monospace;">${ticketId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">From:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">${name} &lt;${email}&gt;</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Subject:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">${subject}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Message:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 24px 0 8px 0;">
                    <a href="${adminUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">View in Admin Panel</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">This is an automated notification from the Porto Space Team website.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

interface ApplicationConfirmationEmailParams {
  name: string;
  applicationId: string;
  departments: string[];
  course: string;
  yearOfStudy: string;
}

interface ApplicationNotificationEmailParams {
  applicationId: string;
  name: string;
  email: string;
  departments: string[];
  course: string;
  yearOfStudy: string;
  linkedin?: string;
  github?: string;
  experience?: string;
  adminUrl: string;
}

export const getApplicationConfirmationEmailTemplate = ({
  name,
  applicationId,
  departments,
  course,
  yearOfStudy,
}: ApplicationConfirmationEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Application Received</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Application Received</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Thank You for Applying!</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">We have received your application to join Porto Space Team. Our team will carefully review your application and get back to you soon.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Your Application ID:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b4513; font-family: monospace;">${applicationId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Applied Departments:</p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">${departments.join(", ")}</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Course:</p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; color: #666666;">${course}</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Year of Study:</p>
                    <p style="margin: 0; font-size: 14px; color: #666666;">${yearOfStudy}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fafafa; border: 1px solid #e5e5e5;">
                      <tr>
                        <td style="padding: 16px;">
                          <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">What's Next?</p>
                          <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">1. Our team will review your application<br/>2. We may contact you for an interview<br/>3. You'll receive our decision via email</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">This is an automated confirmation. Please do not reply to this email.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const getApplicationNotificationEmailTemplate = ({
  applicationId,
  name,
  email,
  departments,
  course,
  yearOfStudy,
  linkedin,
  github,
  experience,
  adminUrl,
}: ApplicationNotificationEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>New Application</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">New Application</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">New Application Received</h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Application ID:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b4513; font-family: monospace;">${applicationId}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px;">
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Applicant:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">${name} &lt;${email}&gt;</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Departments:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">${departments.join(", ")}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Course:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666;">${course} (${yearOfStudy})</p>
                        </td>
                      </tr>
                      ${linkedin ? `<tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">LinkedIn:</p>
                          <p style="margin: 0; font-size: 14px; color: #8b4513;"><a href="${linkedin}" style="color: #8b4513;">${linkedin}</a></p>
                        </td>
                      </tr>` : ""}
                      ${github ? `<tr>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">GitHub/Portfolio:</p>
                          <p style="margin: 0; font-size: 14px; color: #8b4513;"><a href="${github}" style="color: #8b4513;">${github}</a></p>
                        </td>
                      </tr>` : ""}
                      ${experience ? `<tr>
                        <td>
                          <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; color: #1a1a1a;">Relevant Experience:</p>
                          <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">${experience}</p>
                        </td>
                      </tr>` : ""}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 24px 0 8px 0;">
                    <a href="${adminUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">View in Admin Panel</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">This is an automated notification from the Porto Space Team website.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

interface ApplicationStatusUpdateEmailParams {
  name: string;
  applicationId: string;
  status: "read" | "interview" | "accepted" | "rejected" | "archived";
  bookingUrl?: string;
}

export const getApplicationStatusUpdateEmailTemplate = ({
  name,
  applicationId,
  status,
  bookingUrl,
}: ApplicationStatusUpdateEmailParams): string => {
  const statusConfig = {
    read: {
      label: "Application Under Review",
      title: "Your Application is Being Reviewed",
      message: "Good news! Your application has been reviewed by our team and is now under consideration. We will contact you soon with updates on the next steps.",
      color: "#8b4513",
    },
    interview: {
      label: "Interview Invitation",
      title: "You're Invited for an Interview!",
      message: `Congratulations! We were impressed by your application and would like to invite you for an interview.\n\nTo schedule your interview, please visit our application page and enter your Application ID. You'll be able to select a time slot that works best for you from our available options.\n\nOnce you book a slot, you'll receive a confirmation email with the Zoom meeting link.`,
      color: "#8b4513",
    },
    accepted: {
      label: "Application Accepted",
      title: "Welcome to Porto Space Team!",
      message: "Congratulations! We are thrilled to inform you that your application has been accepted. Welcome to Porto Space Team!\n\nWe will be in touch shortly with more details about your onboarding process and next steps. Get ready for an exciting journey ahead!",
      color: "#8b4513",
    },
    rejected: {
      label: "Application Update",
      title: "Thank You for Your Interest",
      message: "Thank you for taking the time to apply to Porto Space Team. After careful consideration, we regret to inform you that we are unable to offer you a position at this time.\n\nWe encourage you to continue developing your skills and consider applying again in the future. We wish you all the best in your endeavors.",
      color: "#666666",
    },
    archived: {
      label: "Application Archived",
      title: "Your Application Has Been Archived",
      message: "This is to inform you that your application to Porto Space Team has been archived and removed from our active applications.\n\nIf you believe this was done in error or would like to submit a new application, please feel free to apply again through our website.",
      color: "#666666",
    },
  };

  const config = statusConfig[status];

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${config.title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: ${config.color};">${config.label}</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">${config.title}</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">${config.message}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Application ID:</p>
                    <p style="margin: 0; font-size: 18px; font-weight: 700; color: #8b4513; font-family: monospace;">${applicationId}</p>
                  </td>
                </tr>
                ${status === "interview" && bookingUrl ? `
                <tr>
                  <td align="center" style="padding: 24px 0 8px 0;">
                    <a href="${bookingUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">Book Your Interview</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 8px 0;">
                    <p style="margin: 0; font-size: 12px; color: #666666;">Use your Application ID above to check your status and book a slot.</p>
                  </td>
                </tr>
                ` : ""}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">This is an automated message from Porto Space Team. If you have any questions, please reply to this email.</p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
};

export const getNewsletterEmailTemplate = ({
  name,
  title,
  content,
  newsletterUrl,
  unsubscribeUrl,
}: NewsletterEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Newsletter</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">${title}</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6; white-space: pre-wrap;">${content}</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 8px 0 24px 0;">
                    <a href="${newsletterUrl}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">View Newsletter</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">You received this email because you subscribed to Porto Space Team newsletter.</p>
              <p style="margin: 8px 0 0 0; font-size: 12px; text-align: center;">
                <a href="${unsubscribeUrl}" style="color: #8b4513; text-decoration: underline;">Unsubscribe from this newsletter</a>
              </p>
            </td>
          </tr>
        </table>
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px;">
          <tr>
            <td style="padding: 24px 0; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #999999;">Porto Space Team - University of Porto</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

interface InterviewBookedEmailParams {
  name: string;
  applicationId: string;
  interviewDate: string;
  zoomLink: string;
}

export const getInterviewBookedEmailTemplate = ({
  name,
  applicationId,
  interviewDate,
  zoomLink,
}: InterviewBookedEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Interview Confirmed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; border: 0;" />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td>
                    <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Interview Confirmed</p>
                    <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a; line-height: 1.3;">Your Interview is Scheduled!</h1>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Hello ${name},</p>
                    <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666; line-height: 1.6;">Great news! Your interview with Porto Space Team has been confirmed.</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5; margin-bottom: 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Application ID:</p>
                    <p style="margin: 0 0 16px 0; font-size: 14px; font-weight: 700; color: #8b4513; font-family: monospace;">${applicationId}</p>
                    <p style="margin: 0 0 8px 0; font-size: 12px; color: #666666;">Date & Time:</p>
                    <p style="margin: 0; font-size: 16px; font-weight: 700; color: #1a1a1a;">${interviewDate}</p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 24px 0 8px 0;">
                    <a href="${zoomLink}" target="_blank" style="display: inline-block; padding: 14px 32px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600; letter-spacing: 0.025em;">Join Zoom Meeting</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding: 8px 0 24px 0;">
                    <p style="margin: 0; font-size: 12px; color: #666666;">Or copy this link:</p>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #8b4513; word-break: break-all;">${zoomLink}</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 14px; color: #666666; line-height: 1.6;">Please join a few minutes early. We look forward to meeting you!</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0; font-size: 12px; color: #999999; text-align: center; line-height: 1.6;">If you need to reschedule, please reply to this email.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

interface InterviewBookedAdminEmailParams {
  applicantName: string;
  applicantEmail: string;
  applicationId: string;
  interviewDate: string;
  zoomLink: string;
}

export const getInterviewBookedAdminEmailTemplate = ({
  applicantName,
  applicantEmail,
  applicationId,
  interviewDate,
  zoomLink,
}: InterviewBookedAdminEmailParams): string => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interview Booked</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width: 480px; background-color: #ffffff; border: 1px solid #e5e5e5;">
          <tr>
            <td style="padding: 40px 32px 32px 32px; text-align: center; border-bottom: 1px solid #e5e5e5;">
              <img src="https://porto-space-team-2026.vercel.app/logo-black.png" alt="Porto Space Team" width="48" height="48" style="display: block; margin: 0 auto; border: 0;" />
              <p style="margin: 16px 0 0 0; font-size: 14px; font-weight: 700; letter-spacing: 0.1em; color: #1a1a1a; text-transform: uppercase;">Porto Space Team</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px;">
              <p style="margin: 0 0 8px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: #8b4513;">Admin Notification</p>
              <h1 style="margin: 0 0 16px 0; font-size: 24px; font-weight: 700; color: #1a1a1a;">Interview Booked</h1>
              <p style="margin: 0 0 24px 0; font-size: 14px; color: #666666;">An applicant has booked an interview slot:</p>
              <div style="padding: 16px; background-color: #fafafa; border: 1px solid #e5e5e5;">
                <p style="margin: 0 0 4px 0; font-size: 16px; font-weight: 700; color: #1a1a1a;">${applicantName}</p>
                <p style="margin: 0 0 12px 0; font-size: 14px; color: #666666;">${applicantEmail}</p>
                <p style="margin: 0 0 4px 0; font-size: 12px; color: #666666;">Application: <strong style="color: #8b4513;">${applicationId}</strong></p>
                <p style="margin: 12px 0 0 0; font-size: 16px; font-weight: 700; color: #1a1a1a;">${interviewDate}</p>
              </div>
              <p style="margin: 24px 0 0 0; text-align: center;">
                <a href="${zoomLink}" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #8b4513; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 600;">Join Zoom</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
