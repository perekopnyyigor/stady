class CreateCard
{
    static cours_id;
    static type;
    static colum()
    {

        let content = '';
        content+='<div id="menu" class="col-2">Меню</div>';
        content+='<div id="instrument" class="col-2">Инструменты</div>';

        content+='<div id="redactor" class="col-4">Редактор</div>';

        content+='<div class="col-4">';
        content+='<div id = "task_brows"></div>';
        content += '<div id = "result"></div>';
        content += '<div id = "variant"></div>';
        content += '</div>';
        return content;
    }
    static result(name,task,cont)
    {
        let content = '';
        content+=' <div class="card shadow mb-3">';
        content+='  <div class="card-header"><h4 style="font-weight:bold" class="m-lg-3">'+name+'</h4></div>';
        content+='  <div class="card-body ">';
        content+='<p class="card-text">'+task+'<br>';
        content+=cont+'</p>';
        content+=' </div>';
        content+='</div>';
        return content;
    }

    start(data) {

        document.getElementById("first").innerHTML=this.chapterList(data);


    }

    static chapterList(data_js)
    {
        let data = JSON.parse(data_js);
        let content ='';
        content +='<h2>'+data.name+'</h2>';

        content += '<a onclick="CreateCardController.createChapter()" class="btn btn-primary" href="#" role="button">Создать главу</a>';


        for (let i = 0; i< data.chapters.length; i++)
        {
            let chapter = data.chapters[i];
            content +='<div class="my_item"><span >'+chapter.name+'</span><br>' ;
            content +='<input id="chapter_id" type="hidden" value="'+chapter.id+'">';
            content +='<a  href="#" onclick="CreateCardController.createTopic('+chapter.id+')" >Добавить тему</a>';
            content +='<a href="#" onclick="CreateCardController.deleteChapter('+chapter.id+')" >Удалить</a></div>';
            content += CreateCard.topicList(chapter);
        }
        return content;
    }

    static topicList(data)//список тем в главе
    {
        let content ='';
        //content +='<details id="'+data.id+'" onclick="CreateCard.remember(this)"><summary>' ;



        for (let i = 0; i< data.topics.length; i++)
        {
            let topic =data.topics[i];
            content +='<details id="'+topic.id+'" onclick="CreateCardController.remember(this)"><summary>' ;
            content +='<div class="my_item-1"><span >'+topic.name+'</span>' ;
            content +='<br><a href="#"  onclick="CreateCardController.deleteTopic('+topic.id+')" >  Удалить</a>';

            content +='<a href="#" onclick="CreateCardController.openCardForm('+topic.id+')" >  Определение</a>';
            content +='<a href="#" onclick="CreateCardController.cardFormula('+topic.id+')" >  Формула</a>';
            content +='<a href="#" onclick="CreateCardController.cardCode('+topic.id+')" >  Код</a>';
            content +='</div></summary>';
            content +=CreateCard.cardList(topic);
        }


        return content;
    }
    static cardList(data)//список карт в теме
    {
        let content ='';
        //content +='<div class="my_item-1" ><span >'+data.name+'</span>' ;



        for (let i = 0; i< data.cards.length; i++)
        {
            let card = data.cards[i];
            content +='<div class="my_item-2"><span>'+card.name+'</span>' ;

            if (card.type==1)
                content +='<a href="#" id="redact" onclick="CreateCardController.openCardFormContent('+card.id+')" >Редактировать</a>';
            if (card.type==2)
                content +='<a href="#" id="redact" onclick="CardFormulsController.openCardFormContent('+card.id+')" >Редактировать</a>';
            if (card.type==3)
                content +='<a href="#" id="redact" onclick="CardCodeController.openCardFormContent('+card.id+')" >Редактировать</a>';



            content +='<a href="#" onclick="CreateCardController.deleteCard('+card.id+')">Удалить</a></div>';
        }
        content+='</ul >';
        content +='</li>';
        content +='</details>';
        return content;
    }


    static card_form(id)
    {

        let content ='';
        content +='<div>';

        content+='<p>Название</p>';
        content +='<input style="width: 80%;" id="card_name">';
        content+='<p>Задание</p>';
        content +='<textarea id="task" style="width: 80%; height: 100px"></textarea>';
        content+='<p>Содержание</p>';
        content +='<textarea id="card_content" style="width: 80%; height: 100px" width="100%"> </textarea>';
        content +='<br>';
        content +='<input id="topic_id" type="hidden" value="'+id+'">';
        content +='<button onclick="CreateCardController.createCard()">Добавить</button>';
        content += '<button onclick="CreateCardController.click()">Выделить</button>';
        content += '<button onclick="CreateCardController.check()">check</button>';
        content +='<input type="file" name="file" onchange="CreateCardController.addImg()">';

        content +='</div>';

        return content;
    }

    static card_form_content(data)
    {
        let card =JSON.parse(data) ;
        let content ='';
        content +='<div>';
        content+='<p>Название</p>';
        content +='<input oninput="CreateCardController.update()" id="card_name" style="width: 80%" value="'+card.name+'" >';
        CreateCard.type = card.type;
        if(card.picture!=null)
        {
            for (let i=0;i<card.picture.length;i++)
                content +='<img width="200px" src="'+card.picture[i]+'">';
        }
        content+='<p>Задание</p>';
        content +='<textarea oninput="CreateCardController.update()" id="task" style="width: 80%; height: 100px">'+card.task+'</textarea>';

        content+='<p>Содержание</p>';
        content +='<textarea oninput="CreateCardController.update()" id="card_content" style="width: 80%; height: 300px">'+card.content_mark+'</textarea>';
        content +='<br>';
        content +='<input id="card_id" type="hidden" value="'+card.id+'">';
        content +='<button onclick="CreateCardController.redactCard()">Обновить</button>';
        content += '<button onclick="CreateCardController.click()">Выделить</button>';
        content += '<button onclick="CreateCardController.check()">check</button>';
        content +='<input type="file" name="file" onchange="CreateCardController.addImg()">';



        content +='</div>';

        return content;
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