
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo } from "react";
import { AuthContext } from "../../../Contexts/AuthContext/AuthContext";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const formatTaka = (value) =>
  `৳${Number(value || 0).toLocaleString("en-BD")}`;

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: registrations = [],
    isLoading: registrationsLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registered-camps", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/registered-camps/${user.email}`
      );
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const {
    data: camps = [],
    isLoading: campsLoading,
  } = useQuery({
    queryKey: [
      "analytics-camp-details",
      registrations.map((item) => item.campId || item._id).join(","),
    ],
    enabled: registrations.length > 0,
    queryFn: async () => {
      const results = await Promise.all(
        registrations.map(async (registration) => {
          const campId = registration.campId;

          if (!campId) {
            return {
              ...registration,
              actualCampFees: Number(registration.campFees) || 0,
            };
          }

          try {
            const res = await axiosSecure.get(
              `/camp-details/${campId}`
            );

            const camp = res.data;

            return {
              ...registration,
              campName:
                camp.campName ||
                registration.campName ||
                "Unnamed Camp",
              actualCampFees: Number(camp.campFees) || 0,
              campDate: camp.campDate || registration.campDate,
            };
          } catch {
            return {
              ...registration,
              actualCampFees: Number(registration.campFees) || 0,
            };
          }
        })
      );

      return results;
    },
  });

  const analytics = useMemo(() => {
    const totalCamps = camps.length;

    const totalFees = camps.reduce(
      (sum, camp) => sum + camp.actualCampFees,
      0
    );

    const paidCamps = camps.filter(
      (camp) =>
        camp.actualCampFees > 0 &&
        String(camp.paymentStatus || "").toLowerCase() === "paid"
    ).length;

    const unpaidCamps = camps.filter(
      (camp) =>
        camp.actualCampFees > 0 &&
        String(camp.paymentStatus || "").toLowerCase() !== "paid"
    ).length;

    const freeCamps = camps.filter(
      (camp) => camp.actualCampFees === 0
    ).length;

    // Each bar uses the authoritative camp fee, not a sum,
    // payment amount, or participant count.
    const chartData = camps.map((camp, index) => ({
      id: camp.campId || camp._id || index,
      campName: camp.campName || "Unnamed Camp",
      campFees: camp.actualCampFees,
      paymentStatus:
        camp.actualCampFees === 0
          ? "Free"
          : String(camp.paymentStatus || "").toLowerCase() === "paid"
          ? "Paid"
          : "Unpaid",
    }));

    return {
      totalCamps,
      totalFees,
      paidCamps,
      unpaidCamps,
      freeCamps,
      chartData,
    };
  }, [camps]);

  if (registrationsLoading || campsLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load analytics: {error?.message}
      </div>
    );
  }

  const {
    totalCamps,
    totalFees,
    paidCamps,
    unpaidCamps,
    freeCamps,
    chartData,
  } = analytics;

  const maxFee = Math.max(
    0,
    ...chartData.map((item) => item.campFees)
  );

  // Round the axis maximum up to a readable value.
  const axisMaximum =
    maxFee === 0
      ? 100
      : Math.ceil(maxFee / 500) * 500;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h2 className="text-2xl font-bold">My Analytics</h2>
        <p className="text-sm text-muted-foreground">
          An overview of your registered camps and their listed fees.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Registered Camps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalCamps}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Total Listed Fees
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {formatTaka(totalFees)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Not necessarily the amount you paid.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Paid Camps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">
              {paidCamps}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Unpaid Camps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">
              {unpaidCamps}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Free camps: {freeCamps}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Camp fee chart */}
      <Card>
        <CardHeader>
          <CardTitle>Fee Per Registered Camp</CardTitle>
          <p className="text-sm text-muted-foreground">
            Each bar represents the listed fee of one camp.
          </p>
        </CardHeader>

        <CardContent>
          {chartData.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              You have not registered for any camps yet.
            </div>
          ) : (
            <div className="h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 20,
                    left: 15,
                    bottom: 65,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    dataKey="campName"
                    angle={-30}
                    textAnchor="end"
                    interval={0}
                    height={85}
                    tick={{ fontSize: 11 }}
                  />

                  <YAxis
                    type="number"
                    domain={[0, axisMaximum]}
                    allowDecimals={false}
                    tickFormatter={(value) =>
                      `৳${Number(value).toLocaleString("en-BD")}`
                    }
                  />

                  <Tooltip
                    formatter={(value) => [
                      formatTaka(value),
                      "Listed Camp Fee",
                    ]}
                    labelFormatter={(label) => `Camp: ${label}`}
                  />

                  <Bar
                    dataKey="campFees"
                    name="Listed Camp Fee"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={55}
                  >
                    {chartData.map((item) => (
                      <Cell
                        key={item.id}
                        fill="#0891b2"
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration summary */}
      <Card>
        <CardHeader>
          <CardTitle>Registration Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
              Paid: {paidCamps}
            </Badge>
            <Badge variant="destructive">
              Unpaid: {unpaidCamps}
            </Badge>
            <Badge variant="outline">
              Free: {freeCamps}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
