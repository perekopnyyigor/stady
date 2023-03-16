class CreateCardController
{
    static contentArr=[];
    static cours_id;
    static render()
    {
        let el = document.getElementsByTagName("chem");

        for (let i=0;i<el.length;i++)
        {
            let elem2 = el[i];
            let ex2 = ChemSys.compile( el[i].innerHTML);
            el[i].innerHTML="";
            ChemSys.draw(elem2, ex2);
        }

        el = document.getElementsByTagName("chem_str");

        for (let i=0;i<el.length;i++)
        {
            var elem2 = el[i];
            var ex2 = ChemSys.compile( el[i].innerHTML);
            el[i].innerHTML=ex2.html();

        }
    }
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
    static click_topic(arg)
    {
        let elements= document.getElementsByTagName("details");
        for (const element of elements) {

            if(Number(element.id) !== Number(arg))
                element.open=false;
        }
        localStorage.setItem("last_details", arg);
        document.getElementById("instrument").innerHTML=CreateCard.typeTestList(arg);
    }
    static openCardForm(id)
    {
        document.getElementById("redactor").innerHTML=CreateCard.card_form(id);
        document.getElementById("instrument").innerHTML=CreateCard.typeTestList(id);
    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);

        document.getElementById("redactor").innerHTML=CreateCard.card_form_content(data);
        InstrumentController.onload();
        CreateCardController.check();



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

        text_mark=text_mark.split('\\').join("slash");
        task=task.split('\\').join("slash");

        let card_content=text_mark.split('{m}')
        for (let i = 0;i<card_content.length;i++)
        {
            if(card_content[i].includes("{t}"))
            {
                let content =card_content[i].split("{t}");
                card_content[i]=content[0];
            }
        }
        for (let i = 0;i<card_content.length;i++)
        {
            if(card_content[i].includes("{n}"))
            {
                card_content[i]="";
            }
        }
        card_content=card_content.join("");

        let id = document.getElementById("card_id").value;
        let data={
            id:id,
            card_name:name,
            card_content:card_content,
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

        card_content=card_content.split('{m}')
        for (let i = 0;i<card_content.length;i++)
        {
            if(card_content.includes("{t}"))
            {
                let content =card_content[i].split("{t}");
                card_content[i]=content[0];

            }
        }
        card_content=card_content.join(" ");
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
        CreateCardController.render();
    }

//--------------------------------------------------------------------------------------------------------------









    static cardFormula(id)
    {

        CardFormula.onload(id);
        document.getElementById("instrument").innerHTML=CreateCard.typeTestList(id);
    }
    static cardCode(id)
    {

        CardCode.onload(id);
        document.getElementById("instrument").innerHTML=CreateCard.typeTestList(id);
    }
    static replaceAll(string,search,replace)
    {
        return string.toString().split(search).join(replace);
    }
    /*
    * 1-разделить
    * 2-формула
    * 3-разделить формулу
    * 4-разделить предложение
    * 5-удалить метки
    * */
    static click(arg)
    {
        let select = window.getSelection();
        let redact = document.getElementById("card_content");
        let startPos = redact .selectionStart;
        let endPos = redact .selectionEnd;
        let content=redact.value;
        let result='';
        let srt1 = content.substring(0,startPos);
        let srt2 = content.substring(endPos , content.length);

        if(arg==1)
            result = srt1 + "{m}"+select +"{m}"+srt2;
        if(arg==2)
            result = srt1 + "<formula>"+select +"</formula>"+srt2;
        if(arg==3)
            result = srt1 + "{m}<formula>"+select +"</formula>{m}"+srt2;
        if(arg==4)
        {
            let str =CreateCardController.replaceAll(select," ","{m} {m}");
            result = srt1 + "{m}"+  str +"{m}"+srt2;
        }
        if(arg==5)
        {
            let str =CreateCardController.replaceAll(select,"{m}","");
            result = srt1+str+srt2;
        }
        if(arg==6)
        {
            let str =CreateCardController.replaceAll(select,"<li>","<li>{m}");
            str =CreateCardController.replaceAll(str,"-","{m} -");
            result = srt1+str+srt2;
        }
        if(arg==7)
        {
            let str =CreateCardController.replaceAll(select,"</li>","{m}</li>");
            str =CreateCardController.replaceAll(str,"-","- {m}");
            result = srt1+str+srt2;
        }
        if(arg==8)
        {
            let str =CreateCardController.replaceAll(select,"$","");
            str =CreateCardController.replaceAll(str,"frac","cfrac");
            result = srt1+str+srt2;
        }

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