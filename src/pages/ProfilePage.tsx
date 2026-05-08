
// import { useEffect, useState } from "react";

// const API = "https://cpmmarker.onrender.com";

// type User = {
//   id: number;
//   name: string;
//   email?: string;
//   avatar?: string;
//   ref_code?: string;
//   ref_count?: number;
//   telegram_username?: string;
//   telegram_id?: string;

//   active_promo?: {
//     promo_code: string;
//     rules: {
//       discount: number;
//       allowed_types?: string[];
//     };
//   } | null;
// };

// export default function ProfilePage() {
//   const [user, setUser] = useState<User | null>(null);

//   const [file, setFile] = useState<File | null>(null);
//   const [preview, setPreview] = useState<string | null>(null);

//   const [promo, setPromo] = useState("");


//   const [discount, setDiscount] = useState(0);
//   const [promoNotice, setPromoNotice] = useState<string | null>(null);

//   const token = localStorage.getItem("token");

//   /* ================= LOAD ================= */
//   const loadUser = async () => {
//     try {
//       const res = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const data = await res.json();

//       if (!data?.id) {
//         window.location.href = "/auth";
//         return;
//       }

//       setUser(data);
//       setDiscount(data?.active_promo?.rules?.discount ?? 0);
//     } catch (e) {
//       console.log(e);
//       window.location.href = "/auth";
//     }
//   };

//   useEffect(() => {
//     console.log("USER:", user);
//     loadUser();
//   }, []);

//   /* ================= UPLOAD AVATAR ================= */
//   const uploadAvatar = async () => {
//     if (!file) return alert("Выбери фото");

//     const form = new FormData();
//     form.append("avatar", file);

//     const res = await fetch(`${API}/profile/upload-avatar`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: form,
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setUser(data.user);
//       setFile(null);
//       setPreview(null);
//     } else {
//       alert(data?.error || "Upload error");
//     }
//   };

//   /* ================= PROMO ================= */
//   const applyPromo = async () => {
//     if (!promo.trim()) return alert("Введите промокод");

//     const res = await fetch(`${API}/promo/redeem`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify({ code: promo }),
//     });

//     const data = await res.json();

//     if (data?.success) {
//       setPromo("");

//       const updated = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const u = await updated.json();

//       setUser(u);
//       setDiscount(u?.active_promo?.rules?.discount ?? 0);

//       setPromoNotice(
//         `🎉 Promo activated! -${u?.active_promo?.rules?.discount || 0}%`
//       );

//       setTimeout(() => setPromoNotice(null), 3000);
//     } else {
//       alert(data?.error || "Invalid promo");
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-black text-white">
//         Loading...
//       </div>
//     );
//   }

//   const avatarUrl =
//     preview ||
//     (user.avatar
//       ? user.avatar.startsWith("http")
//         ? user.avatar
//         : `${API}${user.avatar}`
//       : null);

//   const refLink = user?.ref_code
//     ? `${window.location.origin}/auth?ref=${user.ref_code}`
//     : `${window.location.origin}/auth`;

//   return (
//     <div className="min-h-screen bg-[#0a0b0d] text-white p-6">
//       <div className="max-w-4xl mx-auto space-y-6">

//         {/* NOTIFICATION */}
//         {promoNotice && (
//           <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-xl font-bold">
//             {promoNotice}
//           </div>
//         )}

//         {/* HEADER */}
//         <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">

//           <div className="w-24 h-24 rounded-2xl overflow-hidden bg-yellow-400 flex items-center justify-center font-black text-3xl">
//             {avatarUrl ? (
//               <img src={avatarUrl} className="w-full h-full object-cover" />
//             ) : (
//               user.name?.[0]
//             )}
//           </div>

//           <div>
//             <h1 className="text-3xl font-black">{user.name}</h1>
//             <p className="text-white/40">{user.email}</p>
//             <p className="text-yellow-400 font-bold">
//               Discount: {discount}%
//             </p>
//           </div>
//         </div>

//         {/* REF */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Referral Link</h2>

//           <div className="flex gap-2">
//             <input
//               value={refLink}
//               readOnly
//               className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl text-sm"
//             />

//             <button
//               onClick={() => navigator.clipboard.writeText(refLink)}
//               className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
//             >
//               Copy
//             </button>
//           </div>
//         </div>

//         {/* PROMO */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Promo Code</h2>

//           <div className="flex gap-2">
//             <input
//               value={promo}
//               onChange={(e) => setPromo(e.target.value)}
//               className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl"
//             />

//             <button
//               onClick={applyPromo}
//               className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
//             >
//               Apply
//             </button>
//           </div>
//         </div>

//         {/* ================= AVATAR UPLOAD (НОВЫЙ БЛОК) ================= */}
//         <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Upload Avatar</h2>

//           {/* FILE INPUT */}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => {
//               const f = e.target.files?.[0];
//               if (!f) return;

//               setFile(f);

//               const reader = new FileReader();
//               reader.onload = () => setPreview(reader.result as string);
//               reader.readAsDataURL(f);
//             }}
//           />

//           {/* PREVIEW */}
//           {preview && (
//             <img
//               src={preview}
//               className="w-24 h-24 mt-3 rounded-xl object-cover"
//             />
//           )}

//           {/* SAVE BUTTON */}
//           <button
//             onClick={uploadAvatar}
//             className="mt-3 bg-green-500 px-6 py-2 rounded-xl font-bold"
//           >
//             Save Avatar
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

type User = {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  ref_code?: string;
  ref_count?: number;
  telegram_username?: string;
  telegram_id?: string;
  active_promo?: {
    promo_code: string;
    rules: {
      discount: number;
      allowed_types?: string[];
    };
  } | null;
};

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [promoNotice, setPromoNotice] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const loadUser = async () => {
    try {
      const res = await fetch(`${API}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data?.id) {
        window.location.href = "/auth";
        return;
      }

      setUser(data);
      setDiscount(data?.active_promo?.rules?.discount ?? 0);
    } catch {
      window.location.href = "/auth";
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const uploadAvatar = async () => {
    if (!file) return alert("Выбери фото");

    const form = new FormData();
    form.append("avatar", file);

    const res = await fetch(`${API}/profile/upload-avatar`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const data = await res.json();

    if (data?.success) {
      setUser(data.user);
      setFile(null);
      setPreview(null);
    } else {
      alert(data?.error || "Upload error");
    }
  };

  const applyPromo = async () => {
    if (!promo.trim()) return alert("Введите промокод");

    const res = await fetch(`${API}/promo/redeem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ code: promo }),
    });

    const data = await res.json();

    if (data?.success) {
      setPromo("");

      const updated = await fetch(`${API}/profile/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const u = await updated.json();

      setUser(u);
      setDiscount(u?.active_promo?.rules?.discount ?? 0);

      setPromoNotice(
        `🎉 Promo activated! -${u?.active_promo?.rules?.discount || 0}%`
      );

      setTimeout(() => setPromoNotice(null), 3000);
    } else {
      alert(data?.error || "Invalid promo");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-2xl font-bold animate-pulse">
        Loading...
      </div>
    );
  }

  const avatarUrl =
    preview ||
    (user.avatar
      ? user.avatar.startsWith("http")
        ? user.avatar
        : `${API}${user.avatar}`
      : null);

  const refLink = user?.ref_code
    ? `${window.location.origin}/auth?ref=${user.ref_code}`
    : `${window.location.origin}/auth`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6 animate-[fadeIn_.6s_ease]">

        {promoNotice && (
          <div className="rounded-2xl border border-green-400/30 bg-green-500/10 backdrop-blur-xl px-5 py-4 text-green-300 font-bold shadow-lg animate-bounce">
            {promoNotice}
          </div>
        )}

        {/* HEADER */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 flex items-center gap-6 shadow-2xl hover:scale-[1.01] transition duration-300">

          <div className="w-28 h-28 rounded-3xl overflow-hidden bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center font-black text-4xl text-black shadow-xl hover:rotate-3 transition duration-300">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                className="w-full h-full object-cover"
              />
            ) : (
              user.name?.[0]
            )}
          </div>

          <div>
            <h1 className="text-4xl font-black tracking-tight">
              {user.name}
            </h1>

            <p className="text-white/40 mt-1 text-lg">
              {user.email}
            </p>

            <p className="mt-3 inline-flex bg-yellow-400/20 border border-yellow-400/30 px-4 py-2 rounded-full text-yellow-300 font-bold">
              Discount: {discount}%
            </p>
          </div>
        </div>

        {/* REF */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-xl hover:-translate-y-1 transition duration-300">
          <h2 className="font-bold text-xl mb-4">Referral Link</h2>

          <div className="flex gap-3">
            <input
              value={refLink}
              readOnly
              className="flex-1 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-yellow-400 transition"
            />

            <button
              onClick={() => navigator.clipboard.writeText(refLink)}
              className="px-6 rounded-2xl bg-yellow-400 text-black font-black hover:scale-105 active:scale-95 transition"
            >
              Copy
            </button>
          </div>
        </div>

        {/* PROMO */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-xl hover:-translate-y-1 transition duration-300">
          <h2 className="font-bold text-xl mb-4">Promo Code</h2>

          <div className="flex gap-3">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 p-4 rounded-2xl bg-black/30 border border-white/10 outline-none focus:border-yellow-400 transition"
            />

            <button
              onClick={applyPromo}
              className="px-6 rounded-2xl bg-yellow-400 text-black font-black hover:scale-105 active:scale-95 transition"
            >
              Apply
            </button>
          </div>
        </div>

        {/* AVATAR */}
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-6 shadow-xl hover:-translate-y-1 transition duration-300">
          <h2 className="font-bold text-xl mb-4">Upload Avatar</h2>

          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:px-5 file:py-3 file:rounded-2xl file:border-0 file:bg-yellow-400 file:text-black file:font-bold hover:file:scale-105 file:transition"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (!f) return;

              setFile(f);

              const reader = new FileReader();
              reader.onload = () => setPreview(reader.result as string);
              reader.readAsDataURL(f);
            }}
          />

          {preview && (
            <img
              src={preview}
              className="w-28 h-28 mt-5 rounded-3xl object-cover border border-white/10 shadow-xl animate-[fadeIn_.4s_ease]"
            />
          )}

          <button
            onClick={uploadAvatar}
            className="mt-5 bg-green-500 hover:bg-green-400 px-6 py-3 rounded-2xl font-black hover:scale-105 active:scale-95 transition"
          >
            Save Avatar
          </button>
        </div>

      </div>
    </div>
  );
}