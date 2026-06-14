import "@/styles/globals.css";
import Navbar from "./components/Navbar.jsx";

export default function App({ Component, pageProps, router }) {
  const is404Page = router.pathname === "/404";

  return (
    <>
      {!is404Page && <Navbar />}

      <main className={is404Page ? "" : "container mx-auto p-6"}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
