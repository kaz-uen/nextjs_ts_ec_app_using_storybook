import { fetcher } from "@/utils";

const getUser = async (context, { id }) => {
  return await fetcher(
    `${context.apiRootUrl.replace(/\/$/g, '')}/users/${id}`,
    // {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   }
    // }
    { next: { revalidate: 10 } }
  )
}

export default getUser;
