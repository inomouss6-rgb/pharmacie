import React, { useState, useEffect } from 'react';
import { adminStore } from '../../services/adminStore';
import { AdminOrder, CouponType, OrderStatus, TrafficStats } from '../../types/admin';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Ticket,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Copy,
  Check,
  LogOut,
  RefreshCw,
  PlusCircle,
  Download,
  ExternalLink,
  ChevronDown,
  Calendar,
  Smartphone,
  Monitor,
  Eye,
  DollarSign,
  ArrowUpRight,
  Sparkles,
  Info,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onExitToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onExitToStore }) => {
  const [orders, setOrders] = useState<AdminOrder[]>(adminStore.getOrders());
  const [traffic, setTraffic] = useState<TrafficStats>(adminStore.getTrafficStats());
  const [activeTab, setActiveTab] = useState<'coupons' | 'orders' | 'traffic' | 'tools'>('coupons');
  
  // Search and Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [couponTypeFilter, setCouponTypeFilter] = useState<string>('all');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);
  
  // Selected order for detailed modal
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);

  // Sync state with adminStore
  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setOrders(adminStore.getOrders());
      setTraffic(adminStore.getTrafficStats());
    });
    return () => unsubscribe();
  }, []);

  // Periodic traffic pulse update
  useEffect(() => {
    const timer = setInterval(() => {
      setTraffic(adminStore.getTrafficStats());
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    adminStore.updateOrderStatus(orderId, status);
  };

  const handleValidateCoupon = (orderId: string, isCashed: boolean) => {
    const dateStr = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    adminStore.updateCouponStatus(
      orderId,
      isCashed,
      isCashed ? 'verified' : 'pending',
      isCashed ? `Encaissé avec succès le ${dateStr}` : 'En attente'
    );
  };

  const handleAddMockOrder = () => {
    const newOrd = adminStore.generateMockOrder();
    setSelectedOrder(newOrd);
  };

  const handleExportCSV = () => {
    const headers = 'ID,Date,Client,Email,Telephone,Montant,Methode,Statut,Code1,Code2\n';
    const rows = orders
      .map(
        (o) =>
          `"${o.id}","${o.createdAt}","${o.customer.firstName} ${o.customer.lastName}","${o.customer.email}","${o.customer.phone}","${o.totalAmount}€","${o.paymentMethodLabel}","${o.orderStatus}","${o.couponDetails.code1 || ''}","${o.couponDetails.code2 || ''}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `commandes_vitalglp_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${o.customer.firstName} ${o.customer.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customer.phone.includes(searchQuery) ||
      (o.couponDetails.code1 && o.couponDetails.code1.includes(searchQuery)) ||
      (o.couponDetails.code2 && o.couponDetails.code2.includes(searchQuery));

    const matchesStatus = orderStatusFilter === 'all' || o.orderStatus === orderStatusFilter;
    const matchesType = couponTypeFilter === 'all' || o.paymentMethod === couponTypeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const ordersWithCoupons = filteredOrders.filter(
    (o) => o.paymentMethod === 'transcash' || o.paymentMethod === 'google_gift' || o.paymentMethod === 'apple_gift'
  );

  const pendingCouponsCount = orders.filter(
    (o) => !o.couponDetails.isCashed && (o.paymentMethod === 'transcash' || o.paymentMethod === 'google_gift' || o.paymentMethod === 'apple_gift')
  ).length;

  const totalCouponValue = orders
    .filter((o) => o.paymentMethod === 'transcash' || o.paymentMethod === 'google_gift' || o.paymentMethod === 'apple_gift')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const getCouponBadgeColor = (type: CouponType) => {
    switch (type) {
      case 'transcash':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'google_gift':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'apple_gift':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'paypal':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'bank_transfer':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'verification_coupon':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200"><Clock className="w-3 h-3" /> À vérifier</span>;
      case 'paye':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3" /> Payé</span>;
      case 'en_preparation':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-800 border border-indigo-200"><Package className="w-3 h-3" /> Préparation froid</span>;
      case 'expedie':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200"><Truck className="w-3 h-3" /> Expédié</span>;
      case 'livre':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300"><Check className="w-3 h-3" /> Livré</span>;
      case 'annule':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200"><AlertCircle className="w-3 h-3" /> Annulé</span>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20 font-sans">
      
      {/* Top Navbar */}
      <header className="bg-slate-950 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Logo & Portal Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white shadow-sm">
              VP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base tracking-tight text-white">VitalGLP</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Espace Admin Privé
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Contrôle des commandes, trafic en direct & validation des coupons
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Visitors Heartbeat Badge */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span><strong>{traffic.liveVisitors}</strong> en ligne</span>
            </div>

            {/* Quick Test Order Button */}
            <button
              onClick={handleAddMockOrder}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors cursor-pointer border border-slate-700"
              title="Créer une commande de test avec coupon"
            >
              <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Simuler Commande</span>
            </button>

            {/* Back to Storefront */}
            <button
              onClick={onExitToStore}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white transition-colors cursor-pointer shadow-sm"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Voir la Boutique</span>
            </button>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 rounded-xl bg-slate-800 hover:bg-red-950/60 hover:text-red-400 text-slate-400 transition-colors cursor-pointer"
              title="Se déconnecter"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Chiffre d'Affaires */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Chiffre d'Affaires</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {traffic.revenueTotal.toLocaleString('fr-FR')} €
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>Aujourd'hui : {traffic.revenueToday.toLocaleString('fr-FR')} €</span>
            </div>
          </div>

          {/* Card 2: Commandes Totales */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Commandes</span>
              <Package className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {orders.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-700 font-bold">
              <Clock className="w-3.5 h-3.5" />
              <span>{orders.filter((o) => o.orderStatus === 'verification_coupon').length} à valider</span>
            </div>
          </div>

          {/* Card 3: Coupons Clients à Traiter */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Coupons Clients</span>
              <Ticket className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {ordersWithCoupons.length}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-red-600 font-bold">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{pendingCouponsCount} coupon(s) en attente</span>
            </div>
          </div>

          {/* Card 4: Trafic & Visiteurs */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>Trafic Aujourd'hui</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {traffic.todayVisits}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-bold">
              <span>Taux de conv. : <strong>{traffic.conversionRate}%</strong></span>
            </div>
          </div>

        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-1">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'coupons'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Ticket className="w-4 h-4 text-red-400" />
            <span>Codes & Coupons Clients</span>
            {pendingCouponsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-red-600 text-white font-bold ml-1">
                {pendingCouponsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4 text-sky-400" />
            <span>Toutes les Commandes ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('traffic')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'traffic'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Statistiques & Trafic</span>
          </button>

          <button
            onClick={() => setActiveTab('tools')}
            className={`px-4 py-2.5 rounded-xl font-extrabold text-sm flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'tools'
                ? 'bg-slate-950 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Outils & Lien Privé</span>
          </button>
        </div>

        {/* TAB 1: CODES ET COUPONS DES CLIENTS (Focus demandé par l'utilisateur) */}
        {activeTab === 'coupons' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Coupon Summary Banner */}
            <div className="bg-gradient-to-r from-red-950 via-slate-900 to-slate-950 text-white rounded-2xl p-6 border border-red-900/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider mb-1">
                  <Ticket className="w-4 h-4" />
                  <span>Module d'Encaissement des Coupons</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black">
                  Codes & Recharges fournis par les Clients
                </h2>
                <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                  Retrouvez ci-dessous les codes de coupons saisis par les acheteurs (Transcash, Google Play, Apple Gift). Vous pouvez les copier en un clic et les marquer comme encaissés une fois validés sur vos comptes.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 px-4 border border-white/10 text-center shrink-0">
                <div className="text-[11px] text-slate-300 font-medium">Valeur totale des coupons</div>
                <div className="text-2xl font-black text-emerald-400">{totalCouponValue.toLocaleString('fr-FR')} €</div>
              </div>
            </div>

            {/* Filter and Search Bar for Coupons */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par code, nom de client, email ou commande..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-slate-500">Type de coupon :</span>
                {['all', 'transcash', 'google_gift', 'apple_gift'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setCouponTypeFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors cursor-pointer border ${
                      couponTypeFilter === type
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {type === 'all'
                      ? 'Tous les coupons'
                      : type === 'transcash'
                      ? 'Transcash'
                      : type === 'google_gift'
                      ? 'Google Play'
                      : 'Apple Gift'}
                  </button>
                ))}
              </div>
            </div>

            {/* Coupon Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ordersWithCoupons.map((order) => {
                const isCashed = order.couponDetails.isCashed;
                const dateFormatted = new Date(order.createdAt).toLocaleString('fr-FR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <div
                    key={order.id}
                    className={`bg-white rounded-2xl border p-5 shadow-2xs space-y-4 transition-all ${
                      isCashed
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-red-300 ring-2 ring-red-500/10'
                    }`}
                  >
                    {/* Header: Coupon Type & Status */}
                    <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-extrabold border ${getCouponBadgeColor(order.paymentMethod)}`}>
                            {order.paymentMethodLabel}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-500">
                            {order.id}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-400 mt-1">
                          Enregistré le {dateFormatted}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-lg font-black text-slate-900">
                          {order.totalAmount} €
                        </div>
                        <div>
                          {isCashed ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              <CheckCircle2 className="w-3 h-3" /> Encaissé
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                              <Clock className="w-3 h-3" /> À encaisser
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Customer identity */}
                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1">
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{order.customer.firstName} {order.customer.lastName}</span>
                        <span className="text-slate-500 font-normal">{order.customer.city} ({order.customer.postalCode})</span>
                      </div>
                      <div className="text-slate-600 flex flex-wrap items-center gap-3 text-[11px]">
                        <span>📞 {order.customer.phone}</span>
                        <span>✉️ {order.customer.email}</span>
                      </div>
                      <div className="text-slate-500 text-[11px] pt-1 border-t border-slate-200/60 truncate">
                        📦 {order.items.map((i) => `${i.productName} (${i.dose}) x${i.quantityBoxes}`).join(', ')}
                      </div>
                    </div>

                    {/* Prominent Codes Display */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                        Codes du coupon fournis par le client :
                      </div>

                      {/* Code 1 */}
                      {order.couponDetails.code1 && (
                        <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between gap-2 shadow-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Code Principal :
                            </span>
                            <span className="text-sm sm:text-base font-mono font-black tracking-wider text-emerald-400 select-all">
                              {order.couponDetails.code1}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyCode(order.couponDetails.code1!, `${order.id}-1`)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedCodeId === `${order.id}-1` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copier</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Code 2 (if provided) */}
                      {order.couponDetails.code2 && (
                        <div className="bg-slate-900 text-white rounded-xl p-3 flex items-center justify-between gap-2 shadow-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 uppercase font-bold block">
                              Deuxième Code (Complément) :
                            </span>
                            <span className="text-sm sm:text-base font-mono font-black tracking-wider text-emerald-400 select-all">
                              {order.couponDetails.code2}
                            </span>
                          </div>

                          <button
                            onClick={() => handleCopyCode(order.couponDetails.code2!, `${order.id}-2`)}
                            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            {copiedCodeId === `${order.id}-2` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-emerald-400">Copié !</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copier</span>
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* No code alert */}
                      {!order.couponDetails.code1 && !order.couponDetails.code2 && (
                        <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-xs border border-amber-200">
                          Aucun code saisi au formulaire. Contacter le client par téléphone ({order.customer.phone}).
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                      <div className="text-[11px] text-slate-500 truncate">
                        {order.couponDetails.cashNotes || 'Aucune note'}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isCashed ? (
                          <button
                            onClick={() => handleValidateCoupon(order.id, false)}
                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
                          >
                            Remettre en attente
                          </button>
                        ) : (
                          <button
                            onClick={() => handleValidateCoupon(order.id, true)}
                            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-sm transition-all"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Valider l'Encaissement</span>
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer"
                          title="Voir tous les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {ordersWithCoupons.length === 0 && (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
                <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="font-bold text-slate-700 text-base">Aucun coupon trouvé avec ce filtre</h3>
                <p className="text-xs text-slate-400">
                  Créez une simulation pour tester ou attendez qu'un client passe commande sur le site.
                </p>
                <button
                  onClick={handleAddMockOrder}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
                >
                  + Générer une commande avec coupon Transcash
                </button>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: TOUTES LES COMMANDES */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
              <div className="flex-1 min-w-[240px] relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par ID, client, email, téléphone ou ville..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={orderStatusFilter}
                  onChange={(e) => setOrderStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="all">Tous les statuts</option>
                  <option value="verification_coupon">À vérifier coupon</option>
                  <option value="paye">Payé</option>
                  <option value="en_preparation">Préparation froid</option>
                  <option value="expedie">Expédié</option>
                  <option value="livre">Livré</option>
                </select>

                <button
                  onClick={handleExportCSV}
                  className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200 text-[11px]">
                    <tr>
                      <th className="p-4">Réf & Date</th>
                      <th className="p-4">Client & Contact</th>
                      <th className="p-4">Produits</th>
                      <th className="p-4">Paiement & Coupon</th>
                      <th className="p-4">Total</th>
                      <th className="p-4">Statut</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                        {/* Ref & Date */}
                        <td className="p-4">
                          <span className="font-mono font-bold text-slate-900 block">{ord.id}</span>
                          <span className="text-[11px] text-slate-400">
                            {new Date(ord.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="p-4">
                          <span className="font-bold text-slate-900 block">
                            {ord.customer.firstName} {ord.customer.lastName}
                          </span>
                          <span className="text-[11px] text-slate-500 block">{ord.customer.email}</span>
                          <span className="text-[11px] text-slate-400">{ord.customer.phone} · {ord.customer.city}</span>
                        </td>

                        {/* Items */}
                        <td className="p-4">
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="font-medium text-slate-800">
                              {it.productName} ({it.dose})
                              <span className="text-slate-400 ml-1">x{it.quantityBoxes} bte(s)</span>
                            </div>
                          ))}
                        </td>

                        {/* Payment & Coupon */}
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getCouponBadgeColor(ord.paymentMethod)}`}>
                            {ord.paymentMethodLabel}
                          </span>
                          {ord.couponDetails.code1 && (
                            <span className="block font-mono text-[11px] text-slate-600 font-bold mt-1">
                              Code : {ord.couponDetails.code1.slice(0, 10)}...
                            </span>
                          )}
                        </td>

                        {/* Total */}
                        <td className="p-4 font-black text-slate-900 text-sm">
                          {ord.totalAmount} €
                        </td>

                        {/* Status dropdown */}
                        <td className="p-4">
                          <select
                            value={ord.orderStatus}
                            onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as OrderStatus)}
                            className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-semibold bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500"
                          >
                            <option value="verification_coupon">À vérifier coupon</option>
                            <option value="paye">Payé</option>
                            <option value="en_preparation">Préparation froid</option>
                            <option value="expedie">Expédié</option>
                            <option value="livre">Livré</option>
                            <option value="annule">Annulé</option>
                          </select>
                        </td>

                        {/* Action Details */}
                        <td className="p-4 text-right">
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer"
                          >
                            Détails
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: STATISTIQUES & TRAFIC */}
        {activeTab === 'traffic' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Real-time visits summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visites Aujourd'hui</span>
                <div className="text-3xl font-black text-slate-900">{traffic.todayVisits}</div>
                <div className="text-xs text-slate-500">Total cumulé : {traffic.totalVisits} sessions</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Visiteurs Uniques</span>
                <div className="text-3xl font-black text-emerald-600">{traffic.uniqueVisitors}</div>
                <div className="text-xs text-slate-500">78% de nouveaux visiteurs</div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Panier Moyen</span>
                <div className="text-3xl font-black text-indigo-600">
                  {Math.round(traffic.revenueTotal / Math.max(1, orders.length))} €
                </div>
                <div className="text-xs text-slate-500">Moyenne packs 2 et 5 boîtes</div>
              </div>
            </div>

            {/* Traffic by hour chart simulation */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Affluence & Commandes par tranche horaire
                  </h3>
                  <p className="text-xs text-slate-400">Pic de fréquentation entre 14h et 20h</p>
                </div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Aujourd'hui
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 pt-4">
                {traffic.hourlyVisits.map((item, idx) => {
                  const heightPercent = Math.min(100, Math.round((item.visits / 110) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2">
                      <div className="w-full bg-slate-100 rounded-xl h-28 flex items-end p-1 relative group">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-emerald-500 group-hover:bg-emerald-600 rounded-lg transition-all"
                        />
                        <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap">
                          {item.visits} visites ({item.orders} cmd)
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{item.hour}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Channels & Devices */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Sources */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  Canaux d'Acquisition
                </h4>
                <div className="space-y-3">
                  {traffic.sources.map((src, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700">{src.source}</span>
                        <span className="font-bold text-slate-900">{src.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${src.percentage}%` }}
                          className="h-full bg-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Devices */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider">
                  Répartition par Appareil
                </h4>
                <div className="space-y-3">
                  {traffic.deviceBreakdown.map((dev, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-700">{dev.device}</span>
                        <span className="font-bold text-slate-900">{dev.percentage}%</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${dev.percentage}%` }}
                          className="h-full bg-indigo-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: OUTILS & LIEN D'ACCES DIRECT */}
        {activeTab === 'tools' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Direct Link Share Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <ExternalLink className="w-4 h-4 text-emerald-600" />
                <span>Votre Lien d'Accès Administrateur Privé</span>
              </div>
              <p className="text-xs text-slate-600">
                Comme demandé, ce lien n'apparaît nulle part sur le site public pour préserver la discrétion et la sécurité. Vous pouvez utiliser ce lien direct dans vos favoris :
              </p>

              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between gap-3">
                <code className="text-xs font-mono text-emerald-400 break-all select-all">
                  https://vitalpharma.ai.studio/?view=admin
                </code>
                <button
                  onClick={() => handleCopyCode('https://vitalpharma.ai.studio/?view=admin', 'link-admin')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shrink-0 flex items-center gap-1 cursor-pointer"
                >
                  {copiedCodeId === 'link-admin' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copié !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le lien</span>
                    </>
                  )}
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-1">
                <div className="font-bold text-slate-800">Codes d'accès configurés :</div>
                <div>• Mot de passe : <strong>vital2026</strong> ou <strong>admin2026</strong></div>
                <div>• Support des alias d'URL : <code>/admin</code>, <code>#admin</code> ou <code>?view=admin</code></div>
              </div>
            </div>

            {/* Simulation Generator */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-900">
                Générateur de Tests & Commandes Démo
              </h3>
              <p className="text-xs text-slate-500">
                Besoin de tester l'arrivée d'une nouvelle commande avec un code Transcash, Google Play ou Apple Gift ? Cliquez sur le bouton ci-dessous :
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAddMockOrder}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>Générer une commande avec coupon</span>
                </button>

                <button
                  onClick={() => {
                    if (confirm('Voulez-vous réinitialiser les données de démonstration ?')) {
                      adminStore.resetToDefaults();
                    }
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Réinitialiser les données démo</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </main>

      {/* DETAILED ORDER MODAL */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base">Commande {selectedOrder.id}</span>
                  {getStatusBadge(selectedOrder.orderStatus)}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Reçue le {new Date(selectedOrder.createdAt).toLocaleString('fr-FR')}
                </p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4 text-xs">
              
              {/* Customer Info */}
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-2 border border-slate-200/60">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
                  Coordonnées & Livraison :
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Nom complet :</span>
                    <strong className="text-slate-900">{selectedOrder.customer.firstName} {selectedOrder.customer.lastName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Téléphone :</span>
                    <strong>{selectedOrder.customer.phone}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email :</span>
                    <strong>{selectedOrder.customer.email}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Adresse :</span>
                    <span>{selectedOrder.customer.address}, {selectedOrder.customer.postalCode} {selectedOrder.customer.city}</span>
                  </div>
                </div>
                {selectedOrder.customer.notes && (
                  <div className="pt-2 border-t border-slate-200 text-slate-600">
                    <span className="font-bold">Instructions client :</span> {selectedOrder.customer.notes}
                  </div>
                )}
              </div>

              {/* Coupon / Payment Details */}
              <div className="p-3.5 bg-emerald-50/50 rounded-xl space-y-2 border border-emerald-200">
                <span className="font-bold text-emerald-900 uppercase tracking-wider block text-[11px]">
                  Détail du paiement ({selectedOrder.paymentMethodLabel}) :
                </span>
                
                {selectedOrder.couponDetails.code1 && (
                  <div className="bg-slate-900 text-white p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Code Coupon 1 :</span>
                      <strong className="font-mono text-emerald-400 text-sm select-all">{selectedOrder.couponDetails.code1}</strong>
                    </div>
                    <button
                      onClick={() => handleCopyCode(selectedOrder.couponDetails.code1!, 'modal-1')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-bold text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeId === 'modal-1' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copier</span>
                    </button>
                  </div>
                )}

                {selectedOrder.couponDetails.code2 && (
                  <div className="bg-slate-900 text-white p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Code Coupon 2 :</span>
                      <strong className="font-mono text-emerald-400 text-sm select-all">{selectedOrder.couponDetails.code2}</strong>
                    </div>
                    <button
                      onClick={() => handleCopyCode(selectedOrder.couponDetails.code2!, 'modal-2')}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-bold text-white flex items-center gap-1 cursor-pointer"
                    >
                      {copiedCodeId === 'modal-2' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>Copier</span>
                    </button>
                  </div>
                )}

                {selectedOrder.couponDetails.paypalEmail && (
                  <div>
                    <span className="text-slate-500">Compte PayPal associé : </span>
                    <strong>{selectedOrder.couponDetails.paypalEmail}</strong>
                  </div>
                )}

                {selectedOrder.couponDetails.bankReference && (
                  <div>
                    <span className="text-slate-500">Référence de virement : </span>
                    <strong className="font-mono">{selectedOrder.couponDetails.bankReference}</strong>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t border-emerald-200/60">
                  <span className="text-[11px] text-emerald-800">
                    Statut encaissement : <strong>{selectedOrder.couponDetails.isCashed ? 'Encaissé' : 'En attente'}</strong>
                  </span>
                  <button
                    onClick={() => {
                      handleValidateCoupon(selectedOrder.id, !selectedOrder.couponDetails.isCashed);
                      setSelectedOrder((prev) => prev ? {
                        ...prev,
                        orderStatus: !prev.couponDetails.isCashed ? 'paye' : prev.orderStatus,
                        couponDetails: { ...prev.couponDetails, isCashed: !prev.couponDetails.isCashed }
                      } : null);
                    }}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    {selectedOrder.couponDetails.isCashed ? 'Marquer comme non-encaissé' : 'Valider encaissement'}
                  </button>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-1">
                <span className="font-bold text-slate-900 uppercase tracking-wider block text-[11px]">
                  Articles commandés :
                </span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <div>
                      <strong className="text-slate-900 block">{it.productName}</strong>
                      <span className="text-[11px] text-slate-500">Dosage {it.dose} · Pack {it.quantityBoxes} boîte(s)</span>
                    </div>
                    <span className="font-black text-slate-900 text-sm">{it.totalPrice} €</span>
                  </div>
                ))}
              </div>

              {/* Tracking number assigner */}
              <div className="pt-2 border-t border-slate-200 space-y-1.5">
                <label className="block font-bold text-slate-700 text-[11px] uppercase tracking-wider">
                  Numéro de suivi Colissimo / Chronopost Santé :
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    defaultValue={selectedOrder.trackingNumber || ''}
                    placeholder="Ex: 8V019283921FR"
                    id="tracking-input"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('tracking-input') as HTMLInputElement;
                      if (input) {
                        adminStore.updateTrackingNumber(selectedOrder.id, input.value);
                        alert(`Numéro de suivi mis à jour pour ${selectedOrder.id}`);
                        setSelectedOrder((prev) => prev ? { ...prev, trackingNumber: input.value, orderStatus: 'expedie' } : null);
                      }
                    }}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer"
                  >
                    Enregistrer Suivi
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
