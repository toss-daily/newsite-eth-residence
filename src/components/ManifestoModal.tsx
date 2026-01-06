import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";

interface ManifestoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
// <Sparkles className="w-5 h-5 text-neon-cyan" />

const ManifestoModal = ({ open, onOpenChange }: ManifestoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-neon-cyan/20 max-w-2xl scifi-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-widest uppercase text-foreground/90 flex items-center gap-3">
            
            Manifesto
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-foreground/90 leading-relaxed">
            We believe in creating technology that serves humanity, not the other way around.
          </p>
          <p className="text-foreground/83 leading-relaxed">
            A space for builders who create with purpose. We're here to make our humble contribution for responsible d/acc.
          </p>
          
          <div className="pt-4 border-t border-foreground/30 blur-smoke">
            <p className="text-xs text-foreground/90 tracking-widest uppercase text-bold">
              Build with intention · Build to Sustain
            </p>
            <p className="text-neon-cyan/50 leading-relaxed text-sm py-1 font-medium">
              Tech for Human
          </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManifestoModal;
