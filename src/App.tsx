import AppRoutes from "./routes/AppRoutes";
import Seo from "./components/Seo";
export default function App() {
  return (
    <>
      <Seo title="Agent UI" description="Modern, mobile-first multi-page scaffold for agent apps." />
      <AppRoutes />
    </>
  );
}
