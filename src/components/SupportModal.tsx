import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ExternalLink } from "lucide-react";

interface SupportModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SupportModal = ({ open, onOpenChange }: SupportModalProps) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [usePseudoName, setUsePseudoName] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, contact, message, usePseudoName });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-foreground/10 max-w-3xl scifi-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-widest uppercase text-foreground">
            Support
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Crypto Wallet Info - On Top */}
          <div className="space-y-4">
            <p className="text-xs tracking-widest text-foreground/70 uppercase">
              Support us with Stablecoins
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 glass-card rounded-lg">
                <p className="text-xs text-foreground/60 mb-1">USDC / USDT (Ethereum)</p>
                <p className="text-xs font-mono text-foreground break-all">
                  0xFF66d3fcBa8EF0c5DC5CF2d2c889abEEbAad37be
                </p>
              </div>
              <div className="p-3 glass-card rounded-lg">
                <p className="text-xs text-foreground/60 mb-1">USDC (Solana)</p>
                <p className="text-xs font-mono text-foreground break-all">
                  AtGrhT3b2t3bvmffjCDuxdBAx7fhNR4ihNWMhtPJyJGk
                </p>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-foreground/10">
            {/* Join Us Form */}
            <div className="space-y-4">
              <p className="text-xs tracking-widest text-foreground/70 uppercase">
                Text Us
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="name" className="text-xs text-foreground/60">Name</Label>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="pseudo" className="text-xs text-foreground/50">Pseudo-name</Label>
                      <Switch 
                        id="pseudo" 
                        checked={usePseudoName} 
                        onCheckedChange={setUsePseudoName}
                        className="scale-75"
                      />
                    </div>
                  </div>
                  <Input
                    id="name"
                    placeholder={usePseudoName ? "Your pseudo-name" : "Your name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                  />
                </div>
                <Input
                  placeholder="Email or WhatsApp/Telegram ID"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="glass-input"
                />
                <Textarea
                  placeholder=" Tx ID for your support, or your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="glass-input min-h-[80px]"
                />
                <Button
                  type="submit"
                  className="w-full glass-button-primary"
                >
                  Send
                </Button>
              </form>
            </div>

            {/* Telegram Links */}
            <div className="space-y-4">
              <p className="text-xs tracking-widest text-foreground/70 uppercase">
                Join Community
              </p>
              <div className="space-y-3">
                <a 
                  href="https://t.me/yourgroup/General" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 glass-card rounded-lg hover:bg-foreground/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-neon-cyan/20 flex items-center justify-center">
                    <span className="text-lg">📱</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground/90">Telegram Group</p>
                    <p className="text-xs text-foreground/50">Join our community</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                </a>
                <a 
                  href="https://t.me/yourchannel/Announcements" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 glass-card rounded-lg hover:bg-foreground/10 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-neon-gold/20 flex items-center justify-center">
                    <span className="text-lg">📢</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground/90">Announcements</p>
                    <p className="text-xs text-foreground/50">Stay updated</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-foreground/40 group-hover:text-foreground/70 transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportModal;
