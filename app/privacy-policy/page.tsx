import { site } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sysnetic collects, uses and protects your personal data.",
  path: "/privacy-policy/",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy-policy/"
      updated="November 2026"
      sections={[
        {
          heading: "Information we collect",
          body: [
            "We collect information you provide directly to us — for example when you fill out our contact form, email us or call us. This typically includes your name, email address, phone number, company and the details of your enquiry.",
            "When you visit this website, our hosting provider automatically processes technical data such as your IP address, browser type and the pages requested, in order to deliver the site securely.",
          ],
        },
        {
          heading: "How we use your information",
          body: [
            "We use the information you provide to respond to your enquiry, to prepare and deliver our services, and to communicate with you about your project. We also use information to comply with legal obligations and to protect the rights and safety of our users and our company.",
            "Where the GDPR applies, we process enquiry data to take steps at your request before entering into a contract (Art. 6(1)(b) GDPR) and on the basis of our legitimate interest in answering requests (Art. 6(1)(f) GDPR).",
          ],
        },
        {
          heading: "Cookies & tracking",
          body: [
            "This website does not use advertising or analytics cookies. Fonts are served from our own server, so no data is sent to third-party font providers. A small session flag is stored in your browser only to avoid replaying the intro animation during the same visit.",
          ],
        },
        {
          heading: "Your rights",
          body: [
            "You have the right to request access to, correction or deletion of your personal data, to restrict or object to its processing, and to data portability. You may also lodge a complaint with a data protection supervisory authority.",
            `To exercise any of these rights, contact us at ${site.email}.`,
          ],
        },
        {
          heading: "Changes to this policy",
          body: [
            "We may update this Privacy Policy periodically to reflect changes in our practices or regulatory requirements. Any updates will be posted on this page, and we encourage you to review it regularly to stay informed.",
          ],
        },
        {
          heading: "Contact",
          body: [`Sysnetic · ${site.address.street}, ${site.address.city}, ${site.address.country} · ${site.email} · ${site.phone}`],
        },
      ]}
    />
  );
}
