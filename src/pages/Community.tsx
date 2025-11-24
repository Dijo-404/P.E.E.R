import { BottomNav } from "@/components/BottomNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Heart, Share2, Send, Users, Trophy } from "lucide-react";
import { useState } from "react";

const Community = () => {
  const [newPost, setNewPost] = useState("");

  const posts = [
    {
      id: 1,
      author: "Rahul K.",
      time: "2h ago",
      content: "Just completed Chapter 4 on Quadratic Equations! Anyone else finding the factorization method tricky?",
      likes: 24,
      comments: 8,
      avatar: "",
    },
    {
      id: 2,
      author: "Priya M.",
      time: "5h ago",
      content: "Thanks to EduBridge's offline mode, I can study even during power cuts! 📚✨",
      likes: 42,
      comments: 12,
      avatar: "",
    },
    {
      id: 3,
      author: "Amit S.",
      time: "1d ago",
      content: "7-day streak achieved! The daily reminders are really helping me stay consistent.",
      likes: 18,
      comments: 5,
      avatar: "",
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="bg-card border-b border-border p-4 sticky top-0 z-40">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Community</h1>
            <p className="text-sm text-muted-foreground">Connect with fellow learners</p>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Users className="h-5 w-5" />
            <span className="text-sm">1.2k</span>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-4">
        {/* Create Post */}
        <Card className="p-4 space-y-3">
          <h2 className="font-semibold text-foreground">Share something</h2>
          <div className="flex space-x-2">
            <Input
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              className="flex-1"
              aria-label="Write a post"
            />
            <Button
              size="icon"
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
              disabled={!newPost.trim()}
              aria-label="Post"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Card>

        {/* Leaderboard Preview */}
        <Card className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Weekly Leaderboard</h3>
            </div>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="mt-3 space-y-2">
            {[
              { rank: 1, name: "Priya M.", points: 1240 },
              { rank: 2, name: "Rahul K.", points: 1180 },
              { rank: 3, name: "Amit S.", points: 1095 },
            ].map((entry) => (
              <div key={entry.rank} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-accent">#{entry.rank}</span>
                  <span className="text-foreground">{entry.name}</span>
                </div>
                <span className="text-muted-foreground">{entry.points} pts</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-4">
          <h2 className="font-semibold text-foreground">Recent Posts</h2>
          {posts.map((post) => (
            <Card key={post.id} className="p-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-2xl">{post.avatar}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-foreground">{post.author}</span>
                    <span className="text-xs text-muted-foreground">• {post.time}</span>
                  </div>
                  <p className="text-foreground">{post.content}</p>
                  <div className="flex items-center space-x-4 pt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-muted-foreground hover:text-foreground"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-muted-foreground hover:text-foreground"
                    >
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Community;

