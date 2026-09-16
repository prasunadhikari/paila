import { Link } from "react-router-dom";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

export default function LegalPage() {
return ( <div className="min-h-screen bg-slate-50 text-slate-800">
{/* Header */} <header className="border-b border-slate-200 bg-white"> <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5"> <Link
         to="/"
         className="flex items-center gap-2 font-semibold text-slate-900"
       > <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white">
P </div> <span className="text-xl">Paila</span> </Link>

      <Link
        to="/register"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Register
      </Link>
    </div>
  </header>

  {/* Main */}
  <main className="mx-auto max-w-4xl px-5 py-12">
    <div className="mb-10 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
        <ShieldCheck className="h-7 w-7" />
      </div>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Terms & Privacy
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500">
        Please review the terms that apply when using Paila and how we
        handle information provided through the platform.
      </p>
    </div>

    <div className="space-y-8">
      {/* Terms */}
      <section
        id="terms"
        className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <FileText className="h-5 w-5" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Terms of Use
          </h2>
        </div>

        <div className="space-y-5 text-sm leading-7 text-slate-600">
          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              1. Using Paila
            </h3>
            <p>
              Paila is a travel platform designed to help users discover
              destinations, explore travel information, and use travel
              planning features. By using Paila, you agree to use the
              platform responsibly and lawfully.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              2. Account Information
            </h3>
            <p>
              You are responsible for providing accurate information when
              creating an account and for keeping your account credentials
              secure.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              3. Travel Information
            </h3>
            <p>
              Travel information provided by Paila is intended for general
              informational purposes. Routes, prices, availability,
              schedules, weather, and other travel conditions may change.
              Users should verify important details with relevant service
              providers before making travel decisions.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              4. Responsible Use
            </h3>
            <p>
              Users must not misuse the platform, attempt unauthorized
              access, interfere with its operation, or use Paila for
              unlawful activities.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              5. Changes
            </h3>
            <p>
              Paila may update features, content, or these terms from time
              to time. Updated information will be reflected on this page.
            </p>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section
        id="privacy"
        className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900">
            Privacy Policy
          </h2>
        </div>

        <div className="space-y-5 text-sm leading-7 text-slate-600">
          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              1. Information We Collect
            </h3>
            <p>
              Paila may collect information you provide when creating or
              managing your account, such as your name, email address, and
              phone number.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              2. How Information Is Used
            </h3>
            <p>
              Information may be used to provide account functionality,
              authenticate users, improve the platform, respond to
              feedback, and provide requested travel-related features.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              3. Account Security
            </h3>
            <p>
              Paila uses reasonable technical measures to protect account
              information. However, no online system can guarantee absolute
              security.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              4. Third-Party Services
            </h3>
            <p>
              Some Paila features may rely on third-party services or APIs.
              Information shared with such services may be subject to their
              respective terms and privacy policies.
            </p>
          </div>

          <div>
            <h3 className="mb-1 font-semibold text-slate-900">
              5. Your Choices
            </h3>
            <p>
              You may review and update certain account information through
              your Paila profile. If you have questions about your
              information, you can contact the Paila team.
            </p>
          </div>
        </div>
      </section>
    </div>

    <div className="mt-8 text-center text-xs text-slate-400">
      © {new Date().getFullYear()} Prasun Adhikari. All rights reserved.
    </div>
  </main>
</div>

);
}
