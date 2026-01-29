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
