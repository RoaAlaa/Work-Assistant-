import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/features/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <PageContainer className="flex justify-center py-12">
          <Card className="w-full max-w-md">
            <h1 className="text-xl font-semibold text-slate-900">Log in</h1>
            <p className="mt-1 mb-6 text-sm text-slate-600">
              Form validation runs in the browser. There is no real authentication yet.
            </p>
            <LoginForm />
          </Card>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
