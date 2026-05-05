"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products, brands, flavorCategories, WHATSAPP_NUMBER, type Product } from "@/lib/data";

// ──────────────────────────────────────────
// Stock Badge
// ──────────────────────────────────────────
function StockBadge({ stock }: { stock: number }) {
  if (stock === 0)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-400/10 px-2.5 py-1 rounded-full border border-red-400/20">
        <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
        Sin stock
      </span>
    );
  if (stock <= 3)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20 animate-pulse-slow">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />⚡ Quedan {stock} unidades
      </span>
    );
  if (stock <= 7)
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full border border-yellow-400/20">
        <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
        Quedan {stock} unidades
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
      En stock · {stock} unidades
    </span>
  );
}

// ──────────────────────────────────────────
// Product Card
// ──────────────────────────────────────────
function ProductCard({ product }: { product: Product }) {
  const message = encodeURIComponent(
    `Hola! Me interesa el *${product.name} – ${product.flavor}* ($${product.price}). ¿Está disponible?`
  );
  const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  const soldOut = product.stock === 0;

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0e0e1a] hover:border-cyan-400/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.5),0_0_0_1px_rgba(0,229,255,0.08)]">
      {/* Gradient visual */}
      <div className={`relative h-48 bg-gradient-to-br ${product.gradient} flex items-center justify-center overflow-hidden`}>
        <span className="text-7xl drop-shadow-2xl select-none">{product.emoji}</span>

        {product.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest text-black bg-[#00e5ff] px-2 py-0.5 rounded-full uppercase">
            TOP
          </span>
        )}

        {/* Shimmer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e1a] via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Brand + flavor tags */}
        <div className="flex gap-2 flex-wrap">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full border border-purple-400/20">
            {product.brand}
          </span>
          <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full border border-cyan-400/20">
            {product.flavorCategory}
          </span>
        </div>

        <div>
          <h3 className="text-base font-bold text-white leading-snug">{product.name}</h3>
          <p className="text-sm text-white/50 mt-0.5">{product.flavor}</p>
          <p className="text-xs text-white/30 mt-1 leading-relaxed">{product.description}</p>
        </div>

        {/* Specs row */}
        <div className="flex gap-3 text-xs text-white/40 font-mono">
          <span>{product.puffs.toLocaleString()} puffs</span>
          <span>·</span>
          <span>Nic {product.nicotine}</span>
        </div>

        <StockBadge stock={product.stock} />

        {/* Price + button */}
        <div className="mt-auto pt-2 flex items-center justify-between gap-3">
          <div>
            <span className="text-2xl font-extrabold text-white">${product.price.toFixed(2)}</span>
          </div>
          {soldOut ? (
            <button
              disabled
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white/30 bg-white/5 border border-white/10 cursor-not-allowed"
            >
              Sin stock
            </button>
          ) : (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-black bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 transition-all duration-150 text-center flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(37,211,102,0.25)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ──────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#080810]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💨</span>
          <span className="text-lg font-extrabold tracking-tight">
            <span className="text-gradient-cyan">Vape</span>
            <span className="text-white">Store</span>
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-6 text-sm text-white/50">
          <a href="#catalogo" className="hover:text-white transition-colors">Catálogo</a>
          <a href="#marcas" className="hover:text-white transition-colors">Marcas</a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
          >
            WhatsApp
          </a>
        </div>

        <Link
          href="/admin"
          className="text-xs font-semibold text-white/20 hover:text-white/50 transition-colors"
        >
          Admin
        </Link>
      </div>
    </nav>
  );
}

// ──────────────────────────────────────────
// Hero
// ──────────────────────────────────────────
function Hero({ totalProducts }: { totalProducts: number }) {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-100" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 px-4 py-2 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
          {totalProducts} productos disponibles · Envío inmediato
        </div>

        <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-white leading-none mb-6">
          Vapes de{" "}
          <span className="text-gradient-cyan">próxima</span>
          <br />
          <span className="text-gradient-hot">generación</span>
        </h1>

        <p className="text-lg text-white/50 max-w-xl mx-auto mb-8 leading-relaxed">
          Los mejores pods y dispositivos del mercado. Pedí por WhatsApp y recibí hoy mismo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#catalogo"
            className="px-8 py-3.5 rounded-2xl font-bold text-black bg-[#00e5ff] hover:bg-cyan-300 active:scale-95 transition-all duration-150 shadow-[0_0_30px_rgba(0,229,255,0.3)] text-sm"
          >
            Ver catálogo
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-2xl font-bold text-white bg-white/5 border border-white/10 hover:bg-white/10 active:scale-95 transition-all duration-150 text-sm"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────
// Filter Bar
// ──────────────────────────────────────────
function FilterBar({
  selectedBrand,
  setSelectedBrand,
  selectedFlavor,
  setSelectedFlavor,
  searchQuery,
  setSearchQuery,
  total,
}: {
  selectedBrand: string;
  setSelectedBrand: (v: string) => void;
  selectedFlavor: string;
  setSelectedFlavor: (v: string) => void;
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  total: number;
}) {
  return (
    <div className="sticky top-16 z-40 bg-[#080810]/90 backdrop-blur-xl border-b border-white/[0.06] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Buscar vape o sabor..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-400/40 transition-colors"
          />
        </div>

        {/* Brand filter */}
        <div className="flex gap-2 flex-wrap">
          {brands.slice(0, 6).map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all duration-150 whitespace-nowrap ${
                selectedBrand === brand
                  ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                  : "bg-white/[0.03] border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Flavor filter */}
        <div className="flex gap-2 flex-wrap">
          {flavorCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFlavor(cat)}
              className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all duration-150 whitespace-nowrap ${
                selectedFlavor === cat
                  ? "bg-cyan-400/20 border-cyan-400/50 text-cyan-300"
                  : "bg-white/[0.03] border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <span className="text-xs text-white/30 whitespace-nowrap ml-auto hidden sm:block">
          {total} resultado{total !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────
// Footer
// ──────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] mt-24 py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">💨</span>
          <span className="font-bold text-gradient-cyan">VapeStore</span>
        </div>
        <p className="text-xs text-white/25">
          Solo para mayores de 18 años · Los vapes pueden ser perjudiciales para la salud.
        </p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          Contacto por WhatsApp →
        </a>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────
// Main Page
// ──────────────────────────────────────────
export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [selectedFlavor, setSelectedFlavor] = useState("Todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchBrand = selectedBrand === "Todas" || p.brand === selectedBrand;
      const matchFlavor = selectedFlavor === "Todas" || p.flavorCategory === selectedFlavor;
      const matchSearch =
        searchQuery === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.flavor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase());
      return matchBrand && matchFlavor && matchSearch;
    });
  }, [selectedBrand, selectedFlavor, searchQuery]);

  const featured = useMemo(() => products.filter((p) => p.featured && p.stock > 0), []);

  return (
    <main className="min-h-screen bg-[#080810]">
      <Navbar />
      <Hero totalProducts={products.filter((p) => p.stock > 0).length} />

      {/* Featured */}
      {featured.length > 0 && selectedBrand === "Todas" && selectedFlavor === "Todas" && searchQuery === "" && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-lg">⚡</span>
            <h2 className="text-xl font-bold text-white">Más vendidos</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Catalog */}
      <section id="catalogo">
        <FilterBar
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedFlavor={selectedFlavor}
          setSelectedFlavor={setSelectedFlavor}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          total={filtered.length}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <h2 className="text-xl font-bold text-white">Catálogo completo</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
            <span className="text-sm text-white/30">{filtered.length} productos</span>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-white/40 text-lg font-medium">Sin resultados</p>
              <p className="text-white/25 text-sm mt-1">Probá con otro filtro o búsqueda</p>
              <button
                onClick={() => { setSelectedBrand("Todas"); setSelectedFlavor("Todas"); setSearchQuery(""); }}
                className="mt-6 text-sm text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
