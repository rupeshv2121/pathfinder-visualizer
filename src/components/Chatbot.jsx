import { GoogleGenerativeAI } from "@google/generative-ai";
import { AnimatePresence, motion } from 'framer-motion';


import { useEffect, useRef, useState } from 'react';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;;
    const genAI = new GoogleGenerativeAI(API_KEY);

    // Initialize with welcome message
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 1,
                    text: "Hello! I'm your pathfinding algorithm assistant. I can help you understand BFS, the algorithm implementation, and how the visualizer works. Ask me anything!",
                    isBot: true,
                    timestamp: new Date()
                }
            ]);
        }
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const processInput = async (input) => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent(input);
            return result.response.text();
        } catch (error) {
            console.error(error);
            return "⚠️ Error: Unable to fetch response from Gemini AI.";
        }
    };


    // Handle message submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(async () => {
            const botResponse = await processInput(inputValue);

            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    // Handle quick question selection
    const handleQuickQuestion = async (question) => {
        const userMessage = {
            id: Date.now(),
            text: question,
            isBot: false,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        setTimeout(async () => {
            const botResponse = await processInput(question);

            const botMessage = {
                id: Date.now() + 1,
                text: botResponse,
                isBot: true,
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Chatbot Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg z-50 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                )}
            </motion.button>

            {/* Chatbot Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
                            <h3 className="text-lg font-semibold">Pathfinding Algorithm Assistant</h3>
                            <p className="text-sm opacity-90">Ask me about BFS, algorithms, and visualization!</p>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-lg ${message.isBot
                                            ? 'bg-gray-100 text-gray-800'
                                            : 'bg-blue-600 text-white'
                                            }`}
                                    >
                                        <div className="whitespace-pre-line text-sm">{message.text}</div>
                                        <div className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                                            {message.timestamp.toLocaleTimeString()}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex justify-start"
                                >
                                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Form */}
                        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
                            <div className="flex space-x-2">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about the algorithm..."
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;
