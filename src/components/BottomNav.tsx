import { useState } from "react";
import ManifestoModal from "./ManifestoModal";
import TeamModal from "./TeamModal";
import SupportModal from "./SupportModal";
import { Link } from "react-router-dom";
import BuildersPortalModal from "./BuildersPortalModal";

const BottomNav = () => {
  const [manifestoOpen, setManifestoOpen] = useState(false);
  const [teamOpen, setTeamOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);

  const navItems = [
    { label: "Manifesto", colorClass: "nav-link-gold", onClick: () => setManifestoOpen(true) },
    { label: "Team", colorClass: "nav-link-turquoise", onClick: () => setTeamOpen(true) },
    { label: "Support", colorClass: "nav-link-cream", onClick: () => setSupportOpen(true) },
    { label: "Builder House", colorClass: "nav-link-cyan", onClick: () => setPortalOpen(true) },
    { label: "History", colorClass: "nav-link-cyan", href: "/history" },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-12 px-8 py-6 bg-transparent">
        {navItems.map((item) => (
          item.href ? (
            <Link
              key={item.label}
              to={item.href}
              className={`nav-link ${item.colorClass} text-foreground/80 hover:text-foreground`}
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.onClick}
              className={`nav-link ${item.colorClass} text-foreground/80 hover:text-foreground bg-transparent border-none cursor-pointer`}
            >
              {item.label}
            </button>
          )
        ))}
      </nav>

      <ManifestoModal open={manifestoOpen} onOpenChange={setManifestoOpen} />
      <TeamModal open={teamOpen} onOpenChange={setTeamOpen} />
      <SupportModal open={supportOpen} onOpenChange={setSupportOpen} />
      <BuildersPortalModal open={portalOpen} onOpenChange={setPortalOpen} />
    </>
  );
};

export default BottomNav;
