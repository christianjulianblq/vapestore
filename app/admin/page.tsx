"use client";

import { useState } from "react";
import Link from "next/link";
import { products as initialProducts, simulatedSales, monthlyStats, type Product } from "@/lib/data";

// ──────────────────────────────────────────
// Auth gate (UI only)
// ──────────────────────────────────────────
const ADMIN_PASSWORD = "vape2024";

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { onLogin(); }
    else { setError(true); setTimeout(() => setError(false), 2000); }
  };

  return (
    <div className="min-h-screen bg-[#080810] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="text-4xl">🔐</span>
          <h1 className="text-2xl font-black text-white mt-3">Admin Panel</h1>
          <p className="text-white/40 text-sm mt-1">VapeStore — Acceso restringido</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl p-6 flex flex-col gap-4">
          <div>
            <label className="text-xs font-semibold text-white/40 block mb-2">Contraseña</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-white/20 focus:outline-none transition-colors ${
                error ? "border-red-500/50 bg-red-500/5" : "border-white/[0.08] focus:border-cyan-400/40"
              }`}
              autoFocus
            />
            {error && <p className="text-xs text-red-400 mt-1.5">Contraseña incorrecta</p>}
          </div>
          <button type="submit" className="w-full py-3 rounded-xl font-bold text-sm text-black bg-[#00e5ff] hover:bg-cyan-300 active:scale-95 transition-all duration-150">
            Ingresar
          </button>
        </form>

        <Link href="/" className="block text-center text-xs text-white/25 hover:text-white/50 mt-4 transition-colors">
          ← Volver a la tienda
        </Link>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Stat Card
// ──────────────────────────────────────────
function StatCard({ label, value, sub, accent, icon }: {
  label: string; value: string; sub?: string; accent: string; icon: string;
}) {
  return (
    <div className="relative rounded-2xl p-6 bg-[#0e0e1a] border border-white/[0.06] overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-15 ${accent}`} />
      <p className="text-2xl mb-3">{icon}</p>
      <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-4xl font-extrabold text-white tracking-tight">{value}</p>
      {sub && <p className="text-xs text-white/30 mt-1">{sub}</p>}
    </div>
  );
}

// ──────────────────────────────────────────
// Product Row (editable)
// ──────────────────────────────────────────
function ProductRow({ product, onUpdate }: {
  product: Product;
  onUpdate: (id: number, field: keyof Product, value: string | number) => void;
}) {
  const [editing, setEditing] = useState<string | null>(null);
  const stockColor = product.stock === 0 ? "text-red-400" : product.stock <= 3 ? "text-amber-400" : "text-emerald-400";

  return (
    <tr className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{product.emoji}</span>
          <div>
            <p className="text-sm font-semibold text-white">{product.name}</p>
            <p className="text-xs text-white/40">{product.flavor}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-white/50">{product.brand}</td>

      <td className="px-4 py-3">
        {editing === "price" ? (
          <input type="number" defaultValue={product.price}
            onBlur={(e) => { onUpdate(product.id, "price", parseFloat(e.target.value)); setEditing(null); }}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-20 px-2 py-1 text-sm text-white bg-white/[0.06] border border-cyan-400/30 rounded-lg focus:outline-none"
            autoFocus />
        ) : (
          <button onClick={() => setEditing("price")} className="text-sm font-bold text-white hover:text-cyan-400 transition-colors cursor-pointer">
            ${product.price.toFixed(2)}
          </button>
        )}
      </td>

      <td className="px-4 py-3">
        {editing === "stock" ? (
          <input type="number" defaultValue={product.stock}
            onBlur={(e) => { onUpdate(product.id, "stock", parseInt(e.target.value)); setEditing(null); }}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
            className="w-16 px-2 py-1 text-sm text-white bg-white/[0.06] border border-cyan-400/30 rounded-lg focus:outline-none"
            autoFocus />
        ) : (
          <button onClick={() => setEditing("stock")} className={`text-sm font-bold ${stockColor} hover:opacity-70 transition-opacity cursor-pointer`}>
            {product.stock === 0 ? "—" : product.stock}
          </button>
        )}
      </td>

      <td className="px-4 py-3 text-xs text-white/30 font-mono">{product.puffs.toLocaleString()}</td>

      <td className="px-4 py-3">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          product.stock === 0 ? "text-red-400 bg-red-400/10 border-red-400/20"
            : product.stock <= 3 ? "text-amber-400 bg-amber-400/10 border-amber-400/20"
            : "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
        }`}>
          {product.stock === 0 ? "Sin stock" : product.stock <= 3 ? "Bajo" : "OK"}
        </span>
      </td>
    </tr>
  );
}

// ──────────────────────────────────────────
// Dashboard
// ──────────────────────────────────────────
function Dashboard() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [activeTab, setActiveTab] = useState<"overview" | "products" | "sales">("overview");

  const lowStock   = productList.filter((p) => p.stock > 0 && p.stock <= 3).length;
  const outOfStock = productList.filter((p) => p.stock === 0).length;

  const handleUpdate = (id: number, field: keyof Product, value: string | number) =>
    setProductList((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));

  return (
    <div className="min-h-screen bg-[#080810]">
      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#080810]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/30 hover:text-white/70 transition-colors text-sm">← Tienda</Link>
            <span className="text-white/10">|</span>
            <div className="flex items-center gap-2">
              <span className="text-lg">💨</span>
              <span className="font-extrabold text-white">VapeStore</span>
              <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 px-2 py-0.5 rounded-full">Admin</span>
            </div>
          </div>
          <p className="text-xs text-white/30">Mayo 2026</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Ventas del mes"
            value={`$${monthlyStats.revenue.toLocaleString()}`}
            sub="Mayo 2026 · +18% vs anterior"
            accent="bg-cyan-400"
            icon="💰"
          />
          <StatCard
            label="Pedidos"
            value={monthlyStats.orders.toString()}
            sub="Este mes"
            accent="bg-purple-500"
            icon="📦"
          />
          <StatCard
            label="Producto top"
            value={monthlyStats.topProduct}
            sub={`${monthlyStats.topProductUnits} unidades vendidas`}
            accent="bg-orange-400"
            icon="🏆"
          />
          <StatCard
            label="Stock bajo"
            value={lowStock.toString()}
            sub={`${outOfStock} sin stock`}
            accent="bg-amber-400"
            icon="⚠️"
          />
        </div>

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 mb-6 w-fit">
          {(["overview", "products", "sales"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                activeTab === tab ? "bg-white/10 text-white shadow" : "text-white/40 hover:text-white/70"
              }`}
            >
              {tab === "overview" ? "Resumen" : tab === "products" ? "Productos" : "Ventas"}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">

            {/* Revenue by product (CSS bars) */}
            <div className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl p-5">
              <h3 className="text-sm font-bold text-white mb-5 flex items-center gap-2">
                <span>📊</span> Ingresos por producto
              </h3>
              <div className="flex flex-col gap-4">
                {monthlyStats.revenueByProduct.map((item, i) => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-xs text-white/60 flex items-center gap-1.5">
                        <span className="text-white/25 font-mono text-[10px]">#{i + 1}</span>
                        {item.name}
                      </span>
                      <span className="text-xs font-bold text-white">${item.amount.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-white/[0.05] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-700"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stock alerts + recent orders */}
            <div className="flex flex-col gap-4">
              {/* Low stock */}
              <div className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>⚠️</span> Alertas de stock
                </h3>
                <div className="flex flex-col gap-2">
                  {productList.filter((p) => p.stock <= 3).sort((a, b) => a.stock - b.stock).map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{p.emoji}</span>
                        <div>
                          <p className="text-xs font-semibold text-white">{p.name}</p>
                          <p className="text-[10px] text-white/30">{p.flavor}</p>
                        </div>
                      </div>
                      <span className={`text-xs font-bold ${p.stock === 0 ? "text-red-400" : "text-amber-400"}`}>
                        {p.stock === 0 ? "Sin stock" : `${p.stock} restante${p.stock !== 1 ? "s" : ""}`}
                      </span>
                    </div>
                  ))}
                  {productList.filter((p) => p.stock <= 3).length === 0 && (
                    <p className="text-sm text-white/30 text-center py-3">Todo el stock está bien ✓</p>
                  )}
                </div>
              </div>

              {/* Recent sales */}
              <div className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl p-5">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <span>🕐</span> Órdenes recientes
                </h3>
                <div className="flex flex-col gap-2">
                  {simulatedSales.slice(0, 4).map((sale, i) => (
                    <div key={sale.id} className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-white/20 w-4">#{i + 1}</span>
                        <div>
                          <p className="text-xs font-semibold text-white truncate max-w-[170px]">{sale.product}</p>
                          <p className="text-[10px] text-white/30">{sale.customer} · {sale.date}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-xs font-bold text-emerald-400">${sale.total.toFixed(0)}</p>
                        <p className="text-[10px] text-white/30">×{sale.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Products ── */}
        {activeTab === "products" && (
          <div className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Inventario · {productList.length} productos</h3>
              <p className="text-xs text-white/30">Clic en precio o stock para editar</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Producto", "Marca", "Precio", "Stock", "Puffs", "Estado"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {productList.map((p) => <ProductRow key={p.id} product={p} onUpdate={handleUpdate} />)}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── Sales ── */}
        {activeTab === "sales" && (
          <div className="bg-[#0e0e1a] border border-white/[0.06] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Historial de ventas</h3>
              <span className="text-xs text-white/30">Datos simulados</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {["Producto", "Cliente", "Cant.", "Total", "Fecha"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {simulatedSales.map((sale) => (
                    <tr key={sale.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3 text-sm text-white">{sale.product}</td>
                      <td className="px-4 py-3 text-sm text-white/60">{sale.customer}</td>
                      <td className="px-4 py-3 text-sm text-white/60">×{sale.qty}</td>
                      <td className="px-4 py-3 text-sm font-bold text-emerald-400">${sale.total.toFixed(2)}</td>
                      <td className="px-4 py-3 text-xs text-white/30 font-mono">{sale.date}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-white/10">
                    <td colSpan={3} className="px-4 py-4 text-sm font-bold text-white">Total del período</td>
                    <td className="px-4 py-4 text-lg font-extrabold text-emerald-400">
                      ${simulatedSales.reduce((s, x) => s + x.total, 0).toFixed(2)}
                    </td>
                    <td />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Page export
// ──────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  return authed ? <Dashboard /> : <LoginScreen onLogin={() => setAuthed(true)} />;
}
