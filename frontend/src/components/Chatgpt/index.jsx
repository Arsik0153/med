import { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
    ConversationHeader,
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
    TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import './styles.css';
import chatbotImg from '@assets/auth/chatbot.png';

const API_KEY = import.meta.env.VITE_OPENAI;

const systemMessage = {
    role: 'system',
    content: `Explain things like you would
be a professional doctor with hight expertise.`,
};

function Chatbot() {
    const [messages, setMessages] = useState([
        {
            message: "Hello, I'm your helper bot. Ask me anything!",
            sentTime: 'just now',
            sender: 'ChatGPT',
            direction: 'incoming',
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSend = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: 'user',
        };

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);

        setIsTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = '';
            if (messageObject.sender === 'ChatGPT') {
                role = 'assistant';
            } else {
                role = 'user';
            }
            return {
                role: role,
                content: messageObject.message.concat(
                    ' .Answer only if it is related to medical field, otherwise strictly do not answer if related to dance,music and culture.'
                ),
            };
        });

        const apiRequestBody = {
            model: 'gpt-3.5-turbo',
            messages: [
                systemMessage, // The system message DEFINES the logic of our chatGPT
                ...apiMessages, // The messages from our chat with ChatGPT
            ],
        };

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + API_KEY,
                // "Organization": "",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setMessages([
                    ...chatMessages,
                    {
                        message: data.choices[0].message.content,
                        sender: 'ChatGPT',
                        direction: 'incoming',
                    },
                ]);
                setIsTyping(false);
            });
    }

    if (!open) {
        return (
            <div
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                    zIndex: 10,
                }}
            >
                <button
                    className="chatbot-container"
                    onClick={() => setOpen(true)}
                >
                    <img src={chatbotImg} alt="" />
                </button>
            </div>
        );
    }

    return (
        <div className="chatgpt-container">
            <div className="chatgpt-inner">
                <MainContainer responsive>
                    <ChatContainer>
                        <ConversationHeader>
                            <ConversationHeader.Content>
                                <span
                                    style={{
                                        color: '#fff',
                                        position: 'relative',
                                        fontWeight: 600,
                                        textAlign: 'center',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    <span>Assistent bot</span>
                                    <div
                                        style={{
                                            cursor: 'pointer',
                                            position: 'absolute',
                                            right: 10,
                                            top: 0,
                                        }}
                                        onClick={() => setOpen(false)}
                                    >
                                        &#x2715;
                                    </div>
                                </span>
                            </ConversationHeader.Content>
                        </ConversationHeader>
                        <MessageList
                            scrollBehavior="smooth"
                            typingIndicator={
                                isTyping ? (
                                    <TypingIndicator content="Chatbot is typing" />
                                ) : null
                            }
                        >
                            {messages.map((message, i) => {
                                console.log(message);
                                return (
                                    <Message key={i} model={message}>
                                        {/* {message.sender === "ChatGPT" ? <Avatar src={botImage} name="Eliot" /> : <Avatar src={boyImage} name="user" size="sm" />} */}
                                    </Message>
                                );
                            })}
                        </MessageList>
                        <MessageInput
                            attachButton={false}
                            placeholder="Type query here"
                            onSend={handleSend}
                        />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatbot;
