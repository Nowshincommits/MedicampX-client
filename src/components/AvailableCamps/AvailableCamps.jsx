import { useQuery } from "@tanstack/react-query";
import CampCards from "@/components/pages/CampCards/CampCards";
import useAxios from "../../hooks/useAxios";

const AvailableCamps = () => {
  const axios = useAxios();

  const {
    data: camps = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["available-camps"],
    queryFn: async () => {
      const res = await axios.get("/camp-details");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500">
          Failed to load camps.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {error?.message}
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold">
          Available Medical Camps
        </h2>

        <p className="mt-2 text-muted-foreground">
          Explore upcoming medical camps and join the ones that interest you.
        </p>
      </div>

      {camps.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg font-medium">
            No camps are currently available.
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            Please check again later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {camps.map((camp) => (
            <CampCards
              key={camp._id}
              camp={camp}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default AvailableCamps;