import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { APP_NAME } from "@/lib/constants";

const features = [
  {
    title: "Document assistance",
    body: "Select files, review metadata, and later connect parsing, retrieval, and Q&A.",
  },
  {
    title: "Voice interaction",
    body: "The assistant page includes microphone controls. Speech-to-text is left for you to implement.",
  },
  {
    title: "Repetitive task management",
    body: "Track recurring work such as email, reporting, and data entry. Automation execution is not connected yet.",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <PageContainer>
          <section className="max-w-2xl py-8">
            <p className="text-sm font-medium text-blue-700">{APP_NAME}</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Handle repetitive work with a clear assistant workspace.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-600">
              This app is a frontend starting point: chat layout, document selection, and
              task tracking. AI responses, voice processing, and automation are empty on
              purpose so you can implement them while learning.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/register"
                className="inline-flex rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
              >
                Get started
              </Link>
              <Link
                href="/login"
                className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
              >
                Log in
              </Link>
            </div>
          </section>

          <section className="grid gap-4 py-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <h2 className="text-base font-semibold text-slate-900">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{feature.body}</p>
              </Card>
            ))}
          </section>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
