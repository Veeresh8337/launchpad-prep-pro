
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { calculateUserLevel } from "@/lib/utils";

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [profilePicture, setProfilePicture] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  
  // Load user data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio || "");
      setSkills(user.skills || []);
      setProfilePicture(user.profilePicture);
    }
  }, [user]);
  
  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Image too large",
          description: "Please upload an image smaller than 1MB.",
        });
        return;
      }
      
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      
      reader.readAsDataURL(file);
    }
  };
  
  // Add skill
  const addSkill = () => {
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      toast({
        title: "Skill already exists",
        description: "You've already added this skill.",
      });
      return;
    }
    
    setSkills([...skills, newSkill.trim()]);
    setNewSkill("");
  };
  
  // Remove skill
  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      updateUserProfile({
        name,
        bio,
        skills,
        profilePicture
      });
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!user) {
    return <div>Loading...</div>;
  }
  
  const userLevel = calculateUserLevel(user.activitiesCompleted);
  
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center">
                <div className="mb-4 relative">
                  <Avatar className="w-24 h-24 border-4 border-background">
                    <AvatarImage src={profilePicture} />
                    <AvatarFallback className="text-2xl">{name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-secondary text-secondary-foreground text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {userLevel}
                  </div>
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground mb-2">{user.email}</p>
                
                <div className="w-full pt-4 border-t border-border mt-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Level {userLevel} Student</span>
                    <span>{user.activitiesCompleted.quizzesCompleted + user.activitiesCompleted.interviewsCompleted + user.activitiesCompleted.materialsCompleted} activities</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-4">
                    {user.activitiesCompleted.quizzesCompleted} quizzes • {user.activitiesCompleted.interviewsCompleted} interviews • {user.activitiesCompleted.materialsCompleted} materials
                  </div>
                  
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <a href="/profile/card">View Digital Student Card</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="/profile/security">Security Settings</a>
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                  <a href="/profile/preferences">Preferences</a>
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Profile form */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your personal information and skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Profile Picture */}
                  <div className="space-y-2">
                    <Label htmlFor="profile-picture">Profile Picture</Label>
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={profilePicture} />
                        <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <Input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="max-w-sm"
                      />
                    </div>
                  </div>
                  
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="max-w-sm"
                    />
                  </div>
                  
                  {/* Bio */}
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell us about yourself"
                      className="resize-none"
                      rows={4}
                    />
                  </div>
                  
                  {/* Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <div className="flex gap-2 max-w-md">
                      <Input
                        id="skills"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill (e.g. JavaScript)"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill}>
                        Add
                      </Button>
                    </div>
                    
                    {/* Skills list */}
                    <div className="flex flex-wrap gap-2 mt-3">
                      {skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="pl-2">
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:bg-secondary/80 rounded-full p-0.5"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                      {skills.length === 0 && (
                        <span className="text-sm text-muted-foreground">
                          Add skills to showcase your abilities
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
