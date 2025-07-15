import { ReactNode, Suspense } from "react";
import { RingLoader } from "react-spinners";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-6xl font-bold gradient-title">Industry Insights</h1>
      </div>
      <Suspense fallback={<RingLoader className="mt-4 h-full" color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
