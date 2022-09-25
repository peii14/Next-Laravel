import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen ">{children}</div>
      <Footer />
    </>
  );
};
export default Layout;
