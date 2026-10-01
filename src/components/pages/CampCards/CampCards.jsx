import { useContext, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
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

import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CampCards = ({ camp }) => {
  const {
    _id,
    image,
    campName,
    description,
    location,
    campDate,
    campTime,
    organizer,
    campFees,
    healthcareProfessionalName,
    participantCount,
  } = camp;

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState({
    age: "",
    phoneNumber: "",
    gender: "",
    emergencyContact: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    const participantData = {
      campId: _id,

      // Camp information
      campName,
      campFees,
      location,
      healthcareProfessionalName,

      // Logged-in user information
      participantName: user?.displayName,
      participantEmail: user?.email,

      // Participant information
      age: Number(formData.age),
      phoneNumber: formData.phoneNumber,
      gender: formData.gender,
      emergencyContact: formData.emergencyContact,

      // Payment status
      paymentStatus: "pending",
    };

    try {
      Swal.fire({
        title: "Registering...",
        text: "Please wait while we process your registration.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Save participant
      const response = await axiosSecure.post(
        "/participants",
        participantData
      );

      if (response.data.insertedId) {
        Swal.close();

        // Close registration dialog
        setOpen(false);

        // Go to payment page
        navigate(`/payment/${_id}`);
      }
    } catch (error) {
      console.error("Registration error:", error);

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      {/* Image Overlay */}
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />

      {/* Camp Image */}
      <img
        src={image}
        alt={campName}
        className="relative z-20 aspect-video w-full h-fit object-cover brightness-75"
      />

      <CardHeader>
        {/* Availability Badge */}
        <CardAction>
          <Badge asChild variant="secondary">
            Available
          </Badge>
        </CardAction>

        {/* Camp Name */}
        <CardTitle>{campName}</CardTitle>

        {/* Description */}
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col gap-2">
        {/* Camp Information */}
        <div className="w-full text-sm text-muted-foreground">
          <p>
            <span className="font-medium">Location:</span>{" "}
            {location}
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {campDate}
          </p>

          <p>
            <span className="font-medium">Time:</span>{" "}
            {campTime}
          </p>

          {organizer && (
            <p>
              <span className="font-medium">Organizer:</span>{" "}
              {organizer}
            </p>
          )}

          <p>
            <span className="font-medium">Fee:</span>{" "}
            ৳{campFees}
          </p>

          <p>
            <span className="font-medium">Participants:</span>{" "}
            {participantCount || 0}
          </p>
        </div>

        {/* Join Camp Dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">
              Join Camp
            </Button>
          </DialogTrigger>

          {/* Registration Modal */}
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Join Medical Camp
              </DialogTitle>

              <DialogDescription>
                Please provide your information to register
                for this medical camp.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Camp Name */}
              <div className="space-y-2">
                <Label htmlFor="campName">
                  Camp Name
                </Label>

                <Input
                  id="campName"
                  value={campName || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Camp Fees */}
              <div className="space-y-2">
                <Label htmlFor="campFees">
                  Camp Fees
                </Label>

                <Input
                  id="campFees"
                  value={campFees ?? ""}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">
                  Location
                </Label>

                <Input
                  id="location"
                  value={location || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Healthcare Professional */}
              <div className="space-y-2">
                <Label htmlFor="healthcareProfessionalName">
                  Healthcare Professional
                </Label>

                <Input
                  id="healthcareProfessionalName"
                  value={
                    healthcareProfessionalName || ""
                  }
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Participant Name */}
              <div className="space-y-2">
                <Label htmlFor="participantName">
                  Participant Name
                </Label>

                <Input
                  id="participantName"
                  value={user?.displayName || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Participant Email */}
              <div className="space-y-2">
                <Label htmlFor="participantEmail">
                  Participant Email
                </Label>

                <Input
                  id="participantEmail"
                  value={user?.email || ""}
                  readOnly
                  className="bg-muted"
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <Label htmlFor="age">
                  Age
                </Label>

                <Input
                  id="age"
                  name="age"
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">
                  Phone Number
                </Label>

                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <Label htmlFor="gender">
                  Gender
                </Label>

                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>

                  <option value="Other">
                    Other
                  </option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">
                  Emergency Contact
                </Label>

                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  placeholder="Emergency contact number"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Dialog Buttons */}
              <DialogFooter className="gap-2 sm:gap-0">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>

                <Button type="submit">
                  Book
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default CampCards;