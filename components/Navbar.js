import { Navbar } from "flowbite-react";
import Link from "next/link";

export default function MainNavbar() {
  return (
    <Navbar
      fluid={true}
      rounded={true}
      style={{ width: "80%", margin: "0 auto", marginBottom: "2rem" }}
    >
      <Link href="/" passHref>
        <div className="flex items-center cursor-pointer">
          <img
            src="https://services.garmin.com/appsLibraryBusinessServices_v0/rest/apps/42369127-b237-4cf9-935b-2b2dad85da97/icon/023aacec-e5cc-4973-95c6-46d75714a2d3"
            className="mr-3 h-6 sm:h-9"
            alt=" Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Crypto Note
          </span>
        </div>
      </Link>
    </Navbar>
  );
}
