import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";

function Layout({ children }) {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <main>
        {children}
      </main>

      <Footer />
    </>
  );
}

export default Layout;