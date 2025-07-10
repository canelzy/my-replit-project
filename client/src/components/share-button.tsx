import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Share2, MessageCircle, Twitter, Facebook, Link, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShareButton() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = window.location.origin;
  const shareTitle = "Canada Access Hub - Government Services Directory";
  const shareText = "Check out this comprehensive directory for Canadian government services and resources! 🇨🇦";

  const handleShare = async (platform: string) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    let shareLink = "";

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "email":
        shareLink = `mailto:?subject=${encodedTitle}&body=${encodedText}%20${encodedUrl}`;
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(shareUrl);
          toast({
            title: "Link copied!",
            description: "The link has been copied to your clipboard.",
          });
          setIsOpen(false);
          return;
        } catch (err) {
          toast({
            title: "Copy failed",
            description: "Please copy the link manually.",
            variant: "destructive",
          });
          return;
        }
      default:
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "noopener,noreferrer");
      setIsOpen(false);
    }
  };

  // Check if native sharing is available
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch (err) {
        // User cancelled sharing or error occurred
        console.log("Native share cancelled or failed");
      }
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-white/10 border-white/30 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm transition-all duration-300 shadow-lg">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-sm border-gray-200/50 shadow-xl">
        {navigator.share && (
          <DropdownMenuItem onClick={handleNativeShare} className="flex items-center space-x-2">
            <Share2 className="h-4 w-4" />
            <span>Share...</span>
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => handleShare("whatsapp")} className="flex items-center space-x-2">
          <MessageCircle className="h-4 w-4 text-green-600" />
          <span>WhatsApp</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare("twitter")} className="flex items-center space-x-2">
          <Twitter className="h-4 w-4 text-blue-400" />
          <span>Twitter</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare("facebook")} className="flex items-center space-x-2">
          <Facebook className="h-4 w-4 text-blue-600" />
          <span>Facebook</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare("email")} className="flex items-center space-x-2">
          <Mail className="h-4 w-4 text-gray-600" />
          <span>Email</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleShare("copy")} className="flex items-center space-x-2">
          <Link className="h-4 w-4 text-gray-600" />
          <span>Copy Link</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}