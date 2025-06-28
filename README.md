# AT USSD App

A demo application showcasing the power of integrating **Africa’s Talking USSD** and **SMS APIs** with the **Gemini Gen AI API** to build intelligent, conversational mobile services.  
Built for rapid prototyping and as a reference for developers looking to blend generative AI with mobile channels in Africa and beyond.

---

## 🚀 Features

- **USSD Interactions:** Users can access AI-powered chat and services through a simple mobile USSD menu.
- **AI Conversations:** Responses are generated using Google’s Gemini Gen AI API, enabling intelligent, conversational experiences.
- **SMS Integration:** The app can send SMS notifications in form of the AI-generated responses using Africa’s Talking SMS API.
- **Node.js Backend:** Easily extendable and well-structured for custom flows and logic.
- **.env Setup:** API keys and credentials managed securely.

---

## 🖼️ Use Case Examples

- **AI-powered chatbots** accessible on any mobile phone, even without internet
- **Personal assistants, information retrieval, surveys, and customer service** through USSD
- **SMS alerts and follow-ups** powered by AI-generated content

---

## 🛠️ Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- [Africa’s Talking account](https://account.africastalking.com/)
- [Google AI Studio account](https://aistudio.google.com/app/apikey)

### Installation

1. **Clone the repo**
    ```bash
    git clone https://github.com/sylviajebet/at-ussd-app.git
    cd at-ussd-app
    ```

2. **Install dependencies**
    ```bash
    npm install
    # or
    yarn
    ```

3. **Set up environment variables**

    Create a `.env` file in the root directory and add your credentials
    
    (A `.env.example` file is provided in this repository to act as an example):
    ```env
    AT_API_KEY=your_africastalking_api_key
    AT_USERNAME=your_africastalking_username
    GEMINI_API_KEY=your_gemini_api_key
    PORT=3009 #Any prot number that the code will run in
    ```

4. **Run the app**
    ```bash
    npm start
    # or
    yarn start
    ```

    Your USSD and SMS endpoints should now be accessible at the configured port.

---

## 📁 Project Structure

at-ussd-app/

├── node_modules/

├── .env.example # Example environment file

├── index.js # Main js file with all functions 

├── package.json

├── package-lock.json

└── README.md

---

## ✨ Customization & Extending

- **Add src and component folders** to utilize Node.js components and make the application easiy scalable. 
- **Modify USSD flows** to add more menus or AI use cases.
- **Update SMS handlers** for custom notifications or automated campaigns.
- **Configure Gemini prompts** for tailored conversational AI behavior.

---

## 📦 Deployment

- Deploy on platforms like Heroku, Render, Railway, or any VPS/cloud provider
- Expose the app to the internet using [ngrok](https://ngrok.com/) for local testing with Africa’s Talking

---

## 📚 References

- [Africa’s Talking USSD API Docs](https://developers.africastalking.com/docs/ussd)
- [Africa’s Talking SMS API Docs](https://developers.africastalking.com/docs/sms)
- [Google Gemini Gen AI Docs](https://ai.google.dev/docs)
- [Node.js Documentation](https://nodejs.org/en/docs/)

---

## 🤝 Contributing

Pull requests, issues, and feature suggestions are welcome!  
Please open an [issue](https://github.com/sylviajebet/at-ussd-app/issues) or submit a PR.

---

## 💡 Acknowledgements

- [Africa’s Talking](https://africastalking.com/)
- [Google Gemini Gen AI](https://ai.google.dev/)
- Open source contributors

---

**Bring the power of AI to every phone!**