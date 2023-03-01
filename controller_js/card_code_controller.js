class CardCodeController
{
    static contentArr=[];
    static countHint=-10;
    static onchange()
    {
        let text=document.getElementById("redactor").value;
        let view = document.getElementById("view");
        let Arr=text.split('{m}');

        view.innerHTML = Arr.join("");
        hljs.highlightAll();
    }
    static createCard()
    {
        let data = CardCode.get_card_data();
        Model.add_card(data);
        CreateCardController.reload(CreateCard.cours_id);
        InstrumentController.onload();

    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);






        document.getElementById("result").innerHTML="";
        document.getElementById("variant").innerHTML="";
        CardCode.redact(data);
        CardCodeController.check();
        InstrumentController.onload();
    }
    static redactCard()
    {
        let name=document.getElementById("card_name").value;
        let text_mark=document.getElementById("card_content").value;
        let task=document.getElementById("task").value;
        let language = document.getElementById("card_language").value;
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
            language: language,
            task:task

        };

        let data_json =  JSON.stringify(data);
        Model.ajax(data_json,"redact_card")





        Model.redact_card(data);

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
        CardCodeController.countHint=(resArr.length-1)/2;

        let result = srt1 + "{m}"+select +"{m}"+srt2;
        redact.value=result ;
    }
    static check()
    {
        let redact = document.getElementById("card_content");
        let content=redact.value;
        CardCodeController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML= '<pre><code class="language-javascript">'+CardCode.res(CardCodeController.contentArr,0)+'</code></pre>';
        document.getElementById("variant").innerHTML=CardCode.variant(CardCodeController.contentArr,0,CardCodeController.countHint);
        CardCodeController.countHint=-10;
        CardCodeController.update();

    }
    static update()
    {
        let task_content = document.getElementById("task").value;
        let name = document.getElementById("card_name").value;
        let card_content = document.getElementById("card_content").value;
        card_content=card_content.split('{m}').join(" ");

        document.getElementById("result").innerHTML="";
        document.getElementById("result").innerHTML='<pre><code class="'+CardCode.data.language+'">'+CardCode.res(CardCodeController.contentArr,0)+'</code></pre>';

        document.getElementById("variant").innerHTML="";
        document.getElementById("variant").innerHTML=CardCode.variant(CardCodeController.contentArr,0);

        document.getElementById("task_brows").innerHTML="";
        card_content='<pre><code class="'+CardCode.data.language+'">'+card_content+'</code></pre>';
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

}