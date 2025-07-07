export interface Company {
    address: string;
    billing_contact: string;
    city: string;
    company_id: number; 
    date_created: string; 
    date_modified: string;
    default_company: number; 
    entered_by: number;
    fax_number: string;
    import_id: string;
    is_hot: number;
    key_technologies: string; 
    logo: string | null;
    name: string;
    notes: string;
    owner: number;
    owner_first_change: string;
    owner_last_change: string
    phone1: string;
    phone2: string;
    site_id: number;
    state: string;
    url: string;
    zip: string;
}