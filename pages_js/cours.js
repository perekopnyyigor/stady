class Cours
{
    static main(date_js)
    {
        let date = JSON.parse(date_js);
        let content='';

        content+='<div class="row">';
        content+='<div class="col">';
        content+='<ul class="list-group">';
        content+='<li class="list-group-item active" aria-current="true">Ваши курсы</li>';

        for (let i = 0; i< date.length;i++)
        {
            content += '<li class="list-group-item">';
            content += date[i].name;
            content += '<a href="#" onclick="CoursController.openChapter('+date[i].id+')"> Описание</a>';
            content += '<a href="#" onclick="CreateCardController.reload('+date[i].id+')"> Редактировать</a>';
            content += '<a href="#" onclick="CoursController.deleteCours('+date[i].id+')"> Удалить</a><br>';
            content += '</li>';

        }
        content+='</ul>';

        content += '<a onclick="CoursController.courseForm()" class="btn btn-primary" href="#" role="button">Создать курс</a>';
        content+='</div>';

        content+='<div class="col" id = "form">';

        content+='</div>';

        content+='</div>';

        return content;
    }
    static form()
    {
        let content = '';
        content +='<p>Название</p>';
        content += '<input id="course_name">';
        content +='<p>Описание</p>';
        content += '<textarea id="description"></textarea>';
        content +='<p></p>';
        content += '<a onclick="CoursController.addCours()" class="btn btn-primary" href="#" role="button">Создать</a>';

        return content;
    }
    static content_form(cours)
    {
        let content = '';
        if(cours.picture!=null)
        {
                content +='<img width="200px" src="'+cours.picture+'">';
        }
        content +='<p>Название</p>';
        content += '<input id="course_name" value="'+cours.name+'">';
        content += '<input type="hidden" id="cours_id" value="'+cours.id+'">';
        content +='<p>Описание</p>';
        content += '<textarea id="description">'+cours.description+'</textarea>';
        content +='<p></p>';
        content +='<input type="file" name="file" onchange="CoursController.addImg()">';
        content += '<a onclick="CoursController.redactCours()" class="btn btn-primary" href="#" role="button">Обновить</a>';
        return content;
    }

}