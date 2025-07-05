import { ReactNode } from "react";

const Authayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      {children}
    </div>
  );
};

export default Authayout;
