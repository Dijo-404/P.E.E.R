export default function TeacherDashboard() {
    const classData = {
        grade: 8,
        section: 'A',
        totalStudents: 35,
        activeStudents: 28,
        avgMastery: 68,
    };

    const topPerformers = [
        { name: 'Rahul Kumar', points: 850, mastery: 92 },
        { name: 'Priya Sharma', points: 780, mastery: 88 },
        { name: 'Amit Patel', points: 720, mastery: 85 },
    ];

    const needsAttention = [
        { name: 'Student A', points: 120, mastery: 45 },
        { name: 'Student B', points: 95, mastery: 38 },
    ];

    return (
        <div className="fade-in">
            <h1 className="mb-3">Teacher Dashboard 👨‍🏫</h1>
            <p className="text-secondary mb-4">Class {classData.grade} - Section {classData.section}</p>

            <div className="grid grid-3 mb-4">
                <div className="card">
                    <p className="text-secondary mb-1">Total Students</p>
                    <h2 style={{ color: 'var(--primary)', margin: 0 }}>{classData.totalStudents}</h2>
                </div>
                <div className="card">
                    <p className="text-secondary mb-1">Active (7 days)</p>
                    <h2 style={{ color: 'var(--secondary)', margin: 0 }}>{classData.activeStudents}</h2>
                </div>
                <div className="card">
                    <p className="text-secondary mb-1">Avg Mastery</p>
                    <h2 style={{ color: 'var(--warning)', margin: 0 }}>{classData.avgMastery}%</h2>
                </div>
            </div>

            <div className="grid grid-2 gap-3">
                <div className="card">
                    <h3 className="mb-3">🏆 Top Performers</h3>
                    {topPerformers.map((student, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: 'var(--background)',
                                marginBottom: '0.5rem',
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{student.name}</h4>
                                    <p className="text-secondary" style={{ fontSize: '0.875rem', margin: 0 }}>
                                        {student.points} points • {student.mastery}% mastery
                                    </p>
                                </div>
                                <span style={{ fontSize: '2rem' }}>
                                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="card">
                    <h3 className="mb-3">⚠️ Needs Attention</h3>
                    {needsAttention.map((student, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '1rem',
                                borderRadius: '0.75rem',
                                backgroundColor: '#FEE2E2',
                                marginBottom: '0.5rem',
                            }}
                        >
                            <h4 style={{ margin: 0, marginBottom: '0.25rem' }}>{student.name}</h4>
                            <p style={{ fontSize: '0.875rem', color: '#991B1B', margin: 0 }}>
                                {student.points} points • {student.mastery}% mastery
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card mt-4">
                <h3 className="mb-3">📊 Mastery Heatmap</h3>
                <p className="text-secondary">Visual representation of class performance across topics</p>
                <div style={{
                    marginTop: '1rem',
                    padding: '2rem',
                    backgroundColor: 'var(--background)',
                    borderRadius: '0.75rem',
                    textAlign: 'center',
                }}>
                    <p className="text-secondary">Heatmap visualization would go here</p>
                    <p className="text-secondary" style={{ fontSize: '0.875rem' }}>
                        (Requires chart library like recharts)
                    </p>
                </div>
            </div>
        </div>
    );
}
