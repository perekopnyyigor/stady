class MyCours{
    static onload(data,courses)
    {
        document.getElementById("main").innerHTML=MyCours.cardList(data,courses);
    }
    static cardList(courses)
    {
       let content='';

        content+=MyCours.list(courses,"Мои подписки");
        return content;

    }
    static list(courses, name)
    {
        let data = JSON.parse(courses);
        let content ='';
        content += '<h3>'+name+'</h3>';
        for (let i = 0; i< data.length; i++)
        {
            content+='<label><a href="../index.php?action=open_cours&cours_id='+data[i].id+'">';
            content+='<div class="my_card">'+data[i].name+'</div></label></a>';
        }
        return content;
    }
}