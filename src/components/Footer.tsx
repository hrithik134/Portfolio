export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-6 border-t border-[rgba(112,112,112,1)]">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} · Hrithik S · Class of 2026 · Built with Next.js
        </p>
      </div>
    </footer>
  );
}
