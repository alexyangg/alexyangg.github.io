import Link from "next/link";

export default function PongDemoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Pong Demo</h1>

      <p className="text-neutral-600 dark:text-neutral-300 mb-8">
        A short gameplay demo of Pong showcasing collision detection, score
        tracking, and portal interactions.
      </p>

      <div className="aspect-video rounded-xl overflow-hidden border">
        <video
          src="/assets/videos/Pong_Demo_Vid.mp4"
          controls
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
      <Link
        href="/"
        className="inline-block mt-4 mb-6 text-sm underline underline-offset-4 opacity-80 hover:opacity-100"
      >
        ← Back to home
      </Link>
    </main>
  );
}
