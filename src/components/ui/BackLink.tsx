import Link from "next/link";

export default function BackLink() {
  return (
    <div className="fixed top-0 left-0 z-50 p-8">
      <Link
        href="/"
        className="text-xs tracking-widest uppercase text-text-secondary hover:text-foreground transition-colors duration-300"
      >
        ← Map
      </Link>
    </div>
  );
}
