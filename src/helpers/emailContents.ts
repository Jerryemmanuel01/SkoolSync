import { IMessage } from '../interfaces/IMessage';

interface EmailTemplateProps {
	verificationCode?: string;
	fullname?: string;
	loginUrl?: string;
	resetPasswordUrl?: string;
}

export const getEmailTemplates = {
	verificationCode: ({ verificationCode }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your SkoolSync Account</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
          }
          .verification-code {
            text-align: center;
            font-size: 32px;
            letter-spacing: 8px;
            color: #008080;
            padding: 20px;
            margin: 20px 0;
            background: #f8f8f8;
            border-radius: 4px;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <h2>Hello there </h2>
            <p>Thank you for signing up with SkoolSync. To complete your registration, please use the following verification code:</p>
            <div class="verification-code">${verificationCode}</div>
            <p>This code will expire in 10 minutes. If you didn't request this verification, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

	verificationCodeForEmailChange: ({ verificationCode }: EmailTemplateProps): string => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Change Request - SkoolSync</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      .logo {
        color: #008080;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 20px 0;
      }
      .verification-code {
        text-align: center;
        font-size: 32px;
        letter-spacing: 8px;
        color: #008080;
        padding: 20px;
        margin: 20px 0;
        background: #f8f8f8;
        border-radius: 4px;
      }
      .footer {
        text-align: center;
        color: #666;
        font-size: 14px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">SkoolSync</div>
      </div>
      <div class="content">
        <h2>Email Change Request</h2>
        <p>We received a request to change the email address associated with your SkoolSync account. To verify this change, please use the following verification code:</p>
        <div class="verification-code">${verificationCode}</div>
        <p>This code will expire in 10 minutes.</p>
        <p><strong>Important:</strong> If you didn't request this email change, please secure your account immediately by:</p>
        <ul>
          <li>Changing your password</li>
          <li>Contacting our support team</li>
        </ul>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`,

	successfulVerificationEmailChange: (): string => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Change Confirmation - SkoolSync</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      .logo {
        color: #008080;
        font-size: 24px;
        font-weight: bold;
      }
      .content {
        padding: 20px 0;
      }
      .security-tips {
        background: #f8f8f8;
        padding: 20px;
        border-radius: 4px;
        margin: 20px 0;
      }
      .footer {
        text-align: center;
        color: #666;
        font-size: 14px;
        padding-top: 20px;
        border-top: 1px solid #eee;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <div class="logo">SkoolSync</div>
      </div>
      <div class="content">
        <h2>Email Change Successful</h2>
        <p>Your email address has been successfully updated. All future communications will be sent to this email address.</p>
        
        <div class="security-tips">
          <h3>Security Tips to Keep Your Account Safe</h3>
          <ul>
            <li>Use a strong, unique password for your SkoolSync account</li>
            
            <li>Never share your login credentials with anyone</li>
            <li>Sign out when using shared devices</li>
            <li>Regularly monitor your account for any suspicious activity</li>
          </ul>
        </div>
        
        <p>If you didn't make this change, please contact our support team immediately.</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>`,

	successfulVerification: ({ loginUrl }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to SkoolSync!</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
            text-align: center;
          }
          .success-icon {
            color: #008080;
            font-size: 48px;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #008080;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <h2>Welcome aboard! 🎉</h2>
            <div class="success-icon">✓</div>
            <p>Your email has been successfully verified. You can now access all features of SkoolSync.</p>
            ${
				loginUrl
					? `
            <a href="${loginUrl}" class="button">
              Log In to Your Account
            </a>
            `
					: ''
			}
            <p>Thank you for choosing SkoolSync. We're excited to have you with us!</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

	forgotPassword: ({ resetPasswordUrl, fullname }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your SkoolSync Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #008080;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 20px 0;
          }
          .warning {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 12px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${fullname || 'there'},</p>
            <p>We received a request to reset your SkoolSync account password. To proceed with the password reset, click the button below:</p>
            <div style="text-align: center;">
              <a href="${resetPasswordUrl}" class="button">Reset Password</a>
            </div>
            <div class="warning">
              <strong>⚠️ Important:</strong> If you didn't request this password reset, please ignore this email or contact our support team immediately if you have concerns about your account's security.
            </div>
            <p>This password reset link will expire in 10 minutes for security reasons.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

	passwordChangeSuccess: ({ loginUrl, fullname }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Successfully Changed - SkoolSync</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
          }
          .success-icon {
            text-align: center;
            color: #008080;
            font-size: 48px;
            margin: 20px 0;
          }
          .security-tips {
            background-color: #e8f5e9;
            border: 1px solid #c8e6c9;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .security-tips ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #008080;
            color: #fff;
            text-decoration: none;
            border-radius: 4px;
            font-weight: 500;
            margin: 20px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <div class="success-icon">✓</div>
            <h2>Password Successfully Changed</h2>
            <p>Hello ${fullname},</p>
            <p>Your SkoolSync account password has been successfully changed. You can now log in with your new password.</p>
            
            <div class="security-tips">
              <strong>🔒 Important Security Tips:</strong>
              <ul>
                <li>Never share your password with anyone, including SkoolSync support staff</li>
                <li>Use a unique password for your SkoolSync account</li>
                <li>Sign out when using shared devices</li>
              </ul>
            </div>

            ${
				loginUrl
					? `
            <div style="text-align: center;">
              <a href="${loginUrl}" class="button">Log In to Your Account</a>
            </div>
            `
					: ''
			}

            <p>If you did not make this change, please contact our support team immediately.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

	inAppPasswordChanged: ({ fullname }: EmailTemplateProps): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Changed Successfully - SkoolSync</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
          }
          .greeting {
            font-size: 1.2em;
            color: #333;
            margin-bottom: 20px;
          }
          .alert-box {
            background-color: #fff3cd;
            border: 1px solid #ffeeba;
            color: #856404;
            padding: 15px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .security-tips {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .security-tips ul {
            margin: 10px 0;
            padding-left: 20px;
          }
          .security-tips li {
            margin-bottom: 10px;
          }
          .support-button {
            display: inline-block;
            background-color: #008080;
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 4px;
            margin: 15px 0;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <div class="greeting">Hello ${fullname},</div>
            <p>The password for your SkoolSync account has been successfully changed. If you made this change, no further action is required.</p>
            
            <div class="alert-box">
              <strong>⚠️ Didn't change your password?</strong>
              <p>If you didn't make this change, your account may be compromised. Please:</p>
              <ol>
                <li>Contact our support team immediately</li>
                <li>Try to log into your account</li>
                <li>Check for any unauthorized changes to your account settings</li>
              </ol>
            </div>
            
            <div class="security-tips">
              <h3>🔒 Password Security Tips</h3>
              <ul>
                <li><strong>Create Strong Passwords:</strong> Use a combination of uppercase and lowercase letters, numbers, and special characters</li>
                <li><strong>Unique Passwords:</strong> Never use the same password across different accounts</li>
                <li><strong>Regular Updates:</strong> Change your password periodically, especially if you suspect any security breach</li>
                <li><strong>Keep it Private:</strong> Never share your password with anyone, including SkoolSync support staff</li>
                <li><strong>Password Manager:</strong> Consider using a reliable password manager to securely store your passwords</li>
                
              </ul>
            </div>

            <p>Need help? Our support team is available 24/7.</p>
            <a href="#" class="support-button">Contact Support</a>
          </div>
          <div class="footer">
            <p>This is an automated message, please do not reply directly to this email.</p>
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
`,

	adminMessageNotification: ({ fullname, message, email, phone, title }: IMessage): string => `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Message from ${fullname} - SkoolSync</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
          }
          .logo {
            color: #008080;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px 0;
          }
          .message-details {
            background-color: #f8f8f8;
            border-radius: 4px;
            padding: 15px;
            margin: 20px 0;
          }
          .contact-info {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
          }
          .footer {
            text-align: center;
            color: #666;
            font-size: 14px;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">SkoolSync</div>
          </div>
          <div class="content">
            <h2>New Message Received</h2>
            <p>A new message has been sent to the SkoolSync admin portal.</p>
            
            <div class="message-details">
              <h3>${title}</h3>
              <p><strong>Message:</strong> ${message}</p>
            </div>
            
            <div class="contact-info">
              <p><strong>Sender Details:</strong></p>
              <p>Name: ${fullname}</p>
              <p>Email: ${email}</p>
              <p>Phone: ${phone}</p>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} SkoolSync. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `,

	landingPage: (): string => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SkoolSync API Documentation</title>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <style>
        body {
            background-color: #121212;
            color: #e0e0e0;
        }
        .teal-accent {
            color: #008080;
        }
    </style>
</head>
<body class="min-h-screen flex items-center justify-center">
    <div class="text-center">
        <h1 class="text-5xl font-bold mb-4">
            <span class="teal-accent">SkoolSync</span> API
        </h1>
        <p class="text-xl mb-8">Welcome to the powerful backend service</p>
        <div class="space-x-4">
         
           <a href="/api-docs"  class="border border-teal-600 text-teal-600 hover:bg-teal-700 hover:text-white font-bold py-2 px-4 rounded">
                View API Documentation
            </a>
        </div>
        <div class="mt-12 text-sm text-gray-500">
            © 2024 SkoolSync. All rights reserved.
        </div>
    </div>
</body>
</html>`
};
