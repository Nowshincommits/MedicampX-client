import { useState } from "react";
import { NavLink } from "react-router";
import { Buttons, navLinks } from "../../../../lib/constants";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive
        ? "text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo */}
       <Logo></Logo>

        {/* Desktop NavLinks */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={navLinkStyles}
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {Buttons.map((button) => (
            <Button
              key={button.name}
              asChild
              variant={
                button.name === "Join Us" ? "outline" : "default"
              }
              className="rounded-xl"
            >
              <NavLink to={button.path}>
                {button.name}
              </NavLink>
            </Button>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-background shadow-lg md:hidden">
          <div className="space-y-1 px-4 py-4">
            
            {/* Mobile NavLinks */}
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-base font-medium transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Mobile Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-3 border-t pt-4">
              {Buttons.map((button) => (
                <Button
                  key={button.name}
                  asChild
                  variant={
                    button.name === "Join Us"
                      ? "outline"
                      : "default"
                  }
                  className="rounded-xl"
                >
                  <NavLink
                    to={button.path}
                    onClick={() => setIsOpen(false)}
                  >
                    {button.name}
                  </NavLink>
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;