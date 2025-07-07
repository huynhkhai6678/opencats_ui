import { Company } from "../companies/company-detail/company.model";
import { CompanyDepartment } from "../model/company-department.model";

export interface Contact {
    address: string;
    city: string;
    company_id: number; 
    date_created: string; 
    date_modified: string;
    entered_by: number;
    fax_number: string;
    is_hot: number;
    first_name: string;
    last_name: string;
    notes: string;
    owner: number;
    email1: string;
    email2: string;
    phone_work: string;
    phone_cell: string;
    phone_other: string;
    title: string;
    site_id: number;
    state: string;
    url: string;
    zip: string;
    reports_to: number;
    company: Company;
    department: CompanyDepartment;
    report_to: any;
    owner_user: any;
}