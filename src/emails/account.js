const sgMail = require('@sendgrid/mail')

const sendgridApiKey = process.env.SENDGRID_API_KEY

sgMail.setApiKey(sendgridApiKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'azulhafizuddin@gmail.com',
        subject: 'Welcome to the Task Manager App',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'azulhafizuddin@gmail.com',
        subject: 'We hate to see you go',
        text: `Hi, ${name}. It is a pity to see you go. Is there anything we can do to make you stay?`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
}