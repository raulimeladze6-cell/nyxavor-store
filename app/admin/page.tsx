"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

type Order = {
  id: string;
  created_at: string;
  customer_name: string;
  email: string;
  phone: string;
  total_amount: number;
  status: string;
  address?: string;
  notes?: string;
  items?: Array<{
    name: string;
    price: number;
    quantity: number;
    slug?: string;
  }>;
};

export default function AdminPage() {
  const { user } = useAuth();
  const { money } = useI18n();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const supabase = createClient();
    const channel = supabase
      .channel("admin-orders-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        (payload: any) => {
          if (payload.eventType === "INSERT") {
            setOrders((prev) => [payload.new as Order, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === payload.new.id ? (payload.new as Order) : o,
              ),
            );
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
        );
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder({ ...selectedOrder, status: newStatus });
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold">
          ადმინ პანელში შესასვლელად საჭიროა ავტორიზაცია
        </h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-pink-500 px-6 py-3 font-bold text-white"
        >
          მთავარ გვერდზე დაბრუნება
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-pink-400">
          ადმინ პანელი - შეკვეთები
        </h1>
        <Link
          href="/profile"
          className="text-sm bg-gray-800 px-4 py-2 rounded-xl hover:bg-gray-700 transition"
        >
          პროფილში დაბრუნება →
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">იტვირთება...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">შეკვეთები ჯერ არ არის.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gray-700 bg-gray-900 shadow-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-800/50 text-gray-400 text-sm">
                <th className="p-4">შეკვეთა ID</th>
                <th className="p-4">მომხმარებელი</th>
                <th className="p-4">თანხა</th>
                <th className="p-4">სტატუსი</th>
                <th className="p-4">თარიღი</th>
                <th className="p-4 text-right">მოქმედება</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-800/40 transition">
                  <td className="p-4 font-mono text-xs text-pink-400">
                    #{order.id.slice(0, 8)}
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-200">
                      {order.customer_name}
                    </div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </td>
                  <td className="p-4 font-bold text-pink-400">
                    {money(order.total_amount)}
                  </td>
                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-1 text-sm text-yellow-400 font-semibold focus:outline-none cursor-pointer"
                    >
                      <option value="pending">pending</option>
                      <option value="processing">processing</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </select>
                  </td>
                  <td className="p-4 text-xs text-gray-400">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="rounded-xl bg-gray-800 px-3 py-1.5 text-xs font-bold text-white hover:bg-gray-700 transition"
                    >
                      დეტალები
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-gray-900 p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-pink-400">
                შეკვეთის დეტალები
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-300 mb-4">
              <p>
                <span className="text-gray-400">მყიდველი:</span>{" "}
                {selectedOrder.customer_name} ({selectedOrder.email})
              </p>
              <p>
                <span className="text-gray-400">ტელეფონი:</span>{" "}
                {selectedOrder.phone}
              </p>
              <p>
                <span className="text-gray-400">მისამართი:</span>{" "}
                {selectedOrder.address || "-"}
              </p>
              <p>
                <span className="text-gray-400">შენიშვნა:</span>{" "}
                {selectedOrder.notes || "-"}
              </p>
            </div>

            <div className="border-t border-gray-800 pt-3 mb-4">
              <h4 className="font-bold text-sm text-gray-300 mb-2">
                შეკვეთილი პროდუქტები:
              </h4>
              <ul className="space-y-2 text-sm">
                {Array.isArray(selectedOrder.items) &&
                  selectedOrder.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between text-gray-200"
                    >
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {money(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            <div className="border-t border-gray-800 pt-3 flex justify-between items-center font-bold text-lg mb-6">
              <span>სულ გადასახდელი:</span>
              <span className="text-pink-400">
                {money(selectedOrder.total_amount)}
              </span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full rounded-xl bg-gray-800 py-2.5 text-center font-bold text-white hover:bg-gray-700 transition"
            >
              დახურვა
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
