import { useState } from 'react';

export default function Chat() {
    const [conversations, setConversations] = useState([
        { id: '1', name: 'Rahul Kumar', lastMessage: 'Can you help with algebra?', unread: 2, online: true },
        { id: '2', name: 'Priya Sharma', lastMessage: 'Thanks for the explanation!', unread: 0, online: false },
        { id: '3', name: 'Amit Patel', lastMessage: 'Let\'s study together', unread: 1, online: true },
    ]);

    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [messages, setMessages] = useState([
        { id: '1', from: 'Rahul Kumar', content: 'Can you help with algebra?', time: '10:30 AM' },
        { id: '2', from: 'me', content: 'Sure! What do you need help with?', time: '10:32 AM' },
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, {
            id: Date.now().toString(),
            from: 'me',
            content: input,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }]);
        setInput('');
    };

    return (
        <div className="fade-in">
            <h1 className="mb-3">Peer Chat & Tutoring 💬</h1>
            <p className="text-secondary mb-4">Connect with classmates and help each other learn</p>

            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '1.5rem', height: '600px' }}>
                {/* Conversations List */}
                <div className="card" style={{ overflowY: 'auto' }}>
                    <h3 className="mb-3">Conversations</h3>
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            onClick={() => setSelectedChat(conv)}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: selectedChat.id === conv.id ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                                cursor: 'pointer',
                                marginBottom: '0.5rem',
                                transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                                if (selectedChat.id !== conv.id) {
                                    e.currentTarget.style.backgroundColor = 'var(--background)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (selectedChat.id !== conv.id) {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span style={{ fontSize: '1.5rem' }}>👤</span>
                                    <h4 style={{ margin: 0, fontSize: '1rem' }}>{conv.name}</h4>
                                    {conv.online && (
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--success)' }} />
                                    )}
                                </div>
                                {conv.unread > 0 && (
                                    <span style={{
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        borderRadius: '50%',
                                        width: '20px',
                                        height: '20px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                    }}>
                                        {conv.unread}
                                    </span>
                                )}
                            </div>
                            <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>
                                {conv.lastMessage}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Chat Window */}
                <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1rem', marginBottom: '1rem' }}>
                        <div className="flex items-center gap-2">
                            <span style={{ fontSize: '2rem' }}>👤</span>
                            <div>
                                <h3 style={{ margin: 0 }}>{selectedChat.name}</h3>
                                <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>
                                    {selectedChat.online ? '🟢 Online' : '⚫ Offline'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    marginBottom: '1rem',
                                    display: 'flex',
                                    justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start',
                                }}
                            >
                                <div style={{ maxWidth: '70%' }}>
                                    {msg.from !== 'me' && (
                                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
                                            {msg.from}
                                        </p>
                                    )}
                                    <div
                                        style={{
                                            padding: '0.75rem 1rem',
                                            borderRadius: '1rem',
                                            backgroundColor: msg.from === 'me' ? 'var(--primary)' : 'var(--background)',
                                            color: msg.from === 'me' ? 'white' : 'var(--text-primary)',
                                        }}
                                    >
                                        {msg.content}
                                    </div>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                                        {msg.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type a message..."
                            style={{ flex: 1 }}
                        />
                        <button className="btn btn-primary" onClick={handleSend}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
