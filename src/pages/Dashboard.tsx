
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/contexts/AuthContext";
import { calculateUserLevel } from "@/lib/utils";
import { Book, Star, Bell, Trophy } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  // Calculate stats
  const userLevel = calculateUserLevel(user.activitiesCompleted);
  const totalActivities = 
    user.activitiesCompleted.quizzesCompleted + 
    user.activitiesCompleted.interviewsCompleted + 
    user.activitiesCompleted.materialsCompleted;
  
  // Progress to next level
  const nextLevelThreshold = userLevel * 5;
  const progress = (totalActivities / nextLevelThreshold) * 100;
  
  // Recent badges/achievements
  const recentAchievements = user.achievements.slice(-3);
  
  // Suggested activities
  const suggestedActivities = [
    {
      title: "Complete Your Profile",
      description: "Add your skills and upload a profile picture",
      url: "/profile",
      completed: user.skills.length > 0 && !!user.profilePicture
    },
    {
      title: "Take Your First Quiz",
      description: "Test your knowledge with an aptitude quiz",
      url: "/quizzes",
      completed: user.activitiesCompleted.quizzesCompleted > 0
    },
    {
      title: "Try a Mock Interview",
      description: "Practice your interview skills",
      url: "/interviews",
      completed: user.activitiesCompleted.interviewsCompleted > 0
    },
    {
      title: "Study Technical Material",
      description: "Learn key technical concepts",
      url: "/study?category=technical",
      completed: user.activitiesCompleted.materialsCompleted > 0
    }
  ];
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main content - 2/3 width on desktop */}
        <div className="md:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatsCard 
              title="Quizzes" 
              value={user.activitiesCompleted.quizzesCompleted}
              icon={<Star className="h-5 w-5" />}
              color="bg-blue-100 dark:bg-blue-900"
            />
            <StatsCard 
              title="Interviews" 
              value={user.activitiesCompleted.interviewsCompleted}
              icon={<Bell className="h-5 w-5" />}
              color="bg-purple-100 dark:bg-purple-900"
            />
            <StatsCard 
              title="Materials" 
              value={user.activitiesCompleted.materialsCompleted}
              icon={<Book className="h-5 w-5" />}
              color="bg-green-100 dark:bg-green-900"
            />
          </div>
          
          {/* Next activities */}
          <Card>
            <CardHeader>
              <CardTitle>Suggested Activities</CardTitle>
              <CardDescription>Here's what you can do next</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {suggestedActivities.map((activity) => (
                <div 
                  key={activity.title}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    activity.completed 
                      ? "border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-900" 
                      : "border-border"
                  }`}
                >
                  <div>
                    <div className="font-medium">
                      {activity.title}
                      {activity.completed && (
                        <span className="ml-2 text-green-600 dark:text-green-400">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.description}</div>
                  </div>
                  {!activity.completed && (
                    <Button asChild size="sm">
                      <Link to={activity.url}>Start</Link>
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
          
          {/* Digital Card Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Digital Student Card</CardTitle>
              <CardDescription>
                Your professional profile based on your activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-primary to-secondary p-0.5 rounded-xl">
                <div className="bg-card p-4 rounded-lg flex flex-col sm:flex-row gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-muted w-20 h-20 rounded-full flex items-center justify-center">
                      {user.profilePicture ? (
                        <img
                          src={user.profilePicture}
                          alt={user.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold">
                          {user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xl">{user.name}</div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Level {userLevel} Student
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {user.skills.length > 0 ? (
                        user.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Add skills to your profile
                        </span>
                      )}
                    </div>
                    <div className="flex justify-end">
                      <Button asChild size="sm" variant="outline">
                        <Link to="/profile/card">View Full Card</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar - 1/3 width on desktop */}
        <div className="space-y-6">
          {/* User level card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-2">
                  <span className="text-4xl font-bold text-primary">{userLevel}</span>
                </div>
                <h3 className="font-semibold">Level {userLevel} Student</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {userLevel + 1}</span>
                  <span>
                    {totalActivities} / {nextLevelThreshold} activities
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </CardContent>
          </Card>
          
          {/* Recent achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              {recentAchievements.length > 0 ? (
                <ul className="space-y-3">
                  {recentAchievements.map((achievement) => (
                    <li key={achievement} className="flex items-center gap-2">
                      <div className="bg-amber-100 dark:bg-amber-900/30 p-1 rounded-full">
                        <Trophy className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <span className="text-sm">{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Trophy className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  <p>Complete activities to earn achievements</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full" asChild>
                <Link to="/achievements">View All Achievements</Link>
              </Button>
            </CardFooter>
          </Card>
          
          {/* Quick links */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/quizzes">Take a Quiz</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/interviews">Practice Interview</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/study">Study Materials</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/profile">Edit Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatsCard = ({ title, value, icon, color }: StatsCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              {title}
            </div>
            <div className="text-3xl font-bold">{value}</div>
          </div>
          <div className={`p-2 rounded-full ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
