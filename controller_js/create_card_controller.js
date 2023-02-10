class CreateCardController
{
    static contentArr=[];
    static cours_id;

    static onload(cours_id)
    {

        document.getElementById("first").innerHTML=CreateCard.colum();
        CreateCardController.cours_id = cours_id;

        let data={
            cours_id:cours_id
        };
        let res = Model.ajax(JSON.stringify(data),"get_chapters");

        document.getElementById("menu").innerHTML=CreateCard.chapterList(res);

        let id = localStorage.getItem("last_details");
        document.getElementById(id).open=true;
        InstrumentController.onload();
        CreateCardController.update();
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
    static openCardForm(id)
    {
        document.getElementById("redactor").innerHTML=CreateCard.card_form(id);
        InstrumentController.onload();
    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);

        document.getElementById("redactor").innerHTML=CreateCard.card_form_content(data);
        CreateCardController.check();
        InstrumentController.onload();


    }
    static createChapter()
    {
        let chapter_name = prompt('Введите название');

        if (chapter_name!=null && chapter_name!="" && chapter_name!=" " )
        {
            let user_id = localStorage.getItem("id");
            let data={
                cours_id:CreateCardController.cours_id,
                chapter_name:chapter_name
            };
            let data_json = JSON.stringify(data);
            let str = "Глава "+chapter_name+" добавлена";
            alert(str);
            Model.ajax(data_json,"add_chapter");
        }
        else
        {
            alert("Название не должно бать пустым");
        }


        CreateCardController.onload(CreateCardController.cours_id);
    }
    static deleteChapter(id)
    {
        let del = confirm("Вы действительно хотите удалить главу и все темы");
        if (del)
        {

            let data={
                chapter_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_chapter");
        }
        CreateCardController.onload(CreateCardController.cours_id);
    }

    static createTopic(chapter_id)
    {

        let topic_name = prompt('Введите название темы');
        // let chapter_id = document.getElementById("chapter_id").value;
        if (topic_name!=null && topic_name!="" && topic_name!=" " ) {
            let data = {
                chapter_id: chapter_id,
                topic_name: topic_name
            };
            let data_json = JSON.stringify(data);
            let str = "Тема "+topic_name+" добавлена";
            alert(str);
            Model.ajax(data_json,"add_topic");
        }
        else
        {
            alert("Название не должно бать пустым");
        }


        CreateCardController.onload(CreateCardController.cours_id);
    }

    static deleteTopic(id)
    {
        let del = confirm("Вы действительно хотите удалить тему и все карты");
        if (del)
        {

            let data={
                topic_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_topic");
        }
        CreateCardController.onload(CreateCardController.cours_id);
    }
    static createCard()
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
        let data_json =  JSON.stringify(data);
        Model.ajax(data_json,"add_card")
        CreateCardController.onload(CreateCardController.cours_id);

    }
    static redactCard()
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

        let data_json =  JSON.stringify(data);
        Model.ajax(data_json,"redact_card")

        CreateCardController.onload(CreateCardController.cours_id);

    }
    static deleteCard(id)
    {
        let del = confirm("Вы действительно хотите удалить карту");
        if (del)
        {

            let data={
                card_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_card");
        }
        CreateCardController.onload(CreateCardController.cours_id);
    }
    static addImg()
    {
        let img = document.getElementsByName("file")[0].files[0];
        let card_id = document.getElementById("card_id").value;
        Model.addImg(card_id,img);
        CreateCardController.onload(CreateCardController.cours_id);
        CreateCardController.openCardFormContent(card_id);
    }
    static update()
    {
        let task_content = document.getElementById("task").value;
        let name = document.getElementById("card_name").value;
        let card_content = document.getElementById("card_content").value;
        card_content=card_content.split('{m}').join(" ");

        document.getElementById("result").innerHTML="";
        document.getElementById("result").innerHTML=CreateCard.res(CreateCardController.contentArr,0);

        document.getElementById("variant").innerHTML="";
        document.getElementById("variant").innerHTML=CreateCard.variant(CreateCardController.contentArr,0);

        document.getElementById("task_brows").innerHTML="";
        document.getElementById("task_brows").innerHTML=CreateCard.result(name,task_content,card_content);



        let formula = document.getElementsByTagName("formula");
        for (let i = 0; i < formula.length; i++)
        {
            let text = formula[i].innerHTML;
            //text = text.replace("slash","\\\\");
            katex.render(text, formula[i]);
        }
        hljs.highlightAll();
    }

//--------------------------------------------------------------------------------------------------------------









    static cardFormula(id)
    {

        CardFormula.onload(id);
        InstrumentController.onload();
    }
    static cardCode(id)
    {

        CardCode.onload(id);
        InstrumentController.onload();
    }
    static click()
    {
        let select = window.getSelection();
        let redact = document.getElementById("card_content");
        let startPos = redact .selectionStart;
        let endPos = redact .selectionEnd;
        let content=redact.value;

        let srt1 = content.substring(0,startPos);
        let srt2 = content.substring(endPos , content.length);
        let result = srt1 + "{m}"+select +"{m}"+srt2;
        redact.value=result ;
    }
    static check()
    {
        let redact = document.getElementById("card_content");
        let content=redact.value;
        CreateCardController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML=CreateCard.res(CreateCardController.contentArr,0);
        document.getElementById("variant").innerHTML=CreateCard.variant(CreateCardController.contentArr,0);
        CreateCardController.update();


    }




}