
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



import { useEffect, useRef, useState } from "react";

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
  const [promoNotice, setPromoNotice] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const token = localStorage.getItem("token");

  /* ================= LOAD ================= */
  const loadUser = async () => {
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
  };

  useEffect(() => {
    loadUser();
  }, []);

  /* ================= OPEN FILE ================= */
  const openFile = () => {
    fileRef.current?.click();
  };

  /* ================= SELECT FILE ================= */
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(f);
  };

  /* ================= UPLOAD ================= */
  const uploadAvatar = async () => {
    if (!file) return;

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

      if (data?.link) window.open(data.link, "_blank");
    } finally {
      setTimeout(() => setTgLoading(false), 800);
    }
  };

  /* ================= PROMO ================= */
  const applyPromo = async () => {
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

      setPromoNotice(`🎉 Promo activated! -${u?.active_promo?.rules?.discount || 0}%`);
      setTimeout(() => setPromoNotice(null), 3000);
    } else {
      alert(data?.error || "Invalid promo");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading...
      </div>
    );
  }

  const avatar =
    preview ||
    (user.avatar
      ? user.avatar.startsWith("http")
        ? user.avatar
        : `${API}${user.avatar}`
      : null);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* ================= PROMO NOTIFY ================= */}
        {promoNotice && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-xl font-bold">
            {promoNotice}
          </div>
        )}

        {/* ================= HEADER ================= */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center gap-6">

          {/* AVATAR CLICK */}
          <div
            onClick={openFile}
            className="w-24 h-24 rounded-2xl overflow-hidden bg-yellow-400 cursor-pointer relative group"
          >
            {avatar ? (
              <img src={avatar} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-black text-3xl font-bold">
                {user.name?.[0]}
              </div>
            )}

            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs">
              Change
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-black">{user.name}</h1>
            <p className="text-white/50">{user.email}</p>

            <p className="text-yellow-400 font-bold mt-1">
              {discount > 0 ? `🔥 -${discount}% discount` : "No discount"}
            </p>
          </div>
        </div>

        {/* ================= HIDDEN FILE INPUT ================= */}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="hidden"
        />

        {/* ================= PREVIEW ================= */}
        {preview && (
          <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
            <p className="text-sm text-white/60 mb-2">Preview</p>

            <img
              src={preview}
              className="w-24 h-24 rounded-2xl object-cover"
            />

            <button
              onClick={uploadAvatar}
              className="mt-3 bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
            >
              Save Avatar
            </button>
          </div>
        )}

        {/* ================= PROMO ================= */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
          <h2 className="font-bold mb-3">Promo Code</h2>

          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              className="flex-1 p-2 bg-black/40 border border-white/10 rounded-xl"
              placeholder="Enter promo"
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