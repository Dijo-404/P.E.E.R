import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Layout() {
    const location = useLocation();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: '📊' },
        { path: '/learn', label: 'Learn', icon: '📚' },
        { path: '/chat', label: 'Chat', icon: '💬' },
        { path: '/profile', label: 'Profile', icon: '👤' },
    ];

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Header */}
            <header style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '1rem 0',
                position: 'sticky',
                top: 0,
                zIndex: 100,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
                <div className="container flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span style={{ fontSize: '2rem' }}>⚡</span>
                        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Vidyut Bandhu</h1>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Online/Offline indicator */}
                        <div className="flex items-center gap-1" style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '2rem',
                            backgroundColor: isOnline ? '#DCFCE7' : '#FEE2E2',
                            color: isOnline ? '#166534' : '#991B1B',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                        }}>
                            <span>{isOnline ? '🟢' : '🔴'}</span>
                            <span>{isOnline ? 'Online' : 'Offline'}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav style={{
                backgroundColor: 'var(--surface)',
                borderBottom: '1px solid var(--border)',
                padding: '0.5rem 0',
            }}>
                <div className="container">
                    <div className="flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    textDecoration: 'none',
                                    color: location.pathname.startsWith(item.path)
                                        ? 'var(--primary)'
                                        : 'var(--text-secondary)',
                                    backgroundColor: location.pathname.startsWith(item.path)
                                        ? 'rgba(79, 70, 229, 0.1)'
                                        : 'transparent',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                }}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main content */}
            <main style={{ flex: 1, padding: '2rem 0' }}>
                <div className="container">
                    <Outlet />
                </div>
            </main>

            {/* Footer */}
            <footer style={{
                backgroundColor: 'var(--surface)',
                borderTop: '1px solid var(--border)',
                padding: '1.5rem 0',
                marginTop: 'auto',
            }}>
                <div className="container text-center text-secondary">
                    <p>© 2024 Vidyut Bandhu - Empowering Rural Education</p>
                    <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                        Offline-first AI Learning Platform
                    </p>
                </div>
            </footer>
        </div>
    );
}
