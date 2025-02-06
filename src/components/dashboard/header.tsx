import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between p-4 bg-gray-100 shadow">
      <h1 className="text-lg font-bold">Dashboard</h1>
      <UserButton />
    </header>
  );
}
