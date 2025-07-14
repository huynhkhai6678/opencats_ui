export interface EmailTemplate {
    email_template_id: number;
    text: string;
    tag: string;
    title: string;
    type: string;
    disabled: number;
    possible_variables: string;
    site_id: number;
}