'use strict';

const AWS = require('aws-sdk');
const SES = new AWS.SES();
const fs = require('fs');

module.exports.sendEmail = async event => {
    
    const body = fs.readFileSync('body.html').toString();

    const params = {
        Destination: {
            ToAddresses: ['2013100544@ucss.pe'],
        },
        Message: {
            Body: {
                Html: { Data: body }
            },
            Subject: {
                Data: 'Test'
            },
        },
        Source: 'jlinares0996@gmail.com'
    };

    try {
        await SES.sendEmail(params).promise();
        return {
            statusCode: 200,
            body: 'Email sent!'
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 400,
            body: 'Sending failed'
        }
    }
};
