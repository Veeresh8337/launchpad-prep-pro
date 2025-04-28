
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { studyMaterials, StudyMaterial } from "@/data/studyMaterials";

const StudyMaterials = () => {
  const { user, updateActivities } = useAuth();
  const { toast } = useToast();
  
  const [completedMaterials, setCompletedMaterials] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [activeCategory, setActiveCategory] = useState<"all" | "technical" | "aptitude" | "communication">("all");
  
  useEffect(() => {
    // Load completed materials from localStorage
    const savedCompletedMaterials = localStorage.getItem("launchpad_completed_materials");
    if (savedCompletedMaterials) {
      setCompletedMaterials(JSON.parse(savedCompletedMaterials));
    }
  }, []);
  
  // Filter materials based on search, category, difficulty, and completion status
  const getFilteredMaterials = (showCompleted: boolean) => {
    return studyMaterials.filter((material) => {
      // Filter by search term
      const matchesSearch =
        material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      // Filter by category
      const matchesCategory = activeCategory === "all" || material.category === activeCategory;
      
      // Filter by difficulty
      const matchesDifficulty = selectedDifficulty === "all" || material.difficulty === selectedDifficulty;
      
      // Filter by completion status
      const matchesCompletion = showCompleted === completedMaterials.includes(material.id);
      
      return matchesSearch && matchesCategory && matchesDifficulty && matchesCompletion;
    });
  };
  
  const pendingMaterials = getFilteredMaterials(false);
  const completedMaterialsList = getFilteredMaterials(true);
  
  const toggleMaterialCompletion = (materialId: string) => {
    let updatedCompletedMaterials: string[];
    
    if (completedMaterials.includes(materialId)) {
      // Remove from completed
      updatedCompletedMaterials = completedMaterials.filter((id) => id !== materialId);
      toast({
        title: "Material marked as not completed",
        description: "You can always mark it as completed later.",
      });
    } else {
      // Add to completed
      updatedCompletedMaterials = [...completedMaterials, materialId];
      updateActivities("material");
      toast({
        title: "Material completed!",
        description: "Great job! Keep up the good work.",
      });
    }
    
    setCompletedMaterials(updatedCompletedMaterials);
    localStorage.setItem("launchpad_completed_materials", JSON.stringify(updatedCompletedMaterials));
  };
  
  const totalCompleted = completedMaterials.length;
  const totalMaterials = studyMaterials.length;
  const completionPercentage = Math.round((totalCompleted / totalMaterials) * 100);
  
  return (
    <div className="container py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Study Materials</h1>
          <p className="text-muted-foreground">
            Explore materials to enhance your skills
          </p>
        </div>
        
        <div className="bg-muted/50 p-2 rounded-lg flex items-center gap-2">
          <div className="text-sm font-medium">
            Progress: {totalCompleted}/{totalMaterials} ({completionPercentage}%)
          </div>
          <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Search and filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search by title, description, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="sm:max-w-sm"
          />
          
          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Category tabs */}
      <Tabs defaultValue="all" value={activeCategory} onValueChange={(value) => setActiveCategory(value as any)}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {/* All categories content */}
          <div className="grid gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">To Study ({pendingMaterials.length})</h2>
              
              {pendingMaterials.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pendingMaterials.map((material) => (
                    <StudyMaterialCard
                      key={material.id}
                      material={material}
                      isCompleted={false}
                      onToggleCompletion={toggleMaterialCompletion}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No pending materials match your filters.</p>
              )}
            </div>
            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Completed ({completedMaterialsList.length})</h2>
              
              {completedMaterialsList.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {completedMaterialsList.map((material) => (
                    <StudyMaterialCard
                      key={material.id}
                      material={material}
                      isCompleted={true}
                      onToggleCompletion={toggleMaterialCompletion}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No completed materials match your filters.</p>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="technical" className="mt-0">
          {/* Technical materials content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Technical Materials</h2>
              {pendingMaterials.length > 0 || completedMaterialsList.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...pendingMaterials, ...completedMaterialsList].map((material) => (
                    <StudyMaterialCard
                      key={material.id}
                      material={material}
                      isCompleted={completedMaterials.includes(material.id)}
                      onToggleCompletion={toggleMaterialCompletion}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No technical materials match your filters.</p>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="aptitude" className="mt-0">
          {/* Aptitude materials content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Aptitude Materials</h2>
              {pendingMaterials.length > 0 || completedMaterialsList.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...pendingMaterials, ...completedMaterialsList].map((material) => (
                    <StudyMaterialCard
                      key={material.id}
                      material={material}
                      isCompleted={completedMaterials.includes(material.id)}
                      onToggleCompletion={toggleMaterialCompletion}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No aptitude materials match your filters.</p>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="communication" className="mt-0">
          {/* Communication materials content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Communication Materials</h2>
              {pendingMaterials.length > 0 || completedMaterialsList.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...pendingMaterials, ...completedMaterialsList].map((material) => (
                    <StudyMaterialCard
                      key={material.id}
                      material={material}
                      isCompleted={completedMaterials.includes(material.id)}
                      onToggleCompletion={toggleMaterialCompletion}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No communication materials match your filters.</p>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface StudyMaterialCardProps {
  material: StudyMaterial;
  isCompleted: boolean;
  onToggleCompletion: (id: string) => void;
}

const StudyMaterialCard = ({ material, isCompleted, onToggleCompletion }: StudyMaterialCardProps) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "technical":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "aptitude":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "communication":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  return (
    <Card className={`hover-scale ${isCompleted ? "bg-muted/30" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className={`${getCategoryColor(material.category)}`}>
            {material.category.charAt(0).toUpperCase() + material.category.slice(1)}
          </Badge>
          <Badge variant="outline" className={`${getDifficultyColor(material.difficulty)}`}>
            {material.difficulty.charAt(0).toUpperCase() + material.difficulty.slice(1)}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-1">{material.title}</CardTitle>
        <CardDescription className="line-clamp-2">{material.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{material.estimatedTime} min</span>
          <span>•</span>
          <span>Added {new Date(material.dateAdded).toLocaleDateString()}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant={isCompleted ? "outline" : "default"}
          size="sm"
          onClick={() => onToggleCompletion(material.id)}
        >
          {isCompleted ? "Mark Incomplete" : "Mark Complete"}
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/study/${material.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StudyMaterials;
