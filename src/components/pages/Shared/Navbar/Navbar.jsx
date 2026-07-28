import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { Buttons, navLinks } from "../../../../lib/constants";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Logo from "../Logo/Logo";
import { AuthContext } from "@/Contexts/AuthContext/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const navLinkStyles = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  const handleSignOut = () => {
    logOut()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Logo />

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.name} to={link.path} className={navLinkStyles}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <div className="relative group">
              {/* Avatar */}
              <img
                src={
                  user?.photoURL ||
                  "https://ui-avatars.com/api/?name=User&background=random"
                }
                alt={user?.displayName || "User"}
                className="h-10 w-10 rounded-full border object-cover cursor-pointer"
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-full pt-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200">
                <div className="w-48 rounded-lg border bg-white shadow-lg overflow-hidden">
                  <div className="border-b px-4 py-3">
                    <p className="font-semibold text-gray-900">
                      {user?.displayName || "User"}
                    </p>

                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <button to="/dashboard" className="block px-4 py-3 w-full hover:bg-accent">
                      Dashboard
                    </button>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            Buttons.map((button) => (
              <Button
                key={button.name}
                asChild
                variant={button.name === "Join Us" ? "outline" : "default"}
                className="rounded-xl"
              >
                <NavLink to={button.path}>{button.name}</NavLink>
              </Button>
            ))
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden rounded-md p-2"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t bg-background md:hidden">
          <div className="space-y-2 p-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 ${
                    isActive ? "bg-primary/10 text-primary" : "hover:bg-accent"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <div className="border-t pt-4">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user?.photoURL ||
                        "https://ui-avatars.com/api/?name=User&background=random"
                      }
                      alt={user?.displayName}
                      className="h-12 w-12 rounded-full border object-cover"
                    />

                    <div>
                      <p className="font-medium">{user?.displayName}</p>

                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <Button variant="destructive" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {Buttons.map((button) => (
                    <Button
                      key={button.name}
                      asChild
                      variant={
                        button.name === "Join Us" ? "outline" : "default"
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <NavLink to={button.path}>{button.name}</NavLink>
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
