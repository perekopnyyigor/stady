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
    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);

        CardCode.redact(data);
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
        let redact = document.getElementById("redactor");
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
        let redact = document.getElementById("redactor");
        let content=redact.value;
        CreateCardController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML=CardCode.res(CreateCardController.contentArr,0);
        document.getElementById("variant").innerHTML=CardCode.variant(CreateCardController.contentArr,0,CardCodeController.countHint);
        CardCodeController.countHint=-10;
        hljs.highlightAll();
    }

}