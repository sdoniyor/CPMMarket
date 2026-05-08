import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

export default function AdminPromos() {
  const [promos, setPromos] = useState<any[]>([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const token = localStorage.getItem("token");

  const load = () => {
    fetch(`${API}/admin/promos`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(setPromos);
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await fetch(`${API}/admin/promos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ code, discount, rules: "all" })
    });

    setCode("");
    setDiscount(0);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Promos</h1>

      <div className="flex gap-2 mb-4">
        <input value={code} onChange={e => setCode(e.target.value)} />
        <input value={discount} onChange={e => setDiscount(+e.target.value)} />

        <button onClick={create} className="bg-yellow-400 text-black px-4">
          Create
        </button>
      </div>

      {promos.map(p => (
        <div key={p.id} className="bg-zinc-900 p-2 rounded mb-2">
          {p.code} - {p.discount}%
        </div>
      ))}
    </div>
  );
}