"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

type Order = {
  id: string;
  created_at: string;
  total_amount: number;
  status: string;
  address?: string;
  notes?: string;
  items?: Array<{
    name: string;
    price: number;
    quantity: number;
    slug: string;
  }>;
};

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { money, lang } = useI18n();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // სერვერული ბილდისთვის უსაფრთხო კლიენტი
  const supabase =
    typeof window !== "undefined" ? createClient() : (null as any);

  useEffect(() => {
    if (!user || !supabase) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    }

    fetchOrders();
  }, [user, supabase]);

  // მრავალენოვანი ტექსტების დამხმარე ობიექტი 6-ივე ენისთვის
  const dict = {
    en: {
      authReq: "Please sign in",
      backHome: "Back to Home",
      profile: "User Profile",
      personalInfo: "Personal Information",
      email: "Email",
      signOut: "Sign Out",
      ordersHistory: "Order History",
      loading: "Loading...",
      noOrders: "You have no orders yet.",
      order: "Order",
      date: "Date",
      status: "Status",
      viewDetails: "View details",
      orderDet: "Order Details",
      id: "ID",
      products: "Products",
      shippingAddr: "Shipping Address",
      notes: "Notes",
      totalPayable: "Total:",
      close: "Close",
    },
    ka: {
      authReq: "გთხოვთ გაიაროთ ავტორიზაცია",
      backHome: "მთავარ გვერდზე დაბრუნება",
      profile: "მომხმარებლის პროფილი",
      personalInfo: "პირადი მონაცემები",
      email: "ელფოსტა",
      signOut: "გასვლა",
      ordersHistory: "შეკვეთების ისტორია",
      loading: "იტვირთება...",
      noOrders: "შეკვეთები ჯერ არ გაქვთ.",
      order: "შეკვეთა",
      date: "თარიღი",
      status: "სტატუსი",
      viewDetails: "დეტალების ნახვა",
      orderDet: "შეკვეთის დეტალები",
      id: "ნომერი",
      products: "პროდუქტები",
      shippingAddr: "მიწოდების მისამართი",
      notes: "შენიშვნა",
      totalPayable: "სულ გადასახდელი:",
      close: "დახურვა",
    },
    ru: {
      authReq: "Пожалуйста, войдите в систему",
      backHome: "Вернуться на главную",
      profile: "Профиль пользователя",
      personalInfo: "Личная информация",
      email: "Эл. почта",
      signOut: "Выйти",
      ordersHistory: "История заказов",
      loading: "Загрузка...",
      noOrders: "У вас пока нет заказов.",
      order: "Заказ",
      date: "Дата",
      status: "Статус",
      viewDetails: "Подробнее",
      orderDet: "Детали заказа",
      id: "ID",
      products: "Товары",
      shippingAddr: "Адрес доставки",
      notes: "Примечания",
      totalPayable: "Итого:",
      close: "Закрыть",
    },
    de: {
      authReq: "Bitte anmelden",
      backHome: "Zurück zur Startseite",
      profile: "Benutzerprofil",
      personalInfo: "Persönliche Daten",
      email: "E-Mail",
      signOut: "Abmelden",
      ordersHistory: "Bestellhistorie",
      loading: "Wird geladen...",
      noOrders: "Sie haben noch keine Bestellungen.",
      order: "Bestellung",
      date: "Datum",
      status: "Status",
      viewDetails: "Details anzeigen",
      orderDet: "Bestelldetails",
      id: "ID",
      products: "Produkte",
      shippingAddr: "Lieferadresse",
      notes: "Notizen",
      totalPayable: "Gesamt:",
      close: "Schließen",
    },
    es: {
      authReq: "Por favor inicia sesión",
      backHome: "Volver al inicio",
      profile: "Perfil de usuario",
      personalInfo: "Información personal",
      email: "Correo electrónico",
      signOut: "Cerrar sesión",
      ordersHistory: "Historial de pedidos",
      loading: "Cargando...",
      noOrders: "No tienes pedidos aún.",
      order: "Pedido",
      date: "Fecha",
      status: "Estado",
      viewDetails: "Ver detalles",
      orderDet: "Detalles del pedido",
      id: "ID",
      products: "Productos",
      shippingAddr: "Dirección de envío",
      notes: "Notas",
      totalPayable: "Total:",
      close: "Cerrar",
    },
    fr: {
      authReq: "Veuillez vous connecter",
      backHome: "Retour à l'accueil",
      profile: "Profil utilisateur",
      personalInfo: "Informations personnelles",
      email: "E-mail",
      signOut: "Se déconnecter",
      ordersHistory: "Historique des commandes",
      loading: "Chargement...",
      noOrders: "Vous n'avez pas encore de commandes.",
      order: "Commande",
      date: "Date",
      status: "Statut",
      viewDetails: "Voir les détails",
      orderDet: "Détails de la commande",
      id: "ID",
      products: "Produits",
      shippingAddr: "Adresse de livraison",
      notes: "Remarques",
      totalPayable: "Total :",
      close: "Fermer",
    },
  };

  const tLang = dict[lang as keyof typeof dict] || dict.ka;

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold">{tLang.authReq}</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white"
        >
          {tLang.backHome}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 text-white">
      <h1 className="text-3xl font-extrabold mb-6">{tLang.profile}</h1>

      <div className="rounded-2xl bg-gray-800 p-6 border border-gray-700 shadow-sm mb-8">
        <h2 className="text-lg font-bold text-pink-400 mb-2">
          {tLang.personalInfo}
        </h2>
        <p className="text-gray-300">
          {tLang.email}:{" "}
          <span className="text-white font-medium">{user.email}</span>
        </p>
        <button
          onClick={() => signOut()}
          className="mt-4 rounded-full bg-red-600/80 px-4 py-2 text-sm font-bold text-white hover:bg-red-600 transition"
        >
          {tLang.signOut}
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">{tLang.ordersHistory}</h2>

      {loading ? (
        <p className="text-gray-400">{tLang.loading}</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-400">{tLang.noOrders}</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="rounded-xl bg-gray-800 p-5 border border-gray-700 cursor-pointer hover:border-pink-500 transition flex items-center justify-between"
            >
              <div>
                <p className="font-mono font-bold text-pink-400">
                  {tLang.order} #{order.id.slice(0, 8)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {tLang.date}:{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-300 mt-1">
                  {tLang.status}:{" "}
                  <span className="font-semibold text-yellow-400">
                    {order.status}
                  </span>
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-pink-400">
                  {money(order.total_amount)}
                </span>
                <p className="text-xs text-gray-400 mt-1">
                  {tLang.viewDetails} →
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-gray-900 p-6 border border-gray-700 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-pink-400">
                {tLang.orderDet}
              </h3>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-white text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-2">
              {tLang.id}:{" "}
              <span className="font-mono text-white">{selectedOrder.id}</span>
            </p>
            <p className="text-sm text-gray-400 mb-4">
              {tLang.date}:{" "}
              <span className="text-white">
                {new Date(selectedOrder.created_at).toLocaleString()}
              </span>
            </p>

            <div className="border-t border-gray-800 pt-3 mb-4">
              <h4 className="font-bold text-sm text-gray-300 mb-2">
                {tLang.products}:
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

            {selectedOrder.address && (
              <div className="border-t border-gray-800 pt-3 mb-4 text-sm">
                <span className="font-bold text-gray-300 block mb-1">
                  {tLang.shippingAddr}:
                </span>
                <p className="text-gray-400">{selectedOrder.address}</p>
              </div>
            )}

            {selectedOrder.notes && (
              <div className="border-t border-gray-800 pt-3 mb-4 text-sm">
                <span className="font-bold text-gray-300 block mb-1">
                  {tLang.notes}:
                </span>
                <p className="text-gray-400">{selectedOrder.notes}</p>
              </div>
            )}

            <div className="border-t border-gray-800 pt-3 flex justify-between items-center font-bold text-lg">
              <span>{tLang.totalPayable}</span>
              <span className="text-pink-400">
                {money(selectedOrder.total_amount)}
              </span>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-gray-800 py-2.5 text-center font-bold text-white hover:bg-gray-700 transition"
            >
              {tLang.close}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
