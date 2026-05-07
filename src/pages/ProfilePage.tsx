
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
//   const [tgLoading, setTgLoading] = useState(false);
//   const [discount, setDiscount] = useState(0);

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
//     loadUser();
//   }, []);

//   /* ================= UPLOAD AVATAR (ВОТ ОНО ВЕРНУЛОСЬ) ================= */
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
//     } else {
//       alert(data?.error);
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
//     (user.avatar?.startsWith("http")
//       ? user.avatar
//       : user.avatar
//       ? `${API}${user.avatar}`
//       : null);

//   const refLink = `${window.location.origin}/auth?ref=${user.ref_code}`;

//   return (
//     <div className="min-h-screen bg-[#0a0b0d] text-white p-6">
//       <div className="max-w-4xl mx-auto">

//         {/* HEADER */}
//         <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">

//           <div className="w-24 h-24 rounded-2xl overflow-hidden bg-yellow-400 text-black flex items-center justify-center font-black text-3xl">
//             {avatarUrl ? (
//               <img src={avatarUrl} className="w-full h-full object-cover" />
//             ) : (
//               user.name?.[0]
//             )}
//           </div>

//           <div>
//             <h1 className="text-3xl font-black">{user.name}</h1>
//             <p className="text-white/40">{user.email}</p>
//             <p className="text-yellow-400 text-sm">
//               Discount: {discount}%
//             </p>
//           </div>
//         </div>

//         {/* REF */}
//         <div className="mt-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
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
//         <div className="mt-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
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

//         {/* ================= AVATAR UPLOAD (ВОССТАНОВЛЕНО) ================= */}
//         <div className="mt-6 bg-white/5 border border-white/10 p-6 rounded-2xl">
//           <h2 className="font-bold mb-3">Avatar</h2>

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

//           {preview && (
//             <img
//               src={preview}
//               className="w-24 h-24 mt-3 rounded-xl object-cover"
//             />
//           )}

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
  const [tgLoading, setTgLoading] = useState(false);

  const [discount, setDiscount] = useState(0);

  // 🔥 NEW: notification state
  const [promoNotice, setPromoNotice] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD USER ================= */
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
    } catch (e) {
      console.log("PROFILE ERROR:", e);
      window.location.href = "/auth";
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  /* ================= UPLOAD AVATAR ================= */
  const uploadAvatar = async () => {
    if (!file) return alert("Выбери фото");

    const form = new FormData();
    form.append("avatar", file);

    const res = await fetch(`${API}/profile/upload-avatar`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    });

    const data = await res.json();

    if (data?.success) {
      setUser(data.user);
      setFile(null);
      setPreview(null);
    }
  };

  /* ================= TELEGRAM ================= */
  const connectTelegram = async () => {
    setTgLoading(true);

    try {
      const res = await fetch(`${API}/profile/telegram/link`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data?.link) {
        window.open(data.link, "_blank");
      }
    } finally {
      setTimeout(() => setTgLoading(false), 800);
    }
  };

  /* ================= PROMO ================= */
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

      // 🔥 SUCCESS NOTIFICATION
      setPromoNotice(
        `🎉 Promo activated! -${u?.active_promo?.rules?.discount || 0}% discount`
      );

      setTimeout(() => setPromoNotice(null), 3000);
    } else {
      alert(data?.error || "Invalid promo");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading profile...
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

  const refLink = `${window.location.origin}/auth?ref=${user.ref_code}`;

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ================= NOTIFICATION ================= */}
        {promoNotice && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-xl font-bold">
            {promoNotice}
          </div>
        )}

        {/* ================= HEADER ================= */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6">

          <div className="w-24 h-24 rounded-2xl overflow-hidden bg-yellow-400 text-black flex items-center justify-center font-black text-3xl">
            {avatarUrl ? (
              <img src={avatarUrl} className="w-full h-full object-cover" />
            ) : (
              user.name?.[0]
            )}
          </div>

          <div>
            <h1 className="text-3xl font-black">{user.name}</h1>
            <p className="text-white/40">{user.email}</p>

            {/* 🔥 DISCOUNT UI */}
            <p className="text-yellow-400 text-lg font-bold mt-1">
              {discount > 0 ? `🔥 Discount: -${discount}%` : "No active discount"}
            </p>
          </div>
        </div>

        {/* ================= REF ================= */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="font-bold mb-3">Referral Link</h2>

          <div className="flex gap-2">
            <input
              value={refLink}
              readOnly
              className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl text-sm"
            />

            <button
              onClick={() => navigator.clipboard.writeText(refLink)}
              className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
            >
              Copy
            </button>
          </div>

          <p className="text-white/40 text-sm mt-2">
            Referrals: {user.ref_count || 0}
          </p>
        </div>

        {/* ================= TELEGRAM ================= */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="font-bold mb-3">Telegram</h2>

          {user.telegram_id ? (
            <p className="text-green-400">
              Connected: @{user.telegram_username}
            </p>
          ) : (
            <button
              onClick={connectTelegram}
              disabled={tgLoading}
              className="bg-blue-500 px-4 py-2 rounded-xl font-bold"
            >
              {tgLoading ? "Connecting..." : "Connect Telegram"}
            </button>
          )}
        </div>

        {/* ================= PROMO ================= */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="font-bold mb-3">Promo Code</h2>

          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Enter promo"
              className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl"
            />

            <button
              onClick={applyPromo}
              className="bg-yellow-400 text-black px-4 rounded-xl font-bold"
            >
              Apply
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}