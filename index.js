const UssdMenu = require('ussd-menu-builder');
let menu = new UssdMenu();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = process.env.PORT;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

 // Authentication
const credentials = {
    apiKey: process.env.API_KEY, // API Key here, sandbox or live
    username: process.env.USERNAME // Username: 'sandbox' for the test environment, App username for live
};

// Require the AT package
const AfricasTalking = require("africastalking")(credentials);

// Define inputs
let regNumber = []
let cname = []
let lessons = []

// Defining states
menu.startState({
    run: () => {
        regNumber = []
        cname = []
        lessons =[]

        // Welcome Screen      
        menu.con(' Welcome to our USSD demo! We\'ll be doing the semester evaluation '+
                   '\n Reply with 1 to continue:' +
                 '\n1. Start evaluation'
            );
    },
    // Next object links to next state based on user input
    next: {
        '1': 'regnumber',
        
    }
});

//Details collection
menu.state('regnumber', {
    run: () => {
        menu.con('Please enter your registration number: ')
    },
    next: {
        '*[a-zA-Z]+': 'regNumber'
    }
})

menu.state('regNumber', {
    run: () => {
        regNumber.push(String(menu.val))
        menu.con(`Welcome ${regNumber[0]}! Your number is here**. Enter your course name:`)
    },
    next: {
        
        '*[a-zA-Z]+': 'cname'
    }
})

menu.state('cname', {
    run: () => {
        cname.push(String(menu.val))
        menu.con(`Thanks, good to know you take ${cname[0]}.
        \n Rate the quality of lessons on a scale of 1 - 5: `);
    },
    next: {
        
        '*\\d+': 'lessons'
    }
})

menu.state('lessons', {
    run: () => {
        lessons.push(Number(menu.val))
        //Check Lessons rating brackets
        // Parse message for sending text on completion
        if(lessons>=4) {
            menu.end(`Thanks for your feedback. Cheers! `);
            message = "Glad the lessons were well taught, thank you for the high rating. All the best in your exams!";

            sendSMS(menu.args.phoneNumber, message)
        }

        if(lessons >=2 && lessons <4 ) {
            menu.end(`Hope the rating gets better next semester :)\nAll the best in your exams!`);
            message = "Sorry the lessons could have been better, feel free to share an email on what we can improve. All the best in your exams!";

            sendSMS(menu.args.phoneNumber, message)
        }   
        
        if( lessons<2){
            menu.end(`Sorry that the lessons weren't well taught :(\nAll the best in your exams! `);
            message = "Apologies that the lessons were not the best. Pass by the department to let us know how we can serve you better. All the best in your exams!";

            sendSMS(menu.args.phoneNumber, message)

        }

    }
})

// Registering USSD handler with Express
 
app.post('/ussd', async function(req, res){
    console.log(req.body);
    await menu.run(req.body, ussdResult => {
        res.send(ussdResult);
    });
});

const sendSMS = (to, msg) => {
    const sms = AfricasTalking.SMS;

    sms
    .send({ 
        to: to, // Number of recipient - can be multiple
        message:msg, // Message to be sent 
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

app.listen(PORT, () => console.log(`Running on port: ${PORT}` ));