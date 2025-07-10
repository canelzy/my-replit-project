import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be under 200 characters"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message must be under 2000 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      const emailSent = await sendContactEmail(validatedData);
      
      if (emailSent) {
        res.json({ 
          success: true, 
          message: "Your message has been sent successfully! We'll get back to you soon." 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Sorry, there was an error sending your message. Please try again later." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Please check your form data and try again.",
          errors: error.errors 
        });
      } else {
        console.error('Contact form error:', error);
        res.status(500).json({ 
          success: false, 
          message: "An unexpected error occurred. Please try again later." 
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
