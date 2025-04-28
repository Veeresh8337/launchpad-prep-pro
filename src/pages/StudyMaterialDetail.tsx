
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { studyMaterials, StudyMaterial } from "@/data/studyMaterials";
import { ChevronLeft, Clock, Calendar } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

// Simple markdown formatter component
const MarkdownRenderer = ({ content }: { content: string }) => {
  const formatMarkdown = (text: string) => {
    // Format headers
    let formatted = text.replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold my-4">$1</h1>');
    formatted = formatted.replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold my-3">$1</h2>');
    formatted = formatted.replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold my-2">$1</h3>');
    
    // Format code blocks
    formatted = formatted.replace(/```([\s\S]*?)```/g, '<pre class="bg-muted p-4 rounded-md overflow-x-auto my-4"><code>$1</code></pre>');
    
    // Format lists
    formatted = formatted.replace(/^\- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>');
    formatted = formatted.replace(/^(\d+)\. (.*$)/gm, '<li class="ml-6 list-decimal">$2</li>');
    
    // Format bold text
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Format italics
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert newlines to <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    return formatted;
  };
  
  return (
    <div 
      className="markdown-content prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(content) }}
    />
  );
};

const StudyMaterialDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { updateActivities } = useAuth();
  
  const [material, setMaterial] = useState<StudyMaterial | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [readingTime, setReadingTime] = useState(0);
  
  useEffect(() => {
    // Find the material by ID
    const foundMaterial = studyMaterials.find((m) => m.id === id);
    
    if (foundMaterial) {
      setMaterial(foundMaterial);
      
      // Check if this material is already marked as completed
      const completedMaterials = JSON.parse(localStorage.getItem("launchpad_completed_materials") || "[]");
      setIsCompleted(completedMaterials.includes(foundMaterial.id));
      
      // Start timer for reading time tracking
      const startTime = Date.now();
      
      return () => {
        // Calculate reading time when component unmounts
        const endTime = Date.now();
        const timeSpentMs = endTime - startTime;
        const timeSpentMin = Math.round(timeSpentMs / 60000); // Convert ms to minutes
        
        if (timeSpentMin >= 1) {
          setReadingTime(timeSpentMin);
          
          // Save reading time to localStorage
          const readingTimes = JSON.parse(localStorage.getItem("launchpad_reading_times") || "{}");
          readingTimes[foundMaterial.id] = (readingTimes[foundMaterial.id] || 0) + timeSpentMin;
          localStorage.setItem("launchpad_reading_times", JSON.stringify(readingTimes));
          
          // Show toast if spent significant time reading
          if (timeSpentMin >= 3 && !completedMaterials.includes(foundMaterial.id)) {
            toast({
              title: "Learning progress tracked!",
              description: `You spent ${timeSpentMin} minutes reading this material.`,
            });
          }
        }
      };
    } else {
      // Material not found, redirect to study list
      navigate("/study");
      toast({
        variant: "destructive",
        title: "Material not found",
        description: "The requested study material could not be found.",
      });
    }
  }, [id, navigate, toast]);
  
  const handleToggleCompletion = () => {
    if (!material) return;
    
    const completedMaterials = JSON.parse(localStorage.getItem("launchpad_completed_materials") || "[]");
    let updatedCompletedMaterials: string[];
    
    if (isCompleted) {
      // Remove from completed
      updatedCompletedMaterials = completedMaterials.filter((mId: string) => mId !== material.id);
      setIsCompleted(false);
      toast({
        title: "Material marked as incomplete",
        description: "You can mark it as complete when you're ready.",
      });
    } else {
      // Add to completed
      updatedCompletedMaterials = [...completedMaterials, material.id];
      setIsCompleted(true);
      updateActivities("material");
      toast({
        title: "Material completed!",
        description: "Great job on completing this study material.",
      });
    }
    
    localStorage.setItem("launchpad_completed_materials", JSON.stringify(updatedCompletedMaterials));
  };
  
  if (!material) {
    return (
      <div className="container py-8 animate-pulse">
        <div className="h-8 w-64 bg-muted rounded mb-6"></div>
        <div className="h-32 bg-muted rounded mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }
  
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
  
  return (
    <div className="container py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <Button 
          variant="ghost"
          size="sm"
          className="flex items-center gap-1"
          onClick={() => navigate("/study")}
        >
          <ChevronLeft className="h-4 w-4" /> Back to Study Materials
        </Button>
        
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={getCategoryColor(material.category)}>
            {material.category.charAt(0).toUpperCase() + material.category.slice(1)}
          </Badge>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{material.estimatedTime} min</span>
          </div>
          
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(material.dateAdded).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">{material.title}</CardTitle>
          <p className="text-muted-foreground">{material.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {material.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            <MarkdownRenderer content={material.content} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button 
            variant="outline"
            onClick={() => navigate("/study")}
          >
            Back to All Materials
          </Button>
          <Button 
            variant={isCompleted ? "outline" : "default"}
            onClick={handleToggleCompletion}
          >
            {isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StudyMaterialDetail;
