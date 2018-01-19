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
            html: '<p>Hallo Admin,</p>' +
            '<p>bitte melde dich in deinem Account unter <a href="http://localhost:3000/admin/login">http://job-portal.ibc/admin/login</a> an,' +
            'um neue, offene Registrierungsanfragen zu sehen!</p>' +
            '<p>Viele Grüße</p>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    // not used anymore because approval mail uses the forgot password flow and decline mail is sent from the ibc admins mail app

    // static sendApprovalMail(email) {
    //     let mailOptions = {
    //         to: email,
    //         subject: 'Approval request granted',
    //         html: '<p>Hi,</p>' +
    //         '<p>Your request for registration at <a href="http://localhost:3000">http://job-portal.ibc</a>' +
    //         ' has been granted. You can now start setting up your companies and creating job postings.</p>' +
    //         '<p>Kind Regards</p>'
    //     };
    //
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) console.log(error);
    //     });
    // }
    //
    // static sendDeclineMail(email) {
    //     let mailOptions = {
    //         to: email,
    //         subject: 'Approval request denied',
    //         html: '<p>Hi,</p>' +
    //         '<p>Your request for registration at <a href="http://localhost:3000">http://job-portal.ibc</a>' +
    //         ' has been denied. Your company does not comply to the registration requirements</p>' +
    //         '<p>Kind Regards</p>'
    //     };
    //
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) console.log(error);
    //     });
    // }

    // send a mail containing a new password to the accounts email address
    // used for the forgot password flow and the accept registration flow
    static sendNewPasswordMail(email, password) {
        let mailOptions = {
            to: email,
            subject: 'Neues Passwort',
            html: '<p>Hallo,</p>' +
            '<p>dein neues Passwort für das IBC Job Portal ist:<br>' +
            password + '.</p>' +
            '<p>Melde dich unter <a href="http://localhost:3000/company/login">http://job-portal.ibc/company/login</a> an und ändere bitte sofort dein Passwort.'+
            '<p>Viele Grüße</p>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

}

module.exports = MailService;
