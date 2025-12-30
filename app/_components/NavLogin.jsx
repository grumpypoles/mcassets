import Link from "next/link";
import { auth } from "@/app/_lib/auth";
import SignOutButton from "./SignOutButton";
import NavDropDown from "./NavDropDown";
import Image from "next/image";

export default async function NavLogin() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl text-primary-100">
      <ul className="flex items-center gap-8 space-x-5">
        {session ? (
          <>
            <li>
              <Link
                href="/hiassets"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                Assets
              </Link>
            </li>
            <li>
              <Link
                href="/reports"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                Reporting
              </Link>
            </li>
            {/* <li className="flex items-center">
              <NavDropDown />
            </li> */}
            <li>
              <Link
                href="/account"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                Dashboard
              </Link>
            </li>
            <li></li>
            <li>
              <Link
                href="/about"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                About
              </Link>
            </li>
            <li className="flex items-center">
              <Image
                src={session.user.image}
                alt={session.user.name || "User avatar"}
                width={32}
                height={32}
                className="rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>
                <SignOutButton />
              </span>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/about"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="px-3 py-2 transition-colors hover:bg-primary-700"
              >
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
