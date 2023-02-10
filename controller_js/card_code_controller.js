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

        let data = CardCode.card_change_data();

        Model.redact_card(data);

        CreateCardController.reload(CreateCard.cours_id);

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