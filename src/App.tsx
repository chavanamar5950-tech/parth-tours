import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { InquiryProvider } from "@/lib/inquiryContext";
import Home from "@/pages/Home";
import RoutePage from "@/pages/RoutePage";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <InquiryProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/routes/:slug" element={<RoutePage />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </InquiryProvider>
    </BrowserRouter>
  );
}
