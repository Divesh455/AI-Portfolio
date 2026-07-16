"use client";

import { useState } from "react";

import { Mail, FileText, Send, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [deliveryMethod, setDeliveryMethod] = useState<"email" | "whatsapp">("email");

  // Configuration: Customize these parameters as needed
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");

    if (deliveryMethod === "whatsapp") {
      const text = `*New Portfolio Message*\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${message}`;
      const encodedText = encodeURIComponent(text);
      const whatsappUrl = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedText}`;
      window.open(whatsappUrl, "_blank");
      
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      // Email submission via Web3Forms API with client-side mailto fallback
      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            name,
            email,
            message,
            subject: `Portfolio Message from ${name}`,
          }),
        });
        const data = await response.json();
        if (data.success) {
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          // Fallback to mailto link
          const mailtoUrl = `mailto:matkardivesh26@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
          window.location.href = mailtoUrl;
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        }
      } catch {
        // Fallback to mailto link
        const mailtoUrl = `mailto:matkardivesh26@gmail.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=Name: ${encodeURIComponent(name)}%0D%0AEmail: ${encodeURIComponent(email)}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        window.location.href = mailtoUrl;
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }
    }
  };

  return (
    <section id="contact" className="relative py-32 bg-[#0B0F19] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-[#D4A017] opacity-[0.02] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-[#F6C453] opacity-[0.02] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#D4A017]/10 bg-[#1F2937]/35 text-[#D4A017] text-xs font-heading font-semibold tracking-widest uppercase mb-4">
            <Mail className="w-3.5 h-3.5" />
            Connect
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-[#F9FAFB]">
            Start a Conversation
          </h2>
          <p className="font-sans text-sm md:text-base text-[#9CA3AF] max-w-xl mx-auto font-light">
            Have a project in mind or interested in hiring? Get in touch to build something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-6xl mx-auto">
          {/* Left panel: Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 p-8 rounded-3xl bg-[#1F2937]/15 border border-white/5">
            <div className="space-y-6">
              <h3 className="font-heading text-2xl font-bold text-[#F9FAFB]">
                Let&apos;s Build Together
              </h3>
              <p className="font-sans text-sm text-[#9CA3AF] leading-relaxed font-light">
                Feel free to reach out via the form, or connect through social links below. I am available for contract architectures, full-time engineering roles, or consulting inquiries.
              </p>
              
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-4 text-sm text-[#9CA3AF]">
                  <div className="w-9 h-9 rounded-lg bg-[#0B0F19] border border-[#D4A017]/25 flex items-center justify-center text-[#D4A017]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#9CA3AF]/50 uppercase tracking-widest font-semibold">Email Me</span>
                    <a href="mailto:matkardivesh26@gmail.com" className="text-[#F9FAFB] hover:text-[#D4A017] transition-colors">
                      matkardivesh26@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
              <a
                href="https://www.linkedin.com/in/divesh-matkar/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B0F19] border border-white/5 text-xs font-heading font-semibold text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <FaLinkedin className="w-4 h-4 text-[#D4A017]" />
                LinkedIn
              </a>

              <a
                href="https://github.com/Divesh455"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B0F19] border border-white/5 text-xs font-heading font-semibold text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <FaGithub className="w-4 h-4 text-[#D4A017]" />
                GitHub
              </a>

              <a
                href="mailto:matkardivesh26@gmail.com"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B0F19] border border-white/5 text-xs font-heading font-semibold text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <Mail className="w-4 h-4 text-[#D4A017]" />
                Email
              </a>

              <a
                href="./src/assets/divesh_matkar_resume.pdf"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B0F19] border border-white/5 text-xs font-heading font-semibold text-[#9CA3AF] hover:text-[#F9FAFB] hover:border-[#D4A017]/40 transition-all duration-300 hover:scale-[1.02]"
              >
                <FileText className="w-4 h-4 text-[#D4A017]" />
                Resume
              </a>
            </div>
          </div>

          {/* Right panel: Form Panel */}
          <div className="lg:col-span-7 glass rounded-3xl p-6 md:p-8 flex flex-col justify-between">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Delivery Method Segment Control */}
              <div className="flex gap-2 p-1 rounded-xl bg-[#111827] border border-white/5 mb-6">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("email")}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryMethod === "email"
                      ? "bg-[#D4A017] text-[#0B0F19] shadow-lg shadow-[#D4A017]/10"
                      : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"
                  }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  Send via Email
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod("whatsapp")}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-heading font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    deliveryMethod === "whatsapp"
                      ? "bg-[#D4A017] text-[#0B0F19] shadow-lg shadow-[#D4A017]/10"
                      : "text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-[#1F2937]/50"
                  }`}
                >
                  <FaWhatsapp className="w-4 h-4" />
                  Send via WhatsApp
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-heading font-semibold text-[#F9FAFB] tracking-wide uppercase">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    disabled={status === "sending" || status === "success"}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/30 focus:outline-none focus:border-[#D4A017] transition-all disabled:opacity-50"
                    required
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-heading font-semibold text-[#F9FAFB] tracking-wide uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    disabled={status === "sending" || status === "success"}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/30 focus:outline-none focus:border-[#D4A017] transition-all disabled:opacity-50"
                    required
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-heading font-semibold text-[#F9FAFB] tracking-wide uppercase">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, timeline, and goals..."
                  rows={5}
                  disabled={status === "sending" || status === "success"}
                  className="w-full px-4 py-3 rounded-xl text-sm bg-[#111827] border border-white/10 text-[#F9FAFB] placeholder-[#9CA3AF]/30 focus:outline-none focus:border-[#D4A017] transition-all disabled:opacity-50 resize-none"
                  required
                />
              </div>

              {/* Message status feedback */}
              {status === "success" && (
                <div className="flex items-center gap-2 p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-xs text-green-400">
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>
                    {deliveryMethod === "whatsapp"
                      ? "Opening WhatsApp chat to send message..."
                      : "Message sent successfully! I will reach back to you shortly."}
                  </span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Submission failed. Please double check all fields are populated.</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "sending" || status === "success"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#D4A017] to-[#F6C453] text-[#0B0F19] text-sm font-heading font-bold tracking-wide uppercase transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(212,160,23,0.3)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {status === "sending" ? "Processing..." : "Send Message"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
