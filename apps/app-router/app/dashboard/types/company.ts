export interface Company {
    _id?:string;
    companyName: string;
    companyEmail: string;
    companyPhone: string;
    businessType?: string;
    logo?: string;
    streetAddress: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    taxId: string;
    vatNumber?: string;
  }
  
  export type OnboardingFormData = Omit<Company, 'logo'> & {
    logo: string;
  };

  export interface Product {
    _id?: string;
    name: string;
    description: string;
    hourlyRate: number;
    minimumTime: '15min' | '30min' | '1hour';
  }
  