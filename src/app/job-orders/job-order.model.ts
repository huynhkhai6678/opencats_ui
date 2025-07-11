import { Company } from "../companies/company-detail/company.model"
import { CompanyDepartment } from "../model/company-department.model"
import { User } from "../model/user.model"

export interface JobOrder {
    joborder_id: number
    recruiter: number | null
    contact_id: number | null
    company_id: number | null
    entered_by: number
    owner: number | null
    site_id: number
    client_job_id: string | null
    title: string
    brief_description: string
    description: string | null
    notes: string | null
    type: string
    duration: string | null
    rate_max: string | null
    salary: string | null
    status: string
    is_hot: number
    openings: number | null
    city: string
    state: string
    start_date: Date | null
    date_created: Date
    date_modified: Date
    public: number
    company_department_id: number | null
    is_admin_hidden: number | null
    openings_available: number | null
    questionnaire_id: number | null
    commission: string
    job_category: string | null
    day_olds?: string
    submitted?: number
    pipeline? : string
    department_name?: string
    recruiter_first_name?: string
    recruiter_last_name?: string
    owner_first_name?: string
    owner_last_name?: string
    contact_name?: string
    contact_phone?: string
    contact_email?: string
    company: Company
    department: CompanyDepartment
    contact_user: User
    owner_user: User
    recruiter_user: User
}