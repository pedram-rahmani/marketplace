import GeneralSearchContent from "./GeneralSearchContent";
import Breadcrumb from "@/components/ui/BreadCrumb/BreadCrumb";
import { getProducts } from "@/services/product";

export default async function GeneralSearchPage() {
  const initialProducts = await getProducts({});

  return (
    <>
      <Breadcrumb links={[{ id: "search-root", title: "جستجو", to: "/search" }]} />
      <GeneralSearchContent initialProducts={initialProducts} />
    </>
  );
}