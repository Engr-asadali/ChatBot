import styles from "./SideBar.module.css";
import chatBot from "/src/assets/chatBot.png";
import AddBtn from "/src/assets/add-30.png";
import MsgIcon from "/src/assets/message.svg";
import Home from "/src/assets/home.svg";
import Saved from "/src/assets/bookmark.svg";
import Rocket from "/src/assets/rocket.svg";
import { useState } from "react";

const SideBar = () => {
    let [messages, setMessages] = useState([
        {
            text: "Hi, I am a ChatBot",
            isBot: true,
        },
    ]);

    let handleQuery = async (e) => {
        const text = e.target.value;
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

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_upper}>
                <div className={styles.sidebar_upperTop}>
                    <img src={chatBot} alt="Logo" className={styles.logo} />
                    <span className={styles.heading}>ChatBot</span>
                </div>
                <button className={styles.chatbtn} onClick={() => { window.location.reload() }}>
                    <img src={AddBtn} alt="New Chat" className={styles.addchatbtn} />New Chat
                </button>

                <div className={styles.sidebar_upperButtom}>
                    <button className={styles.querybtn} onClick={handleQuery} value={"What is Programming?"}>
                        <img src={MsgIcon} alt="Query" className={styles.queryimg} />What is Programming?
                    </button>
                    <button className={styles.querybtn} onClick={handleQuery} value={"How to use an API?"}>
                        <img src={MsgIcon} alt="Query" className={styles.queryimg} />How to use an API?
                    </button>
                </div>
            </div>

            <div className={styles.sidebar_lower}>
                <div className={styles.listitems}>
                    <img src={Home} alt="Home Logo" className={styles.listitemsImg} />Home</div>
                <div className={styles.listitems}>
                    <img src={Saved} alt="Saved Logo" className={styles.listitemsImg} />Saved</div>
                <div className={styles.listitems}>
                    <img src={Rocket} alt="Pro Logo" className={styles.listitemsImg} />Upgrade to pro</div>
            </div>
        </div>
    );
};

export default SideBar;