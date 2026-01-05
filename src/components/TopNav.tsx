import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
      <Link to="/" className="text-foreground">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.5em] uppercase">
            ETH · IOPIA
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-foreground/70" style={{ width: '100%' }}>
            Builders Residence
          </span>
        </div>
      </Link>
      
      <Link to="/residence" className="banner-tag hover:border-neon-cyan transition-colors duration-300">
        Residence v2.0 — soon
      </Link>
    </nav>
  );
};

export default TopNav;
