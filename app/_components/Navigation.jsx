import Link from "next/link";
import { auth } from "@/app/_lib/auth";


export default async function Navigation() {
  const session = await auth();
 
  

 return (
  <nav className="z-10 text-xl text-primary-100">
    <ul className="flex items-center gap-16">
      {session?.user?.image ? (
        <>
        {/* <li>
          <Link
            href="/recreation"
            className="transition-colors hover:bg-stone-600"
          >
            Sessions
          </Link>
          </li>
          <li>
          <Link
            href="/equipment"
            className="transition-colors hover:bg-stone-600"
          >
            Boards
          </Link>
          </li>
        */}
        <li>
          <Link href="/sails" className="transition-colors hover:bg-stone-600">
            Sails
          </Link>
        </li> 
        <li>
          <Link href="/boards" className="transition-colors hover:bg-stone-600">
            Boards
          </Link>
        </li>
        <li>
          <Link href="/masts" className="transition-colors hover:bg-stone-600">
            Masts
          </Link>
        </li>
        <li>
          <Link href="/booms" className="transition-colors hover:bg-stone-600">
            Booms
          </Link>
        </li>
        {/* <li>
          <Link href="/reports" className="transition-colors hover:bg-stone-600">
            Booms
          </Link>
        </li>
        <li>
          <Link href="/about" className="transition-colors hover:bg-stone-600">
            Other
          </Link>
        </li> */}
        <li>
          <Link href="/about" className="transition-colors hover:bg-stone-600">
            About
          </Link>
        </li>
          <li>
            <Link
              href="/account"
              className="flex items-center gap-4 transition-colors hover:text-accent-400"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Admin</span>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/about" className="transition-colors hover:bg-stone-600">
              About
            </Link>
          </li>
          <li>
            <Link href="/account" className="transition-colors hover:text-accent-400">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  </nav>
  
);

}
