async function translateText() {//It takes the text the user typed, sent to your translation server(backend),
    //and shows both the original message and the translated message like a chat conversation.
    const inputText = document.getElementById('textToTranslate').value.trim();
    const language = document.querySelector('input[name="language"]:checked').value;
    const chatContainer = document.getElementById('chatContainer');

    if (!inputText) {
        const warning = document.createElement("div");
        warning.className = "bot-message";
        warning.innerText = '⚠️ Please enter some text to translate.';
        chatContainer.appendChild(warning);
        chatContainer.scrollTop = chatContainer.scrollHeight;
        return;
    }

    // Show user's message in the chat
    const userMsg = document.createElement('div');
    userMsg.className = 'user-message';
    userMsg.innerText = inputText;
    chatContainer.appendChild(userMsg);

    // Clear the textarea
    document.getElementById('textToTranslate').value = "";

    const languageMap = {
        french: 'French',
        spanish: 'Spanish',
        japanese: 'Japanese'
    };
    const targetLanguage = languageMap[language];

    // Show temporary "Translating..." message
    const botMsg = document.createElement('div');
    botMsg.className = 'bot-message';
    botMsg.innerText = 'Translating...';
    chatContainer.appendChild(botMsg);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
        const response = await fetch('http://localhost:5000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                targetLanguage: targetLanguage
            })
        });

        const data = await response.json();

        if (data.translation) {
            botMsg.innerText = data.translation;
        } else {
            botMsg.innerText = '❌ Failed to get a translation.';
        }
    } catch (error) {
        console.error('Error:', error);
        botMsg.innerText = '🚨 Error occurred while translating.';
    }

    chatContainer.scrollTop = chatContainer.scrollHeight;
}

/**async function translateText() {
    const inputText = document.getElementById('textToTranslate').value;
    const language = document.querySelector('input[name="language"]:checked').value;
    const output = document.getElementById('outputText');

    if (!inputText) {
        output.innerText = 'Please enter some text to translate.';
        return;
    }

    const languageMap = {
        french: 'French',
        spanish: 'Spanish',
        japanese: 'Japanese'
    };

    const targetLanguage = languageMap[language];

    output.innerText = 'Translating...';

    try {
        const response = await fetch('http://localhost:5000/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: inputText,
                targetLanguage: targetLanguage
            })
        });

        const data = await response.json();

        if (data.translation) {
            output.innerText = data.translation;
        } else {
            output.innerText = 'Failed to get a translation.';
        }
    } catch (error) {
        console.error('Error:', error);
        output.innerText = 'Error occurred while translating.';
    }
}**/
