import Layout from "@/components/templates/Layout";
import SearchPageContainer from "@/containers/SearchPageContainer";

type SearchPageProps = {
  params: {
    slug: string[];
  }
}

const SearchPage = ({ params }: SearchPageProps) => {
  return (
    <Layout>
      <SearchPageContainer params={params} />
    </Layout>
  )
}

export default SearchPage;
