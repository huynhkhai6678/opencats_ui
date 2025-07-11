export interface Candidate {
    candidate_id: number
    site_id: number
    last_name: string
    first_name: string
    middle_name: string | null
    phone_home: string | null
    phone_cell: string | null
    phone_work: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    source: string | null
    date_available: string | null
    can_relocate: number
    notes: string | null
    key_skills: string | null
    current_employer: string | null
    entered_by: number
    owner: number | null
    date_created: Date
    date_modified: Date
    email1: string | null
    email2: string | null
    web_site: string | null
    import_id: number
    is_hot: number
    eeo_ethnic_type_id: number | null
    eeo_veteran_type_id: number | null
    eeo_disability_status: string | null
    eeo_gender: string | null
    desired_pay: string | null
    current_pay: string | null
    is_active: number | null
    is_admin_hidden: number | null
    best_time_to_call: string
    full_name: string
    job_title: string
    exp_years: number
    desired_pay_1: number
    desired_work_location: string | null
    source_type: boolean
    owner_delete: boolean
    internal_comment: string | null
    language: string | null

    pipeline: number | null;
    submitted: number | null;
    owner_first_name : string | null;
    owner_last_name : string | null;
}