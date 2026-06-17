import Header from "@/components/layout/desktop/Header/Header";
import Footer from "@/components/layout/desktop/Footer/Footer";
import MobileHeader from "@/components/layout/mobile/Header/Header";
import MobileMenu from "@/components/layout/mobile/Footer/Footer";
import { getMenu } from "@/server/menu";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch menu items from the server
  const menuItems = await getMenu();

  return (
    <>
      {/* Desktop Header */}
      <div className="hidden md:block sticky top-0 z-30">
        <Header menuItems={menuItems} />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden">
        <MobileHeader />
      </div>

      <main className="main">
        <div className="flex flex-col px-4 mr-auto ml-auto xs:max-w-118.75 sm:max-w-160 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Menu */}
      <div className="md:hidden">
        <MobileMenu />
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </>
  );
}
