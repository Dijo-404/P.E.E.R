export default function Profile() {
    const user = {
        name: 'Student Name',
        grade: 8,
        section: 'A',
        school: 'Government High School',
        points: 450,
        credits: 120,
        streak: 5,
    };

    return (
        <div className="fade-in">
            <h1 className="mb-4">Profile</h1>

            <div className="grid grid-2 gap-3">
                <div className="card">
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '3rem',
                            margin: '0 auto 1rem',
                        }}>

                        </div>
                        <h2 style={{ margin: 0 }}>{user.name}</h2>
                        <p className="text-secondary">Class {user.grade} - Section {user.section}</p>
                    </div>

                    <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>School</label>
                            <p className="text-secondary" style={{ margin: 0 }}>{user.school}</p>
                        </div>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Language</label>
                            <select style={{ width: '100%' }}>
                                <option>English</option>
                                <option>हिंदी (Hindi)</option>
                                <option>தமிழ் (Tamil)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="card mb-3">
                        <h3 className="mb-3">Statistics</h3>
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                                <span>Total Points</span>
                                <strong style={{ color: 'var(--primary)' }}>{user.points}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Knowledge Credits</span>
                                <strong style={{ color: 'var(--secondary)' }}>{user.credits}</strong>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Current Streak</span>
                                <strong style={{ color: 'var(--warning)' }}>{user.streak} days</strong>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <h3 className="mb-3">Settings</h3>
                        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>
                            Notifications
                        </button>
                        <button className="btn btn-secondary" style={{ width: '100%', marginBottom: '0.5rem' }}>
                            Sync Devices
                        </button>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>
                            Privacy
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
