import { useNavigate } from "react-router-dom";
import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Play, Clock, CheckCircle2 } from "lucide-react";

const Courses = () => {
  const navigate = useNavigate();

  const courses = [
    {
      id: 1,
      title: "Mathematics - Class 10",
      description: "Complete curriculum for Class 10 Mathematics",
      progress: 67,
      chapters: 12,
      completed: 8,
      thumbnail: "",
    },
    {
      id: 2,
      title: "Science - Class 10",
      description: "Physics, Chemistry, and Biology for Class 10",
      progress: 45,
      chapters: 15,
      completed: 7,
      thumbnail: "",
    },
    {
      id: 3,
      title: "English Literature",
      description: "Language and literature for Class 10",
      progress: 30,
      chapters: 10,
      completed: 3,
      thumbnail: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">My Courses</h1>
          <p className="text-sm text-muted-foreground">Continue your learning journey</p>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="p-4 space-y-3 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate("/learning")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navigate("/learning");
              }
            }}
            aria-label={`Open ${course.title}`}
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{course.thumbnail}</div>
              <div className="flex-1 space-y-2">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{course.title}</h3>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.chapters} Chapters</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>{course.completed} Completed</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold text-primary">{course.progress}%</span>
                  </div>
                  <div
                    className="w-full bg-secondary rounded-full h-2"
                    role="progressbar"
                    aria-valuenow={course.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <Button
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/learning");
                  }}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Continue Learning
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Courses;

