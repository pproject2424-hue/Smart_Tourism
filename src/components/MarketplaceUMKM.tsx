import React, { useState } from 'react';
import { ShoppingBag, Star, Trash, CheckCircle, Tag, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { Product, CartItem } from '../types';
import { initialProducts } from '../data';

export default function MarketplaceUMKM() {
  const [products] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'orders'>('browse');
  const [orders, setOrders] = useState<any[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleAddToCart = (product: Product) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    const item = cart.find(c => c.product.id === productId);
    if (!item) return;

    const newQty = item.quantity + delta;
    if (newQty <= 0) {
      setCart(cart.filter(c => c.product.id !== productId));
    } else {
      setCart(cart.map(c => c.product.id === productId ? { ...c, quantity: newQty } : c));
    }
  };

  const handleRemove = (productId: string) => {
    setCart(cart.filter(c => c.product.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    const newOrder = {
      orderId: `TRX-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      itemsCount: cart.reduce((a, b) => a + b.quantity, 0),
      totalValue: cartTotal,
      status: 'Sedang Dikirim',
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 4000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in font-sans" id="umkm-root">
      
      {/* Products list main area (8 columns) */}
      <div className="lg:col-span-8 space-y-4">
        
        {/* Tab switches browse vs orders history */}
        <div className="flex items-center justify-between border-b border-slate-150 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('browse')}
              className={`pb-2 px-3 text-xs font-bold font-ui border-b-2 transition-colors ${
                activeTab === 'browse' ? 'border-sky-500 text-sky-650' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Souvenir & Oleh-oleh Khas Ciletuh
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-2 px-3 text-xs font-bold font-ui border-b-2 transition-colors ${
                activeTab === 'orders' ? 'border-sky-500 text-sky-650' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Riwayat Pesanan ({orders.length})
            </button>
          </div>

          <span className="text-[10px] text-slate-400">Pemberdayaan Kriya & Pangan Lokal</span>
        </div>

        {activeTab === 'browse' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                
                {/* Product image */}
                <div className="relative aspect-square w-full bg-slate-100">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    {p.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[9px] text-slate-400 block font-ui">Toko: {p.seller}</span>
                    <h4 className="font-heading font-extrabold text-xs text-slate-800 line-clamp-1">{p.name}</h4>
                    
                    <div className="flex items-center gap-1">
                      <div className="flex text-orange-500">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < Math.floor(p.rating) ? 'fill-current' : 'opacity-25'}`} />
                        ))}
                      </div>
                      <span className="text-[10px] text-slate-500 font-bold">{p.rating}</span>
                    </div>

                    <p className="text-[10px] text-slate-500 line-clamp-2 pt-1 font-sans">{p.description}</p>
                  </div>

                  <div className="border-t border-slate-50 pt-2 flex items-center justify-between mt-3">
                    <div>
                      <span className="text-[9px] text-slate-405 block uppercase">Harga Pas</span>
                      <span className="text-[11px] font-bold text-slate-800 font-mono">Rp {p.price.toLocaleString('id-ID')}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-600 text-[10px] font-bold py-1.5 px-2.5 rounded-lg transition-colors flex items-center gap-1 border border-sky-100"
                      id={`buy_souvenir_btn_${p.id}`}
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> +Keranjang
                    </button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        ) : (
          /* ORDERS TAB */
          <div className="space-y-3.5">
            {orders.length > 0 ? (
              orders.map((or) => (
                <div key={or.orderId} className="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="font-mono text-sky-600 font-bold block">{or.orderId}</span>
                    <p className="text-slate-500 text-[11px] mt-0.5">Tanggal Checkout: {or.date} | Jumlah Item: {or.itemsCount}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-800">Rp {or.totalValue.toLocaleString('id-ID')}</span>
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-250 font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" /> {or.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 bg-white/50 border border-slate-100 rounded-2xl text-slate-400 text-center text-xs">
                Belum ada transaksi souvenir masuk. Silakan belanja dan dukung UMKM Geopark!
              </div>
            )}
          </div>
        )}

      </div>

      {/* Cart side shelf (4 columns) */}
      <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm space-y-4 flex flex-col justify-between h-[450px]">
        
        <div>
          <h3 className="font-heading font-extrabold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-50 pb-2">
            <ShoppingBag className="w-4.5 h-4.5 text-sky-505" />
            Tas Belanja Sobat
          </h3>

          <div className="space-y-3 pt-3 overflow-y-auto max-h-64 pr-1">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between gap-2.5 text-xs pb-2 border-b border-slate-50">
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-slate-800 truncate block">{item.product.name}</span>
                    <span className="text-[10px] text-slate-450 block font-mono">@Rp {item.product.price.toLocaleString('id-ID')}</span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => handleUpdateQty(item.product.id, -1)} className="p-1 rounded bg-slate-50 hover:bg-slate-100 border text-slate-500">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[11px] font-bold font-mono">{item.quantity}</span>
                    <button onClick={() => handleUpdateQty(item.product.id, 1)} className="p-1 rounded bg-slate-50 hover:bg-slate-100 border text-slate-500">
                      <Plus className="w-3 h-3" />
                    </button>
                    <button onClick={() => handleRemove(item.product.id)} className="p-1 text-slate-350 hover:text-red-500 transition-colors ml-1">
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-slate-400 italic text-[11px] font-sans">
                Tas belanja masih kosong. Dukung kerajinan lokal sekarang juga!
              </div>
            )}
          </div>
        </div>

        {/* Total Cost Checkout card footer */}
        <div className="border-t border-slate-50 pt-3 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-505">Total Tagihan:</span>
            <span className="font-heading font-extrabold text-slate-850 font-mono">Rp {cartTotal.toLocaleString('id-ID')}</span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className={`w-full py-2.5 rounded-xl text-xs font-ui font-extrabold text-white transition-all flex items-center justify-center gap-1 ${
              cart.length > 0 
                ? 'bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-100' 
                : 'bg-slate-205 cursor-not-allowed text-slate-400'
            }`}
            id="checkout_cart_btn"
          >
            Checkout Dukung UMKM <ArrowRight className="w-4 h-4" />
          </button>

          {checkoutSuccess && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200/50 rounded-lg text-[10px] text-emerald-700 flex items-center gap-1 animate-fade-in font-medium">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>Checkout sukses! Paket souvenir dalam kemasan logistik aman.</span>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
