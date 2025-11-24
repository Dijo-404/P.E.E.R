import { useState } from 'react';
import { Flame, Target, BookOpen, Star, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { MOCK_USER, MOCK_COURSES, MOCK_ACTIVITIES, MOCK_BADGES } from '@vidyut/shared';

export default function Dashboard() {
    const [stats] = useState({
        points: MOCK_USER.points,
        streak: MOCK_USER.streak,
        masteryScore: MOCK_USER.masteryScore,
        completedLessons: MOCK_USER.completedLessons,
    });

    return (
        <div className="fade-in">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {MOCK_USER.name.split(' ')[0]}!</h1>
                    <p className="text-gray-500 mt-2 text-lg">Ready to continue your learning journey?</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-all hover:scale-105">
                    <Star size={20} />
                    Ask AI Tutor
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-indigo-100 mb-1 font-medium">Total Points</p>
                            <h2 className="text-4xl font-bold">{stats.points}</h2>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Star size={32} className="text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl p-6 text-white shadow-lg transform transition-transform hover:scale-105">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-orange-100 mb-1 font-medium">Day Streak</p>
                            <h2 className="text-4xl font-bold">{stats.streak}</h2>
                        </div>
                        <div className="bg-white/20 p-3 rounded-xl">
                            <Flame size={32} className="text-white" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-gray-500 mb-1 font-medium">Mastery Score</p>
                            <h2 className="text-4xl font-bold text-gray-900">{stats.masteryScore}%</h2>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                            <Target size={32} className="text-green-600" />
                        </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-green-500 rounded-full transition-all duration-500"
                            style={{ width: `${stats.masteryScore}%` }}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 mb-1 font-medium">Completed</p>
                            <h2 className="text-4xl font-bold text-gray-900">{stats.completedLessons}</h2>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <BookOpen size={32} className="text-blue-600" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
                    <div className="space-y-4">
                        {MOCK_ACTIVITIES.map((activity) => (
                            <div
                                key={activity.id}
                                className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-xl ${activity.subject === 'Mathematics' ? 'bg-indigo-100 text-indigo-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {activity.subject === 'Mathematics' ? <TrendingUp size={24} /> : <BookOpen size={24} />}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{activity.title}</h4>
                                        <p className="text-sm text-gray-500">{activity.subject} • {new Date(activity.timestamp).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    {activity.progress && (
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-gray-900">{activity.progress}%</p>
                                            <p className="text-xs text-gray-500">Progress</p>
                                        </div>
                                    )}
                                    {activity.status === 'completed' ? (
                                        <CheckCircle size={24} className="text-green-500" />
                                    ) : (
                                        <Clock size={24} className="text-amber-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mt-8">Continue Learning</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MOCK_COURSES.slice(0, 2).map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                                <div className="h-32 bg-gray-200 relative">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                </div>
                                <div className="p-5">
                                    <h4 className="font-bold text-gray-900 mb-1">{course.title}</h4>
                                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">{course.description}</p>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="font-medium text-indigo-600">{course.progress}% Complete</span>
                                        <span className="text-gray-400">{course.completedLessons}/{course.totalLessons} Lessons</span>
                                    </div>
                                    <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${course.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Badges */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900">Your Badges</h3>
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                        <div className="grid grid-cols-2 gap-4">
                            {MOCK_BADGES.map((badge) => (
                                <div
                                    key={badge.id}
                                    className={`p-4 rounded-xl text-center border-2 transition-all ${badge.earnedAt
                                        ? 'border-indigo-100 bg-indigo-50/50'
                                        : 'border-gray-100 bg-gray-50 opacity-60 grayscale'
                                        }`}
                                >
                                    <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 text-2xl">
                                        {badge.icon === 'sunrise' ? '🌅' : badge.icon === 'calculator' ? '🧮' : '🔥'}
                                    </div>
                                    <h4 className="font-semibold text-gray-900 text-sm mb-1">{badge.name}</h4>
                                    <p className="text-xs text-gray-500 line-clamp-2">{badge.description}</p>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-3 px-4 bg-gray-50 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors">
                            View All Badges
                        </button>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 text-white shadow-lg">
                        <h3 className="font-bold text-lg mb-2">Daily Challenge</h3>
                        <p className="text-indigo-100 text-sm mb-4">Complete 2 math quizzes today to earn 50 bonus points!</p>
                        <div className="flex items-center justify-between mb-2 text-sm font-medium">
                            <span>Progress</span>
                            <span>1/2</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-4">
                            <div className="h-full bg-white rounded-full" style={{ width: '50%' }} />
                        </div>
                        <button className="w-full py-2 bg-white text-indigo-600 font-bold rounded-lg hover:bg-indigo-50 transition-colors">
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
