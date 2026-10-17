import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";
import Seo from "./Seo";

/** Handles scroll-to-top / scroll-to-hash on client-side navigation. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 30);
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash, key]);
  return null;
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Seo />
      <ScrollManager />
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <FloatingContact />
    </>
  );
}
