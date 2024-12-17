import { checkForToken } from "@/lib/actions";

export default async function Page() {

  await checkForToken();

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">BoopSky</h1>
            <p className="py-6">
              Connect with users.<br />
              Post content. <br />
              Social media that's actually fun.
            </p>
          <div className="flex justify-between">
            <a className="btn btn-primary w-1/3" href="/login">Login</a>
            <a className="btn btn-primary w-1/3" href="/signup">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
}
