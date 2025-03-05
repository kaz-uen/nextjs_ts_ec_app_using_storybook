import useSWR from "swr";
import type { ApiContext, Product } from "@/types";
import { fetcher } from "@/utils";

interface UseProductProps {
  id: number;
  initial?: Product;
}

const useProduct = (
  context: ApiContext,
  { id, initial }: UseProductProps
) => {
  const { data, error } = useSWR(
    `${context.apiRootUrl}/products/${id}`,
    fetcher,
  )

  return {
    product: data ?? initial,
    isLoading: !error && !data,
    isError: error,
  }
}

export default useProduct;
