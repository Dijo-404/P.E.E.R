import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
    const [stats, setStats] = useState({
        points: 450,
        streak: 5,
        masteryScore: 72,
        completedLessons: 12,
    });

    const [recentActivity, setRecentActivity] = useState([
        { id: '1', title: 'Algebra Basics', subject: 'math', progress: 100, grade: 'A' },
        { id: '2', title: 'Plant Cell Structure', subject: 'science', progress: 75, grade: 'B+' },
        { id: '3', title: 'Fractions', subject: 'math', progress: 60, grade: 'B' },
    ]);

    const [badges, setBadges] = useState([
        { id: '1', name: 'First Steps', icon: '', earned: true },
        { id: '2', name: 'Week Warrior', icon: '', earned: true },
        { id: '3', name: 'Math Master', icon: '', earned: false },
        { id: '4', name: 'Helpful Friend', icon: '', earned: false },
    ]);

    return (
        <div className="fade-in">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1>Welcome back, Student!</h1>
                    <p className="text-secondary mt-1">Ready to continue your learning journey?</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-2 mb-4">
                <div className="card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Total Points</p>
                            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stats.points}</h2>
                        </div>
                        <span style={{ fontSize: '3rem' }}></span>
                    </div>
                </div>

                <div className="card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white' }}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p style={{ opacity: 0.9, marginBottom: '0.5rem' }}>Current Streak</p>
                            <h2 style={{ fontSize: '2.5rem', margin: 0 }}>{stats.streak} days</h2>
                        </div>
                        <span style={{ fontSize: '3rem' }}></span>
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-secondary mb-1">Mastery Score</p>
                            <h2 style={{ color: 'var(--primary)', margin: 0 }}>{stats.masteryScore}%</h2>
                        </div>
                        <span style={{ fontSize: '3rem' }}></span>
                    </div>
                    <div style={{ marginTop: '1rem', height: '8px', backgroundColor: 'var(--background)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${stats.masteryScore}%`, height: '100%', backgroundColor: 'var(--primary)', transition: 'width 0.3s ease' }} />
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-secondary mb-1">Completed Lessons</p>
                            <h2 style={{ color: 'var(--secondary)', margin: 0 }}>{stats.completedLessons}</h2>
                        </div>
                        <span style={{ fontSize: '3rem' }}></span>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card mb-4">
                <h3 className="mb-3">Recent Activity</h3>
                <div className="flex flex-col gap-2">
                    {recentActivity.map((activity) => (
                        <Link
                            key={activity.id}
                            to={`/learn/${activity.id}`}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: 'var(--background)',
                                textDecoration: 'none',
                                color: 'inherit',
                                transition: 'all 0.2s ease',
                                display: 'block',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#E0E7FF';
                                e.currentTarget.style.transform = 'translateX(4px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--background)';
                                e.currentTarget.style.transform = 'translateX(0)';
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span style={{ fontSize: '1.5rem' }}>
                                        {activity.subject === 'math' ? '' : ''}
                                    </span>
                                    <div>
                                        <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{activity.title}</h4>
                                        <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>
                                            {activity.subject.charAt(0).toUpperCase() + activity.subject.slice(1)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div style={{ textAlign: 'right' }}>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', margin: 0 }}>
                                            {activity.progress}% complete
                                        </p>
                                        <p style={{ fontWeight: 600, color: 'var(--primary)', margin: 0 }}>
                                            Grade: {activity.grade}
                                        </p>
                                    </div>
                                    <span style={{ fontSize: '1.5rem' }}></span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div className="card">
                <h3 className="mb-3">Badges</h3>
                <div className="grid grid-3">
                    {badges.map((badge) => (
                        <div
                            key={badge.id}
                            className="card"
                            style={{
                                textAlign: 'center',
                                opacity: badge.earned ? 1 : 0.5,
                                border: badge.earned ? '2px solid var(--primary)' : '2px solid var(--border)',
                            }}
                        >
                            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>
                                {badge.icon}
                            </span>
                            <h4 style={{ fontSize: '1rem', margin: 0 }}>{badge.name}</h4>
                            {badge.earned && (
                                <p style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '0.25rem' }}>
                                    ✓ Earned
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
