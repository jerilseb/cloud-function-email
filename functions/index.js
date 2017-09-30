const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.sendMail = functions.https.onRequest((request, response) => {

const toEmail = encodeURIComponent(functions.config().gmail.to_email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const fromEmail = encodeURIComponent(functions.config().gmail.from_email);

	const mailTransport = nodemailer.createTransport({
	    service: "gmail",
	    host: "smtps.gmail.com",
	    auth: {
	        user: fromEmail,
	        pass: gmailPassword
	    }
	});

	const body = JSON.parse(request.body);
	console.log(body.message);

	let message = `
	Name: ${body.name}
	Email: ${body.email}
	Message: ${body. message} 
	`;

	let mailOptions={
	   to : toEmail,
	   from: fromEmail,
	   subject : 'Someone said Hi!',
	   text : message
	}

	mailTransport.sendMail(mailOptions).then(() => {
      console.log('Email has been sent');
    }).catch(error => {
      console.error('There was an error while sending the email:', error);  
    });

    response.json({
    	'message': 'Got the message'
    })
});
