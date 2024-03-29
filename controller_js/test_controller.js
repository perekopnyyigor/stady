class TestController
{
    static data;
    static count=0;
    static count_variant=1;
    static count_hint=0;
    static contentArr=[];
    static degree=0;
    static all_answers=0;
    static topic_id;
    static onload(obj)
    {
        if(localStorage.getItem("id")==null)
        {
            localStorage.setItem("back",location.href);
            location.href = "../index.php?action=enter";
        }
        else
        {

            let data_subscript={
                user_id:localStorage.getItem("id"),
                cours_id:document.getElementById("cours_id").value

            };
            let data_subscript_js = JSON.stringify(data_subscript);

           Model.ajax(data_subscript_js,"subscrib");


            let data_js = Model.get_topic(obj.id);
            TestController.data = JSON.parse(data_js);
            TestController.add_try(obj);
            document.getElementById("test").innerHTML=Test.card(TestController.data.cards[0],false);
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
    static add_try(obj)
    {
        let data_lesson={
            topic_id:obj.id,
            user_id:localStorage.getItem("id")
        };
        let data_js = JSON.stringify(data_lesson);
        Model.add_lesson(data_js);
    }
    static is_last_card()
    {
        if(TestController.count === TestController.data.cards.length - 1 )
            return true;
        else
            return false;
    }
    static next_card()
    {
        TestController.count++;
        TestController.count_variant=1;
        TestController.count_hint=0;
        let card_data=TestController.data.cards[TestController.count];


        let iast_card = TestController.is_last_card();

        let content=Test.card(card_data,iast_card);
        document.getElementById("test").innerHTML=content;
        document.getElementById("progress").innerHTML=Test.progress();
        let formula = document.getElementsByTagName("formula");
        for (let i = 0; i < formula.length; i++)
        {
            let text = formula[i].innerHTML;
            //text = text.replace("slash","\\\\");
            katex.render(text, formula[i]);
        }
        hljs.highlightAll();

    }
    static replaceAll(string,search,replace)
    {
        return string.split(search).join(replace);
    }
    static answer(i)
    {

        let massiv_value = Test.contentArr[TestController.count_variant];
        let inner_value = Test.contentArr[i];
        let massiv_type = Test.contentType[TestController.count_variant];
        let inner_type = Test.contentType[i];


       // massiv_value = TestController.replaceAll(massiv_value,"\\","");
        alert(inner_value+" "+massiv_value);
        if((inner_value == massiv_value)||((inner_type == massiv_type)&&(inner_type!=null)))
        {
            if((inner_type == massiv_type)&&(inner_type!=null)&&(inner_value != massiv_value))
            {
                let str = Test.contentArr[TestController.count_variant]
                Test.contentArr[TestController.count_variant] =  Test.contentArr[i];
                Test.contentArr[i] =str;
            }

            TestController.count_variant+=2;
            TestController.count_hint++;


            document.getElementById("result").innerHTML=Test.res(TestController.count_variant);
            document.getElementById("variant").innerHTML=Test.variant(TestController.count_variant);
            document.getElementById("hint").innerHTML=Test.hint[TestController.count_hint];
            document.getElementById("task").innerHTML="Задание:"+Test.task;
            let formula = document.getElementsByTagName("formula");
            for (let i = 0; i < formula.length; i++)
            {
                let text = formula[i].innerHTML;
                //text = text.replace("slash","\\\\");
                katex.render(text, formula[i]);
            }
            hljs.highlightAll();
        }
        else
        {
            TestController.degree ++;

        }
        TestController.all_answers++;
        let last_card = TestController.is_last_card();
        document.getElementById("error").innerHTML=Test.true_answers();
        document.getElementById("buttons").innerHTML=Test.buttons(last_card,TestController.count_variant);


    }


    static result()
    {

        let topic_id = TestController.data.id;
        let degree =Math.round( (TestController.all_answers-TestController.degree)/TestController.all_answers*100);
        let data_lesson={
            topic_id:topic_id,
            user_id:localStorage.getItem("id"),
            greed:degree
        };
        let data_js = JSON.stringify(data_lesson);
        let result =Model.ajax(data_js,"add_try");
        document.getElementById("test").innerHTML = Test.review(result);
        // location.href="../index.php?action=open_topic&topic_id="+TestController.data.id+"&cours_id="+TestController.data.cours;

    }
    static end()
    {
        location.href="../index.php?action=open_topic&topic_id="+TestController.data.id+"&cours_id="+TestController.data.cours;
    }
    static review_action()
    {
        let content = document.getElementById("review").value;
        let data_rewiew={
            content:content,
            user_id:localStorage.getItem("id")
        };
        let data_js = JSON.stringify(data_rewiew);
        Model.ajax(data_js,"add_rewiev");
        localStorage.setItem("rewiev",1);
        //alert("Спасибо за отзыв");
        location.href="../index.php?action=open_topic&topic_id="+TestController.data.id+"&cours_id="+TestController.data.cours;
    }
}