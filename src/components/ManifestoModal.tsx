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

const ManifestoModal = ({ open, onOpenChange }: ManifestoModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-foreground/10 max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-widest uppercase text-foreground flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-neon-cyan" />
            Manifesto
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-foreground/90 leading-relaxed">
            We believe in creating technology that serves humanity, not the other way around.
          </p>
          

          <p className="text-foreground/90 leading-relaxed">
            Eth/accs d/acc-ing tech for human.
          </p>
          <p className="text-foreground/70 leading-relaxed text-sm">
            Nothing funky - nothing weird. Just building with folks who get it.
          </p>
          <p className="text-foreground/70 leading-relaxed text-sm">
            Not another "something" for adrenaline. Though it might become a byproduct, it's never the goal.
          </p>

          <div className="pt-4 border-t border-foreground/10">
            <p className="text-foreground/70 leading-relaxed text-sm">
              ETH·IOPIA is a space for builders who create with purpose. We're here to lay foundations for generations in our humble contribution.
            </p>
            <p className="text-neon-cyan leading-relaxed text-sm font-medium">
              The future is engineered.
            </p>
          </div>

          
          <div className="pt-4 border-t border-foreground/10">
            <p className="text-xs text-foreground/50 tracking-widest uppercase">
              Build with intention. Build Tech for Human.
            </p>
          </div>
          
        </div>
      </DialogContent>
    </Dialog>
    
  );
};

export default ManifestoModal;
