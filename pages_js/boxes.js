class Boxes
{
    static onload(data_js)
    {

        document.getElementById("main").innerHTML=Boxes.table(data_js);

    }
    static table(data_js)
    {
        let date = JSON.parse(data_js);
        let content="";
        content+='<div class="alert alert-primary" role="alert">\n' +
            '            Здесь отображается пройденные темы и периоды между повторениям  \n' +
            '            </div>';
        content += '<table class="table table-striped table-hover" >';
        content += "<tr border='1px'><th>Тема</th><th>Дата</th><th>Следующая дата</th><th>Период</th>";
        for (let i=0;i<date.length;i++)
        {
            let topic = date[i].topic;
            let cours = date[i].cours;
            let name = date[i].topic_name;

            content+="<tr>";
            content+="<td>"+'<label><a href="../index.php?action=open_topic&topic_id='+topic+'&cours_id='+cours+'">' +name+'</a></label>'+"</td>";
            content+="<td>"+Boxes.date(date[i].date)+"</td>";
            content+="<td>"+Boxes.date(date[i].date_next)+"</td>";
            let period = Math.pow(2,date[i].period)-1;
            content+="<td>"+period+"</td>";
            content+="</tr>";
        }
        content += "</table>";
        return content;
    }
    static date(str_date)
    {
        let date = new Date(str_date);
        return date.toLocaleDateString();
    }
}