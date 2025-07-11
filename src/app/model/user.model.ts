export interface User {
    user_id: number;
    user_name: string;
    email: string;
    access_level: number;
    can_change_password: number;
    is_test_user: number;
    last_name: string;
    first_name: string;
    is_demo: number;
    categories: string;
    pipeline_entries_per_page: number;
    column_preferences: string;
    force_logout: number;
    title: string;
    phone_work: string;
    phone_cell: string;
    phone_other: string;
    address: string;
    notes: string;
    company: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    can_see_eeo_info: number;
}