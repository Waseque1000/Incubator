// // import { useMemo, useState, useEffect, useRef } from "react";
// // import {
// //   Shield,
// //   Search,
// //   RefreshCw,
// //   Trash2,
// //   Download,
// //   Table,
// //   Users,
// //   CheckCircle2,
// //   ArrowRight,
// //   BarChart3,
// // } from "lucide-react";
// // import html2canvas from "html2canvas-pro";
// // import jsPDF from "jspdf";

// // const ADMIN_PASSWORD = "12345";
// // const API_BASE =
// //   import.meta.env.VITE_API_BASE || " https://ph-server-ten.vercel.app";
// // // const API_BASE =
// // // import.meta.env.VITE_API_BASE || "https://incuvator-server-2dkv.vercel.app";

// // function getAssignedNextModule(moduleText) {
// //   if (!moduleText) return "";
// //   const str = String(moduleText).trim();
// //   const match = str.match(/(module|m)\s*[- ]?\s*([0-9]+(\.[0-9]+)?)/i);
// //   if (!match) return "";
// //   const num = parseFloat(match[2]);
// //   if (Number.isNaN(num)) return "";
// //   const next = num + 1;
// //   const nextStr = Number.isInteger(next) ? String(next) : String(next);
// //   return `m-${nextStr}`;
// // }

// // async function apiGetUpdates() {
// //   const res = await fetch(`${API_BASE}/api/updates`);
// //   if (!res.ok) throw new Error("Failed to load updates");
// //   return res.json();
// // }

// // async function apiClearUpdates() {
// //   const res = await fetch(`${API_BASE}/api/updates`, { method: "DELETE" });
// //   if (!res.ok) throw new Error("Failed to clear updates");
// //   return res.json();
// // }

// // function Badge({ children, tone = "gray" }) {
// //   const tones = {
// //     gray: "bg-gray-100 text-gray-700 border-gray-200",
// //     green: "bg-green-50 text-green-700 border-green-200",
// //   };
// //   return (
// //     <span
// //       className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${tones[tone]}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // }

// // function StatCard({ icon: Icon, label, value, color = "purple" }) {
// //   const colors = {
// //     purple: "from-purple-600 to-pink-600",
// //     green: "from-emerald-600 to-green-600",
// //     blue: "from-blue-600 to-cyan-600",
// //     orange: "from-orange-600 to-amber-600",
// //   };

// //   return (
// //     <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 relative overflow-hidden group hover:shadow-xl transition-all">
// //       <div
// //         className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
// //       />
// //       <div className="relative flex items-center gap-4">
// //         <div
// //           className={`shrink-0 p-3 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}
// //         >
// //           <Icon className="w-5 h-5 text-white" />
// //         </div>
// //         <div>
// //           <div className="text-3xl font-bold text-gray-900 leading-tight">
// //             {value}
// //           </div>
// //           <div className="text-sm text-gray-600">{label}</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function Admin() {
// //   const [pass, setPass] = useState("");
// //   const [ok, setOk] = useState(false);
// //   const [query, setQuery] = useState("");
// //   const [docs, setDocs] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   const tableRef = useRef(null);

// //   const loadUpdates = async () => {
// //     setLoading(true);
// //     try {
// //       const data = await apiGetUpdates();
// //       setDocs(Array.isArray(data) ? data : []);
// //     } catch (e) {
// //       console.error(e);
// //       setDocs([]);
// //       alert("❌ Could not load updates. Check server is running.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (ok) loadUpdates();
// //   }, [ok]);

// //   const allRows = useMemo(() => {
// //     const rows = [];
// //     for (const u of docs) {
// //       const hist = Array.isArray(u.history) ? u.history : [];
// //       for (const h of hist) {
// //         rows.push({
// //           _rowId: `${u._id}_${h.date}`,
// //           name: u.name || "",
// //           email: u.email || "",
// //           phone: u.phone || "",
// //           date: h.date || "",
// //           module: h.module || "",
// //           modules: Array.isArray(h.modules) ? h.modules : [],
// //           needGuidelines: !!h.needGuidelines,
// //           createdAt: h.createdAt || null,
// //           updatedAt: h.updatedAt || null,
// //         });
// //       }
// //     }
// //     rows.sort((a, b) => {
// //       const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
// //       const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
// //       return bt - at;
// //     });
// //     return rows;
// //   }, [docs]);

// //   const filtered = useMemo(() => {
// //     const q = query.trim().toLowerCase();
// //     return allRows.filter((r) => {
// //       return (
// //         !q ||
// //         r.name.toLowerCase().includes(q) ||
// //         r.email.toLowerCase().includes(q) ||
// //         r.phone.toLowerCase().includes(q) ||
// //         r.date.toLowerCase().includes(q) ||
// //         (r.module || "").toLowerCase().includes(q) ||
// //         (r.modules || []).join(" ").toLowerCase().includes(q)
// //       );
// //     });
// //   }, [allRows, query]);

// //   const stats = useMemo(() => {
// //     const totalUsers = docs.length;
// //     const totalRows = allRows.length;
// //     const today = new Date().toISOString().slice(0, 10);
// //     const todayRows = allRows.filter((r) => r.date === today).length;
// //     return { totalUsers, totalRows, todayRows };
// //   }, [docs, allRows]);

// //   const exportToCSV = () => {
// //     if (filtered.length === 0) return alert("No data to export!");

// //     const headers = [
// //       "Date",
// //       "Name",
// //       "Email",
// //       "Phone",
// //       "Current Module (History)",
// //       "Assign New Module",
// //       "Need Guidelines",
// //       "Created At",
// //       "Updated At",
// //     ];

// //     const rows = filtered.map((r) => {
// //       const historyText =
// //         Array.isArray(r.modules) && r.modules.length
// //           ? r.modules.join(" | ")
// //           : r.module || "";

// //       const lastModule =
// //         Array.isArray(r.modules) && r.modules.length
// //           ? r.modules[r.modules.length - 1]
// //           : r.module;

// //       const next = getAssignedNextModule(lastModule);

// //       return [
// //         r.date || "",
// //         r.name || "",
// //         r.email || "",
// //         r.phone || "",
// //         historyText,
// //         next || "",
// //         r.needGuidelines ? "Yes" : "No",
// //         r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
// //         r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "",
// //       ];
// //     });

// //     const csv = [headers.join(","), ...rows.map((x) => x.join(","))].join("\n");
// //     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
// //     const link = document.createElement("a");
// //     const url = URL.createObjectURL(blob);
// //     link.href = url;
// //     link.download = `progress-updates-${new Date()
// //       .toISOString()
// //       .slice(0, 10)}.csv`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //     URL.revokeObjectURL(url);
// //   };

// //   const exportToPDF = async () => {
// //     if (filtered.length === 0) return alert("No data to export!");

// //     const element = tableRef.current;
// //     if (!element) return;

// //     try {
// //       const scrollContainer = element.querySelector(".overflow-x-auto");
// //       const table = scrollContainer?.querySelector("table");

// //       if (!scrollContainer || !table) {
// //         alert("Table structure not found");
// //         return;
// //       }

// //       const origScrollOverflow = scrollContainer.style.overflow;
// //       const origScrollWidth = scrollContainer.style.width;
// //       const origScrollMaxWidth = scrollContainer.style.maxWidth;
// //       const origTableWidth = table.style.width;

// //       scrollContainer.style.overflow = "visible";
// //       scrollContainer.style.width = "auto";
// //       scrollContainer.style.maxWidth = "none";
// //       table.style.width = "max-content";
// //       table.style.minWidth = "100%";

// //       void element.offsetHeight;
// //       await new Promise((resolve) => setTimeout(resolve, 200));

// //       const canvas = await html2canvas(element, {
// //         scale: 2,
// //         useCORS: true,
// //         backgroundColor: "#ffffff",
// //         logging: false,
// //         width: element.scrollWidth,
// //         height: element.scrollHeight,
// //         scrollX: 0,
// //         scrollY: 0,
// //         windowWidth: element.scrollWidth,
// //         windowHeight: element.scrollHeight,
// //       });

// //       scrollContainer.style.overflow = origScrollOverflow;
// //       scrollContainer.style.width = origScrollWidth;
// //       scrollContainer.style.maxWidth = origScrollMaxWidth;
// //       table.style.width = origTableWidth;

// //       const imgData = canvas.toDataURL("image/png");
// //       const isLandscape = canvas.width > canvas.height;

// //       const pdf = new jsPDF({
// //         orientation: isLandscape ? "landscape" : "portrait",
// //         unit: "px",
// //         format: [canvas.width, canvas.height],
// //       });

// //       pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
// //       pdf.save(`progress-updates-${new Date().toISOString().slice(0, 10)}.pdf`);
// //     } catch (err) {
// //       console.error("PDF export error:", err);
// //       alert("❌ Failed to generate PDF. See console for details.");
// //     }
// //   };

// //   const handleClearAll = async () => {
// //     const confirmed = confirm(
// //       "⚠️ Delete ALL submissions? This cannot be undone!"
// //     );
// //     if (!confirmed) return;
// //     try {
// //       await apiClearUpdates();
// //       setDocs([]);
// //       alert("✅ All submissions cleared!");
// //     } catch (e) {
// //       console.error(e);
// //       alert("❌ Failed to clear. Check server.");
// //     }
// //   };

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     if (pass === ADMIN_PASSWORD) setOk(true);
// //     else alert("❌ Wrong password!");
// //   };

// //   if (!ok) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
// //         <div className="max-w-md w-full bg-white/95 rounded-3xl shadow-2xl p-8">
// //           <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shadow-lg">
// //             <Shield className="w-8 h-8 text-white" />
// //           </div>
// //           <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
// //             Admin Access
// //           </h1>
// //           <p className="text-gray-600 mt-2">Enter admin password.</p>

// //           <form className="mt-6 space-y-4" onSubmit={handleLogin}>
// //             <input
// //               type="password"
// //               value={pass}
// //               onChange={(e) => setPass(e.target.value)}
// //               placeholder="Enter admin password"
// //               className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3.5 outline-none"
// //             />
// //             <button
// //               type="submit"
// //               className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3.5 font-bold"
// //             >
// //               Enter Admin Panel
// //             </button>
// //           </form>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto space-y-6">
// //         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
// //           <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
// //             <div>
// //               <div className="inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-200">
// //                 <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
// //                   <BarChart3 className="w-5 h-5 text-white" />
// //                 </div>
// //                 <div>
// //                   <div className="text-sm font-bold text-gray-900">
// //                     Admin Dashboard
// //                   </div>
// //                 </div>
// //               </div>

// //               <h1 className="mt-4 text-2xl md:text-3xl font-black text-gray-900">
// //                 Progress Control Center
// //               </h1>
// //             </div>

// //             <div className="flex gap-1 flex-wrap">
// //               <button
// //                 onClick={loadUpdates}
// //                 disabled={loading}
// //                 className="rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-50"
// //               >
// //                 <RefreshCw
// //                   className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
// //                 />
// //                 Refresh
// //               </button>

// //               <button
// //                 onClick={exportToCSV}
// //                 disabled={filtered.length === 0}
// //                 className="rounded-2xl bg-emerald-600 text-white px-4 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-50"
// //               >
// //                 <Download className="w-4 h-4" />
// //                 Export CSV (Full Data)
// //               </button>

// //               <button
// //                 onClick={exportToPDF}
// //                 disabled={filtered.length === 0}
// //                 className="rounded-2xl bg-red-600 text-white px-4 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-50"
// //               >
// //                 <Download className="w-4 h-4" />
// //                 Export PDF (No Email/Phone)
// //               </button>

// //               <button
// //                 onClick={handleClearAll}
// //                 disabled={docs.length === 0}
// //                 className="rounded-2xl bg-rose-600 text-white px-4 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-50"
// //               >
// //                 <Trash2 className="w-4 h-4" />
// //                 Clear All
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //           <StatCard
// //             icon={Users}
// //             label="Total Users"
// //             value={stats.totalUsers}
// //             color="purple"
// //           />
// //           <StatCard
// //             icon={Table}
// //             label="Total Rows"
// //             value={stats.totalRows}
// //             color="orange"
// //           />
// //           <StatCard
// //             icon={CheckCircle2}
// //             label="Today's Rows"
// //             value={stats.todayRows}
// //             color="blue"
// //           />
// //         </div>

// //         <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 md:p-6">
// //           <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
// //               <input
// //                 value={query}
// //                 onChange={(e) => setQuery(e.target.value)}
// //                 placeholder="Search by name, module, date..."
// //                 className="w-full rounded-2xl border-2 border-gray-200 pl-12 pr-4 py-3.5 outline-none"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         <div
// //           ref={tableRef}
// //           className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
// //         >
// //           <div className="overflow-x-auto">
// //             <table className="w-full">
// //               <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-100">
// //                 <tr>
// //                   {[
// //                     "Date",
// //                     "Name",
// //                     "Current Module",
// //                     "Assign New Module",
// //                     "Guidelines",
// //                   ].map((h) => (
// //                     <th
// //                       key={h}
// //                       className="px-6 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider"
// //                     >
// //                       {h}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-gray-100">
// //                 {filtered.map((r, idx) => {
// //                   const historyText =
// //                     Array.isArray(r.modules) && r.modules.length
// //                       ? r.modules.join(" | ")
// //                       : r.module || "";

// //                   const lastModule =
// //                     Array.isArray(r.modules) && r.modules.length
// //                       ? r.modules[r.modules.length - 1]
// //                       : r.module;

// //                   const next = getAssignedNextModule(lastModule);

// //                   return (
// //                     <tr
// //                       key={r._rowId}
// //                       className={`${
// //                         idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
// //                       } hover:bg-gray-50`}
// //                     >
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
// //                         {r.date}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
// //                         {r.name}
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-purple-50 border border-purple-100">
// //                           <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full bg-purple-600 text-white">
// //                             CURRENT
// //                           </span>
// //                           <span className="text-sm font-black text-purple-800">
// //                             {historyText || "—"}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20">
// //                           <span className="text-[10px] font-black tracking-widest bg-white/20 px-2 py-1 rounded-full">
// //                             NEXT
// //                           </span>
// //                           <ArrowRight className="w-4 h-4" />
// //                           <span className="text-sm font-black">
// //                             {next || "—"}
// //                           </span>
// //                         </div>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         {r.needGuidelines ? (
// //                           <Badge tone="green">Yes</Badge>
// //                         ) : (
// //                           <Badge tone="gray">No</Badge>
// //                         )}
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>

// //           <div className="text-center text-sm text-gray-500 py-4">
// //             Showing {filtered.length} of {allRows.length} rows (history)
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import { useMemo, useState, useEffect, useRef } from "react";
// import {
//   Shield,
//   Search,
//   RefreshCw,
//   Trash2,
//   Download,
//   Table,
//   Users,
//   CheckCircle2,
//   ArrowRight,
//   BarChart3,
// } from "lucide-react";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";

// const ADMIN_PASSWORD = "12345";
// const API_BASE =
//   import.meta.env.VITE_API_BASE || " https://ph-server-ten.vercel.app";
// // const API_BASE =
// // import.meta.env.VITE_API_BASE || "https://incuvator-server-2dkv.vercel.app";

// function getAssignedNextModule(moduleText) {
//   if (!moduleText) return "";
//   const str = String(moduleText).trim();
//   const match = str.match(/(module|m)\s*[- ]?\s*([0-9]+(\.[0-9]+)?)/i);
//   if (!match) return "";
//   const num = parseFloat(match[2]);
//   if (Number.isNaN(num)) return "";
//   const next = num + 1;
//   const nextStr = Number.isInteger(next) ? String(next) : String(next);
//   return `m-${nextStr}`;
// }

// async function apiGetUpdates() {
//   const res = await fetch(`${API_BASE}/api/updates`);
//   if (!res.ok) throw new Error("Failed to load updates");
//   return res.json();
// }

// async function apiClearUpdates() {
//   const res = await fetch(`${API_BASE}/api/updates`, { method: "DELETE" });
//   if (!res.ok) throw new Error("Failed to clear updates");
//   return res.json();
// }

// function Badge({ children, tone = "gray" }) {
//   const tones = {
//     gray: "bg-gray-100 text-gray-700 border-gray-200",
//     green: "bg-green-50 text-green-700 border-green-200",
//   };
//   return (
//     <span
//       className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${tones[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// function StatCard({ icon: Icon, label, value, color = "purple" }) {
//   const colors = {
//     purple: "from-purple-600 to-pink-600",
//     green: "from-emerald-600 to-green-600",
//     blue: "from-blue-600 to-cyan-600",
//     orange: "from-orange-600 to-amber-600",
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 relative overflow-hidden group hover:shadow-xl transition-all">
//       <div
//         className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
//       />
//       <div className="relative flex items-center gap-3 sm:gap-4">
//         <div
//           className={`shrink-0 p-3 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}
//         >
//           <Icon className="w-5 h-5 text-white" />
//         </div>
//         <div>
//           <div className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
//             {value}
//           </div>
//           <div className="text-xs sm:text-sm text-gray-600">{label}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function Admin() {
//   const [pass, setPass] = useState("");
//   const [ok, setOk] = useState(false);
//   const [query, setQuery] = useState("");
//   const [docs, setDocs] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const tableRef = useRef(null);

//   const loadUpdates = async () => {
//     setLoading(true);
//     try {
//       const data = await apiGetUpdates();
//       setDocs(Array.isArray(data) ? data : []);
//     } catch (e) {
//       console.error(e);
//       setDocs([]);
//       alert("❌ Could not load updates. Check server is running.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (ok) loadUpdates();
//   }, [ok]);

//   const allRows = useMemo(() => {
//     const rows = [];
//     for (const u of docs) {
//       const hist = Array.isArray(u.history) ? u.history : [];
//       for (const h of hist) {
//         rows.push({
//           _rowId: `${u._id}_${h.date}`,
//           name: u.name || "",
//           email: u.email || "",
//           phone: u.phone || "",
//           date: h.date || "",
//           module: h.module || "",
//           modules: Array.isArray(h.modules) ? h.modules : [],
//           needGuidelines: !!h.needGuidelines,
//           createdAt: h.createdAt || null,
//           updatedAt: h.updatedAt || null,
//         });
//       }
//     }
//     rows.sort((a, b) => {
//       const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
//       const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
//       return bt - at;
//     });
//     return rows;
//   }, [docs]);

//   const filtered = useMemo(() => {
//     const q = query.trim().toLowerCase();
//     return allRows.filter((r) => {
//       return (
//         !q ||
//         r.name.toLowerCase().includes(q) ||
//         r.email.toLowerCase().includes(q) ||
//         r.phone.toLowerCase().includes(q) ||
//         r.date.toLowerCase().includes(q) ||
//         (r.module || "").toLowerCase().includes(q) ||
//         (r.modules || []).join(" ").toLowerCase().includes(q)
//       );
//     });
//   }, [allRows, query]);

//   const stats = useMemo(() => {
//     const totalUsers = docs.length;
//     const totalRows = allRows.length;
//     const today = new Date().toISOString().slice(0, 10);
//     const todayRows = allRows.filter((r) => r.date === today).length;
//     return { totalUsers, totalRows, todayRows };
//   }, [docs, allRows]);

//   const exportToCSV = () => {
//     if (filtered.length === 0) return alert("No data to export!");

//     const headers = [
//       "Date",
//       "Name",
//       "Email",
//       "Phone",
//       "Current Module (History)",
//       "Assign New Module",
//       "Need Guidelines",
//       "Created At",
//       "Updated At",
//     ];

//     const rows = filtered.map((r) => {
//       const historyText =
//         Array.isArray(r.modules) && r.modules.length
//           ? r.modules.join(" | ")
//           : r.module || "";

//       const lastModule =
//         Array.isArray(r.modules) && r.modules.length
//           ? r.modules[r.modules.length - 1]
//           : r.module;

//       const next = getAssignedNextModule(lastModule);

//       return [
//         r.date || "",
//         r.name || "",
//         r.email || "",
//         r.phone || "",
//         historyText,
//         next || "",
//         r.needGuidelines ? "Yes" : "No",
//         r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
//         r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "",
//       ];
//     });

//     const csv = [headers.join(","), ...rows.map((x) => x.join(","))].join("\n");
//     const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);
//     link.href = url;
//     link.download = `progress-updates-${new Date()
//       .toISOString()
//       .slice(0, 10)}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//     URL.revokeObjectURL(url);
//   };

//   const exportToPDF = async () => {
//     if (filtered.length === 0) return alert("No data to export!");

//     const element = tableRef.current;
//     if (!element) return;

//     try {
//       const scrollContainer = element.querySelector(".overflow-x-auto");
//       const table = scrollContainer?.querySelector("table");

//       if (!scrollContainer || !table) {
//         alert("Table structure not found");
//         return;
//       }

//       const origScrollOverflow = scrollContainer.style.overflow;
//       const origScrollWidth = scrollContainer.style.width;
//       const origScrollMaxWidth = scrollContainer.style.maxWidth;
//       const origTableWidth = table.style.width;

//       scrollContainer.style.overflow = "visible";
//       scrollContainer.style.width = "auto";
//       scrollContainer.style.maxWidth = "none";
//       table.style.width = "max-content";
//       table.style.minWidth = "100%";

//       void element.offsetHeight;
//       await new Promise((resolve) => setTimeout(resolve, 200));

//       const canvas = await html2canvas(element, {
//         scale: 2,
//         useCORS: true,
//         backgroundColor: "#ffffff",
//         logging: false,
//         width: element.scrollWidth,
//         height: element.scrollHeight,
//         scrollX: 0,
//         scrollY: 0,
//         windowWidth: element.scrollWidth,
//         windowHeight: element.scrollHeight,
//       });

//       scrollContainer.style.overflow = origScrollOverflow;
//       scrollContainer.style.width = origScrollWidth;
//       scrollContainer.style.maxWidth = origScrollMaxWidth;
//       table.style.width = origTableWidth;

//       const imgData = canvas.toDataURL("image/png");
//       const isLandscape = canvas.width > canvas.height;

//       const pdf = new jsPDF({
//         orientation: isLandscape ? "landscape" : "portrait",
//         unit: "px",
//         format: [canvas.width, canvas.height],
//       });

//       pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
//       pdf.save(`progress-updates-${new Date().toISOString().slice(0, 10)}.pdf`);
//     } catch (err) {
//       console.error("PDF export error:", err);
//       alert("❌ Failed to generate PDF. See console for details.");
//     }
//   };

//   const handleClearAll = async () => {
//     const confirmed = confirm(
//       "⚠️ Delete ALL submissions? This cannot be undone!"
//     );
//     if (!confirmed) return;
//     try {
//       await apiClearUpdates();
//       setDocs([]);
//       alert("✅ All submissions cleared!");
//     } catch (e) {
//       console.error(e);
//       alert("❌ Failed to clear. Check server.");
//     }
//   };

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (pass === ADMIN_PASSWORD) setOk(true);
//     else alert("❌ Wrong password!");
//   };

//   if (!ok) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
//         <div className="max-w-md w-full bg-white/95 rounded-3xl shadow-2xl p-6 sm:p-8">
//           <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shadow-lg">
//             <Shield className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//             Admin Access
//           </h1>
//           <p className="text-gray-600 mt-2 text-sm sm:text-base">
//             Enter admin password.
//           </p>

//           <form className="mt-6 space-y-4" onSubmit={handleLogin}>
//             <input
//               type="password"
//               value={pass}
//               onChange={(e) => setPass(e.target.value)}
//               placeholder="Enter admin password"
//               className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 sm:py-3.5 outline-none"
//             />
//             <button
//               type="submit"
//               className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 sm:py-3.5 font-bold"
//             >
//               Enter Admin Panel
//             </button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-3 py-4 sm:px-4 sm:py-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-5 sm:space-y-6">
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-10">
//           <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 sm:gap-6">
//             <div>
//               <div className="inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-200">
//                 <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
//                   <BarChart3 className="w-5 h-5 text-white" />
//                 </div>
//                 <div>
//                   <div className="text-sm font-bold text-gray-900">
//                     Admin Dashboard
//                   </div>
//                 </div>
//               </div>

//               <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
//                 Progress Control Center
//               </h1>
//             </div>

//             <div className="flex gap-2 flex-wrap w-full lg:w-auto">
//               <button
//                 onClick={loadUpdates}
//                 disabled={loading}
//                 className="w-full sm:w-auto rounded-2xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 <RefreshCw
//                   className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
//                 />
//                 Refresh
//               </button>

//               <button
//                 onClick={exportToCSV}
//                 disabled={filtered.length === 0}
//                 className="w-full sm:w-auto rounded-2xl bg-emerald-600 text-white px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 <Download className="w-4 h-4" />
//                 Export CSV (Full Data)
//               </button>

//               <button
//                 onClick={exportToPDF}
//                 disabled={filtered.length === 0}
//                 className="w-full sm:w-auto rounded-2xl bg-red-600 text-white px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 <Download className="w-4 h-4" />
//                 Export PDF (No Email/Phone)
//               </button>

//               <button
//                 onClick={handleClearAll}
//                 disabled={docs.length === 0}
//                 className="w-full sm:w-auto rounded-2xl bg-rose-600 text-white px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
//               >
//                 <Trash2 className="w-4 h-4" />
//                 Clear All
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
//           <StatCard
//             icon={Users}
//             label="Total Users"
//             value={stats.totalUsers}
//             color="purple"
//           />
//           <StatCard
//             icon={Table}
//             label="Total Rows"
//             value={stats.totalRows}
//             color="orange"
//           />
//           <StatCard
//             icon={CheckCircle2}
//             label="Today's Rows"
//             value={stats.todayRows}
//             color="blue"
//           />
//         </div>

//         <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 md:p-6">
//           <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
//             <div className="flex-1 relative">
//               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
//               <input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search by name, module, date..."
//                 className="w-full rounded-2xl border-2 border-gray-200 pl-12 pr-4 py-3 sm:py-3.5 outline-none text-sm sm:text-base"
//               />
//             </div>
//           </div>
//         </div>

//         <div
//           ref={tableRef}
//           className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
//         >
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[760px]">
//               <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-100">
//                 <tr>
//                   {[
//                     "Date",
//                     "Name",
//                     "Current Module",
//                     "Assign New Module",
//                     "Guidelines",
//                   ].map((h) => (
//                     <th
//                       key={h}
//                       className="px-4 sm:px-6 py-3 sm:py-4 text-left text-[10px] sm:text-xs font-black text-gray-700 uppercase tracking-wider whitespace-nowrap"
//                     >
//                       {h}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-gray-100">
//                 {filtered.map((r, idx) => {
//                   const historyText =
//                     Array.isArray(r.modules) && r.modules.length
//                       ? r.modules.join(" | ")
//                       : r.module || "";

//                   const lastModule =
//                     Array.isArray(r.modules) && r.modules.length
//                       ? r.modules[r.modules.length - 1]
//                       : r.module;

//                   const next = getAssignedNextModule(lastModule);

//                   return (
//                     <tr
//                       key={r._rowId}
//                       className={`${
//                         idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
//                       } hover:bg-gray-50`}
//                     >
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">
//                         {r.date}
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm font-bold text-gray-900">
//                         {r.name}
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
//                         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-purple-50 border border-purple-100">
//                           <span className="text-[9px] sm:text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full bg-purple-600 text-white">
//                             CURRENT
//                           </span>
//                           <span className="text-xs sm:text-sm font-black text-purple-800">
//                             {historyText || "—"}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
//                         <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20">
//                           <span className="text-[9px] sm:text-[10px] font-black tracking-widest bg-white/20 px-2 py-1 rounded-full">
//                             NEXT
//                           </span>
//                           <ArrowRight className="w-4 h-4" />
//                           <span className="text-xs sm:text-sm font-black">
//                             {next || "—"}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
//                         {r.needGuidelines ? (
//                           <Badge tone="green">Yes</Badge>
//                         ) : (
//                           <Badge tone="gray">No</Badge>
//                         )}
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           <div className="text-center text-xs sm:text-sm text-gray-500 py-3 sm:py-4 px-3">
//             Showing {filtered.length} of {allRows.length} rows (history)
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState, useEffect, useRef } from "react";
import {
  Shield,
  Search,
  RefreshCw,
  Trash2,
  Download,
  Table,
  Users,
  CheckCircle2,
  ArrowRight,
  BarChart3,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const ADMIN_PASSWORD = "12345";
const API_BASE =
  import.meta.env.VITE_API_BASE || "https://ph-server-ten.vercel.app";

function getAssignedNextModule(moduleText) {
  if (!moduleText) return "";
  const str = String(moduleText).trim();
  const match = str.match(/(module|m)\s*[- ]?\s*([0-9]+(\.[0-9]+)?)/i);
  if (!match) return "";
  const num = parseFloat(match[2]);
  if (Number.isNaN(num)) return "";
  const next = num + 1;
  return `m-${Number.isInteger(next) ? next : next.toFixed(1)}`;
}

async function apiGetUpdates() {
  const res = await fetch(`${API_BASE}/api/updates`);
  if (!res.ok) throw new Error("Failed to load updates");
  return res.json();
}

async function apiClearUpdates() {
  const res = await fetch(`${API_BASE}/api/updates`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear updates");
  return res.json();
}

function Badge({ children, tone = "gray" }) {
  const tones = {
    gray: "bg-gray-100 text-gray-700 border-gray-200",
    green: "bg-green-50 text-green-700 border-green-200",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, color = "purple" }) {
  const colors = {
    purple: "from-purple-600 to-pink-600",
    green: "from-emerald-600 to-green-600",
    blue: "from-blue-600 to-cyan-600",
    orange: "from-orange-600 to-amber-600",
  };
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-4 sm:p-6 relative overflow-hidden group hover:shadow-xl transition-all">
      <div
        className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${colors[color]} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity`}
      />
      <div className="relative flex items-center gap-3 sm:gap-4">
        <div
          className={`shrink-0 p-3 rounded-2xl bg-gradient-to-br ${colors[color]} shadow-lg`}
        >
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            {value}
          </div>
          <div className="text-xs sm:text-sm text-gray-600">{label}</div>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
        </div>
      </div>
      <p className="mt-8 text-gray-600 font-medium text-lg">
        Loading progress updates...
      </p>
    </div>
  );
}

export default function Admin() {
  const [pass, setPass] = useState("");
  const [ok, setOk] = useState(false);
  const [query, setQuery] = useState("");
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);

  const loadUpdates = async () => {
    setLoading(true);
    try {
      const data = await apiGetUpdates();
      setDocs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setDocs([]);
      alert("❌ Could not load updates. Check server connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ok) loadUpdates();
  }, [ok]);

  const allRows = useMemo(() => {
    const rows = [];
    for (const u of docs) {
      const hist = Array.isArray(u.history) ? u.history : [];
      for (const h of hist) {
        rows.push({
          _rowId: `${u._id}_${h.date}`,
          name: u.name || "",
          email: u.email || "",
          phone: u.phone || "",
          date: h.date || "",
          module: h.module || "",
          modules: Array.isArray(h.modules) ? h.modules : [],
          needGuidelines: !!h.needGuidelines,
          createdAt: h.createdAt || null,
          updatedAt: h.updatedAt || null,
        });
      }
    }
    rows.sort((a, b) => {
      const at = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bt = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bt - at;
    });
    return rows;
  }, [docs]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allRows.filter(
      (r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.date.toLowerCase().includes(q) ||
        (r.module || "").toLowerCase().includes(q) ||
        (r.modules || []).join(" ").toLowerCase().includes(q)
    );
  }, [allRows, query]);

  const stats = useMemo(() => {
    const totalUsers = docs.length;
    const totalRows = allRows.length;
    const today = new Date().toISOString().slice(0, 10);
    const todayRows = allRows.filter((r) => r.date === today).length;
    return { totalUsers, totalRows, todayRows };
  }, [docs, allRows]);

  const exportToCSV = () => {
    if (filtered.length === 0) return alert("No data to export!");
    const headers = [
      "Date",
      "Name",
      "Email",
      "Phone",
      "Current Module (History)",
      "Assign New Module",
      "Need Guidelines",
      "Created At",
      "Updated At",
    ];
    const rows = filtered.map((r) => {
      const historyText =
        Array.isArray(r.modules) && r.modules.length
          ? r.modules.join(" | ")
          : r.module || "";
      const lastModule =
        Array.isArray(r.modules) && r.modules.length
          ? r.modules[r.modules.length - 1]
          : r.module;
      const next = getAssignedNextModule(lastModule);
      return [
        r.date || "",
        r.name || "",
        r.email || "",
        r.phone || "",
        historyText,
        next || "",
        r.needGuidelines ? "Yes" : "No",
        r.createdAt ? new Date(r.createdAt).toLocaleString() : "",
        r.updatedAt ? new Date(r.updatedAt).toLocaleString() : "",
      ];
    });
    const csv = [headers.join(","), ...rows.map((x) => x.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `progress-updates-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const exportToPDF = async () => {
    if (filtered.length === 0) return alert("No data to export!");
    const element = tableRef.current;
    if (!element) return;

    try {
      const scrollContainer = element.querySelector(".overflow-x-auto");
      const table = scrollContainer?.querySelector("table");
      if (!scrollContainer || !table) {
        alert("Table structure not found");
        return;
      }

      const origOverflow = scrollContainer.style.overflow;
      const origWidth = scrollContainer.style.width;
      const origMaxWidth = scrollContainer.style.maxWidth;
      const origTableWidth = table.style.width;

      scrollContainer.style.overflow = "visible";
      scrollContainer.style.width = "auto";
      scrollContainer.style.maxWidth = "none";
      table.style.width = "max-content";
      table.style.minWidth = "100%";

      await new Promise((r) => setTimeout(r, 200));

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
      });

      scrollContainer.style.overflow = origOverflow;
      scrollContainer.style.width = origWidth;
      scrollContainer.style.maxWidth = origMaxWidth;
      table.style.width = origTableWidth;

      const imgData = canvas.toDataURL("image/png");
      const isLandscape = canvas.width > canvas.height;
      const pdf = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`progress-updates-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error("PDF export error:", err);
      alert("❌ Failed to generate PDF. Check console.");
    }
  };

  const handleClearAll = async () => {
    if (!confirm("⚠️ Delete ALL submissions? This cannot be undone!")) return;
    try {
      await apiClearUpdates();
      setDocs([]);
      alert("✅ All submissions cleared!");
    } catch (e) {
      console.error(e);
      alert("❌ Failed to clear data. Check server.");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) setOk(true);
    else alert("❌ Wrong password!");
  };

  if (!ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/95 rounded-3xl shadow-2xl p-6 sm:p-8">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Admin Access
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Enter admin password to continue
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-2xl border-2 border-gray-200 px-4 py-3 sm:py-3.5 outline-none focus:border-purple-500 transition-colors"
            />
            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 sm:py-3.5 font-bold hover:brightness-110 transition"
            >
              Enter Admin Panel
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-3 py-4 sm:px-4 sm:py-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 sm:p-6 md:p-10">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm font-bold text-gray-900">
                  Admin Dashboard
                </div>
              </div>
              <h1 className="mt-4 text-xl sm:text-2xl md:text-3xl font-black text-gray-900">
                Progress Control Center
              </h1>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={loadUpdates}
                disabled={loading}
                className="rounded-2xl border-2 border-gray-200 bg-white px-5 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-60 hover:bg-gray-50 transition"
              >
                <RefreshCw
                  className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>

              <button
                onClick={exportToCSV}
                disabled={filtered.length === 0 || loading}
                className="rounded-2xl bg-emerald-600 text-white px-5 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-60 hover:bg-emerald-700 transition"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>

              <button
                onClick={exportToPDF}
                disabled={filtered.length === 0 || loading}
                className="rounded-2xl bg-rose-600 text-white px-5 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-60 hover:bg-rose-700 transition"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>

              <button
                onClick={handleClearAll}
                disabled={docs.length === 0 || loading}
                className="rounded-2xl bg-gray-800 text-white px-5 py-3 text-sm font-bold flex items-center gap-2 disabled:opacity-60 hover:bg-gray-900 transition"
              >
                <Trash2 className="w-4 h-4" />
                Clear All
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : docs.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-12 text-center">
            <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
              <Table className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-3">
              No progress updates yet
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              When participants submit their module progress, all entries will
              appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                icon={Users}
                label="Total Users"
                value={stats.totalUsers}
                color="purple"
              />
              <StatCard
                icon={Table}
                label="Total Entries"
                value={stats.totalRows}
                color="orange"
              />
              <StatCard
                icon={CheckCircle2}
                label="Today's Entries"
                value={stats.todayRows}
                color="blue"
              />
            </div>

            {/* Search */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-5 md:p-6">
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, email, phone, module, date..."
                  className="w-full rounded-2xl border-2 border-gray-200 pl-12 pr-5 py-3 outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Table */}
            <div
              ref={tableRef}
              className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gradient-to-r from-purple-50 to-pink-50 border-b-2 border-gray-100">
                    <tr>
                      {[
                        "Date",
                        "Name",
                        "Current Module",
                        "Next Module",
                        "Guidelines",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-left text-xs font-black text-gray-700 uppercase tracking-wider whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filtered.map((r, idx) => {
                      const historyText =
                        Array.isArray(r.modules) && r.modules.length
                          ? r.modules.join(" | ")
                          : r.module || "—";
                      const lastModule =
                        Array.isArray(r.modules) && r.modules.length
                          ? r.modules[r.modules.length - 1]
                          : r.module;
                      const next = getAssignedNextModule(lastModule);

                      return (
                        <tr
                          key={r._rowId}
                          className={`${
                            idx % 2 === 0 ? "bg-white" : "bg-gray-50/60"
                          } hover:bg-purple-50/50 transition-colors`}
                        >
                          <td className="px-5 py-4 whitespace-nowrap text-sm text-gray-600">
                            {r.date || "—"}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {r.name || "—"}
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-purple-50 border border-purple-100">
                              <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 rounded-full bg-purple-600 text-white">
                                CURRENT
                              </span>
                              <span className="text-sm font-bold text-purple-800">
                                {historyText}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20">
                              <span className="text-[10px] font-black tracking-widest bg-white/20 px-2 py-1 rounded-full">
                                NEXT
                              </span>
                              <ArrowRight className="w-4 h-4" />
                              <span className="text-sm font-bold">
                                {next || "—"}
                              </span>
                            </div>
                          </td>
                          <td className="px-5 py-4 whitespace-nowrap">
                            {r.needGuidelines ? (
                              <Badge tone="green">Yes</Badge>
                            ) : (
                              <Badge tone="gray">No</Badge>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="text-center text-sm text-gray-500 py-4 px-5">
                Showing {filtered.length} of {allRows.length} entries
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
