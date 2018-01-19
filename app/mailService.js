const nodemailer = require('nodemailer');

// config object used to start and authenticate the backend to the mail application
// we created a gmail address for development purposes which should be replaced by an actual
// ibc-muenchen.com address once this goes to production
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // we need to check if it's possible to use this with the ibc mailing server
    auth: {
        user: 'ibc.job.portal@gmail.com',
        pass: 'ibc-job-portal'
    }
});

class MailService {

    // sends a mail to the ibc for every company which tries to register on the platform
    static sendApprovalRequestedMail() {
        let mailOptions = {
            to: 'ibc.job.portal@gmail.com',
            subject: 'Ein neues Unternehmen hat sich registriert',
            html:  `<div>
                        <p>Hallo Admin,</p>
                        <p>bitte melde dich <a href="https://ibc-job-portal.cfapps.io/admin/login">hier</a> in deinem Account an, um neue, offene Registrierungsanfragen zu sehen!</p>
                        <p>Viele Grüße</p>
                    </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    // send a mail containing a new password to the accounts email address
    // used for the forgot password flow and the accept registration flow
    static sendNewPasswordMail(email, password) {
        let mailOptions = {
            to: email,
            subject: 'Neues Passwort',
            html:  `<div>
                        <p>Hallo,</p>
                        <p>dein neues Passwort für das IBC Job Portal ist:</p>
                        <p>&emsp;${password}.</p>
                        <p>Melde dich <a href="https://ibc-job-portal.cfapps.io/company/login">hier</a> an und ändere bitte sofort dein Passwort.
                        <p>Viele Grüße vom IBC Team</p>
                    </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

}

module.exports = MailService;
