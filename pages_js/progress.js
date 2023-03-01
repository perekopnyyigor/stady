class Progress
{
    static main(cours,lessons)
    {
        let content='';
        content+=Progress.breadcrumb();
        content+=Progress.button_back();
        content += '<h1 style="font-weight:bold" >Ваш прогресс</h1></a>';
        for (let i =0; i<cours.length;i++)
        {
            content+='<details>';
            content+='<summary>';
            content+=Progress.cours_card(cours[i]);
            content+='</summary>';
            content+= Progress.lessons(cours[i].id,lessons);
            content+='</details>';
        }


        return content;
    }
    static breadcrumb()
    {
        let result='';

        result+='<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';

        result+='<ol class="breadcrumb">';

        result+=' <li class="breadcrumb-item my-1"><a href="../">Главная</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="../index.php?action=cabinet">Кабинет</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="#">Прогресс/a></li>';
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
    static cours_card(cours,lessons)
    {
        let content ='';
        content+='<div class="shadow card   p-1 border " >';
        content+='  <div class="row ">';
        content+='    <div class="col-4">';
        content+='      <img src="'+cours.picture+'" style="height:100px; width:125px" alt="...">';
        content+='    </div>';
        content+='    <div class=" mx-auto col-6">';
        content+='      <div class="  card-body p-1 m-1">';
        content+='        <h2 style="font-weight:bold" class="card-title">'+cours.name+'</h2>';
        content+='        <p class="card-text">'+cours.description+'</p>';

        content+='      </div>';
        content+='    </div>';
        content+='  </div>';
        content+='</div>';


        return  content;
    }
    static lessons(cours_id,lessons)
    {
        let content='';
        for (let i =0;i<lessons.length; i++)
        {
            if(cours_id==lessons[i].cours)
                content+=Progress.lesson_card(lessons[i]);
        }
        return content;
    }
    static lesson_card(date)
    {
        let content = '';
        content +='<details><summary>';
        //content +='<a class="link-dark" href="../'+date.cours_translit+'/'+date.topic_translit+'" style="text-decoration:none;" >';
        content += '<div onclick="Progress_controller.openTryes('+date.id+')" class="shadow card   p-1 border ms-4 m-3" >';
        content += '<div class="card-body">';
        content += '<h3 style="font-weight:bold" class="card-title mt-4">'+date.topic_name+'</h3>';
        //content += '<p class="card-text">Раздел: '+date.chapter_name+'/'+date.cours_name+'</p>';
        //content += '<p class="card-text">Последнее повторение: '+Boxes.date(date.date)+'</p>';
        content += '<p class="card-text">Следующее повторение: '+Progress.date(date.date_next)+'</p>';
        let period = Math.pow(2,date.period)-1;
        //content += '<p class="card-text">Период: '+period+'</p>';
        content += '    </div>';
        content += '</div>';
        content +='</summary>';
        content +='<div name="tryes" id="'+date.id+'"></div>';
        content +='</details>';
        return content;
    }
    static date(str_date)
    {
        let date = new Date(str_date);
        return date.toLocaleDateString();
    }
    static tryes(trys)
    {
        let content='';
        for(let i=0;i<trys.length;i++)
        {
            content+=Progress.try_card(trys[i]);
        }
        return content;
    }
    static try_card(try_)
    {
        let content = '';
        //content +='<a class="link-dark" href="../'+date.cours_translit+'/'+date.topic_translit+'" style="text-decoration:none;" >';
        content += '<div class="shadow card   p-1 border ms-5 m-3" >';
        content += '<div class="card-body">';
        //content += '<h3 style="font-weight:bold" class="card-title mt-">'+date.topic_name+'</h3>';
        let degree='<span >'+ Math.round(try_.degree)+'</span>';
        if (try_.degree<50)
            degree='<span style="color: indianred">'+ Math.round(try_.degree)+'</span>';

        if (try_.degree>75)
            degree='<span style="color: seagreen">'+ Math.round(try_.degree)+'</span>';

        content += '<p class="card-text">Дата:'+Progress.date(try_.dat)+'   Оценка:'+degree+'</span></p>';


        content += '    </div>';
        content += '</div>';

        return content;
    }


}