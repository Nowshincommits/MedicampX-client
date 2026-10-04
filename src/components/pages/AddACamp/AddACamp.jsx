import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";

const AddACamp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      campName: "",
      image: "",
      campFees: "",
      campDate: "",
      campTime: "",
      ampm: "",
      location: "",
      healthcareProfessionalName: "",
      participantCount: 0,
      description: "",
    },
  });

  const axiosInstance = useAxios();

  const onSubmit = async (data) => {
    const campData = {
      ...data,
      campFees: Number(data.campFees),
      campTime: `${data.campTime} ${data.ampm}`,
      participantCount: 0,
    };

    // Remove AM/PM because it has already been combined with campTime
    delete campData.ampm;

    console.log("Camp Data:", campData);

    try {
      // Loading alert
      Swal.fire({
        title: "Adding Camp...",
        text: "Please wait while we create your medical camp.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Send camp data to backend
      const campResponse = await axiosInstance.post(
        "/camp-details",
        campData
      );

      console.log("Camp Response:", campResponse.data);

      // Success alert
      await Swal.fire({
        icon: "success",
        title: "Camp Added!",
        text: "Your medical camp has been successfully created.",
        confirmButtonText: "OK",
      });

      // Reset form
      reset();
    } catch (error) {
      console.error("Error adding camp:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to Add Camp",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Page Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">
          Add A Camp
        </h1>

        <p className="text-muted-foreground mt-2">
          Create a new medical camp by providing the
          information below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Camp Name */}
        <div className="space-y-2">
          <Label htmlFor="campName">
            Camp Name
          </Label>

          <Input
            id="campName"
            placeholder="Enter camp name"
            {...register("campName", {
              required: "Camp name is required",
            })}
          />

          {errors.campName && (
            <p className="text-sm text-destructive">
              {errors.campName.message}
            </p>
          )}
        </div>

        {/* Camp Image */}
        <div className="space-y-2">
          <Label htmlFor="image">
            Camp Image
          </Label>

          <Input
            id="image"
            type="url"
            placeholder="Enter image URL"
            {...register("image", {
              required: "Camp image is required",
            })}
          />

          {errors.image && (
            <p className="text-sm text-destructive">
              {errors.image.message}
            </p>
          )}
        </div>

        {/* Camp Fees */}
        <div className="space-y-2">
          <Label htmlFor="campFees">
            Camp Fees
          </Label>

          <Input
            id="campFees"
            type="number"
            min="0"
            placeholder="Enter camp fees"
            {...register("campFees", {
              required: "Camp fees are required",
              min: {
                value: 0,
                message: "Camp fees cannot be negative",
              },
            })}
          />

          {errors.campFees && (
            <p className="text-sm text-destructive">
              {errors.campFees.message}
            </p>
          )}
        </div>

        {/* Camp Date */}
        <div className="space-y-2">
          <Label htmlFor="campDate">
            Camp Date
          </Label>

          <Input
            id="campDate"
            type="date"
            {...register("campDate", {
              required: "Camp date is required",
            })}
          />

          {errors.campDate && (
            <p className="text-sm text-destructive">
              {errors.campDate.message}
            </p>
          )}
        </div>

        {/* Camp Time */}
        <div className="space-y-2">
          <Label>
            Camp Time
          </Label>

          <div className="flex gap-2">
            {/* Time */}
            <Input
              type="text"
              placeholder="10:30"
              className="flex-1"
              {...register("campTime", {
                required: "Camp time is required",
                pattern: {
                  value:
                    /^(0?[1-9]|1[0-2]):[0-5][0-9]$/,
                  message:
                    "Enter time in 12-hour format, e.g. 10:30",
                },
              })}
            />

            {/* AM / PM */}
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              {...register("ampm", {
                required: "Please select AM or PM",
              })}
            >
              <option value="">
                AM/PM
              </option>

              <option value="AM">
                AM
              </option>

              <option value="PM">
                PM
              </option>
            </select>
          </div>

          {errors.campTime && (
            <p className="text-sm text-destructive">
              {errors.campTime.message}
            </p>
          )}

          {errors.ampm && (
            <p className="text-sm text-destructive">
              {errors.ampm.message}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            Enter time like 10:30 and select AM or PM.
          </p>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">
            Location
          </Label>

          <Input
            id="location"
            placeholder="Enter camp location"
            {...register("location", {
              required: "Location is required",
            })}
          />

          {errors.location && (
            <p className="text-sm text-destructive">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Healthcare Professional */}
        <div className="space-y-2">
          <Label htmlFor="healthcareProfessionalName">
            Healthcare Professional Name
          </Label>

          <Input
            id="healthcareProfessionalName"
            placeholder="Enter healthcare professional name"
            {...register(
              "healthcareProfessionalName",
              {
                required:
                  "Healthcare professional name is required",
              }
            )}
          />

          {errors.healthcareProfessionalName && (
            <p className="text-sm text-destructive">
              {
                errors.healthcareProfessionalName
                  .message
              }
            </p>
          )}
        </div>

        {/* Participant Count */}
        <div className="space-y-2">
          <Label htmlFor="participantCount">
            Participant Count
          </Label>

          <Input
            id="participantCount"
            type="number"
            value="0"
            readOnly
            {...register("participantCount")}
          />

          <p className="text-sm text-muted-foreground">
            Participant count starts at 0 and will
            increase as participants register.
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">
            Description
          </Label>

          <Textarea
            id="description"
            placeholder="Describe the medical camp..."
            className="min-h-35"
            {...register("description", {
              required: "Description is required",
            })}
          />

          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
        >
          Add Camp
        </Button>
      </form>
    </div>
  );
};

export default AddACamp;
