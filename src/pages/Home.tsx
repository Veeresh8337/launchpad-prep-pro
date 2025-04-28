
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Home = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Prepare for Your Dream Job with <span className="text-primary">LaunchPad</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Interactive quizzes, mock interviews, study materials, and personalized digital student cards to help you ace your next job interview.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="rounded-full">
                  <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button asChild variant="outline" size="lg" className="rounded-full">
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <div className="glass-card rounded-2xl p-8 shadow-xl hover-scale">
                <div className="aspect-video bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold text-2xl">
                  Interactive Learning Platform
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Study Material Library"
              description="Access comprehensive study materials for technical, aptitude, and communication skills."
              icon="📚"
            />
            <FeatureCard
              title="Interactive Quizzes"
              description="Test your knowledge with timed quizzes and get instant feedback on your performance."
              icon="🧠"
            />
            <FeatureCard
              title="Mock Interviews"
              description="Practice with realistic interview questions and improve your interview skills."
              icon="💬"
            />
            <FeatureCard
              title="Digital Student Card"
              description="Generate a professional digital card highlighting your skills and achievements."
              icon="🪪"
            />
            <FeatureCard
              title="Performance Tracking"
              description="Monitor your progress with detailed analytics and performance charts."
              icon="📊"
            />
            <FeatureCard
              title="Achievement Badges"
              description="Earn badges as you complete activities and reach milestones."
              icon="🏆"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Ready to Launch Your Career?</h2>
            <p className="text-muted-foreground text-lg">
              Join LaunchPad today and take the first step towards your dream job.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                {isAuthenticated ? "Go to Dashboard" : "Get Started For Free"}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
  return (
    <div className="bg-background rounded-xl p-6 shadow-md border border-border hover-scale">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Home;
