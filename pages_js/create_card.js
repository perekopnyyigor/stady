class CreateCard
{
    static cours_id;

    start(data) {
        document.getElementById("main").innerHTML=this.chapterList(data);

        let id = localStorage.getItem("last_details");
        document.getElementById(id).open=true;
    }

    chapterList(data_js)
    {
        let data = JSON.parse(data_js);
        CreateCard.cours_id = data.id;
        let content ='';
        content +='<h2>'+data.name+'</h2>';
        content+='<div class="row">';

        content+='<div class="col">';
        //content+='<a onclick="CreateCardController.createChapter()" class="btn btn-primary" aria-current="page" href="#">Создать главу</a>';
        content += '<a onclick="CreateCardController.createChapter()" class="btn btn-primary" href="#" role="button">Создать главу</a>';


        for (let i = 0; i< data.chapters.length; i++)
        {

            content+=this.topicList(data.chapters[i]);

        }


        content+='</div >';

        content+='<div id="card_form" class="col">';

        content+='</div >';

        content+='</div >';

        return content;
    }

     topicList(data)//список тем в главе
    {
        let content ='';
        //content +='<details id="'+data.id+'" onclick="CreateCard.remember(this)"><summary>' ;
        content +='<div class="my_item"><span >'+data.name+'</span><br>' ;
        content +='<input id="chapter_id" type="hidden" value="'+data.id+'">';
        content +='<a  href="#" onclick="CreateCardController.createTopic('+data.id+')" >Добавить тему</a>';
        content +='<a href="#" onclick="CreateCardController.deleteChapter('+data.id+')" >Удалить</a></div></summary>';


        for (let i = 0; i< data.topics.length; i++)
        {
            content +=this.cardList(data.topics[i]);
        }
        //content +='</details>';

        return content;
    }
    cardList(data)//список карт в теме
    {
        let content ='';
        //content +='<div class="my_item-1" ><span >'+data.name+'</span>' ;
        content +='<details id="'+data.id+'" onclick="CreateCard.remember(this)"><summary>' ;
        content +='<div class="my_item-1"><span >'+data.name+'</span>' ;
        content +='<br><a href="#"  onclick="CreateCardController.deleteTopic('+data.id+')" >  Удалить</a>';

        content +='<a href="#" onclick="CreateCardController.openCardForm('+data.id+')" >  Определение</a>';
        content +='<a href="#" onclick="CreateCardController.cardFormula('+data.id+')" >  Формула</a>';
        content +='<a href="#" onclick="CreateCardController.cardCode('+data.id+')" >  Код</a>';
        content +='</div></summary>';


        for (let i = 0; i< data.cards.length; i++)
        {
            content+=this.card(data.cards[i]);
        }
        content+='</ul >';
        content +='</li>';
        content +='</details>';
        return content;
    }
    card(data)//список
    {
        let content ='';
        if (data.type === "1")
        {

            content +='<div class="my_item-2"><span >'+data.name+'</span>' ;
            content +='<a href="#" id="redact" onclick="CreateCardController.openCardFormContent('+data.id+')" >Редактировать</a>';
            content +='<a href="#" onclick="CreateCardController.deleteCard('+data.id+')">Удалить</a></div>';
        }
        if (data.type === "2")
        {
            let data_js = JSON.stringify(data);

            content +='<div class="my_item-2"><span >'+data.name+ '</span>' ;
            content +='<a href="#" id="redact" onclick="CardFormulsController.openCardFormContent('+data.id+')" >Редактировать</a>';
            content +='<a href="#" onclick="CreateCardController.deleteCard('+data.id+')">Удалить</a></div>';
        }
        if (data.type === "3")
        {
            let data_js = JSON.stringify(data);

            content +='<div class="my_item-2"><span >'+data.name+'</span>' ;
            content +='<a href="#" id="redact" onclick="CardCodeController.openCardFormContent('+data.id+')" >Редактировать</a>';
            content +='<a href="#" onclick="CreateCardController.deleteCard('+data.id+')">Удалить</a></div>';
        }


        return content;
    }
    card_form(id)
    {

        let content ='';
        content +='<div>';
        content+='<p>Задание</p>';
        content +='<textarea id="task" style="width: 80%; height: 100px"></textarea>';
        content+='<p>Название</p>';
        content +='<input id="card_name">';
        content+='<p>Содержание</p>';
        content +='<textarea id="card_content" width="100%"> </textarea>';
        content +='<br>';
        content +='<input id="topic_id" type="hidden" value="'+id+'">';
        content +='<button onclick="CreateCardController.createCard()">Добавить</button>';
        content += '<button onclick="CreateCardController.click()">Выделить</button>';
        content += '<button onclick="CreateCardController.check()">check</button>';
        content +='<input type="file" name="file" onchange="CreateCardController.addImg()">';

        content += '<div id = "result"></div>';
        content += '<div id = "variant"></div>';
        content +='</div>';
        document.getElementById("card_form").innerHTML=content;
    }
    card_form_content(data)
    {
        let card =JSON.parse(data) ;
        let content ='';
        content +='<div>';
        content+='<p>Название</p>';
        content +='<input id="card_name" style="width: 80%" value="'+card.name+'" >';

        if(card.picture!=null)
        {
            for (let i=0;i<card.picture.length;i++)
                content +='<img width="200px" src="'+card.picture[i]+'">';
        }
        content+='<p>Задание</p>';
        content +='<textarea id="task" style="width: 80%; height: 100px">'+card.task+'</textarea>';

        content+='<p>Содержание</p>';
        content +='<textarea id="card_content" style="width: 80%; height: 300px">'+card.content_mark+'</textarea>';
        content +='<br>';
        content +='<input id="card_id" type="hidden" value="'+card.id+'">';
        content +='<button onclick="CreateCardController.redactCard()">Обновить</button>';
        content += '<button onclick="CreateCardController.click()">Выделить</button>';
        content += '<button onclick="CreateCardController.check()">check</button>';
        content +='<input type="file" name="file" onchange="CreateCardController.addImg()">';

        content += '<div id = "result"></div>';
        content += '<div id = "variant"></div>';

        content +='</div>';
        document.getElementById("card_form").innerHTML=content;
    }
    static get_chapter_name()
    {
        let chapter_name = prompt('Введите название');
        let user_id = localStorage.getItem("id");
        let data={
            cours_id:CreateCard.cours_id,
            chapter_name:chapter_name
        };
        return  JSON.stringify(data);

    }
    static get_topic_name(chapter_id)
    {
        let topic_name = prompt('Введите название темы');
       // let chapter_id = document.getElementById("chapter_id").value;

        let data={
            chapter_id:chapter_id,
            topic_name:topic_name
        };
        return  JSON.stringify(data);
    }
    static get_card_data()
    {
        let name=document.getElementById("card_name").value;
        let text=document.getElementById("card_content").value;
        let id = document.getElementById("topic_id").value;
        let task=document.getElementById("task").value;
        let data={
            topic_id:id,
            card_name:name,
            card_mark:text,
            type:1,
            task:task
        };
        return  JSON.stringify(data);
    }
    static remember(arg)
    {
        let elements= document.getElementsByTagName("details");
        for (const element of elements) {

            if(Number(element.id) !== Number(arg.id))
                element.open=false;
        }
        localStorage.setItem("last_details", arg.id);
    }
    static card_change_data()
    {
        let name=document.getElementById("card_name").value;
        let text_mark=document.getElementById("card_content").value;
        let task=document.getElementById("task").value;

        let id = document.getElementById("card_id").value;
        let data={
            id:id,
            card_name:name,
            card_mark:text_mark,
            task:task

        };

        return  JSON.stringify(data);
    }
    static getImgData()
    {
        return document.getElementsByName("file")[0].files[0];
    }
    static getIdCard()
    {
        return document.getElementById("card_id").value;
    }
    static res(contentArr,count)
    {
        let result = "";
        for(let i=0;i<count;i++)
        {

            result +=contentArr[i];

        }
        for(let i=count;i<contentArr.length;i++)
        {
            if(i%2==0)
                result +=contentArr[i];
            else
                result +="...";
        }
        return result
    }
    static variant(contentArr,count)
    {
        let result = "";
        for(let i=count;i<contentArr.length;i++)
        {
            if(i%2==1)
                result +='<br><label><div onclick="Controller.answer('+i+')">'+contentArr[i]+'</div><label>';

        }
        return result
    }


}