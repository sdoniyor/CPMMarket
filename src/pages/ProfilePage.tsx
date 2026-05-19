
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

//   const loadUser = async () => {
//     const res = await fetch(`${API}/profile/me`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (!data?.id) {
//       window.location.href = "/auth";
//       return;
//     }
//     setUser(data);
//     setDiscount(data?.active_promo?.rules?.discount ?? 0);
//   };

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const uploadAvatar = async () => {
//     if (!file) return;
//     const form = new FormData();
//     form.append("avatar", file);
//     const res = await fetch(`${API}/profile/upload-avatar`, {
//       method: "POST",
//       headers: { Authorization: `Bearer ${token}` },
//       body: form,
//     });
//     const data = await res.json();
//     if (data?.success) {
//       setUser(data.user);
//       setPreview(null);
//       setFile(null);
//     }
//   };

//   const applyPromo = async () => {
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
//       setPromoNotice(`Успех! +${data.discount}% активировано`);
//       setPromo("");
//       const r = await fetch(`${API}/profile/me`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const u = await r.json();
//       setUser(u);
//       setDiscount(u?.active_promo?.rules?.discount ?? 0);
//       setTimeout(() => setPromoNotice(null), 2500);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-yellow-400 font-medium tracking-wide animate-pulse">
//         Загрузка профиля...
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

//   const refLink = `${window.location.origin}/auth?ref=${user.ref_code}`;

//   return (
//     // Добавлен pt-24 (padding-top), чтобы контент опустился ниже навбара
//     <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-[#0a0a0a] to-black text-zinc-100 p-4 md:p-10 pt-24 md:pt-32 font-sans selection:bg-yellow-400/30">
//       <div className="max-w-5xl mx-auto space-y-8">
        
//         {/* Уведомление (тост) */}
//         {promoNotice && (
//           <div className="fixed top-24 right-6 z-50 animate-fade-in-down">
//             <div className="bg-zinc-900 border border-yellow-500/50 text-yellow-400 font-semibold px-6 py-3 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.15)] flex items-center gap-2">
//               <span className="relative flex h-2 w-2">
//                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
//                 <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
//               </span>
//               {promoNotice}
//             </div>
//           </div>
//         )}

//         {/* Шапка профиля */}
//         <section className="relative overflow-hidden backdrop-blur-sm bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl transition-all duration-300 hover:border-yellow-500/20">
//           <div className="relative group">
//             <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-500/20 ring-offset-4 ring-offset-[#0a0a0a] group-hover:ring-yellow-500/50 transition-all duration-500 shadow-xl">
//               {avatarUrl ? (
//                 <img src={avatarUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
//               ) : (
//                 <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-bold text-yellow-400">
//                   {user.name?.[0]}
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="text-center md:text-left flex-1">
//             <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
//               {user.name}
//             </h1>
//             <p className="text-zinc-500 text-sm mb-4 font-medium">{user.email}</p>
//             <div className="inline-flex items-center gap-2.5 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full shadow-inner">
//               <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider text-[10px] md:text-xs">СКИДКА ПАРТНЕРА:</span>
//               <span className="text-white text-base font-extrabold">{discount}%</span>
//             </div>
//           </div>
//         </section>

//         {/* Сетка инфо-блоков */}
//         <div className="grid md:grid-cols-2 gap-6">
//           {/* Рефералка */}
//           <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">
//             <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
//               Network Link
//             </h2>
//             <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">
//               <input
//                 value={refLink}
//                 readOnly
//                 className="flex-1 bg-transparent border-none py-2 px-3 text-[10px] md:text-xs font-mono text-zinc-300 focus:ring-0 focus:outline-none"
//               />
//               <button
//                 onClick={() => navigator.clipboard.writeText(refLink)}
//                 className="bg-zinc-800 hover:bg-yellow-500 text-yellow-400 hover:text-black font-bold py-2.5 px-5 rounded-xl transition-colors text-xs active:scale-95"
//               >
//                 Копировать
//               </button>
//             </div>
//           </div>

//           {/* Промокоды */}
//           <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">
//             <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5 flex items-center gap-2">
//               Промокод
//             </h2>
//             <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">
//               <input
//                 value={promo}
//                 onChange={(e) => setPromo(e.target.value)}
//                 placeholder="Ввести код..."
//                 className="flex-1 bg-transparent border-none py-2 px-3 text-sm text-yellow-100 placeholder:text-zinc-600 focus:ring-0 focus:outline-none transition"
//               />
//               <button
//                 onClick={applyPromo}
//                 className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-2.5 px-6 rounded-xl transition-all text-xs active:scale-95 shadow-lg shadow-yellow-950/30"
//               >
//                 Активировать
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Загрузка аватара */}
//         <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center gap-7 transition-all duration-300 hover:border-zinc-700 shadow-lg">
//           <div className="w-full text-center md:text-left">
//             <h2 className="text-white text-xl font-bold">Сменить изображение профиля</h2>
//             <p className="text-zinc-500 text-sm">Рекомендуемый размер 512x512px, до 2MB</p>
//           </div>

//           <div className="w-full flex flex-col md:flex-row items-center gap-6">
//              <label className="flex-1 w-full cursor-pointer">
//                 <input
//                     type="file"
//                     accept="image/*"
//                     className="hidden"
//                     onChange={(e) => {
//                         const f = e.target.files?.[0];
//                         if (!f) return;
//                         setFile(f);
//                         const r = new FileReader();
//                         r.onload = () => setPreview(r.result as string);
//                         r.readAsDataURL(f);
//                     }}
//                 />
//                 <div className="w-full bg-black/30 border-2 border-dashed border-zinc-700/70 hover:border-yellow-500/50 py-10 px-6 rounded-2xl text-center transition duration-300 group">
//                     <span className="text-zinc-500 text-sm font-medium group-hover:text-zinc-300 transition">
//                         {file ? file.name : "Выбрать файл на устройстве"}
//                     </span>
//                 </div>
//              </label>

//             <div className="flex flex-col items-center gap-4 w-full md:w-auto">
//                 {preview ? (
//                   <div className="p-1 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl">
//                      <img src={preview} className="w-24 h-24 object-cover rounded-full" />
//                   </div>
//                 ) : (
//                     <div className="w-24 h-24 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-600 text-xs">Нет превью</div>
//                 )}

//                 <button
//                   onClick={uploadAvatar}
//                   disabled={!file}
//                   className="w-full md:w-auto whitespace-nowrap bg-white hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm active:scale-95 shadow-lg"
//                 >
//                   Применить
//                 </button>
//             </div>
//           </div>
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!data?.id) {
        window.location.href = "/auth";
        return;
      }

      setUser(data);
      setDiscount(data?.active_promo?.rules?.discount ?? 0);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const uploadAvatar = async () => {
    if (!file) return;

    try {
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
        setPreview(null);
        setFile(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const applyPromo = async () => {
    try {
      const res = await fetch(`${API}/promo/redeem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: promo,
        }),
      });

      const data = await res.json();

      if (data?.success) {
        setPromoNotice(`Успех! +${data.discount}% активировано`);
        setPromo("");

        const r = await fetch(`${API}/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const u = await r.json();

        setUser(u);
        setDiscount(u?.active_promo?.rules?.discount ?? 0);

        setTimeout(() => {
          setPromoNotice(null);
        }, 2500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-yellow-400 font-medium tracking-wide animate-pulse">
        Загрузка профиля...
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
    <div className="min-h-screen bg-[#0a0a0a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-950/20 via-[#0a0a0a] to-black text-zinc-100 p-4 md:p-10 pt-24 md:pt-32 font-sans selection:bg-yellow-400/30">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Toast */}
        {promoNotice && (
          <div className="fixed top-24 right-6 z-50 animate-fade-in-down">
            <div className="bg-zinc-900 border border-yellow-500/50 text-yellow-400 font-semibold px-6 py-3 rounded-full shadow-[0_0_30px_rgba(234,179,8,0.15)] flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
              </span>

              {promoNotice}
            </div>
          </div>
        )}

        {/* Header */}
        <section className="relative overflow-hidden backdrop-blur-sm bg-zinc-900/60 border border-zinc-800 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 shadow-2xl transition-all duration-300 hover:border-yellow-500/20">

          {/* Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-yellow-500/20 ring-offset-4 ring-offset-[#0a0a0a] group-hover:ring-yellow-500/50 transition-all duration-500 shadow-xl">

              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-bold text-yellow-400">
                  {user.name?.[0]}
                </div>
              )}

            </div>
          </div>

          {/* Info */}
          <div className="text-center md:text-left flex-1">
            <h1 className="text-4xl font-extrabold tracking-tight text-white mb-1">
              {user.name}
            </h1>

            <p className="text-zinc-500 text-sm mb-4 font-medium">
              {user.email}
            </p>

            <div className="inline-flex items-center gap-2.5 bg-yellow-400/10 border border-yellow-400/20 px-5 py-2 rounded-full shadow-inner">
              <span className="text-yellow-400 text-xs font-bold uppercase tracking-wider text-[10px] md:text-xs">
                СКИДКА ПАРТНЕРА:
              </span>

              <span className="text-white text-base font-extrabold">
                {discount}%
              </span>
            </div>
          </div>
        </section>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Referral */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">
            <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5">
              Network Link
            </h2>

            <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">

              <input
                value={refLink}
                readOnly
                className="flex-1 bg-transparent border-none py-2 px-3 text-[10px] md:text-xs font-mono text-zinc-300 focus:ring-0 focus:outline-none"
              />

              <button
                onClick={() => navigator.clipboard.writeText(refLink)}
                className="bg-zinc-800 hover:bg-yellow-500 text-yellow-400 hover:text-black font-bold py-2.5 px-5 rounded-xl transition-colors text-xs active:scale-95"
              >
                Копировать
              </button>

            </div>
          </div>

          {/* Promo */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-yellow-500/5">

            <h2 className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-5">
              Промокод
            </h2>

            <div className="flex items-center gap-2 bg-black/40 border border-zinc-700/50 rounded-2xl p-1.5 focus-within:border-yellow-500/50 transition">

              <input
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Ввести код..."
                className="flex-1 bg-transparent border-none py-2 px-3 text-sm text-yellow-100 placeholder:text-zinc-600 focus:ring-0 focus:outline-none transition"
              />

              <button
                onClick={applyPromo}
                className="bg-yellow-500 hover:bg-yellow-400 text-black font-extrabold py-2.5 px-6 rounded-xl transition-all text-xs active:scale-95 shadow-lg shadow-yellow-950/30"
              >
                Активировать
              </button>

            </div>
          </div>

          {/* Telegram */}
          <div className="md:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-3xl p-7 transition-all duration-300 hover:bg-zinc-900 hover:border-zinc-700 group shadow-lg hover:shadow-sky-500/5">

            <h2 className="text-sky-400 text-sm font-semibold uppercase tracking-widest mb-5">
              Telegram
            </h2>

            {user.telegram_id || user.telegram_username ? (
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-black/40 border border-zinc-700/50 rounded-2xl px-5 py-5">

                <div className="flex flex-col">
                  <span className="text-zinc-500 text-xs uppercase tracking-wide">
                    Подключенный аккаунт
                  </span>

                  <span className="text-white font-bold text-base mt-1">
                    {user.telegram_username
                      ? `@${user.telegram_username}`
                      : `ID: ${user.telegram_id}`}
                  </span>
                </div>

                <div className="px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold tracking-wider">
                  CONNECTED
                </div>

              </div>
            ) : (
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 border border-zinc-700/50 rounded-2xl p-5">

                <div>
                  <p className="text-white font-semibold text-sm">
                    Telegram не подключен
                  </p>

                  <p className="text-zinc-500 text-xs mt-1">
                    Подключите аккаунт через Telegram бота
                  </p>
                </div>

                <a
                  href={`https://t.me/YOUR_BOT_USERNAME?start=${user.id}`}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-sky-500 hover:bg-sky-400 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm active:scale-95 shadow-lg shadow-sky-950/30"
                >
                  Подключить Telegram
                </a>

              </div>
            )}

          </div>

        </div>

        {/* Upload avatar */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 flex flex-col items-center gap-7 transition-all duration-300 hover:border-zinc-700 shadow-lg">

          <div className="w-full text-center md:text-left">
            <h2 className="text-white text-xl font-bold">
              Сменить изображение профиля
            </h2>

            <p className="text-zinc-500 text-sm">
              Рекомендуемый размер 512x512px, до 2MB
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center gap-6">

            <label className="flex-1 w-full cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];

                  if (!f) return;

                  setFile(f);

                  const r = new FileReader();

                  r.onload = () => {
                    setPreview(r.result as string);
                  };

                  r.readAsDataURL(f);
                }}
              />

              <div className="w-full bg-black/30 border-2 border-dashed border-zinc-700/70 hover:border-yellow-500/50 py-10 px-6 rounded-2xl text-center transition duration-300 group">
                <span className="text-zinc-500 text-sm font-medium group-hover:text-zinc-300 transition">
                  {file
                    ? file.name
                    : "Выбрать файл на устройстве"}
                </span>
              </div>
            </label>

            <div className="flex flex-col items-center gap-4 w-full md:w-auto">

              {preview ? (
                <div className="p-1 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl">
                  <img
                    src={preview}
                    className="w-24 h-24 object-cover rounded-full"
                  />
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-600 text-xs">
                  Нет превью
                </div>
              )}

              <button
                onClick={uploadAvatar}
                disabled={!file}
                className="w-full md:w-auto whitespace-nowrap bg-white hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-full transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm active:scale-95 shadow-lg"
              >
                Применить
              </button>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}