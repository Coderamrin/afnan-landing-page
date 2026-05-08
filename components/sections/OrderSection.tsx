"use client";
import { useState } from "react";

// ---- Types ----
type ProductKey = "borka" | "hijab_niqab" | "full_set";

interface Product {
  key: ProductKey;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  emoji: string;
  popular?: boolean;
}

// ---- Config ----
const PRODUCTS: Product[] = [
  {
    key: "full_set",
    name: "ফুল সেট",
    nameEn: "Full Set",
    price: 2400,
    description: "বোরকা + হিজাব + নিকাব — সর্বোচ্চ পর্দা",
    emoji: "⭐",
    popular: true,
  },
  {
    key: "hijab_niqab",
    name: "হিজাব + নিকাব",
    nameEn: "Hijab & Niqab",
    price: 1200,
    description: "হিজাব ও নিকাব একসাথে",
    emoji: "🧕",
  },
  {
    key: "borka",
    name: "শুধু বোরকা",
    nameEn: "Borka Only",
    price: 1100,
    description: "প্রিমিয়াম মানের একক বোরকা",
    emoji: "🕌",
  },
];

const SIZES = ["৪৮", "৫০", "৫২", "৫৪", "৫৬", "৫৮"];
const DISTRICTS = [
  "ঢাকা",
  "চট্টগ্রাম",
  "রাজশাহী",
  "খুলনা",
  "বরিশাল",
  "সিলেট",
  "রংপুর",
  "ময়মনসিংহ",
  "কুমিলা",
  "নারায়ণগঞ্জ",
  "গাজীপুর",
  "টাঙ্গাইল",
  "ফরিদপুর",
  "যশোর",
  "নোয়াখালী",
  "ব্রাহ্মণবাড়িয়া",
  "কিশোরগঞ্জ",
  "মানিকগঞ্জ",
  "নরসিংদী",
  "মুন্সিগঞ্জ",
];

// ---- FB Pixel helper ----
function trackFb(event: string, data?: object) {
  if (
    typeof window !== "undefined" &&
    typeof (window as unknown as { fbq: (...a: unknown[]) => void }).fbq ===
      "function"
  ) {
    (window as unknown as { fbq: (...a: unknown[]) => void }).fbq(
      "track",
      event,
      data,
    );
  }
}

export default function OrderSection() {
  const [selectedProduct, setSelectedProduct] =
    useState<ProductKey>("full_set");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    payment: "cod",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const product = PRODUCTS.find((p) => p.key === selectedProduct)!;
  const deliveryCharge = form.district === "ঢাকা" ? 60 : 130;
  const subtotal = product.price * quantity;
  const total = subtotal + deliveryCharge;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "নাম লিখুন";
    if (!form.phone.trim() || form.phone.length < 11)
      e.phone = "সঠিক মোবাইল নম্বর দিন";
    if (!selectedSize) e.size = "সাইজ বাছাই করুন";
    if (!form.district) e.district = "জেলা বাছাই করুন";
    if (!form.address.trim()) e.address = "ঠিকানা লিখুন";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});

    trackFb("InitiateCheckout", { value: total, currency: "BDT" });
    setLoading(true);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          customerPhone: form.phone,
          district: form.district,
          address: form.address,
          paymentMethod: form.payment,
          subtotal: subtotal,
          deliveryCharge: deliveryCharge,
          total: total,
          productKey: product.key,
          productName: product.name,
          productNameEn: product.nameEn,
          size: selectedSize,
          quantity: quantity,
          price: product.price,
        }),
      });

      if (!response.ok) throw new Error("Order submission failed");

      const data = await response.json();

      trackFb("Purchase", {
        value: total,
        currency: "BDT",
        order_id: `AFN-${data.orderId}`,
      });
    } catch (error) {
      console.error("Order failed:", error);
      alert("অর্ডারটি সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setLoading(false);
      return;
    }

    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div id="order" className="py-12 px-4 bg-[#f0faf3]">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-24 h-24 bg-[#1a6b2e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#1a6b2e]/30">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-3xl font-black text-[#1a6b2e] mb-3">
            অর্ডার সফল! ✅
          </h3>
          <p className="text-gray-600 mb-6">
            আমরা শীঘ্রই {form.phone} নম্বরে যোগাযোগ করব।
          </p>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-left space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">পণ্য:</span>
              <span className="font-bold">
                {product.name} (সাইজ {selectedSize})
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">পরিমাণ:</span>
              <span className="font-bold">{quantity}টি</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <span className="font-bold">মোট পরিমাণ:</span>
              <span className="text-xl font-black text-[#1a6b2e]">
                ৳{total.toLocaleString("bn-BD")}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="order" className="py-12 px-4 bg-[#f0faf3]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[#1a6b2e] text-sm font-bold uppercase tracking-widest">
            অর্ডার করুন
          </span>
          <h2 className="text-3xl font-black text-[#1a1a1a] mt-2 mb-3">
            নিচের ফর্মটি পূরণ করুন
          </h2>
          <div className="flex justify-center gap-1">
            <div className="w-12 h-1 bg-[#1a6b2e] rounded-full" />
            <div className="w-4 h-1 bg-[#d4a017] rounded-full" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-xl p-6 md:p-8 space-y-6"
        >
          {/* ① Product Selection */}
          <div>
            <label className="block text-sm font-black text-[#1a1a1a] mb-3 uppercase tracking-wide">
              ① পণ্য বাছাই করুন
            </label>
            <div className="grid gap-3">
              {PRODUCTS.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => {
                    setSelectedProduct(p.key);
                    trackFb("ViewContent", {
                      content_name: p.name,
                      value: p.price,
                      currency: "BDT",
                    });
                  }}
                  className={`relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all text-left ${
                    selectedProduct === p.key
                      ? "border-[#1a6b2e] bg-[#f0faf3] shadow-md"
                      : "border-gray-200 hover:border-[#1a6b2e]/40"
                  }`}
                >
                  {p.popular && (
                    <span className="absolute -top-2.5 left-4 bg-[#d4a017] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                      জনপ্রিয়
                    </span>
                  )}
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <p className="font-black text-[#1a1a1a] text-base">
                        {p.name}
                      </p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        {p.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-black text-[#1a6b2e] text-xl">
                      ৳{p.price.toLocaleString("bn-BD")}
                    </p>
                    <div
                      className={`w-5 h-5 rounded-full border-2 ml-auto mt-1 flex items-center justify-center transition-colors ${
                        selectedProduct === p.key
                          ? "border-[#1a6b2e] bg-[#1a6b2e]"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedProduct === p.key && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* ② Size Selection */}
          <div>
            <label className="block text-sm font-black text-[#1a1a1a] mb-3 uppercase tracking-wide">
              ② সাইজ বাছাই করুন
              <span className="text-xs text-gray-400 ml-2 font-normal normal-case">
                (ইঞ্চিতে)
              </span>
            </label>
            <div className="grid grid-cols-6 gap-2">
              {SIZES.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl border-2 font-black text-sm transition-all ${
                    selectedSize === size
                      ? "border-[#1a6b2e] bg-[#1a6b2e] text-white shadow-md"
                      : "border-gray-200 text-gray-700 hover:border-[#1a6b2e]/50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {errors.size && (
              <p className="text-red-500 text-xs mt-1.5">⚠ {errors.size}</p>
            )}
            <p className="text-xs text-gray-400 mt-2">
              সাইজ নিশ্চিত না হলে হোয়াটসঅ্যাপে জিজ্ঞেস করুন →{" "}
              <a
                href="https://wa.me/8801619037877"
                className="text-[#1a6b2e] underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                01619037877
              </a>
            </p>
          </div>

          {/* ③ Quantity */}
          <div>
            <label className="block text-sm font-black text-[#1a1a1a] mb-3 uppercase tracking-wide">
              ③ পরিমাণ
            </label>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 text-2xl font-bold transition-colors flex items-center justify-center"
              >
                −
              </button>
              <span className="text-2xl font-black w-10 text-center text-[#1a1a1a]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 rounded-full bg-[#1a6b2e] hover:bg-[#144f22] text-white text-2xl font-bold transition-colors flex items-center justify-center"
              >
                +
              </button>
              <span className="text-sm text-gray-500 ml-2">
                মোট:{" "}
                <span className="font-black text-[#1a6b2e]">
                  ৳{subtotal.toLocaleString("bn-BD")}
                </span>
              </span>
            </div>
          </div>

          {/* ④ Customer Info */}
          <div>
            <label className="block text-sm font-black text-[#1a1a1a] mb-3 uppercase tracking-wide">
              ④ আপনার তথ্য
            </label>
            <div className="space-y-3">
              {/* Name */}
              <div>
                <input
                  type="text"
                  placeholder="আপনার পুরো নাম *"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 focus:bg-white transition-colors text-sm ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#1a6b2e]"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">⚠ {errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="মোবাইল নম্বর (01XXXXXXXXX) *"
                  value={form.phone}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, phone: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 focus:bg-white transition-colors text-sm ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#1a6b2e]"}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">⚠ {errors.phone}</p>
                )}
              </div>

              {/* District */}
              <div>
                <select
                  value={form.district}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, district: e.target.value }))
                  }
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 focus:bg-white transition-colors text-sm ${errors.district ? "border-red-400" : "border-gray-200 focus:border-[#1a6b2e]"}`}
                >
                  <option value="">জেলা বাছাই করুন *</option>
                  {DISTRICTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ {errors.district}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <textarea
                  placeholder="সম্পূর্ণ ঠিকানা (গ্রাম/মহল্লা, উপজেলা) *"
                  value={form.address}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, address: e.target.value }))
                  }
                  rows={3}
                  className={`w-full px-4 py-3.5 rounded-xl border-2 bg-gray-50 focus:bg-white transition-colors text-sm resize-none ${errors.address ? "border-red-400" : "border-gray-200 focus:border-[#1a6b2e]"}`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    ⚠ {errors.address}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ⑤ Payment */}
          <div>
            <label className="block text-sm font-black text-[#1a1a1a] mb-3 uppercase tracking-wide">
              ⑤ পেমেন্ট পদ্ধতি
            </label>
            <div className="grid grid-cols-1 gap-3">
              {[
                {
                  key: "cod",
                  label: "ক্যাশ অন ডেলিভারি",
                  sub: "পণ্য পেয়ে টাকা দিন",
                  emoji: "💵",
                },
              ].map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, payment: opt.key }))}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    form.payment === opt.key
                      ? "border-[#1a6b2e] bg-[#f0faf3]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="text-2xl block mb-1">{opt.emoji}</span>
                  <p className="font-bold text-sm text-[#1a1a1a]">
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-400">{opt.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-[#f0faf3] rounded-2xl p-5 border border-[#1a6b2e]/20 space-y-2.5">
            <p className="font-black text-sm uppercase tracking-wide text-[#1a1a1a]">
              অর্ডার সারসংক্ষেপ
            </p>
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {product.name} × {quantity}
              </span>
              <span className="font-semibold">
                ৳{subtotal.toLocaleString("bn-BD")}
              </span>
            </div>
            {selectedSize && (
              <div className="flex justify-between text-sm text-gray-600">
                <span>সাইজ</span>
                <span className="font-semibold">{selectedSize}"</span>
              </div>
            )}
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                ডেলিভারি চার্জ {form.district ? `(${form.district})` : ""}
              </span>
              <span className="font-semibold">
                {form.district ? `৳${deliveryCharge}` : "—"}
              </span>
            </div>
            <div className="border-t border-[#1a6b2e]/20 pt-2.5 flex justify-between items-center">
              <span className="font-black text-[#1a1a1a]">সর্বমোট</span>
              <span className="text-2xl font-black text-[#1a6b2e]">
                ৳{(form.district ? total : subtotal).toLocaleString("bn-BD")}
              </span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-[#1a6b2e] hover:bg-[#144f22] disabled:opacity-70 text-white font-black text-xl rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-[#1a6b2e]/30 pulse-btn flex items-center justify-center gap-3"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                প্রসেস হচ্ছে...
              </>
            ) : (
              "🛒 অর্ডার কনফার্ম করুন"
            )}
          </button>

          <p className="text-center text-xs text-gray-400">
            অর্ডার করলে আমাদের শর্তাবলী মানতে রাজি আছেন বলে ধরা হবে।
          </p>
        </form>
      </div>
    </section>
  );
}
