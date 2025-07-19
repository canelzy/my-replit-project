import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendContactEmail } from "./email";
import { generateAppToken, getSigningKey } from "./signing";
import { generateCertificateToken, verifyCertificateToken } from "./cert-signing";
import { z } from "zod";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required").max(200, "Subject must be under 200 characters"),
  message: z.string().min(1, "Message is required").max(2000, "Message must be under 2000 characters")
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/test", (req, res) => {
    res.json({ status: "ok", message: "Server is working", timestamp: new Date().toISOString() });
  });

  // App signing key endpoint
  app.get("/api/app-token", (req, res) => {
    try {
      const signingKey = getSigningKey();
      const certFingerprint = "3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F";
      const token = generateAppToken("canada-access-hub", certFingerprint);
      
      res.json({
        token,
        keyId: signingKey.id,
        algorithm: signingKey.algorithm,
        certFingerprint: certFingerprint,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('App token generation error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to generate app token" 
      });
    }
  });

  // Certificate-based signing endpoint
  app.get("/api/cert-token", (req, res) => {
    try {
      const certFingerprint = "3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F";
      const certToken = generateCertificateToken("canada-access-hub", certFingerprint);
      
      res.json({
        token: certToken,
        certFingerprint: certFingerprint,
        keyId: certFingerprint.replace(/:/g, '').substring(0, 16),
        algorithm: 'HS256-CERT',
        signedWithCertificate: true,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Certificate token generation error:', error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to generate certificate token" 
      });
    }
  });

  // Token verification endpoint
  app.post("/api/verify-token", (req, res) => {
    try {
      const { token, type } = req.body;
      
      if (type === 'certificate') {
        const certFingerprint = "3A:4C:AE:AE:46:E5:1A:40:BE:47:8B:E8:D4:B1:BE:C4:1A:F0:2D:9F";
        const payload = verifyCertificateToken(token, certFingerprint);
        
        res.json({
          valid: true,
          payload,
          verifiedWith: 'certificate',
          timestamp: new Date().toISOString()
        });
      } else {
        res.status(400).json({
          valid: false,
          message: "Unsupported token type"
        });
      }
    } catch (error) {
      console.error('Token verification error:', error);
      res.json({
        valid: false,
        message: "Token verification failed",
        error: error.message
      });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      
      const emailSent = await sendContactEmail(validatedData);
      
      if (emailSent) {
        // Check if we're using email service or console logging
        const hasEmailService = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;
        
        res.json({ 
          success: true, 
          message: hasEmailService 
            ? "Your message has been sent successfully! We'll get back to you soon." 
            : "Your message has been received and logged successfully! We'll get back to you soon via the provided email address."
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Sorry, there was an error sending your message. Please try again later." 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error('Contact form validation error:', error.errors);
        const errorMessages = error.errors.map(err => err.message).join(', ');
        res.status(400).json({ 
          success: false, 
          message: errorMessages,
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
