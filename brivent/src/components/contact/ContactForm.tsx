"use client";

import { useState } from "react";
import Container from "@/components/shared/Container";
import SectionHeading from "@/components/shared/SectionHeading";
import ContactInfoCard from "./ContactInfoCard";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      organization: formData.get("company"),
      enquiryType: "General enquiry",
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to send. Please try again."
      );
    }
  }

  return (
    <section className="bg-white py-24 border-b border-border">
      <Container>
        <SectionHeading
          label="Send an Enquiry"
          title="Tell us what you have in mind."
          description="The more context you provide, the better we can understand your request."
          className="mb-12 max-w-2xl"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5">
            <ContactInfoCard />
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white border border-border rounded-2xl p-8 h-full">
              {status === "success" ? (
                <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-8 h-full flex flex-col justify-center">
                  <p className="text-emerald-700 font-semibold mb-1">
                    Thank you for reaching out.
                  </p>
                  <p className="text-emerald-700/80 text-sm leading-relaxed">
                    Your message has been received and the Brivent team will
                    review it and get back to you through the appropriate
                    channel.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[10px] text-muted-light tracking-widest uppercase font-semibold mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="John Samuel"
                        required
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-light"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[10px] text-muted-light tracking-widest uppercase font-semibold mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-light"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-[10px] text-muted-light tracking-widest uppercase font-semibold mb-2"
                    >
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      placeholder="Company Ltd."
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all placeholder:text-muted-light"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[10px] text-muted-light tracking-widest uppercase font-semibold mb-2"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      rows={6}
                      placeholder="Tell us about your project, more than 10 characters..."
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all resize-none placeholder:text-muted-light"
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full px-8 py-3.5 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors disabled:opacity-50"
                  >
                    {status === "loading" ? "Sending..." : "Send Message →"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}