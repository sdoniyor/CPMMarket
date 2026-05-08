import { useEffect, useState } from "react";

const API = "https://cpmmarker.onrender.com";

type Promo = {
  id: number;
  code: string;
  discount: number;
  rules?: string;
};

export default function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Promo | null>(null);

  const [form, setForm] = useState({
    code: "",
    discount: "",
    rules: "all",
  });

  const token = localStorage.getItem("token");

  /* ================= LOAD ================= */
  const load = async () => {
    setLoading(true);

    const res = await fetch(`${API}/admin/promos`, {
      headers: { Authorization: `Bearer ${token || ""}` },
    });

    const data = await res.json();

    if (Array.isArray(data)) {
      setPromos(data);
    } else {
      console.log("PROMO ERROR:", data);
      setPromos([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  /* ================= OPEN CREATE ================= */
  const openCreate = () => {
    setEditing(null);
    setForm({ code: "", discount: "", rules: "all" });
    setModalOpen(true);
  };

  /* ================= OPEN EDIT ================= */
  const openEdit = (p: Promo) => {
    setEditing(p);
    setForm({
      code: p.code,
      discount: String(p.discount),
      rules: p.rules || "all",
    });
    setModalOpen(true);
  };

  /* ================= SAVE ================= */
  const save = async () => {
    const url = editing
      ? `${API}/admin/promos/${editing.id}`
      : `${API}/admin/promos`;

    const method = editing ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || ""}`,
      },
      body: JSON.stringify({
        code: form.code,
        discount: Number(form.discount),
        rules: form.rules,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Error");
      return;
    }

    setModalOpen(false);
    load();
  };

  /* ================= DELETE ================= */
  const remove = async (id: number) => {
    if (!confirm("Delete promo?")) return;

    const res = await fetch(`${API}/admin/promos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token || ""}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Error");
      return;
    }

    load();
  };

  if (loading) {
    return <div className="text-white p-6">Loading promos...</div>;
  }

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Promos</h1>

        <button
          onClick={openCreate}
          className="bg-green-500 px-4 py-2 rounded-xl font-bold"
        >
          + Add Promo
        </button>
      </div>

      {/* LIST */}
      <div className="space-y-2">

        {promos.map((p) => (
          <div
            key={p.id}
            className="bg-zinc-900 p-3 rounded-xl flex justify-between items-center"
          >

            <div>
              <div className="font-bold">{p.code}</div>
              <div className="text-yellow-400">{p.discount}%</div>
              <div className="text-xs text-white/40">{p.rules}</div>
            </div>

            <div className="flex gap-2">

              <button
                onClick={() => openEdit(p)}
                className="bg-blue-500 px-3 py-1 rounded-lg text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => remove(p.id)}
                className="bg-red-500 px-3 py-1 rounded-lg text-sm"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">

          <div className="bg-zinc-900 p-6 rounded-2xl w-[400px] space-y-3">

            <h2 className="text-xl font-bold">
              {editing ? "Edit Promo" : "Create Promo"}
            </h2>

            <input
              placeholder="Code"
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              className="w-full p-2 bg-black rounded-lg"
            />

            <input
              placeholder="Discount"
              type="number"
              value={form.discount}
              onChange={(e) =>
                setForm({ ...form, discount: e.target.value })
              }
              className="w-full p-2 bg-black rounded-lg"
            />

            <input
              placeholder="Rules"
              value={form.rules}
              onChange={(e) =>
                setForm({ ...form, rules: e.target.value })
              }
              className="w-full p-2 bg-black rounded-lg"
            />

            <div className="flex gap-2">

              <button
                onClick={save}
                className="bg-green-500 px-4 py-2 rounded-xl flex-1 font-bold"
              >
                Save
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-600 px-4 py-2 rounded-xl"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}