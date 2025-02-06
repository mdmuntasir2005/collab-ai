import { auth } from "@clerk/nextjs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { userId } = auth();

  if (!userId) {
    return <div>Unauthorized</div>; // Or redirect to "/sign-in"
  }

  return <>{children}</>;
}
