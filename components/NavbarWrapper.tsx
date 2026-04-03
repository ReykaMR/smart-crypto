import { auth } from "@/lib/auth.config";
import Navbar from "@/components/Navbar";

export default async function NavbarWrapper() {
  const session = await auth();
  return <Navbar session={session} />;
}
