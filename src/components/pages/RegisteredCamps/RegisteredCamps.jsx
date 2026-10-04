import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const RegisteredCamps = () => {
  const axios = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: camps = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registered-camps", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axios.get(
        `/registered-camps/${user.email}`
      );

      return res.data;
    },
  });

  // Cancel registration
  const cancelMutation = useMutation({
    mutationFn: async (campId) => {
      const res = await axios.delete(
        `/camp-details/${campId}/registration/${user.email}`
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["registered-camps", user?.email],
      });
    },

    onError: (error) => {
      console.error("Cancel registration error:", error);
    },
  });

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Payment status badge
  const getPaymentStatus = (status) => {
    const paymentStatus = status?.toLowerCase();

    if (paymentStatus === "paid") {
      return (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
          Paid
        </Badge>
      );
    }

    if (
      paymentStatus === "pending" ||
      paymentStatus === "unpaid"
    ) {
      return <Badge variant="destructive">Unpaid</Badge>;
    }

    return (
      <Badge variant="secondary">
        {status || "Pending"}
      </Badge>
    );
  };

  // Cancel handler
  const handleCancel = (camp) => {
    const confirmed = window.confirm(
      `Are you sure you want to cancel your registration for "${camp.campName}"?`
    );

    if (!confirmed) return;

    cancelMutation.mutate(camp._id);
  };

  // Loading
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          Error loading camps.
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          {error?.message}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Registered Camps
        </h2>

        <p className="text-sm text-muted-foreground">
          Camps you have registered for
        </p>
      </div>

      {/* Empty State */}
      {camps.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-muted-foreground">
            You have not registered for any camps yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Camp Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>
                  Healthcare Professional
                </TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {camps.map((camp, index) => {
                const isPaid =
                  camp.paymentStatus?.toLowerCase() === "paid";

                const isFree =
                  Number(camp.campFees) === 0;

                return (
                  <TableRow key={camp._id}>
                    {/* Number */}
                    <TableCell>
                      {index + 1}
                    </TableCell>

                    {/* Camp Name */}
                    <TableCell className="font-medium whitespace-nowrap">
                      {camp.campName || "N/A"}
                    </TableCell>

                    {/* Location */}
                    <TableCell>
                      {camp.location || "N/A"}
                    </TableCell>

                    {/* Date */}
                    <TableCell className="whitespace-nowrap">
                      {formatDate(camp.campDate)}
                    </TableCell>

                    {/* Time */}
                    <TableCell className="whitespace-nowrap">
                      {camp.campTime || "N/A"}
                    </TableCell>

                    {/* Fees */}
                    <TableCell className="whitespace-nowrap">
                      {isFree ? (
                        <Badge
                          variant="outline"
                          className="border-green-500 text-green-600"
                        >
                          Free
                        </Badge>
                      ) : (
                        `৳${camp.campFees}`
                      )}
                    </TableCell>

                    {/* Healthcare Professional */}
                    <TableCell>
                      {camp.healthcareProfessionalName ||
                        "N/A"}
                    </TableCell>

                    {/* Payment Status */}
                    <TableCell>
                      {isFree ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Free
                        </Badge>
                      ) : (
                        getPaymentStatus(
                          camp.paymentStatus
                        )
                      )}
                    </TableCell>

                    {/* Actions */}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {/* Pay */}
                        {!isFree && !isPaid && (
                          <Button
                            size="sm"
                            onClick={() =>
                              navigate(
                                `/payment/${camp.campId}`
                              )
                            }
                          >
                            Pay ৳{camp.campFees}
                          </Button>
                        )}

                        {/* Paid */}
                        {isPaid && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                          >
                            Paid
                          </Button>
                        )}

                        {/* Feedback */}
                        {isPaid && (
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() =>
                              navigate(
                                `/feedback/${camp._id}`
                              )
                            }
                          >
                            Feedback
                          </Button>
                        )}

                        {/* Cancel */}
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={
                            cancelMutation.isPending
                          }
                          onClick={() =>
                            handleCancel(camp)
                          }
                        >
                          {cancelMutation.isPending
                            ? "Cancelling..."
                            : "Cancel"}
                        </Button>

                        {/* Free camp */}
                        {isFree && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled
                          >
                            Free
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default RegisteredCamps;