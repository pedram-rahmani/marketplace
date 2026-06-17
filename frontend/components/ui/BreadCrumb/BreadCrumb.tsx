import Link from "next/link";

interface BreadcrumbLink {
  id: number | string;
  title: string;
  to?: string;
}

interface BreadcrumbProps {
  links?: BreadcrumbLink[];
}

export default function Breadcrumb({ links = [] }: BreadcrumbProps) {
  return (
    <div className="bg-custom-gray-100 dark:bg-ui-blue-800 py-3 mb-4 rounded-lg shadow rtl">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm text-text-on-light dark:text-text-on-dark gap-x-1">
          {/* home*/}
          <li className="flex justify-center items-center gap-x-2 [&>a]:flex">
            <Link
              href="/"
              className="flex items-center justify-center text-text-on-light/60 dark:text-text-on-dark/70 gap-x-1 hover:text-teal-500 transition-colors"
            >
              <svg viewBox="0 0 24 24">
                <path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              <span className="mt-1.5">خانه</span>
            </Link>

            {links.length > 0 && (
              <svg
                viewBox="0 0 24 24"
                className="size-4! text-gray-400 rtl:rotate-180"
              >
                <path d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            )}
          </li>
          {/* breadcrumb links */}
          {links.map((link, index) => {
            const isLast = index === links.length - 1;
            const url = link.to?.startsWith("/")
              ? link.to
              : `/${link.to || ""}`;

            return (
              <li
                key={link.id}
                className="flex justify-center items-center gap-x-2 [&>a]:flex"
              >
                {!isLast ? (
                  <Link
                    href={url}
                    className="text-text-on-light/60 dark:text-text-on-dark/65 hover:text-teal-500 transition-colors"
                  >
                    <span>{link.title}</span>
                  </Link>
                ) : (
                  <p className="text-text-on-light dark:text-text-on-dark font-bold">
                    <span>{link.title}</span>
                  </p>
                )}

                {!isLast && (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4! text-gray-400 rtl:rotate-180"
                  >
                    <path d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
