// components/Navbar.tsx
export default function Navbar() {
  return (
    <header className="bg-inherit shadow-sm w-full p-4 flex justify-end items-center">
      <div>
        <img
          src="/profile-avatar.png"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </div>
    </header>
  );
}
