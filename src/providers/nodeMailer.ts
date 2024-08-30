import nodemailer from 'nodemailer'
import dotenv from "dotenv"
dotenv.config()

class SendMail {

    private appPassword: string
    private appMail: string

    constructor() {
        this.appPassword = process.env.APP_PASSWORD || ""
        this.appMail = process.env.USER_GMAIL || ""
    }

    async createTransporter() {
        console.log("i am creating transporter");

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.appMail,
                pass: this.appPassword
            }
        })
        return transporter
    }

    async sendCredentialMail(employeEmail: string, employePassword: string,employeName:string) {
        const transporter = await this.createTransporter()
        var mailOptions = {
            from: this.appMail,
            to: employeEmail,
            subject: 'Your Account Credentials for Client Sphere',
            html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="text-align: center; color: #7D50E1;">Welcome to Client Sphere</h2>
                <p>Dear ${employeName},</p>
                <p>We are pleased to inform you that your employee account has been created successfully. Please find your login credentials below:</p>
                <table style="width: 100%; max-width: 600px; margin: 20px auto; border-collapse: collapse;">
                    <tr style="background-color: #f2f2f2;">
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Credential</th>
                        <th style="padding: 10px; text-align: left; border-bottom: 1px solid #ddd;">Details</th>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">Employee ID</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${employeEmail}</td>
                    </tr>
                    <tr>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">Password</td>
                        <td style="padding: 10px; border-bottom: 1px solid #ddd;">${employePassword}</td>
                    </tr>
                </table>
                <p>Please keep these credentials confidential and do not share them with anyone.</p>
                <p>You can access the employee portal at <a href="http://localhost:5173/" style="color: #4CAF50;">Client Sphere</a>.</p>
                <p>If you have any questions or need assistance, feel free to contact the IT department.</p>
                <p>Best Regards,</p>
                <p><strong>Client Sphere Manager</strong></p>
            </div>
        `,
        };
        console.log("i am trying to sent mail");

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error dittected on mail sending section', error);
            } else {
                console.log('Email sent:', info.response);
            }
        })
    }


}

export default SendMail