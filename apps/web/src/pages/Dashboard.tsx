import { BookOpen, Clock, Award, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const stats = [
        { label: 'Courses in Progress', value: '3', icon: <BookOpen className="text-blue-500" size={24} />, change: '+1 this week' },
        { label: 'Hours Learned', value: '12.5', icon: <Clock className="text-green-500" size={24} />, change: '+2.5 hrs' },
        { label: 'Achievements', value: '7', icon: <Award className="text-yellow-500" size={24} />, change: 'New badge!' },
        { label: 'Avg. Score', value: '85%', icon: <TrendingUp className="text-purple-500" size={24} />, change: '+5%' },
    ];

    return (
        <div className="space-y-6 animate-slide-in-right">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back, Student!</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Ready to continue your learning journey?</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700 hover:shadow-md transition-all duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-2 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                                {stat.icon}
                            </div>
                            <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recent Activity</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-xl transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                                    PHY
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Physics Chapter {i}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Completed quiz with 90% score</p>
                                </div>
                                <span className="text-xs text-gray-400">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-neutral-800 p-6 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-700">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recommended for You</h2>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 rounded-xl transition-colors cursor-pointer">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                                    AI
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium text-gray-900 dark:text-white">Intro to AI - Module {i}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Based on your interests</p>
                                </div>
                                <button className="p-2 text-primary hover:bg-primary/10 rounded-full transition-colors">
                                    <BookOpen size={20} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
