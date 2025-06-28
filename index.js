const { GoogleGenerativeAI } = require("@google/generative-ai");

const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require("dotenv").config();

const PORT = process.env.PORT;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

 // AT Authentication
 const credentials = {
    apiKey: process.env.API_KEY, // API Key here 
    username: process.env.USERNAME // Username: 'sandbox' for the test environment, App username for live
};

//Send SMS function
const sendSMS = (to, msg) => {
    const sms = AfricasTalking.SMS;

    sms
    .send({ 
        to: to, // Number of recipient - can be multiple
        message:"Based on your symptoms:\n" + msg+"\nPlease seek medical attention, and get well soon :)", // Message to be sent 
        enqueue: true })
    .then(response => {
        console.log(response);
        // res.json(response);
    })
    .catch(error => {
        console.log(error);
        // res.json(error.toString());
    });
}

//GeminiPlugIn
const Your_API_Key = process.env.GEMINI_API;
const genAI = new GoogleGenerativeAI(Your_API_Key)

async function runAI(patient_num, sympt) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro"})
  
    const symptoms = sympt;
    const prompt = "What disease am I likely to have with the following symptoms: "+symptoms+"? Please limit the response to a maximum of 90 characters.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const diseases = response.text();
    sendSMS(patient_num, diseases);
    console.log(diseases);
  }

// Require the AT package
const AfricasTalking = require("africastalking")(credentials);

// Define inputs
let sympt = []
let patient = []
let response = []

// Defining states
menu.startState({
    run: () => {
        sympt = []
        patient = []
        response =[]

        // Welcome Screen      
        menu.con(' Welcome to our health check app! You\'ll get disease suggestions based on symptoms. Disclaimer: We\'re not doctors! :) '+
                 '\n1. Start health analysis' 
                //  '\n0. Exit'
            );
    },
    // Next object links to next state based on user input
    next: {
        '*\\d+': 'response'
        
    }
})

menu.state('response', {
    run: () => {
        response.push(Number(menu.val))
        //Check Response to proceed
        // End session on exit
        if(response < 1) {
            menu.end(`Thanks for dialing. Cheers!`);
        }
    },
    // Next object links to next state based on user input
    next: {
        '*\\d+': 'response'
        
    }
})

//Details collection
menu.state('response', {
    run: () => {
        response.push(Number(menu.val))
        menu.con('Please enter your name: ')
    },
    next: {
        '*[a-zA-Z]+': 'patient'
    }
})

menu.state('patient', {
    run: () => {
        patient.push(String(menu.val))
        menu.con(`Welcome ${patient[0]}! Please list the symptoms you\'re experiencing below, seperated by commas:`)
    },
    next: {
        
        '*[a-zA-Z]+': 'sympt'
    }
})

menu.state('sympt', {
    run: () => {
        runAI(menu.args.phoneNumber, sympt)
        sympt.push(String(menu.val))
        menu.end(`Very sorry that you\'re unwell! Please check your SMS app for a text on possible illnesses, as you go visit a medical professional too.
        \nGet well soon!`);
    }
})

// Registering USSD handler with Express
 
app.post('/ussd', async function(req, res){
    console.log(req.body);
    await menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

app.listen(PORT, () => console.log(`Running on port: ${PORT}` ));
// run();