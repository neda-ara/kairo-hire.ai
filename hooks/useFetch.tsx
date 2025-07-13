import { useState } from "react";
import { toast } from "sonner";

type AsyncFunction<TArgs extends any[], TResult> = (
  ...args: TArgs
) => Promise<TResult>;

function useFetch<TArgs extends any[], TResult>(
  cb: AsyncFunction<TArgs, TResult>
) {
  const [data, setData] = useState<TResult | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const fn = async (...args: TArgs): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
      if (typeof error === "string") {
        toast.error(error);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
}

export default useFetch;
