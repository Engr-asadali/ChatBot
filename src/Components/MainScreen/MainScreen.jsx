import { useState, useRef, useEffect } from "react";
import styles from "./MainScreen.module.css";
import sendBtn from "/src/assets/send.svg";
import botIcon from "/src/assets/chatBotLogo.png";
import userIcon from "/src/assets/userIcon.png";

const MainScreen = () => {
    let msgEnd = useRef(null);
    let [input, setInput] = useState("");
    let [messages, setMessages] = useState([
        { text: "Hi, I am a ChatBot", isBot: true },
    ]);

    useEffect(() => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput("");
        const userMessage = { text, isBot: false };
        setMessages([...messages, userMessage]);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: text }),
            });
            const data = await response.json();
            const botMessage = { text: data.response, isBot: true };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error("Error:", error);
            setMessages((prevMessages) => [...prevMessages, {text:"Error getting response", isBot:true}]);
        }
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className={styles.main}>
            <div className={styles.chats}>
                {messages.map((message, i) => (
                    <div key={i} className={message.isBot ? `${styles.chat} ${styles.bot}` : `${styles.chat}`}>
                        <img className={styles.chatImg} src={message.isBot ? botIcon : userIcon} alt="Bot Icon" />
                        <p className={styles.txt}>{message.text}</p>
                    </div>
                ))}
                <div ref={msgEnd} />
            </div>

            <div className={styles.chatFooter}>
                <div className={styles.inp}>
                    <input type="text" placeholder="send a message" value={input} onKeyDown={handleEnter} onChange={(e) => { setInput(e.target.value) }} />
                    <button onClick={handleSend} className={styles.send} ><img src={sendBtn} alt="send button" /></button>
                </div>
                <p>ChatBot can make mistakes. Check important info.</p>
            </div>
        </div>
    );
};

export default MainScreen;