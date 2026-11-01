import { AdminOrder, CouponType, OrderStatus, TrafficStats } from '../types/admin';

const ORDERS_STORAGE_KEY = 'vital_admin_orders_v2';
const TRAFFIC_STORAGE_KEY = 'vital_admin_traffic_v2';

const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: 'VTL-948210',
    createdAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(), // 24 minutes ago
    customer: {
      firstName: 'Sophie',
      lastName: 'Mercier',
      email: 'sophie.mercier.pro@gmail.com',
      phone: '06 42 19 88 34',
      address: '14 Rue des Lilas',
      postalCode: '69003',
      city: 'Lyon',
      notes: 'Déposer dans la boîte aux lettres sécurisée si absent.',
    },
    items: [
      {
        productId: 'wegovy',
        productName: 'Wegovy® FlexTouch®',
        dose: '1.0 mg (Maintien)',
        quantityBoxes: 2,
        unitPrice: 245.5,
        totalPrice: 491,
      },
    ],
    totalAmount: 491,
    paymentMethod: 'transcash',
    paymentMethodLabel: 'Coupon Transcash',
    couponDetails: {
      type: 'transcash',
      label: 'Coupon Transcash (Tabac / Recharge en ligne)',
      code1: '6521 8934 1102',
      code2: '7845 2310 9856',
      isCashed: false,
      verificationStatus: 'pending',
      cashNotes: 'Code 1 (250€) + Code 2 (250€). À vérifier sur portail Transcash.',
    },
    orderStatus: 'verification_coupon',
    trackingNumber: '',
    internalNotes: 'Patiente ayant demandé emballage isotherme renforcé.',
  },
  {
    id: 'VTL-931045',
    createdAt: new Date(Date.now() - 1000 * 60 * 85).toISOString(), // ~1.5h ago
    customer: {
      firstName: 'Alexandre',
      lastName: 'Dubois',
      email: 'a.dubois.consulting@orange.fr',
      phone: '07 81 55 90 12',
      address: '28 Avenue Foch, Bâtiment B',
      postalCode: '75116',
      city: 'Paris',
      notes: 'Digicode 4910B, 3e étage gauche.',
    },
    items: [
      {
        productId: 'mounjaro',
        productName: 'Mounjaro® KwikPen®',
        dose: '12.5 mg (Avancé)',
        quantityBoxes: 5,
        unitPrice: 223,
        totalPrice: 1115,
      },
    ],
    totalAmount: 1115,
    paymentMethod: 'google_gift',
    paymentMethodLabel: 'Coupon Google Play',
    couponDetails: {
      type: 'google_gift',
      label: 'Coupon Carte Cadeau Google Play',
      code1: '3K98-4PL2-9MQX-77ZB',
      code2: '2H99-1JK4-8TTM-33QA',
      isCashed: true,
      verificationStatus: 'verified',
      cashNotes: 'Crédits 500€ + 500€ vérifiés et ajoutés avec succès.',
    },
    orderStatus: 'en_preparation',
    trackingNumber: 'CHRONO-MED-8491039FR',
    internalNotes: 'Colis isotherme préparé sous carboglace.',
  },
  {
    id: 'VTL-918442',
    createdAt: new Date(Date.now() - 1000 * 60 * 210).toISOString(), // ~3.5h ago
    customer: {
      firstName: 'Émilie',
      lastName: 'Rousseau',
      email: 'emilie.rousseau78@yahoo.fr',
      phone: '06 18 90 23 45',
      address: '5 Impasse des Chênes Verts',
      postalCode: '33000',
      city: 'Bordeaux',
    },
    items: [
      {
        productId: 'zepbound',
        productName: 'Zepbound™ Auto-Injector',
        dose: '5.0 mg / 0.5 mL',
        quantityBoxes: 1,
        unitPrice: 289,
        totalPrice: 289,
      },
    ],
    totalAmount: 289,
    paymentMethod: 'apple_gift',
    paymentMethodLabel: 'Coupons Apple Gift',
    couponDetails: {
      type: 'apple_gift',
      label: 'Carte Cadeau Apple Gift Card (App Store & iTunes)',
      code1: 'XMP9923841102941',
      code2: 'XKT8810239451120',
      isCashed: true,
      verificationStatus: 'verified',
      cashNotes: 'Carte Apple vérifiée à 15h12.',
    },
    orderStatus: 'expedie',
    trackingNumber: '8V019283921FR',
    internalNotes: 'Expédié via Chronopost Santé 24h Express.',
  },
  {
    id: 'VTL-889311',
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // ~7h ago
    customer: {
      firstName: 'Julien',
      lastName: 'Faure',
      email: 'julien.faure.sport@gmail.com',
      phone: '06 99 12 77 00',
      address: '77 Boulevard de la Croisette',
      postalCode: '06400',
      city: 'Cannes',
    },
    items: [
      {
        productId: 'mounjaro',
        productName: 'Mounjaro® KwikPen®',
        dose: '5.0 mg (Élévation)',
        quantityBoxes: 2,
        unitPrice: 267.5,
        totalPrice: 535,
      },
    ],
    totalAmount: 535,
    paymentMethod: 'paypal',
    paymentMethodLabel: 'PayPal',
    couponDetails: {
      type: 'paypal',
      label: 'Paiement Sécurisé PayPal',
      paypalEmail: 'j.faure.cannes@gmail.com',
      isCashed: true,
      verificationStatus: 'verified',
      cashNotes: 'Transaction PayPal ID #PP-9941824 approuvée.',
    },
    orderStatus: 'paye',
    trackingNumber: 'CHRONO-MED-7719203FR',
  },
  {
    id: 'VTL-842109',
    createdAt: new Date(Date.now() - 1000 * 60 * 780).toISOString(), // ~13h ago
    customer: {
      firstName: 'Béatrice',
      lastName: 'Lefebvre',
      email: 'beatrice.lefebvre@wanadoo.fr',
      phone: '06 33 45 89 10',
      address: '3 Rue Maréchal Leclerc',
      postalCode: '59000',
      city: 'Lille',
    },
    items: [
      {
        productId: 'wegovy',
        productName: 'Wegovy® FlexTouch®',
        dose: '2.4 mg (Dose Maximale)',
        quantityBoxes: 5,
        unitPrice: 202,
        totalPrice: 1010,
      },
    ],
    totalAmount: 1010,
    paymentMethod: 'bank_transfer',
    paymentMethodLabel: 'Virement bancaire SEPA',
    couponDetails: {
      type: 'bank_transfer',
      label: 'Virement bancaire immédiat SEPA',
      bankReference: 'VTL-842109-LEFEBVRE',
      isCashed: false,
      verificationStatus: 'pending',
      cashNotes: 'En attente de réception sur compte BNP Paribas.',
    },
    orderStatus: 'verification_coupon',
  },
];

class AdminStore {
  private orders: AdminOrder[] = [];
  private listeners: (() => void)[] = [];
  private trafficMultiplier = 1;

  constructor() {
    this.loadOrders();
    this.recordPageVisit();
  }

  private loadOrders(): void {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        this.orders = JSON.parse(saved);
      } else {
        this.orders = [...INITIAL_ORDERS];
        this.saveOrders();
      }
    } catch (e) {
      this.orders = [...INITIAL_ORDERS];
    }
  }

  private saveOrders(): void {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(this.orders));
    } catch (e) {
      console.error('Failed to save orders in localStorage', e);
    }
    this.notify();
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((l) => l());
  }

  public getOrders(): AdminOrder[] {
    return [...this.orders];
  }

  public addOrder(newOrderData: {
    customer: AdminOrder['customer'];
    items: AdminOrder['items'];
    totalAmount: number;
    paymentMethod: CouponType;
    paymentMethodLabel: string;
    couponDetails: AdminOrder['couponDetails'];
  }): AdminOrder {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const newOrder: AdminOrder = {
      id: `VTL-${randomSuffix}`,
      createdAt: new Date().toISOString(),
      ...newOrderData,
      orderStatus: 'verification_coupon',
      trackingNumber: '',
      internalNotes: 'Nouvelle commande enregistrée depuis le site web.',
    };

    this.orders.unshift(newOrder);
    this.saveOrders();
    return newOrder;
  }

  public updateOrderStatus(orderId: string, status: OrderStatus): void {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, orderStatus: status };
      }
      return o;
    });
    this.saveOrders();
  }

  public updateCouponStatus(
    orderId: string,
    isCashed: boolean,
    status: 'pending' | 'verified' | 'failed',
    notes?: string
  ): void {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          orderStatus: isCashed ? (o.orderStatus === 'verification_coupon' ? 'paye' : o.orderStatus) : o.orderStatus,
          couponDetails: {
            ...o.couponDetails,
            isCashed,
            verificationStatus: status,
            cashNotes: notes !== undefined ? notes : o.couponDetails.cashNotes,
          },
        };
      }
      return o;
    });
    this.saveOrders();
  }

  public updateTrackingNumber(orderId: string, trackingNumber: string): void {
    this.orders = this.orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          trackingNumber,
          orderStatus: trackingNumber ? 'expedie' : o.orderStatus,
        };
      }
      return o;
    });
    this.saveOrders();
  }

  public deleteOrder(orderId: string): void {
    this.orders = this.orders.filter((o) => o.id !== orderId);
    this.saveOrders();
  }

  public recordPageVisit(): void {
    try {
      const todayStr = new Date().toISOString().slice(0, 10);
      const saved = localStorage.getItem(TRAFFIC_STORAGE_KEY);
      let data = saved ? JSON.parse(saved) : { date: todayStr, visits: 240, unique: 180 };
      if (data.date !== todayStr) {
        data = { date: todayStr, visits: 1, unique: 1 };
      } else {
        data.visits += 1;
      }
      localStorage.setItem(TRAFFIC_STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // ignore
    }
  }

  public getTrafficStats(): TrafficStats {
    let baseVisits = 438;
    try {
      const saved = localStorage.getItem(TRAFFIC_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (data.visits) baseVisits += data.visits;
      }
    } catch (e) {
      // ignore
    }

    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const todayOrders = this.orders.filter((o) => {
      const date = new Date(o.createdAt);
      const now = new Date();
      return date.getDate() === now.getDate() && date.getMonth() === now.getMonth();
    });
    const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

    // Calculate dynamic live visitors based on time
    const currentHour = new Date().getHours();
    const liveFactor = currentHour >= 9 && currentHour <= 23 ? 14 : 6;
    const liveVisitors = liveFactor + Math.floor(Math.sin(Date.now() / 60000) * 4);

    return {
      todayVisits: baseVisits,
      totalVisits: baseVisits + 3890,
      uniqueVisitors: Math.round(baseVisits * 0.78),
      liveVisitors: Math.max(5, liveVisitors),
      conversionRate: Number(((totalOrders / Math.max(1, baseVisits)) * 100).toFixed(2)),
      revenueToday: todayRevenue,
      revenueTotal: totalRevenue,
      hourlyVisits: [
        { hour: '08:00', visits: 18, orders: 0 },
        { hour: '10:00', visits: 42, orders: 1 },
        { hour: '12:00', visits: 68, orders: 1 },
        { hour: '14:00', visits: 85, orders: 2 },
        { hour: '16:00', visits: 92, orders: 1 },
        { hour: '18:00', visits: 104, orders: 2 },
        { hour: '20:00', visits: 78, orders: 1 },
        { hour: '22:00', visits: 45, orders: 1 },
      ],
      sources: [
        { source: 'Recherche Google (SEO / Sémaglutide France)', count: 210, percentage: 48 },
        { source: 'Accès Direct (Marque-page / vitalpharma.ai.studio)', count: 112, percentage: 25 },
        { source: 'Recommandation WhatsApp & Partage', count: 68, percentage: 15 },
        { source: 'Forums & Groupes Santé GLP-1', count: 48, percentage: 12 },
      ],
      deviceBreakdown: [
        { device: 'Smartphone (iOS & Android)', count: 302, percentage: 69 },
        { device: 'Ordinateur (Chrome / Safari / Firefox)', count: 114, percentage: 26 },
        { device: 'Tablette (iPad)', count: 22, percentage: 5 },
      ],
      productViews: [
        { name: 'Wegovy® FlexTouch®', views: 245, percentage: 49 },
        { name: 'Mounjaro® KwikPen®', views: 184, percentage: 37 },
        { name: 'Zepbound™ Auto-Injector', views: 72, percentage: 14 },
      ],
    };
  }

  public generateMockOrder(): AdminOrder {
    const sampleNames = [
      { first: 'Corinne', last: 'Vidal', city: 'Nantes', zip: '44000', mail: 'c.vidal@outlook.fr', phone: '06 20 44 91 12' },
      { first: 'Thomas', last: 'Garnier', city: 'Toulouse', zip: '31000', mail: 'thomas.g@free.fr', phone: '07 60 11 23 89' },
      { first: 'Nathalie', last: 'Perrot', city: 'Strasbourg', zip: '67000', mail: 'n.perrot@gmail.com', phone: '06 14 78 90 22' },
    ];
    const picked = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const types: CouponType[] = ['transcash', 'google_gift', 'apple_gift', 'paypal'];
    const couponType = types[Math.floor(Math.random() * types.length)];

    let code1 = '';
    let code2 = '';
    let label = '';
    if (couponType === 'transcash') {
      label = 'Coupon Transcash';
      code1 = `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
      code2 = `${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`;
    } else if (couponType === 'google_gift') {
      label = 'Coupon Google Play';
      code1 = '4A' + Math.floor(10 + Math.random() * 89) + '-77PL-99KL-22MN';
    } else if (couponType === 'apple_gift') {
      label = 'Coupons Apple Gift';
      code1 = 'XMP' + Math.floor(1000000000000 + Math.random() * 8999999999999);
    } else {
      label = 'PayPal';
    }

    return this.addOrder({
      customer: {
        firstName: picked.first,
        lastName: picked.last,
        email: picked.mail,
        phone: picked.phone,
        address: '12 Avenue de la Liberté',
        postalCode: picked.zip,
        city: picked.city,
      },
      items: [
        {
          productId: 'mounjaro',
          productName: 'Mounjaro® KwikPen®',
          dose: '5.0 mg (Élévation)',
          quantityBoxes: 2,
          unitPrice: 267.5,
          totalPrice: 535,
        },
      ],
      totalAmount: 535,
      paymentMethod: couponType,
      paymentMethodLabel: label,
      couponDetails: {
        type: couponType,
        label,
        code1,
        code2,
        isCashed: false,
        verificationStatus: 'pending',
        cashNotes: 'Code généré par simulation administrative.',
      },
    });
  }

  public resetToDefaults(): void {
    this.orders = [...INITIAL_ORDERS];
    this.saveOrders();
  }
}

export const adminStore = new AdminStore();
