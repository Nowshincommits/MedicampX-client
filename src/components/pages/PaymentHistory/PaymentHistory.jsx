import { AuthContext } from "@/Contexts/AuthContext/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { isPending, data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,

    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  console.log(payments);

  if (isPending) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Payment History</h2>
        <p className="text-sm text-gray-500">
          View your past and current camp payment transactions.
        </p>
      </div>

      {payments.length === 0 ? (
        <div className="rounded-lg border py-12 text-center">
          <p className="text-gray-500">
            You don't have any payment history yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Camp Name</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead>Confirmation Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment._id}>
                  <TableCell>{payment.campName}</TableCell>
                  <TableCell>৳{payment.amount || payment.campFees}</TableCell>
                  <TableCell className="font-medium">
                    {payment.transactionId}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        payment.paymentStatus === "paid"
                          ? "default"
                          : "destructive"
                      }
                    >
                      {payment.paymentStatus === "paid"
                        ? "Paid"
                        : payment.paymentStatus || "Pending"}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        payment.confirmationStatus === "confirmed"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {payment.confirmationStatus === "confirmed"
                        ? "Confirmed"
                        : payment.confirmationStatus || "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
