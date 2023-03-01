class CardFormulsController
{
    static contentArr=[];
    static countHint=-10;
    static onchange()
    {
        let text=document.getElementById("redactor").value;

        let Arr=text.split('{m}');
        let view = document.getElementById("view");
        katex.render(Arr.join(""), view);

    }
    static createCard()
    {
        let data = CardFormula.get_card_data();
        Model.add_card(data);
        CreateCardController.reload(CreateCard.cours_id);

    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);


        document.getElementById("result").innerHTML="";
        document.getElementById("variant").innerHTML="";
        CardFormula.redact(data);

        CardFormulsController.check();
        InstrumentController.onload();

    }
    static redactCard()
    {

       /* let data = CardFormula.card_change_data();

        Model.redact_card(data);

        CreateCardController.reload(CreateCard.cours_id);*/
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
    static click()
    {
        let select = window.getSelection();
        let redact = document.getElementById("card_content");
        let startPos = redact .selectionStart;
        let endPos = redact .selectionEnd;
        let content=redact.value;

        let srt1 = content.substring(0,startPos);
        let srt2 = content.substring(endPos , content.length);

        let resArr=srt1.split("{m}");
        CardFormulsController.countHint=(resArr.length-1)/2;

        let result = srt1 + "{m}"+select +"{m}"+srt2;
        redact.value=result ;
    }
    static check()
    {
        let redact = document.getElementById("card_content");
        let content=redact.value;
        CardFormulsController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML='<formula>'+CardFormula.res(CardFormulsController.contentArr,0)+'</formula>';
        document.getElementById("variant").innerHTML=CardFormula.variant(CardFormulsController.contentArr,0,CardFormulsController.countHint);
        CardFormulsController.countHint=-10;

        CardFormulsController.update();

    }
    static update()
    {
        let task_content = document.getElementById("task").value;
        let name = document.getElementById("card_name").value;
        let card_content = document.getElementById("card_content").value;
        card_content=card_content.split('{m}').join(" ");

        document.getElementById("result").innerHTML="";
        document.getElementById("result").innerHTML='<formula>'+CardFormula.res(CardFormulsController.contentArr,0)+'</formula>';

        document.getElementById("variant").innerHTML="";
        document.getElementById("variant").innerHTML=CardFormula.variant(CardFormulsController.contentArr,0);

        document.getElementById("task_brows").innerHTML="";

        document.getElementById("task_brows").innerHTML=CreateCard.result(name,task_content,'<formula>'+card_content+'</formula>');



        let formula = document.getElementsByTagName("formula");
        for (let i = 0; i < formula.length; i++)
        {
            let text = formula[i].innerHTML;
            //text = text.replace("slash","\\\\");
            katex.render(text, formula[i]);
        }
        hljs.highlightAll();
    }

}