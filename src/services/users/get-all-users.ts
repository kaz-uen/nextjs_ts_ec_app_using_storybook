import type { ApiContext } from "@/types";
import { fetcher } from "@/utils";

const getAllUsers = async (
  context: ApiContext
) => {
  const res = await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users`,
    {
      next: { revalidate: 10 },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )

  if (!res) {
    throw new Error('Failed to fetch user data');
  }

  return res.json();
}

export default getAllUsers;
