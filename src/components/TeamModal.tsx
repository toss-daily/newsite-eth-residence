import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Users } from "lucide-react";

interface TeamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TeamModal = ({ open, onOpenChange }: TeamModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-modal border-neon-cyan/20 max-w-3xl scifi-border">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-widest uppercase text-foreground flex items-center gap-3">
            <Users className="w-5 h-5 text-neon-cyan" />
            Team
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-foreground/80 leading-relaxed">
            A collective of builders, dreamers, and doers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 glass-card rounded-lg scifi-card">
              <p className="text-sm font-medium text-foreground/90">Founders</p>
              <p className="text-xs text-foreground/50 mt-1">The ones who lit the spark.</p>
            </div>
            <div className="p-4 glass-card rounded-lg scifi-card">
              <p className="text-sm font-medium text-foreground/90">Builders</p>
              <p className="text-xs text-foreground/50 mt-1">The ones who lay the bricks.</p>
            </div>
            <div className="p-4 glass-card rounded-lg scifi-card">
              <p className="text-sm font-medium text-foreground/90">Advisors</p>
              <p className="text-xs text-foreground/50 mt-1">The ones who light the path.</p>
            </div>
            <div className="p-4 glass-card rounded-lg scifi-card">
              <p className="text-sm font-medium text-foreground/90">Community</p>
              <p className="text-xs text-foreground/50 mt-1">The ones who carry the torch.</p>
            </div>
          </div>
          <p className="text-xs text-foreground/40 pt-4 border-t border-foreground/10">
            Full team profiles coming soon.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamModal;
