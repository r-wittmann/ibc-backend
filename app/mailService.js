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
    // used for the  accept registration flow
    static sendAcceptanceMail(email, password, token, contact, account) {
        let mailOptions = {
            to: email,
            subject: 'Ihre Registrierung am IBC Job Portal',
            html:  `<div>
                        <p>Hallo ${contact},</p>
                        <p>willkommen im IBC Job Portal. Deine Registrierung wurde akzeptiert. Damit du gleich anfangen kannst
                            Stellenanzeigen zu erstellen sind hier nochmal deine Anmeldedaten:</p>
                        <p>Unternehmensname: ${account}<br />
                            E-Mail: ${email}<br/>
                            Passwort: ${password}</p>
                        <p>Melde dich <a href="https://ibc-job-portal.cfapps.io/company/profile#token=${token}">hier</a> an und ändere bitte sofort dein Passwort.<br/>
                            Sowohl Unternehmensname als auch E-Mail-Adresse sind für den Login gültig.</p>
                        <p>Viele Grüße vom IBC Team</p>
                    </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    // send a mail containing a new password to the accounts email address
    // used for the forgot password flow and the accept registration flow
    static sendNewPasswordMail(email, password, contact, account) {
        let mailOptions = {
            to: email,
            subject: 'Neues Passwort',
            html:  `<div>
                        <p>Hallo ${contact},</p>
                        <p>deine Anmeldedaten für das IBC Job Portal sind:</p>
                        <p>Unternehmensname: ${account}<br/>
                            E-Mail: ${email}<br/>
                            Neues Passwort: ${password}.</p>
                        <p>Melde dich <a href="https://ibc-job-portal.cfapps.io/company/login">hier</a> an und ändere bitte sofort dein Passwort.<br/>
                            Sowohl Unternehmensname als auch E-Mail-Adresse sind für den Login gültig.</p>
                        <p>Viele Grüße vom IBC Team</p>
                    </div>`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    static sendExpiringPostMail(name, email, id, title) {
        let mailOptions = {
            to: email,
            subject: 'Posting läuft bald ab',
            html:  `<div>
                        <p>Hallo ${name},</p>
                        <p>Die Stellenanzeige mit dem Titel</p>
                        <p>&emsp;<a href="https://ibc-job-portal.cfapps.io/company/postings/${id}">${title}</a></p>
                        <p>läuft bald ab.</p>
                        <p>Viele Grüße vom IBC Team</p>
                    </div>`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

}

module.exports = MailService;
