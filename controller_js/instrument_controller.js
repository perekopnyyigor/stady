class InstrumentController
{
    static redact;
    static onload()
    {

        document.getElementById("instrument").innerHTML = Instrument.form();
        let task = document.getElementById("task");
        task.onfocus = function(){InstrumentController.redact = document.getElementById("task");};
        let redact = document.getElementById("card_content");
        redact.onfocus = function(){InstrumentController.redact = document.getElementById("card_content");};

        let formula = document.getElementsByTagName("formuls");
        for (let i = 0; i < formula.length; i++)
        {
            let text = formula[i].innerHTML;
            //text = text.replace("slash","\\\\");
            katex.render(text, formula[i]);
        }
    }
    static click(text)
    {

        let startPos = InstrumentController.redact.selectionStart;

        let content=InstrumentController.redact.value;

        let srt1 = content.substring(0,startPos);
        let srt2 = content.substring(startPos , content.length);

        let result = srt1 + text +srt2;
        InstrumentController.redact.value=result ;
    }


    static treatment(arg)
    {
        let select = window.getSelection();

        let redact = InstrumentController.redact;
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
}