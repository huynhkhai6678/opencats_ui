export interface CalendarEvent {
    calendar_event_id: number;
    type: number;
    date: string;
    title: string;
    data_item_id: number;
    data_item_type  : number;
    entered_by: number;
    date_created: string;
    date_modified: string;
    site_id: number;
    joborder_id: number;
    description: string;
    duration: number;
    public: number;
}