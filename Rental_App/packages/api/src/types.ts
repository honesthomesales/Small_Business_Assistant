export type PropertyType = 'house' | 'singlewide' | 'doublewide';
export type PropertyStatus = 'rented' | 'empty' | 'owner_finance' | 'lease_purchase';
export type TransactionType = 'rent_payment' | 'loan_payment' | 'property_sale' | 'property_purchase' | 'expense' | 'income';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'cancelled';
export type LateStatus = 'on_time' | 'late_5_days' | 'late_10_days' | 'eviction_notice';

export interface Property {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: PropertyType;
  status: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  year_built?: number;
  purchase_price?: number;
  purchase_date?: string;
  current_value?: number;
  monthly_rent?: number;
  is_for_sale: boolean;
  is_for_rent: boolean;
  insurance_policy_number?: string;
  insurance_provider?: string;
  insurance_expiry_date?: string;
  insurance_premium?: number;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
  tenants?: Tenant[];
}

export interface Tenant {
  id: string;
  property_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  move_in_date?: string;
  lease_start_date?: string;
  lease_end_date?: string;
  monthly_rent?: number;
  security_deposit?: number;
  lease_pdf_url?: string;
  payment_history: PaymentHistoryItem[];
  late_fees_owed: number;
  late_status: LateStatus;
  last_payment_date?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  properties?: Property; // Add property information for late tenant queries
}

export interface PaymentHistoryItem {
  date: string;
  amount: number;
  status: PaymentStatus;
}

export interface BankAccount {
  id: string;
  name: string;
  account_number?: string;
  routing_number?: string;
  bank_name?: string;
  account_type?: string;
  current_balance: number;
  outstanding_checks: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Loan {
  id: string;
  property_id?: string;
  lender_name: string;
  loan_number?: string;
  original_amount: number;
  current_balance: number;
  interest_rate?: number;
  monthly_payment?: number;
  start_date?: string;
  end_date?: string;
  payment_day?: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  property_id?: string;
  tenant_id?: string;
  loan_id?: string;
  bank_account_id?: string;
  transaction_type: TransactionType;
  amount: number;
  description?: string;
  transaction_date: string;
  payment_status: PaymentStatus;
  invoice_image_url?: string;
  extracted_amount?: number;
  check_image_url?: string;
  reference_number?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ScrapedPayment {
  id: string;
  source: 'gmail' | 'sms' | 'cashapp';
  raw_data: Record<string, any>;
  extracted_amount?: number;
  extracted_date?: string;
  sender_name?: string;
  sender_email?: string;
  sender_phone?: string;
  description?: string;
  is_processed: boolean;
  proposed_property_id?: string;
  proposed_tenant_id?: string;
  proposed_transaction_type?: TransactionType;
  confidence_score?: number;
  created_at: string;
  processed_at?: string;
}

export interface DashboardStats {
  total_properties: number;
  total_tenants: number;
  outstanding_balances: number;
  monthly_income: number;
  monthly_expenses: number;
  profit: number;
  total_bank_balance: number;
  late_tenants_count: number;
}

export interface CreatePropertyData {
  name: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  property_type: PropertyType;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  year_built?: number;
  purchase_price?: number;
  purchase_date?: string;
  current_value?: number;
  monthly_rent?: number;
  is_for_sale?: boolean;
  is_for_rent?: boolean;
  insurance_policy_number?: string;
  insurance_provider?: string;
  insurance_expiry_date?: string;
  insurance_premium?: number;
  owner_name?: string;
  owner_phone?: string;
  owner_email?: string;
  notes?: string;
}

export interface UpdatePropertyData extends Partial<CreatePropertyData> {
  id: string;
}

export interface CreateTenantData {
  property_id?: string;
  first_name: string;
  last_name: string;
  email?: string;
  phone?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  move_in_date?: string;
  lease_start_date?: string;
  lease_end_date?: string;
  monthly_rent?: number;
  security_deposit?: number;
  notes?: string;
}

export interface UpdateTenantData extends Partial<CreateTenantData> {
  id: string;
  last_payment_date?: string;
  late_fees_owed?: number;
  late_status?: LateStatus;
  is_active?: boolean;
}

export interface CreateTransactionData {
  property_id?: string;
  tenant_id?: string;
  loan_id?: string;
  bank_account_id?: string;
  transaction_type: TransactionType;
  amount: number;
  description?: string;
  transaction_date: string;
  payment_status?: PaymentStatus;
  reference_number?: string;
  notes?: string;
}

export interface UpdateTransactionData extends Partial<CreateTransactionData> {
  id?: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface LateTenant extends Tenant {
  properties: Property;
  total_due: number;
  days_late: number;
} 