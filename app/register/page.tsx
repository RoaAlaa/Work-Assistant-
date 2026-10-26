import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { RegisterForm } from "@/features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="flex-1">
        <PageContainer className="flex justify-center py-12">
          <Card className="w-full max-w-md">
            <h1 className="text-xl font-semibold text-slate-900">Create an account</h1>
            <p className="mt-1 mb-6 text-sm text-slate-600">
              Passwords are checked locally. No account is created on a server.
            </p>
            <RegisterForm />
          </Card>
        </PageContainer>
      </main>
      <Footer />
    </div>
  );
}
