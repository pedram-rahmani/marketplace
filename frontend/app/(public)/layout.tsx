import Header from "@/components/layout/desktop/Header/Header";
import Footer from "@/components/layout/desktop/Footer/Footer";
import MobileHeader from "@/components/layout/mobile/Header/Header";
import MobileMenu from "@/components/layout/mobile/Footer/Footer";
import { getCategories } from "@/server/category";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch Categories from the server
  const menuItems = await getCategories();

  return (
    <>
      <div className="hidden lg:block sticky top-0 z-30">
        <Header menuItems={menuItems} />
      </div>

      <div className="lg:hidden">
        <MobileHeader />
      </div>

      <main className="main pt-14 lg:pt-0">
        <div className="flex flex-col px-4 mr-auto ml-auto xs:max-w-118.75 sm:max-w-160 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          {children}
        </div>
      </main>

      <div className="lg:hidden">
        <MobileMenu />
      </div>

      <div className="hidden lg:block">
        <Footer />
      </div>
    </>
  );
}