class  Calendar
{
    static data;
    static onload(data)
    {
        Calendar.data = JSON.parse(data);
        document.getElementById("main").innerHTML=Calendar.breadcrumb();
        document.getElementById("main").innerHTML+=Calendar.button_back();
        document.getElementById("main").innerHTML+="<h1 style=\"font-weight:bold\">Календарь</h1>";
        document.getElementById("main").innerHTML+=Calendar.buttons();
        document.getElementById("main").innerHTML+=Calendar.show_days_1();
        document.getElementById("main").innerHTML+=Calendar.show_dept();
    }
    static buttons()
    {
        let content="";
        content+='<button type="button" class="btn btn-primary m-1"  onclick="CalendarController.days()">По дням</button>';
        content+='<button type="button" class="btn btn-primary m-1"  onclick="CalendarController.repeat()">По повторениям</button>';
        return content;
    }
    static button_back()
    {
        let href="../index.php?action=cabinet";

        let result='<a class="mx-2" style="float: left" href="'+href+'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">';
        result+='<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg></a>';

        return result;
    }
    static breadcrumb()
    {
        let result='';

        result+='<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';

        result+='<ol class="breadcrumb">';

        result+=' <li class="breadcrumb-item my-1"><a href="../">Главная</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="../index.php?action=cabinet">Кабинет</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="#">Календарь</a></li>';
        result+='</ol>';
        result+='</nav>';

        return  result;
    }
    /*static calendar()
    {
        let content ='';
        content+='<input type="date" id="calendar" onchange="CalendarController.search()">';
        content+='<button onclick="CalendarController.search()">Найти</button>';

        return content;
    }*/
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
               //let name = Calendar.data[i].topic_name+"/"+Calendar.data[i].chapter_name+"/"+Calendar.data[i].cours_name;
               let href = "../"+Calendar.data[i].cours_translit+"/"+Calendar.data[i].topic_translit;
               let period = Math.pow(2,Calendar.data[i].period)-1;
                //content += Calendar.data[i].topic_name +"<br>";
                //content +='<a class="list-group-item list-group-item-action" href="'+href+'">' +name+'</a>';
               content +='<a class="link-dark" style="text-decoration:none;" href="../'+href+'">';
               content +='<li class="list-group-item d-flex justify-content-between align-items-start">';
               content +='    <div class="ms-2 me-auto">';
               content +='      <div class="fw-bold">'+Calendar.data[i].topic_name+'</div>';
               content +=      Calendar.data[i].cours_name+'/'+Calendar.data[i].chapter_name;
               let dat2 = new Date(Calendar.data[i].date_next);
               let days =Math.ceil((dat.getTime()-dat2.getTime())/(1000*3600*24));
               content +=      " ("+Calendar.data[i].days+")";
               content +='    </div>';
               content +='    <span class="badge bg-primary rounded-pill">'+period+'</span>';
               content +='  </li></a>';
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
    static show_days_1()
    {
        let content ="";

        content+='<div class="alert alert-primary" role="alert">\n' +
            '            Здесь отображается расписание повторений  \n' +
            '            </div>';
        let dat = new Date();
        let dat_arr=[];
        for (let i=0;i<10;i++)
        {

            let dat_str = dat.toISOString().split('T');
            dat_arr.push(dat_str[0]);
            dat.setDate(dat.getDate()+1);
        }






        for (let i=0;i<dat_arr.length;i++)
        {
            content+="<ul class=\"list-group\">";
            content+="<li class=\"list-group-item list-group-item-info\">"+Calendar.date(dat_arr[i])+"</li>";

            content+=Calendar.show_day_1(dat_arr[i]);
            content+="</ul>"
        }
        return content;
    }
    static show_day_1(date)
    {
        let content ='';


        for (let i=0;i<Calendar.data.length;i++)
        {
            if (date === Calendar.data[i].date_next)
            {
                //let name = Calendar.data[i].topic_name+"/"+Calendar.data[i].chapter_name+"/"+Calendar.data[i].cours_name;
                let href = "../"+Calendar.data[i].cours_translit+"/"+Calendar.data[i].topic_translit;

                //content += '<a class="list-group-item" href="'+href+'">' +name+'</a>';
                let period = Math.pow(2,Calendar.data[i].period)-1;
                content +='<a class="link-dark" style="text-decoration:none;" href="../'+href+'">';
                content +='<li class="list-group-item d-flex justify-content-between align-items-start">';
                content +='    <div class="ms-2 me-auto">';
                content +='      <div class="fw-bold">'+Calendar.data[i].topic_name+'</div>';
                content +=      Calendar.data[i].cours_name+'/'+Calendar.data[i].chapter_name;
                content +='    </div>';
                content +='    <span class="badge bg-primary rounded-pill">'+period+'</span>';
                content +='  </li></a>';
            }

        }


        return content;
    }
    static menu_start_card(date)
    {
        let content = '';
        content +='<a class="link-dark" href="../'+date.cours_translit+'/'+date.topic_translit+'" style="text-decoration:none;" >';
        content += '<div class="shadow card   p-1 border m-2" >';
        content += '<div class="card-body">';
        content += '<h2 style="font-weight:bold" class="card-title mt-4">'+date.topic_name+'</h2>';
        content += '<p class="card-text">Раздел: '+date.chapter_name+'/'+date.cours_name+'</p>';
        content += '<p class="card-text">Последнее повторение: '+Boxes.date(date.date)+'</p>';
        content += '<p class="card-text">Следующее повторение: '+Boxes.date(date.date_next)+'</p>';
        let period = Math.pow(2,date.period)-1;
        content += '<p class="card-text">Период: '+period+'</p>';
        content += '    </div>';
        content += '</div></a>';
        return content;
    }
}