'use strict';
// this code will work once deployed on the server.
var nodemailer = require('nodemailer');

exports.sendMail = function(mail_from, mail_to, mail_subject, mail_body, is_html){
	if(process.env.NODE_ENV == "development")
	{
		console.log("development env: skip sending mail");
		return;
	}

	var transport = nodemailer.createTransport('SMTP', {
		host: "mailhub.mckinsey.com"
	});
    var mailFrom = mail_from || "";
    var mailTo = mail_to || {};
    var mailSubject = mail_subject || "<ODC-Interface> mail";
    var mailBody = mail_body ||  "";
    var isHTML = is_html || false;

	var msg = {
	  transport: transport,
	  from: mailFrom,
	  to: mailTo,
	  subject: mailSubject
	};
	if(isHTML)
	{
		msg["html"] = mailBody;
	}
	else
	{
		msg["text"] = mailBody;
	}

	transport.sendMail(msg, function (err) {
	    if (err) {
	    	console.log("error: "+ err);
	      return 0;
	    }
	    msg.transport.close();
	    return 1;
	});
};
