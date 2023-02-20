class Boxes
{
    static onload(data_js)
    {
        document.getElementById("main").innerHTML=Boxes.breadcrumb();
        document.getElementById("main").innerHTML+=Boxes.button_back();
        document.getElementById("main").innerHTML+="<h1 style=\"font-weight:bold\">Пройденные темы</h1>";

        document.getElementById("main").innerHTML+=Boxes.table(data_js);

    }
    static breadcrumb()
    {
        let result='';

        result+='<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';

        result+='<ol class="breadcrumb">';

        result+=' <li class="breadcrumb-item my-1"><a href="../">Главная</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="../index.php?action=cabinet">Кабинет</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="#">Пройденные темы</a></li>';
        result+='</ol>';
        result+='</nav>';

        return  result;
    }
    static button_back()
    {
        let href="../index.php?action=cabinet";

        let result='<a class="mx-2" style="float: left" href="'+href+'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">';
        result+='<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg></a>';

        return result;
    }
    static table(data_js)
    {
        let date = JSON.parse(data_js);
        let content="";
        content+='<div class="alert alert-primary" role="alert">\n' +
            '            Здесь отображается пройденные темы и периоды между повторениям  \n' +
            '            </div>';

        for (let i=0;i<date.length;i++)
        {
            content +=Boxes.menu_start_card(date[i]);
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
    static date(str_date)
    {
        let date = new Date(str_date);
        return date.toLocaleDateString();
    }
}