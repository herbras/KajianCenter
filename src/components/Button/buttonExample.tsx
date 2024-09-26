import { FamilyButton } from "./index";

export function FamilyButtonDemo() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 block md:hidden z-50">
      <FamilyButton>
        <nav
          className="flex gap-4 items-center justify-center h-full py-4"
          aria-label="Main navigation"
        >
          {[
            {
              href: "/",
              label: "Home",
              icon: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22 9 12 15 12 15 22",
            },
            {
              href: "/now",
              label: "Now",
              icon: "M12 12 12 8 M12 12 L16 14 M12 2 A10 10 0 0 1 12 22 A10 10 0 0 1 12 2",
            },
            {
              href: "/uses",
              label: "Uses",
              icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 3 A4 4 0 0 1 9 11 A4 4 0 0 1 9 3 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
            },
            {
              href: "/about",
              label: "About",
              icon: "M12 12 12 16 M12 8 12.01 8 M12 2 A10 10 0 0 1 12 22 A10 10 0 0 1 12 2",
            },
          ].map(({ href, label, icon }) => (
            <a
              key={href}
              href={href}
              className="group flex flex-col items-center justify-center p-2 rounded-lg transition duration-150 ease-in-out hover:bg-teal-600/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-teal-200 group-hover:text-teal-100"
              >
                <path d={icon} />
              </svg>
              <span className="text-base mt-1 font-medium text-teal-100 group-hover:text-white">
                {label}
              </span>
            </a>
          ))}
        </nav>
      </FamilyButton>
    </div>
  );
}
