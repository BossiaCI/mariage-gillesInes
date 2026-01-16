import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
interface NavigationProps {
  currentPage?: string;
}
const Navigation = ({
  currentPage
}: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigationItems = [{
    to: "/",
    label: "Accueil"
  }, {
    to: "/histoire",
    label: "Notre Histoire"
  }, {
    to: "/programme",
    label: "Programme"
  }, {
    to: "/lieux",
    label: "Lieux & Accès"
  }, {
    to: "/hebergement",
    label: "Hébergement"
  }, {
    to: "/rsvp",
    label: "RSVP"
  }, {
    to: "/infos",
    label: "Infos Pratiques"
  }, {
    to: "/galerie",
    label: "Galerie"
  }, {
    to: "/cadeaux",
    label: "Cadeaux"
  }, {
    to: "/contact",
    label: "Contact"
  }];
  const closeMenu = () => setIsOpen(false);
  return <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 shadow-soft">
      <div className="wedding-container">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="font-title text-2xl text-primary mr-1.5 ml-1.5">KGC & JIL</Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6">
            {navigationItems.map(item => <Link key={item.to} to={item.to} className={`font-body text-sm hover:text-accent transition-smooth ${currentPage === item.to ? "text-accent font-medium" : ""}`}>
                {item.label}
              </Link>)}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white/95 backdrop-blur-md">
                <div className="flex items-center justify-between mb-8">
                  <div className="font-title text-2xl text-primary">KGC & JIL</div>
                  <Button variant="ghost" size="sm" onClick={closeMenu} className="p-2">
                    <X size={20} />
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-4">
                  {navigationItems.map(item => <Link key={item.to} to={item.to} onClick={closeMenu} className={`font-body text-lg py-3 px-4 rounded-lg hover:bg-accent/10 hover:text-accent transition-smooth ${currentPage === item.to ? "text-accent font-medium bg-accent/10" : ""}`}>
                      {item.label}
                    </Link>)}
                </div>

                {/* CTA Button in Mobile Menu */}
                <div className="mt-8 pt-8 border-t border-accent/20">
                  <Link to="/rsvp" onClick={closeMenu}>
                    <Button className="elegant-gradient text-white font-body w-full py-3 rounded-full shadow-elegant">
                      Confirmer ma présence
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;