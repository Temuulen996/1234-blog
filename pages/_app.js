import "styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "highlight.js/styles/a11y-dark.css";
import { ThemeProvider } from "context/theme-context";
import "react-toggle/style.css";
import { SWRConfig } from "swr";
const fetcher = async (url) => {
  const res = await fetch(url);

  // Si el status code no esta en el rango 200-299,
  // seguimos intentando analizarlo y lanzarlo.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Adjunta información extra al objeto de error.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher,
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // We can send the error to Sentry,
            // or show a notification UI.
            // alert("Алдаа");
          }
        },
      }}
    >
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SWRConfig>
  );
}

export default MyApp;
