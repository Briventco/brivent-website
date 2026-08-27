import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ArrowUpRight } from "lucide-react";
import { auth } from "../lib/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Sign in failed. Check your email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-shell">
      <div className="login-panel">
        <div className="brand-mark">
          B<span>/</span>
        </div>
        <p className="eyebrow">Brivent / Admin</p>
        <h1>Command centre</h1>
        <p className="muted">Manage the content that powers the Brivent website.</p>
        <form onSubmit={submit} className="login-form">
          <label>
            Email
            <input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@brivent.com" required autoFocus />
          </label>
          <label>
            Password
            <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" required />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="primary-button" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
            <ArrowUpRight size={17} />
          </button>
        </form>
      </div>
      <div className="login-aside">
        <span>01</span>
        <p>Keep the public site moving.</p>
        <small>Content, enquiries, and the small details in between.</small>
      </div>
    </main>
  );
}
