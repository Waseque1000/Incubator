// // ✅ FULL Home.jsx (with Phone Number field added)

// import { useMemo, useState } from "react";
// import {
//   CheckCircle2,
//   Calendar,
//   Mail,
//   User,
//   BookOpen,
//   TrendingUp,
//   Sparkles,
//   ChevronDown,
//   Phone,
// } from "lucide-react";

// function FieldLabel({ children }) {
//   return (
//     <label className="text-sm font-semibold text-gray-900">{children}</label>
//   );
// }

// function HelperText({ children }) {
//   return <p className="text-xs text-gray-500 mt-1">{children}</p>;
// }

// export default function Home() {
//   const today = new Date().toISOString().slice(0, 10);
//   const formattedDate = new Date().toLocaleDateString("en-US", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   const API_BASE = import.meta.env.VITE_API_BASE || " https://ph-server-ten.vercel.app";

//   const moduleOptions = useMemo(
//     () => ["m-1", "m-2", "m-3", "m-3.5", "m-4", "m-4.7", "m-5", "m-6"],
//     []
//   );

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "", // ✅ NEW
//     module: "",
//     needGuidelines: false,
//   });

//   const [msg, setMsg] = useState({ type: "", text: "" });
//   const [submitting, setSubmitting] = useState(false);

//   function handleChange(e) {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   }

//   function validate() {
//     if (
//       !form.name.trim() ||
//       !form.email.trim() ||
//       !form.phone.trim() || // ✅ required
//       !form.module.trim()
//     ) {
//       return "Please fill in all required fields.";
//     }
//     if (!form.email.includes("@")) return "Please enter a valid email address.";

//     // ✅ simple phone check (7-15 digits)
//     const digits = form.phone.replace(/\D/g, "");
//     if (digits.length < 7 || digits.length > 15) {
//       return "Please enter a valid phone number.";
//     }

//     return "";
//   }

//   async function handleSubmit(e) {
//     e.preventDefault();

//     const err = validate();
//     if (err) {
//       setMsg({ type: "error", text: err });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       setMsg({ type: "", text: "" });

//       const payload = {
//         date: today,
//         name: form.name.trim(),
//         email: form.email.trim(),
//         phone: form.phone.trim(), // ✅ NEW
//         module: form.module.trim(),
//         needGuidelines: !!form.needGuidelines,
//       };

//       const res = await fetch(`${API_BASE}/api/updates`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json().catch(() => ({}));

//       if (!res.ok) {
//         throw new Error(data?.message || "Failed to save update");
//       }

//       setMsg({
//         type: "success",
//         text: data?.message || "Update submitted successfully! 🎉",
//       });

//       setTimeout(() => {
//         setForm({
//           name: "",
//           email: "",
//           phone: "", // ✅ reset
//           module: "",
//           needGuidelines: false,
//         });
//         setSubmitting(false);
//       }, 900);
//     } catch (error) {
//       console.error(error);
//       setSubmitting(false);
//       setMsg({
//         type: "error",
//         text: error?.message || "Failed to save update",
//       });
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-8 animate-fade-in">
//           <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-4">
//             <Calendar className="w-4 h-4 text-purple-600" />
//             <span className="text-sm font-medium text-gray-700">
//               {formattedDate}
//             </span>
//           </div>

//           <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-3">
//             Daily Progress Update
//           </h1>

//           <p className="text-gray-600 text-lg">student Update</p>
//         </div>

//         <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 relative overflow-hidden">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* ✅ Personal Info */}
//             <div className="grid md:grid-cols-2 gap-5">
//               <div className="group">
//                 <FieldLabel>
//                   <div className="flex items-center gap-2">
//                     <User className="w-4 h-4 text-purple-600" />
//                     Name <span className="text-red-500">*</span>
//                   </div>
//                 </FieldLabel>
//                 <input
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   placeholder="Your full name"
//                   className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
//                 />
//               </div>

//               <div className="group">
//                 <FieldLabel>
//                   <div className="flex items-center gap-2">
//                     <Mail className="w-4 h-4 text-purple-600" />
//                     Email <span className="text-red-500">*</span>
//                   </div>
//                 </FieldLabel>
//                 <input
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   type="email"
//                   placeholder="yourname@email.com"
//                   className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
//                 />
//               </div>

//               {/* ✅ NEW: Phone Number */}
//               <div className="group md:col-span-2">
//                 <FieldLabel>
//                   <div className="flex items-center gap-2">
//                     <Phone className="w-4 h-4 text-purple-600" />
//                     Phone Number <span className="text-red-500">*</span>
//                   </div>
//                 </FieldLabel>
//                 <input
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   type="tel"
//                   placeholder="e.g. +8801XXXXXXXXX"
//                   className="mt-2 w-full rounded-2xl border-2 border-gray-200 px-4 py-3.5 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
//                 />
//                 <p className="text-[11px] text-gray-500 mt-2">
//                   Use country code if possible (example: +880...).
//                 </p>
//               </div>
//             </div>

//             {/* ✅ Module */}
//             <div className="group">
//               <FieldLabel>
//                 <div className="flex items-center gap-2">
//                   <BookOpen className="w-4 h-4 text-purple-600" />
//                   Current Module <span className="text-red-500">*</span>
//                 </div>
//               </FieldLabel>
//               <HelperText>Select your current module.</HelperText>

//               <div className="relative mt-2">
//                 <select
//                   name="module"
//                   value={form.module}
//                   onChange={handleChange}
//                   className="w-full appearance-none rounded-2xl border-2 border-gray-200 bg-white px-4 py-3.5 pr-10 outline-none transition-all focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
//                 >
//                   <option value="">Select a module...</option>
//                   {moduleOptions.map((m) => (
//                     <option key={m} value={m}>
//                       {m}
//                     </option>
//                   ))}
//                 </select>
//                 <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               </div>
//             </div>

//             {/* ✅ Guidelines + Submit */}
//             <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
//               <label className="flex items-center gap-3 rounded-2xl border-2 border-gray-200 px-5 py-4 cursor-pointer select-none hover:border-purple-300 hover:bg-purple-50/50 transition-all">
//                 <input
//                   type="checkbox"
//                   name="needGuidelines"
//                   checked={form.needGuidelines}
//                   onChange={handleChange}
//                   className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//                 />
//                 <div>
//                   <div className="text-sm font-semibold text-gray-900 flex items-center gap-2">
//                     <Sparkles className="w-4 h-4 text-purple-600" />
//                     Need Guidelines?
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     Check if you need help
//                   </div>
//                 </div>
//               </label>

//               <button
//                 type="submit"
//                 disabled={submitting}
//                 className={`rounded-2xl px-8 py-4 font-semibold transition-all flex items-center gap-2 text-white shadow-lg shadow-purple-500/30 ${
//                   submitting
//                     ? "bg-green-600"
//                     : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95"
//                 }`}
//               >
//                 {submitting ? (
//                   <>
//                     <CheckCircle2 className="w-5 h-5" />
//                     Submitting...
//                   </>
//                 ) : (
//                   <>
//                     <TrendingUp className="w-5 h-5" />
//                     Submit Update
//                   </>
//                 )}
//               </button>
//             </div>

//             {/* ✅ Message */}
//             {msg.text && (
//               <div
//                 className={`rounded-2xl border-2 px-5 py-4 text-sm font-medium flex items-start gap-3 ${
//                   msg.type === "success"
//                     ? "border-green-200 bg-green-50 text-green-700"
//                     : "border-red-200 bg-red-50 text-red-700"
//                 }`}
//               >
//                 <span className="text-lg">
//                   {msg.type === "success" ? "✅" : "⚠️"}
//                 </span>
//                 <span>{msg.text}</span>
//               </div>
//             )}
//           </form>
//         </div>

//         <style>{`
//           @keyframes fade-in {
//             from { opacity: 0; transform: translateY(-10px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           .animate-fade-in { animation: fade-in 0.5s ease-out; }
//         `}</style>
//       </div>
//     </div>
//   );
// }

// ✅ UPDATED Home.jsx – Modern, Clean & Professional Design (Matching Emerald-Teal Theme)

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Calendar,
  Mail,
  User,
  BookOpen,
  TrendingUp,
  Sparkles,
  ChevronDown,
  Phone,
  UserCheck,
} from "lucide-react";

function FieldLabel({ children }) {
  return (
    <label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
      {children}
    </label>
  );
}

function HelperText({ children }) {
  return <p className="text-xs text-gray-500 mt-1.5">{children}</p>;
}

export default function Home() {
  const today = new Date().toISOString().slice(0, 10);
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const API_BASE =
    import.meta.env.VITE_API_BASE || " https://ph-server-ten.vercel.app";
  // const API_BASE = import.meta.env.VITE_API_BASE || " https://ph-server-ten.vercel.app";
  // const API_BASE =
  //   import.meta.env.VITE_API_BASE || "https://incuvator-server-2dkv.vercel.app";

  const moduleOptions = useMemo(
    () => ["m-1", "m-2", "m-3", "m-3.5", "m-4", "m-4.7", "m-5", "m-6"],
    []
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    module: "",
    needGuidelines: false,
  });

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function validate() {
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.module.trim()
    ) {
      return "Please fill in all required fields.";
    }
    if (!form.email.includes("@")) return "Please enter a valid email address.";

    const digits = form.phone.replace(/\D/g, "");
    if (digits.length < 7 || digits.length > 15) {
      return "Please enter a valid phone number.";
    }

    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const err = validate();
    if (err) {
      setMsg({ type: "error", text: err });
      return;
    }

    try {
      setSubmitting(true);
      setMsg({ type: "", text: "" });

      const payload = {
        date: today,
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        module: form.module.trim(),
        needGuidelines: !!form.needGuidelines,
      };

      const res = await fetch(`${API_BASE}/api/updates`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.message || "Failed to save update");
      }

      setMsg({
        type: "success",
        text: data?.message || "Update submitted successfully! 🎉",
      });

      setTimeout(() => {
        setForm({
          name: "",
          email: "",
          phone: "",
          module: "",
          needGuidelines: false,
        });
        setSubmitting(false);
      }, 900);
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      setMsg({
        type: "error",
        text: error?.message || "Failed to save update",
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg mb-6">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <span className="text-base font-semibold text-gray-700">
              {formattedDate}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Daily Progress Update
          </h1>

          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            <UserCheck className="w-6 h-6 text-emerald-500" />
            Share your today's achievement
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Grid */}
            <div className="grid md:grid-cols-2 gap-7">
              {/* Name */}
              <div>
                <FieldLabel>
                  <User className="w-4 h-4 text-emerald-600" />
                  Full Name <span className="text-red-500">*</span>
                </FieldLabel>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-2xl border-2 border-gray-300 px-5 py-4 text-base outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                />
              </div>

              {/* Email */}
              <div>
                <FieldLabel>
                  <Mail className="w-4 h-4 text-emerald-600" />
                  Email Address <span className="text-red-500">*</span>
                </FieldLabel>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border-2 border-gray-300 px-5 py-4 text-base outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                />
              </div>

              {/* Phone - Full Width */}
              <div className="md:col-span-2">
                <FieldLabel>
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Phone Number <span className="text-red-500">*</span>
                </FieldLabel>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                  className="mt-2 w-full rounded-2xl border-2 border-gray-300 px-5 py-4 text-base outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                />
                <HelperText>
                  Include country code for better reach (e.g., +880 for
                  Bangladesh)
                </HelperText>
              </div>
            </div>

            {/* Module Selection */}
            <div>
              <FieldLabel>
                <BookOpen className="w-4 h-4 text-emerald-600" />
                Current Module <span className="text-red-500">*</span>
              </FieldLabel>
              <HelperText>
                Select the module you're currently working on.
              </HelperText>

              <div className="relative mt-2">
                <select
                  name="module"
                  value={form.module}
                  onChange={handleChange}
                  className="w-full appearance-none rounded-2xl border-2 border-gray-300 bg-white px-5 py-4 pr-12 text-base outline-none transition-all focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20"
                >
                  <option value="">Choose a module...</option>
                  {moduleOptions.map((m) => (
                    <option key={m} value={m}>
                      {m.toUpperCase()}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              </div>
            </div>

            {/* Guidelines Checkbox + Submit */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
              <label className="flex items-center gap-4 rounded-2xl border-2 border-gray-300 px-6 py-5 cursor-pointer select-none hover:border-emerald-400 hover:bg-emerald-50 transition-all w-full md:w-auto">
                <input
                  type="checkbox"
                  name="needGuidelines"
                  checked={form.needGuidelines}
                  onChange={handleChange}
                  className="h-6 w-6 rounded border-gray-400 text-emerald-600 focus:ring-emerald-500"
                />
                <div>
                  <div className="font-semibold text-gray-800 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                    Need Guidelines or Help?
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    We'll reach out with extra support if checked
                  </div>
                </div>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className={`rounded-2xl px-10 py-5 font-bold text-lg transition-all flex items-center gap-3 shadow-xl ${
                  submitting
                    ? "bg-emerald-600 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 active:scale-95 shadow-emerald-500/40"
                }`}
              >
                {submitting ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 animate-pulse" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-6 h-6" />
                    Submit Update
                  </>
                )}
              </button>
            </div>

            {/* Success/Error Message */}
            {msg.text && (
              <div
                className={`rounded-2xl px-6 py-5 text-base font-medium flex items-center gap-4 shadow-inner ${
                  msg.type === "success"
                    ? "bg-emerald-50 border-2 border-emerald-200 text-emerald-800"
                    : "bg-red-50 border-2 border-red-200 text-red-800"
                }`}
              >
                <span className="text-2xl">
                  {msg.type === "success" ? "✅" : "⚠️"}
                </span>
                <span>{msg.text}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
