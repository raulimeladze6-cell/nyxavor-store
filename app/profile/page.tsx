"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useI18n } from "@/context/I18nContext";
import { useCart } from "@/context/CartContext";
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
    emoji?: string;
  }>;
};

type Coupon = {
  code: string;
  discount: string;
  title: string;
  active: boolean;
};

export default function ProfilePage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { money, lang } = useI18n();
  const { addItem } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [confirmingDelivery, setConfirmingDelivery] = useState(false);

  // კუპონების სთეითი
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  useEffect(() => {
    // localStorage-იდან კუპონების წამოღება
    const savedCoupons = localStorage.getItem("nyxavor_coupons");
    if (savedCoupons) {
      try {
        setCoupons(JSON.parse(savedCoupons));
      } catch (e) {
        console.error(e);
      }
    }

    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchOrders() {
      const supabase = createClient();
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
  }, [user]);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

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
      viewDetails: "View Details",
      orderDet: "Order Details",
      id: "ID",
      products: "Products",
      shippingAddr: "Shipping Address",
      notes: "Notes",
      totalPayable: "Total:",
      close: "Close",
      statusPending: "Pending",
      statusProcessing: "Processing",
      statusShipped: "Shipped",
      statusCompleted: "Completed",
      statusCancelled: "Cancelled",
      trackingTitle: "Tracking Status",
      stepPending: "Placed",
      stepProcessing: "Processing",
      stepShipped: "Shipped",
      stepCompleted: "Delivered",
      copyId: "Copy ID",
      copied: "Copied!",
      buyAgain: "Buy Again",
      estimatedDelivery: "Estimated Delivery:",
      cancelOrder: "Cancel Order",
      cancelling: "Cancelling...",
      confirmDelivery: "Confirm Delivery Received",
      confirming: "Updating...",
      couponsTitle: "My Coupons & Promo Codes",
      noCoupons: "No active coupons yet. Spin the wheel to win discounts!",
      copyCode: "Copy Code",
      active: "Active",
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
      statusPending: "მოლოდინში",
      statusProcessing: "მუშავდება",
      statusShipped: "გაგზავნილია",
      statusCompleted: "ჩაბარებულია",
      statusCancelled: "გაუქმებულია",
      trackingTitle: "შეკვეთის მიმდინარეობა",
      stepPending: "მიღებულია",
      stepProcessing: "მზადდება",
      stepShipped: "გზაშია",
      stepCompleted: "ჩაბარდა",
      copyId: "ID-ის დაკოპირება",
      copied: "დაკოპირდა!",
      buyAgain: "ხელახლა ყიდვა",
      estimatedDelivery: "სავარაუდო ჩაბარება:",
      cancelOrder: "შეკვეთის გაუქმება",
      cancelling: "უქმდება...",
      confirmDelivery: "ამანათი მივიღე",
      confirming: "ახლდება...",
      couponsTitle: "🎟️ ჩემი კუპონები & პრომო კოდები",
      noCoupons: "ჯერ არ გაქვს აქტიური კუპონები. დაატრიალე იღბლიანი ბორბალი!",
      copyCode: "აკოპირება",
      active: "აქტიურია",
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
      statusPending: "В ожидании",
      statusProcessing: "В обработке",
      statusShipped: "Отправлен",
      statusCompleted: "Доставлен",
      statusCancelled: "Отменен",
      trackingTitle: "Статус отслеживания",
      stepPending: "Оформлен",
      stepProcessing: "В обработке",
      stepShipped: "В пути",
      stepCompleted: "Доставлен",
      copyId: "Скопировать ID",
      copied: "Скопировано!",
      buyAgain: "Купить снова",
      estimatedDelivery: "Примерная доставка:",
      cancelOrder: "Отменить заказ",
      cancelling: "Отмена...",
      confirmDelivery: "Заказ получен",
      confirming: "Обновление...",
      couponsTitle: "Мои купоны",
      noCoupons: "Нет активных купонов.",
      copyCode: "Копировать",
      active: "Активен",
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
      statusPending: "Ausstehend",
      statusProcessing: "In Bearbeitung",
      statusShipped: "Versendet",
      statusCompleted: "Zugestellt",
      statusCancelled: "Storniert",
      trackingTitle: "Sendungsverfolgung",
      stepPending: "Bestellt",
      stepProcessing: "Bearbeitung",
      stepShipped: "Unterwegs",
      stepCompleted: "Zugestellt",
      copyId: "ID kopieren",
      copied: "Kopiert!",
      buyAgain: "Erneut kaufen",
      estimatedDelivery: "Voraussichtliche Lieferung:",
      cancelOrder: "Bestellung stornieren",
      cancelling: "Stornieren...",
      confirmDelivery: "Lieferung erhalten",
      confirming: "Wird aktualisiert...",
      couponsTitle: "Meine Gutscheine",
      noCoupons: "Keine Gutscheine vorhanden.",
      copyCode: "Kopieren",
      active: "Aktiv",
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
      statusPending: "Pendiente",
      statusProcessing: "Procesando",
      statusShipped: "Enviado",
      statusCompleted: "Entregado",
      statusCancelled: "Cancelado",
      trackingTitle: "Estado del pedido",
      stepPending: "Realizado",
      stepProcessing: "Procesando",
      stepShipped: "En camino",
      stepCompleted: "Entregado",
      copyId: "Copiar ID",
      copied: "¡Copiado!",
      buyAgain: "Comprar de nuevo",
      estimatedDelivery: "Entrega estimada:",
      cancelOrder: "Cancelar pedido",
      cancelling: "Cancelando...",
      confirmDelivery: "Confirmar recepción",
      confirming: "Actualizando...",
      couponsTitle: "Mis cupones",
      noCoupons: "No hay cupones activos.",
      copyCode: "Copiar",
      active: "Activo",
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
      statusPending: "En attente",
      statusProcessing: "En cours",
      statusShipped: "Expédié",
      statusCompleted: "Livré",
      statusCancelled: "Annulé",
      trackingTitle: "Suivi de commande",
      stepPending: "Passée",
      stepProcessing: "En cours",
      stepShipped: "En route",
      stepCompleted: "Livré",
      copyId: "Copier ID",
      copied: "Copié !",
      buyAgain: "Racheter",
      estimatedDelivery: "Livraison estimée :",
      cancelOrder: "Annuler la commande",
      cancelling: "Annulation...",
      confirmDelivery: "Colis reçu",
      confirming: "Mise à jour...",
      couponsTitle: "Mes bons de réduction",
      noCoupons: "Aucun coupon actif.",
      copyCode: "Copier",
      active: "Actif",
    },
  };

  const tLang = dict[lang as keyof typeof dict] || dict.ka;

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleBuyAgain = (order: Order) => {
    if (order.items && Array.isArray(order.items)) {
      order.items.forEach((item) => {
        const itemSlug =
          item.slug || item.name.toLowerCase().replace(/\s+/g, "-");
        for (let i = 0; i < (item.quantity || 1); i++) {
          addItem({
            slug: itemSlug,
            name: item.name,
            price: item.price,
            emoji: item.emoji || "📦",
          });
        }
      });
    }
    setSelectedOrder(null);
    router.push("/cart");
  };

  const handleCancelOrder = async (orderId: string) => {
    setCancelling(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status: "cancelled" })
      .eq("id", orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "cancelled" } : o)),
      );
      if (selectedOrder) {
        setSelectedOrder({ ...selectedOrder, status: "cancelled" });
      }
    }
    setCancelling(false);
  };

  const handleConfirmDelivery = async (orderId: string) => {
    setConfirmingDelivery(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status: "completed" })
      .eq("id", orderId);

    if (!error) {
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: "completed" } : o)),
      );
      if (selectedOrder) {
        setSelectedOrder({ ...selectedOrder, status: "completed" });
      }
    }
    setConfirmingDelivery(false);
  };

  const getEstimatedDelivery = (createdAt: string) => {
    const startDate = new Date(createdAt);
    const endDate = new Date(createdAt);
    startDate.setDate(startDate.getDate() + 3);
    endDate.setDate(endDate.getDate() + 5);

    return `${startDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })}`;
  };

  const getStatusBadge = (statusStr: string) => {
    const status = statusStr?.toLowerCase();
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            {tLang.statusCompleted}
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">
            {tLang.statusShipped}
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2.5 py-0.5 text-xs font-semibold text-purple-400 border border-purple-500/20">
            {tLang.statusProcessing}
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center rounded-md bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-400 border border-red-500/20">
            {tLang.statusCancelled}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400 border border-amber-500/20">
            {tLang.statusPending}
          </span>
        );
    }
  };

  const renderTrackingTimeline = (statusStr: string) => {
    const status = statusStr?.toLowerCase();

    let currentStep = 0;
    if (status === "processing") currentStep = 1;
    else if (status === "shipped") currentStep = 2;
    else if (status === "completed") currentStep = 3;
    else if (status === "cancelled") currentStep = -1;

    if (status === "cancelled") {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center text-red-400 text-xs font-bold">
          {tLang.statusCancelled}
        </div>
      );
    }

    const steps = [
      tLang.stepPending,
      tLang.stepProcessing,
      tLang.stepShipped,
      tLang.stepCompleted,
    ];

    return (
      <div className="bg-gray-800/50 p-4 rounded-xl border border-gray-800 space-y-3">
        <div className="flex justify-between items-center">
          <p className="text-xs font-bold text-gray-300 uppercase tracking-wider">
            {tLang.trackingTitle}
          </p>
          <span className="text-xs text-pink-400 font-semibold">
            {tLang.estimatedDelivery}{" "}
            {getEstimatedDelivery(selectedOrder!.created_at)}
          </span>
        </div>

        <div className="relative flex items-center justify-between px-2 pt-2">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-0.5 bg-gray-700 z-0" />
          <div
            className="absolute left-6 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-pink-500 to-orange-500 z-0 transition-all duration-500"
            style={{
              width: `${(Math.max(0, currentStep) / (steps.length - 1)) * 85}%`,
            }}
          />

          {steps.map((stepName, index) => {
            const isCompleted = index <= currentStep;
            const isCurrent = index === currentStep;

            return (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? "bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-lg shadow-pink-500/20"
                      : "bg-gray-800 text-gray-500 border border-gray-700"
                  } ${isCurrent ? "ring-2 ring-pink-400/50 scale-110" : ""}`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-[10px] mt-1.5 font-medium whitespace-nowrap ${
                    isCurrent
                      ? "text-pink-400 font-bold"
                      : isCompleted
                        ? "text-gray-300"
                        : "text-gray-500"
                  }`}
                >
                  {stepName}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center text-white">
        <h1 className="text-2xl font-bold">{tLang.authReq}</h1>
        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-orange-500 px-6 py-3 font-bold text-white shadow-lg hover:opacity-90 transition"
        >
          {tLang.backHome}
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-white">
      <h1 className="text-3xl font-extrabold mb-8 tracking-tight">
        {tLang.profile}
      </h1>

      {/* Personal Info Card */}
      <div className="rounded-2xl bg-gray-900/80 p-6 border border-gray-800 shadow-xl mb-6 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-pink-400 mb-3 tracking-wide">
          {tLang.personalInfo}
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-gray-300 text-sm">
            {tLang.email}:{" "}
            <span className="text-white font-semibold ml-1">{user.email}</span>
          </p>
          <button
            onClick={() => signOut()}
            className="self-start sm:self-auto rounded-xl bg-red-600/20 border border-red-500/30 px-5 py-2 text-xs font-bold text-red-400 hover:bg-red-600 hover:text-white transition duration-200"
          >
            {tLang.signOut}
          </button>
        </div>
      </div>

      {/* 🎟️ My Coupons Section */}
      <div className="rounded-2xl bg-gray-900/80 p-6 border border-gray-800 shadow-xl mb-10 backdrop-blur-sm">
        <h2 className="text-lg font-bold text-pink-400 mb-4 tracking-wide">
          {tLang.couponsTitle}
        </h2>

        {coupons.length === 0 ? (
          <p className="text-sm text-gray-400">{tLang.noCoupons}</p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {coupons.map((c) => (
              <div
                key={c.code}
                className="flex items-center justify-between rounded-xl bg-gray-800/60 p-4 border border-pink-500/20"
              >
                <div>
                  <span className="inline-block rounded-md bg-pink-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    {tLang.active}
                  </span>
                  <p className="mt-1 text-base font-extrabold text-pink-400 font-mono">
                    {c.code} ({c.discount})
                  </p>
                  <p className="text-xs text-gray-400">{c.title}</p>
                </div>

                <button
                  onClick={() => handleCopyCoupon(c.code)}
                  className="rounded-lg bg-pink-600 hover:bg-pink-500 px-3 py-1.5 text-xs font-bold text-white transition"
                >
                  {copiedCoupon === c.code ? tLang.copied : tLang.copyCode}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Orders Section */}
      <h2 className="text-2xl font-bold mb-5 tracking-tight">
        {tLang.ordersHistory}
      </h2>

      {loading ? (
        <div className="rounded-2xl bg-gray-900/40 p-8 border border-gray-800 text-center">
          <p className="text-gray-400 animate-pulse">{tLang.loading}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="rounded-2xl bg-gray-900/40 p-8 border border-gray-800 text-center">
          <p className="text-gray-400">{tLang.noOrders}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => setSelectedOrder(order)}
              className="group rounded-2xl bg-gray-900/80 p-5 border border-gray-800 cursor-pointer hover:border-pink-500/50 hover:bg-gray-800/80 transition duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <p className="font-mono font-bold text-pink-400 text-base">
                    #{order.id.slice(0, 8)}
                  </p>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-xs text-gray-400">
                  {tLang.date}:{" "}
                  <span className="text-gray-300">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between border-t border-gray-800/80 pt-3 sm:pt-0 sm:border-0 gap-2">
                <span className="text-lg font-black text-pink-400 tracking-tight">
                  {money(order.total_amount)}
                </span>
                <span className="text-xs text-pink-400/80 group-hover:text-pink-400 group-hover:translate-x-0.5 transition duration-200 font-medium flex items-center gap-1">
                  {tLang.viewDetails} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-gray-900 p-6 border border-gray-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-pink-400">
                  {tLang.orderDet}
                </h3>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-gray-400 font-mono">
                    {tLang.id}: {selectedOrder.id}
                  </p>
                  <button
                    onClick={() => handleCopyId(selectedOrder.id)}
                    className="text-[10px] bg-gray-800 hover:bg-gray-700 text-pink-400 px-2 py-0.5 rounded border border-gray-700 transition"
                  >
                    {copiedId ? tLang.copied : tLang.copyId}
                  </button>
                </div>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-1 text-gray-400 hover:text-white hover:bg-gray-800 transition text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {renderTrackingTimeline(selectedOrder.status)}

            <div className="flex items-center justify-between text-xs text-gray-400 bg-gray-800/50 p-3 rounded-xl border border-gray-800">
              <div>
                <span>{tLang.date}: </span>
                <span className="text-gray-200 font-medium">
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </span>
              </div>
              <div>{getStatusBadge(selectedOrder.status)}</div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">
                {tLang.products}:
              </h4>
              <ul className="space-y-2 text-sm max-h-40 overflow-y-auto pr-1">
                {Array.isArray(selectedOrder.items) &&
                  selectedOrder.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex justify-between items-center bg-gray-800/30 p-2.5 rounded-lg border border-gray-800/50"
                    >
                      <span className="text-gray-200 font-medium">
                        {item.name}{" "}
                        <span className="text-pink-400 font-bold">
                          × {item.quantity}
                        </span>
                      </span>
                      <span className="font-semibold text-white">
                        {money(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
              </ul>
            </div>

            {selectedOrder.address && (
              <div className="border-t border-gray-800 pt-3 text-sm">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  {tLang.shippingAddr}:
                </span>
                <p className="text-gray-300 bg-gray-800/30 p-2.5 rounded-lg border border-gray-800/50">
                  {selectedOrder.address}
                </p>
              </div>
            )}

            {selectedOrder.notes && (
              <div className="border-t border-gray-800 pt-3 text-sm">
                <span className="font-bold text-xs uppercase tracking-wider text-gray-400 block mb-1">
                  {tLang.notes}:
                </span>
                <p className="text-gray-300 bg-gray-800/30 p-2.5 rounded-lg border border-gray-800/50">
                  {selectedOrder.notes}
                </p>
              </div>
            )}

            <div className="border-t border-gray-800 pt-4 flex justify-between items-center font-bold text-lg">
              <span className="text-gray-300">{tLang.totalPayable}</span>
              <span className="text-pink-400 text-xl font-black">
                {money(selectedOrder.total_amount)}
              </span>
            </div>

            <div className="space-y-2 pt-2">
              {selectedOrder.status?.toLowerCase() === "shipped" && (
                <button
                  onClick={() => handleConfirmDelivery(selectedOrder.id)}
                  disabled={confirmingDelivery}
                  className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 py-3 text-center font-bold text-white transition shadow-lg disabled:opacity-50"
                >
                  {confirmingDelivery
                    ? tLang.confirming
                    : `✅ ${tLang.confirmDelivery}`}
                </button>
              )}

              <button
                onClick={() => handleBuyAgain(selectedOrder)}
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 py-3 text-center font-bold text-white transition shadow-lg"
              >
                🔄 {tLang.buyAgain}
              </button>

              {(selectedOrder.status?.toLowerCase() === "pending" ||
                selectedOrder.status?.toLowerCase() === "processing") && (
                <button
                  onClick={() => handleCancelOrder(selectedOrder.id)}
                  disabled={cancelling}
                  className="w-full rounded-xl bg-red-600/20 border border-red-500/30 hover:bg-red-600 py-2.5 text-center text-xs font-bold text-red-400 hover:text-white transition disabled:opacity-50"
                >
                  {cancelling ? tLang.cancelling : tLang.cancelOrder}
                </button>
              )}
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full rounded-xl bg-gray-800 py-2.5 text-center font-bold text-gray-400 hover:text-white hover:bg-gray-700 transition"
            >
              {tLang.close}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
