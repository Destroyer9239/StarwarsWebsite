import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-space bg-space-gradient">
      <div className="flex flex-col items-center gap-8">
        <h1 className="font-display text-3xl text-gold text-glow-gold tracking-widest">
          GALACTIC ARCHIVES
        </h1>
        <SignUp appearance={{
          variables: {
            colorBackground: "#0d1526",
            colorText: "#e2e8f0",
            colorPrimary: "#FFE81F",
            colorInputBackground: "#080f1f",
            colorInputText: "#e2e8f0",
          }
        }} />
      </div>
    </div>
  );
}
