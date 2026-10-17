import { Link } from "react-router-dom";
import { business } from "@/config/business";

export default function Privacy() {
  return (
    <section className="section">
      <div className="wrap max-w-3xl">
        <h1 className="text-4xl font-semibold">Privacy</h1>
        <div className="mt-6 space-y-4 text-ink-soft">
          <p>This website is operated for {business.name}, {business.city}. It is a simple information website. It does not have user accounts, payments or a database.</p>
          <h2 className="pt-2 text-2xl font-semibold">Enquiries</h2>
          <p>When you use the booking enquiry form, the details you type (such as your name, mobile number, route and travel date) are used to prepare a WhatsApp message. The message opens in WhatsApp, which is a service provided by a third party under its own terms and privacy policy. Nothing is sent until you press send in WhatsApp. This website does not store your enquiry.</p>
          <h2 className="pt-2 text-2xl font-semibold">Calls and email</h2>
          <p>If you call or email us, we use your details only to reply to your enquiry and to arrange your journey.</p>
          <h2 className="pt-2 text-2xl font-semibold">Cookies and analytics</h2>
          <p>This website does not set tracking cookies and does not use analytics.</p>
          <p className="text-sm">Questions about this page? <Link to="/#contact" className="font-semibold text-navy underline">Contact us</Link>.</p>
        </div>
      </div>
    </section>
  );
}
