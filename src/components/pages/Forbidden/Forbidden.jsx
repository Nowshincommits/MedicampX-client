import { Button } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export function Forbidden() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <ShieldX className="w-20 h-20 mx-auto text-red-500" />

        <h1 className="mt-10 text-3xl md:text-4xl font-bold leading-snug text-slate-800">
          Error 403 <br /> Access Forbidden
        </h1>

        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto max-w-md">
          Sorry, you don't have permission to access this page.
          Please try refreshing the page or go back to the home page.
        </p>

        <Button
          variant="default"
          className="w-full md:w-32"
          onClick={() => (window.location.href = "/")}
        >
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default Forbidden; 