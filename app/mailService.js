const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'ibc.job.portal@gmail.com',
        pass: 'ibc.job.'
    }
});

class MailService {
    
    static sendApprovalRequestedMail() {
        let mailOptions = {
            to: 'r-wittmann@gmx.net',
            subject: 'A new company has registered',
            html: '<p>Hi Admin,</p>' +
            '<p>please log in to your account at <a href="http://localhost:3000/admin/login">http://job-portal.ibc/admin/login</a>' +
            ' to review the open registrations.</p>' +
            '<p>Kind Regards</p>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    static sendApprovalMail(email) {
        let mailOptions = {
            to: email,
            subject: 'Approval request granted',
            html: '<p>Hi,</p>' +
            '<p>Your request for registration at <a href="http://localhost:3000">http://job-portal.ibc</a>' +
            ' has been granted. You can now start setting up your companies and creating job postings.</p>' +
            '<p>Kind Regards</p>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

    static sendDeclineMail(email) {
        let mailOptions = {
            to: email,
            subject: 'Approval request denied',
            html: '<p>Hi,</p>' +
            '<p>Your request for registration at <a href="http://localhost:3000">http://job-portal.ibc</a>' +
            ' has been denied. Your company does not comply to the registration requirements</p>' +
            '<p>Kind Regards</p>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) console.log(error);
        });
    }

}

module.exports = MailService;
