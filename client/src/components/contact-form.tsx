import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    suggestion: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.suggestion) {
      toast({
        title: "Please fill in all fields",
        description: "All fields are required to submit your suggestion.",
        variant: "destructive"
      });
      return;
    }

    // Show success message
    toast({
      title: "Thank you for your suggestion!",
      description: "Your feedback has been received. This feature would be implemented in the production version.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      suggestion: ""
    });
  };

  return (
    <Card className="bg-gray-100">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Suggest New Links or Report Issues</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              required
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Suggestion or Issue</label>
            <Textarea
              name="suggestion"
              value={formData.suggestion}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Please describe your suggestion or issue..."
              required
            />
          </div>
          <div className="md:col-span-2">
            <Button 
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition-colors"
            >
              Submit Suggestion
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
