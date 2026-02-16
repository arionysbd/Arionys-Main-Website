import { NextResponse } from 'next/server';
// import nodemailer from 'nodemailer';

export default async function sendEmail(req, res) {
    const { method } = req;

    if (method === 'POST') {
        const { otp, message, subject, name, phone, email } = req.body;

        const contactTemp = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
    <title></title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml><![endif]--><!--[if !mso]><!--><!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        .image_block img+div {
            display: none;
        }

        @media (max-width:660px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .mobile_hide {
                display: none;
            }

            .row-content {
                width: 100% !important;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>

<body className="body" style="margin: 0; background-color: #21252b; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
    <table className="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-repeat: no-repeat; background-size: auto; background-color: #21252b; background-image: none; background-position: top left;">
        <tbody>
            <tr>
                <td>
                    <table className="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #21252b; background-image: url('https://d1oco4z2z1fhwp.cloudfront.net/templates/default/7226/background-test_2.png'); background-position: top center; background-repeat: no-repeat; background-size: auto;">
                        <tbody>
                            <tr>
                                <td>
                                    <table className="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-size: auto; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td className="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div className="spacer_block block-1" style="height:50px;line-height:50px;font-size:1px;">&#8202;</div>
                                                    <table className="image_block block-2" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad" style="padding-top:5px;width:100%;">
                                                                <div className="alignment" align="center" style="line-height:10px">
                                                                    <div style="max-width: 84px;"><img src="https://8d88e97e10.imgdist.com/pub/bfra/j4cgxt4b/cb5/uwm/jon/Robo%20Superior_20240618_102215_0000_1.png" style="display: block; height: auto; border: 0; width: 100%;" width="84" alt="Your Logo" title="Your Logo" height="auto"></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div className="spacer_block block-3" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                    <table className="heading_block block-4" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad">
                                                                <h1 style="margin: 0; color: #7747FF; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 120%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 45.6px;"><span className="tinyMce-placeholder">&nbsp; &nbsp; &nbsp; Arionys Contact Info</span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div className="spacer_block block-5" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
                                                    <table className="heading_block block-6" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span className="tinyMce-placeholder">This is: <em>${name}</em></span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table className="heading_block block-7" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span className="tinyMce-placeholder">Email: <em>${email}</em></span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table className="heading_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span className="tinyMce-placeholder">Subject: <em>${subject}</em></span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table className="heading_block block-8" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                        <tr>
                                                            <td className="pad" style="padding-left:20px;padding-right:20px;text-align:center;width:100%;">
                                                                <h1 style="margin: 0; color: #f4ede6; direction: ltr; font-family: Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; font-size: 34px; font-weight: 400; letter-spacing: 2px; line-height: 200%; text-align: left; margin-top: 0; margin-bottom: 0; mso-line-height-alt: 68px;"><span className="tinyMce-placeholder">Phone: <em>${phone}</em></span></h1>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table className="paragraph_block block-9" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
                                                        <tr>
                                                            <td className="pad" style="padding-bottom:10px;padding-left:20px;padding-right:20px;padding-top:10px;">
                                                                <div style="color:#f4ede6;font-family:Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;font-size:20px;line-height:180%;text-align:left;mso-line-height-alt:36px;">
                                                                    <h3 style="margin: 0;">Message: ${message}</h3>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <div className="spacer_block block-10" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                    <div className="spacer_block block-11" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                    <div className="spacer_block block-12" style="height:30px;line-height:30px;font-size:1px;">&#8202;</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="row row-2" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                        <tbody>
                            <tr>
                                <td>
                                    <table className="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #21252b; color: #000000; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td className="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div className="spacer_block block-1" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="row row-3" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f4ede6;">
                        <tbody>
                            <tr>
                                <td>
                                    <table className="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #f4ede6; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td className="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <div className="spacer_block block-1" style="height:80px;line-height:80px;font-size:1px;">&#8202;</div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="row row-4" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
                        <tbody>
                            <tr>
                                <td>
                                    <table className="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; background-color: #ffffff; width: 640px; margin: 0 auto;" width="640">
                                        <tbody>
                                            <tr>
                                                <td className="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                    <table className="icons_block block-1" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; text-align: center;">
                                                        <tr>
                                                            <td className="pad" style="vertical-align: middle; color: #1e0e4b; font-family: 'Inter', sans-serif; font-size: 15px; padding-bottom: 5px; padding-top: 5px; text-align: center;">
                                                                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                                                                    <tr>
                                                                        <td className="alignment" style="vertical-align: middle; text-align: center;"><!--[if vml]><table align="center" cellpadding="0" cellspacing="0" role="presentation" style="display:inline-block;padding-left:0px;padding-right:0px;mso-table-lspace: 0pt;mso-table-rspace: 0pt;"><![endif]-->
                                                                            <!--[if !vml]><!-->
                                                                            <table className="icons-inner" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block; margin-right: -4px; padding-left: 0px; padding-right: 0px;" cellpadding="0" cellspacing="0" role="presentation"><!--<![endif]-->
                                                                                <tr>
                                                                                    <td style="vertical-align: middle; text-align: center; padding-top: 5px; padding-bottom: 5px; padding-left: 5px; padding-right: 6px;"><a href="https://www.linkedin.com/in/06nurahmed/" target="_blank" style="text-decoration: none;"><img className="icon" alt="Beefree Logo" src="https://d1oco4z2z1fhwp.cloudfront.net/assets/Beefree-logo.png" height="auto" width="34" align="center" style="display: block; height: auto; margin: 0 auto; border: 0;"></a></td>
                                                                                    <td style="font-family: 'Inter', sans-serif; font-size: 15px; font-weight: undefined; color: #1e0e4b; vertical-align: middle; letter-spacing: undefined; text-align: center;"><a href="https://www.linkedin.com/in/06nurahmed/" target="_blank" style="color: #1e0e4b; text-decoration: none;">Developed by Nur Ahmad</a></td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>`;
        const otpTemp = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your OTP Code</title>
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); margin-top: 40px; margin-bottom: 40px; }
    .header { background-color: #21252b; padding: 30px; text-align: center; }
    .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 600; }
    .content { padding: 40px; text-align: center; color: #333333; }
    .otp-code { font-size: 36px; font-weight: bold; color: #7747FF; letter-spacing: 5px; margin: 20px 0; padding: 15px; background-color: #f8f9fa; border-radius: 4px; display: inline-block; }
    .message { font-size: 16px; line-height: 1.6; margin-bottom: 20px; }
    .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; }
    .warning { color: #e74c3c; font-size: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Arionys Verification</h1>
    </div>
    <div class="content">
      <p class="message">Hello,</p>
      <p class="message">You requested a verification code for your Arionys account. Please use the following One-Time Password (OTP) to complete your action:</p>
      
      <div class="otp-code">${otp}</div>
      
      <p class="message">This code is valid for a short period. Do not share this code with anyone.</p>
      <p class="warning">If you did not request this code, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Arionys. All rights reserved.</p>
      <p>This is an automated message, please do not reply.</p>
    </div>
  </div>
</body>
</html>`;

        const toEmail = otp ? email : process.env.SEND_MAIL_TO;
        const emailSubject = otp ? "Arionys Login Code" : "Someone Contact Arionys!";
        const htmlContent = otp ? otpTemp : contactTemp;

        const payload = {
            "subject": emailSubject,
            "smtpUser": "noreply.arionys@gmail.com",
            "to": [toEmail],
            "replyTo": "noreply.arionys@gmail.com",
            "from": "noreply.arionys@gmail.com",
            "fromName": "Arionys",
            "html": htmlContent,
            "bulk": false
        };

        try {
            const response = await fetch('https://mailapi.arionys.com/api/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${process.env.MAIL_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                res.status(200).json({ message: 'Email sent successfully' });
            } else {
                const errorData = await response.text();
                console.error('API Error:', errorData);
                res.status(500).json({ message: 'Failed to send email', error: errorData });
            }
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
