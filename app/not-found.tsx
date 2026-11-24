import SceneController from "@/components/layout/SceneController";
import Button from "@/components/ui/Button";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <>
      <SceneController shape="sphere" side={0} intensity={0.8} />
      <section className="relative flex min-h-[100svh] items-center">
        <div className="container-x text-center">
          <p className="eyebrow justify-center">Error 404</p>
          <h1 className="display mt-6 text-[clamp(6rem,22vw,20rem)] leading-none">
            4<span className="text-gradient">0</span>4
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-fg/70">This page drifted out of orbit. Let&apos;s get you back on course.</p>
          <div className="mt-10 flex justify-center">
            <Button href="/">Back to home</Button>
          </div>
        </div>
      </section>
    </>
  );
}
