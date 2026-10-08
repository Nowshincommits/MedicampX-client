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

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  // Get user information from MongoDB
  useEffect(() => {
    if (!user?.email) return;

    const loadProfile = async () => {
      try {
        setProfileLoading(true);

        const res = await axiosSecure.get(`/users/${user.email}`);

        setProfile(res.data);

        setName(res.data?.name || user.displayName || "");
        setPhone(res.data?.phone || "");
        setProfilePic(
          res.data?.profilePic || user.photoURL || ""
        );
      } catch (error) {
        console.error("Failed to load profile:", error);

        // Fallback to Firebase information
        setName(user.displayName || "");
        setProfilePic(user.photoURL || "");
      } finally {
        setProfileLoading(false);
      }
    };

    loadProfile();
  }, [user, axiosSecure]);

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

      // Update MongoDB
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name,
        phone,
        profilePic,
      });

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

  return (
    <div className="p-6">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center gap-5">
            {/* Profile Picture */}
            <img
              src={
                profile?.profilePic ||
                user?.photoURL ||
                "https://avatar.vercel.sh/shadcn1"
              }
              alt="Participant profile"
              className="h-20 w-20 shrink-0 rounded-full border object-cover"
            />

            {/* Profile Information */}
            <div className="min-w-0 flex-1">
              <CardTitle className="text-xl">
                {profile?.name ||
                  user?.displayName ||
                  "Participant Name"}
              </CardTitle>

              <CardDescription className="mt-1">
                {user?.email}
              </CardDescription>

              {profile?.phone && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {profile.phone}
                </p>
              )}

              <Badge variant="secondary" className="mt-2">
                Participant
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
                        contact details.
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
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email
                        </Label>

                        <Input
                          id="email"
                          value={user?.email || ""}
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
                          value={phone}
                          onChange={(e) =>
                            setPhone(e.target.value)
                          }
                          placeholder="Enter your phone number"
                        />
                      </div>

                      {/* Profile Image */}
                      <div className="space-y-2">
                        <Label htmlFor="profilePic">
                          Profile Image URL
                        </Label>

                        <Input
                          id="profilePic"
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