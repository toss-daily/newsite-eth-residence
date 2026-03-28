import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-transparent">
      <Link to="/" className="text-foreground">
        <div className="flex flex-col">
          <span className="text-sm font-bold tracking-[0.5em] uppercase">
            ION · LAB
          </span>
          <span className="text-[8px] tracking-[0.35em] uppercase text-foreground/80" style={{ width: '100%' }}>
            .Velocity WEB 5.0    
          </span>
        </div>
      </Link>
      
      <Link to="/bookdemo" className="banner-tag hover:border-neon-cyan transition-colors duration-300">
        Demo - soon
      </Link>
    </nav>
  );
};

export default TopNav;
