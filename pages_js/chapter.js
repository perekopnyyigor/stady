class Chapter
{
    static main(date_js)
    {
        let date = JSON.parse(date_js);
        let content =""

        content+='<div class="row">';
        content+='<div class="col">';

        for (let i = 0; i< date.length;i++)
        {
            content += date[i].name;
            content += '<a href="" > Описание</a>';
            content += '<a href="#" onclick="CoursController.openChapter('+date[i].id+')"> Редактировать</a><br>';
        }

        content+='</div>';
        content+='<div class="col" id = "form">';
        content+='</div>';
        content+='</div>';
        return content;
    }
}