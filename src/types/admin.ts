export type CouponType =
  | 'transcash'
  | 'google_gift'
  | 'apple_gift'
  | 'paypal'
  | 'bank_transfer'
  | 'card';

export type OrderStatus =
  | 'verification_coupon'
  | 'paye'
  | 'en_preparation'
  | 'expedie'
  | 'livre'
  | 'annule';

export interface AdminOrderItem {
  productId: string;
  productName: string;
  dose: string;
  quantityBoxes: number;
  unitPrice: number;
  totalPrice: number;
}

export interface AdminOrder {
  id: string; // Ex: VTL-784910
  createdAt: string; // Date ISO
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    postalCode: string;
    city: string;
    notes?: string;
  };
  items: AdminOrderItem[];
  totalAmount: number;
  paymentMethod: CouponType;
  paymentMethodLabel: string;
  couponDetails: {
    type: CouponType;
    label: string;
    code1?: string;
    code2?: string;
    paypalEmail?: string;
    bankReference?: string;
    cardLast4?: string;
    isCashed: boolean;
    verificationStatus: 'pending' | 'verified' | 'failed';
    cashNotes?: string;
  };
  orderStatus: OrderStatus;
  trackingNumber?: string;
  internalNotes?: string;
}

export interface TrafficStats {
  todayVisits: number;
  totalVisits: number;
  uniqueVisitors: number;
  liveVisitors: number;
  conversionRate: number;
  revenueToday: number;
  revenueTotal: number;
  hourlyVisits: { hour: string; visits: number; orders: number }[];
  sources: { source: string; count: number; percentage: number }[];
  deviceBreakdown: { device: string; count: number; percentage: number }[];
  productViews: { name: string; views: number; percentage: number }[];
}
