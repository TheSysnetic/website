import { pageMetadata } from "@/lib/seo";
import LegalPage from "@/components/ui/LegalPage";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description: "The terms and conditions for using the Sysnetic website and services.",
  path: "/terms/",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      path="/terms/"
      updated="November 2026"
      sections={[
        { heading: "Acceptance of terms", body: ["By accessing and using our website and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you must not use our services."] },
        { heading: "Use of our services", body: ["Our services are provided for your personal or business use and must be used in compliance with all applicable laws and regulations. You agree not to use our services for any unlawful purpose or in a manner that could harm our business, users, or third parties."] },
        { heading: "User accounts", body: ["If you create an account with us, you are responsible for maintaining the confidentiality of your account details and for all activities under your account. You agree to provide accurate information and to notify us immediately of any unauthorized use of your account."] },
        { heading: "Intellectual property", body: ["All content, trademarks, and data on this website, including but not limited to text, graphics, logos, and software, are the property of our company or our licensors and are protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission."] },
        { heading: "Limitation of liability", body: ["To the fullest extent permitted by law, we will not be liable for any damages arising out of or in connection with your use of our services, including but not limited to direct, indirect, incidental, punitive, or consequential damages."] },
        { heading: "Termination", body: ["We reserve the right to terminate or suspend access to our services at any time, without prior notice or liability, for any reason, including a breach of these Terms and Conditions."] },
        { heading: "Changes to these terms", body: ["We may update these Terms and Conditions periodically to reflect changes in our services or legal obligations. Updates will be posted on this page, and we encourage you to review it regularly to stay informed."] },
      ]}
    />
  );
}
