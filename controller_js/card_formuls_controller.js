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

        CardFormula.redact(data);
    }
    static redactCard()
    {

        let data = CardFormula.card_change_data();

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
        CardFormulsController.countHint=(resArr.length-1)/2;

        let result = srt1 + "{m}"+select +"{m}"+srt2;
        redact.value=result ;
    }
    static check()
    {
        let redact = document.getElementById("redactor");
        let content=redact.value;
        CardFormulsController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML='<formula>'+CardFormula.res(CardFormulsController.contentArr,0)+'</formula>';
        document.getElementById("variant").innerHTML=CardFormula.variant(CardFormulsController.contentArr,0,CardFormulsController.countHint);
        CardFormulsController.countHint=-10;
        let formula = document.getElementsByTagName("formula");
        for (let i = 0; i < formula.length; i++)
        {
            let text = formula[i].innerHTML;

            katex.render(text, formula[i]);
        }
    }

}