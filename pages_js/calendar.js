class  Calendar
{
    static data;
    static onload(data)
    {
        Calendar.data = JSON.parse(data);
        document.getElementById("main").innerHTML=Calendar.show_days();
        document.getElementById("main").innerHTML+=Calendar.show_dept();
    }
    static calendar()
    {
        let content ='';
        content+='<input type="date" id="calendar" onchange="CalendarController.search()">';
        content+='<button onclick="CalendarController.search()">Найти</button>';

        return content;
    }
    static show_days()
    {
        let content ="";

        content+='<div class="alert alert-primary" role="alert">\n' +
            '            Здесь отображается расписание повторений  \n' +
            '            </div>';
        let dat = new Date();
        let dat_arr=[];
        for (let i=0;i<5;i++)
        {

            let dat_str = dat.toISOString().split('T');
            dat_arr.push(dat_str[0]);
            dat.setDate(dat.getDate()+1);
        }
        content+="<table class=\"table table-striped table-hover\">";

        content+="<tr>";
        for (let i=0;i<dat_arr.length;i++)
        {
            content+="<th width='200'>"+Calendar.date(dat_arr[i])+"</th>";
        }
        content+="</tr>";

        content+="<tr>";
        for (let i=0;i<dat_arr.length;i++)
        {
            content+=Calendar.show_day(dat_arr[i]);
        }
        content+="</tr>";
        content+="</table>";
        return content;
    }
    static show_day(date)
    {
        let content ='';

        content += "<td>";
        for (let i=0;i<Calendar.data.length;i++)
        {
            if (date === Calendar.data[i].date_next)
            {
                let name = Calendar.data[i].topic_name;
                let topic = Calendar.data[i].topic;
                let cours = Calendar.data[i].cours;
                content += '<label><a href="../index.php?action=open_topic&topic_id='+topic+'&cours_id='+cours+'">' +name+'</a></label>';
            }

        }
        content += "</td>";

        return content;
    }
    static show_dept()
    {
        let content='';
        content +='<div class="list-group">';
        content += '<div class="list-group-item list-group-item-action active" aria-current="true">Пропущенное</div>';
        let dat = new Date();
        for (let i=0;i<Calendar.data.length;i++)
        {
            let dat_str = dat.toISOString().split('T');

            if (dat_str > Calendar.data[i].date_next)
           {
               let name = Calendar.data[i].topic_name;
               let topic = Calendar.data[i].topic;
               let cours = Calendar.data[i].cours;

                //content += Calendar.data[i].topic_name +"<br>";
                content +='<a class="list-group-item list-group-item-action" href="../index.php?action=open_topic&topic_id='+topic+'&cours_id='+cours+'">' +name+'</a>';
            }

        }
        content +='</div>';
        return content;
    }
    static date(str_date)
    {
        let date = new Date(str_date);
        return date.toLocaleDateString();
    }
}