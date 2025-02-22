import type { ApiContext, User } from "@/types";
import { fetcher } from "@/utils";

interface GetUserParams {
  id: number; //ユーザーID
}

const getUser = async (
  context: ApiContext,
  { id }: GetUserParams
): Promise<User> => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    {
      next: { revalidate: 10 },
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  )
}

export default getUser;
