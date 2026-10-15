import { useContext, useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";

import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ParticipantProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [role, setRole] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Load the logged-in user's profile from MongoDB
  useEffect(() => {
    if (!user?.email) {
      // setProfileLoading(false);
      return;
    }

    const loadProfile = async () => {
      try {
        setProfileLoading(true);

        const res = await axiosSecure.get(
          `/users/${user.email}`
        );

        const userData = res.data;

        setProfile(userData);
        setName(userData?.name || user.displayName || "");
        setPhone(userData?.phone || "");
        setProfilePic(
          userData?.profilePic || user.photoURL || ""
        );

        // Read the existing role without changing it
        setRole(userData?.role || "");
      } catch (error) {
        console.error("Failed to load profile:", error);

        setName(user.displayName || "");
        setPhone("");
        setProfilePic(user.photoURL || "");
        setRole("");
      } finally {
        setProfileLoading(false);
      }
      console.log("Profile role:", role);
    };

    loadProfile();
  }, [user, axiosSecure, role]);

  // Update editable profile information only
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      setLoading(true);

      // Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: profilePic,
      });

      // Update MongoDB without changing the role
      const res = await axiosSecure.patch(
        `/users/${user.email}`,
        {
          name,
          phone,
          profilePic,
        }
      );

      console.log("Profile updated:", res.data);

      // Update local profile state
      setProfile((prev) => ({
        ...prev,
        name,
        phone,
        profilePic,
      }));

      setOpen(false);

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update error:", error);

      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        Please log in to view your profile.
      </div>
    );
  }

  const displayName =
    profile?.name || user.displayName || "User";

  const displayPicture =
    profile?.profilePic ||
    user.photoURL ||
    "https://avatar.vercel.sh/shadcn1";

  const displayRole =
    role === "organizer"
      ? "Organizer"
      : role === "user"
        ? "Participant"
        : "User";

  return (
    <div className="p-6">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-5">
            {/* Profile Picture */}
            <img
              src={displayPicture}
              alt="User profile"
              className="h-20 w-20 shrink-0 rounded-full border object-cover"
            />

            {/* Profile Information */}
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl">
                {displayName}
              </CardTitle>

              <CardDescription className="mt-1">
                {user.email}
              </CardDescription>

              {profile?.phone && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.phone}
                </p>
              )}

              {/* Read-only role badge */}
              <Badge variant="secondary" className="mt-2">
                {displayRole}
              </Badge>
            </div>

            {/* Update Button */}
            <CardAction>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    Update
                  </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleUpdate}>
                    <DialogHeader>
                      <DialogTitle>
                        Update Profile
                      </DialogTitle>

                      <DialogDescription>
                        Update your personal information and
                        contact details. Your account role
                        cannot be changed here.
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-5 py-5">
                      {/* Profile Preview */}
                      <div className="flex justify-center">
                        <img
                          src={
                            profilePic ||
                            "https://avatar.vercel.sh/shadcn1"
                          }
                          alt="Profile preview"
                          className="h-20 w-20 rounded-full border object-cover"
                        />
                      </div>

                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Name
                        </Label>

                        <Input
                          id="name"
                          value={name}
                          onChange={(e) =>
                            setName(e.target.value)
                          }
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email
                        </Label>

                        <Input
                          id="email"
                          type="email"
                          value={user.email || ""}
                          disabled
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone
                        </Label>

                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>

                      {/* Profile Picture URL */}
                      <div className="space-y-2">
                        <Label htmlFor="profilePic">
                          Profile Image URL
                        </Label>

                        <Input
                          id="profilePic"
                          type="url"
                          value={profilePic}
                          onChange={(e) =>
                            setProfilePic(e.target.value)
                          }
                          placeholder="Enter image URL"
                        />
                      </div>
                    </div>

                    <DialogFooter>
                      <Button
                        type="submit"
                        disabled={loading}
                      >
                        {loading
                          ? "Updating..."
                          : "Save Changes"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardAction>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ParticipantProfile;