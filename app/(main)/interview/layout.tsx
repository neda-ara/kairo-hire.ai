import { ReactNode, Suspense } from "react";
import { RingLoader } from "react-spinners";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="px-5">
      <Suspense fallback={<RingLoader className="mt-4 h-full" color="gray" />}>
        {children}
      </Suspense>
    </div>
  );
};

export default Layout;
