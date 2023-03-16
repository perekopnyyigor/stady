class CalendarController
{
    static search()
    {
        Calendar.show_days(date);
    }
    static calendar_reload()
    {
        let lesson={
            user_id:localStorage.getItem("id"),
        };
        let data_js = JSON.stringify(lesson);

        let data = Model.get_lessons(data_js);

        Calendar.onload(data);
    }
    static days()
    {
        Model.ajax("","distribut");
        CalendarController.calendar_reload();
    }
    static repeat()
    {
        Model.ajax("","distribut_date");
        CalendarController.calendar_reload();
    }
}