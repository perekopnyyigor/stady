class Test{
    static contentArr=[];
    static contentValue=[];
    static contentType=[];
    static hint = [];
    static type;
    static task;
    static language;
    static card(data,last_card)
    {
        Test.contentArr = data.content_mark.split('{m}');

        for (let i=0;i<Test.contentArr.length;i++)
        {
            if(Test.contentArr[i].includes("{t}"))
            {
                let content =Test.contentArr[i].split("{t}");
                Test.contentArr[i]=content[0];
                Test.contentType[i]=content[1];
            }
            else
                Test.contentType[i]=null;

        }


        Test.type = data.type;
        Test.language = data.language;

        if(data.hint!=null)
            Test.hint = data.hint.split('{p}');

        let content = '';

        content+='<div class="alert alert-primary m-1" role="alert">\n' +
            '            Вместо многоточий вставьте слова или символы из предложенных ниже вариантов  \n' +
            '            </div>';

        content+='<div class="m-1">';
        content+='Правильных ответов:<div id="error">  '+Test.true_answers()+'</div>';
        content+='Прогресс: <div id="progress">  '+Test.progress()+'</div>';
        content+='</div>';

        content+='<h3 class="m-1" style="font-weight:bold">'+ data.name+'</h3>';






        if(data.picture!=null)
        {
            for (let i=0;i<data.picture.length;i++)
                content +='<img class="p-4" width="200px" src="'+data.picture[i]+'">';
            //content +='<img width="200px" src="'+data.picture+'">';

        }

        if(data.task!=null)
        {
            Test.task = data.task;//
            content+='<div class="p-4" id="task">Задание: '+ data.task+'</div>';
        }


        content+='<div class="card">';
        content+='<div id = "result" class="card-body">'+Test.res(0)+'</div>';
        content+='<div id = "hint" class="card-footer text-muted">Подсказка:'+Test.hint[0]+'</div>';


        content+='<div id = "variant">'+Test.variant(0)+'</div>';

        content+='<div id="buttons"></div>';


        return content;
    }
    static true_answers()
    {
        let degree = Math.round((TestController.all_answers-TestController.degree)/TestController.all_answers*100);
        let content="";
        content+='<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" ria-valuemin="0" aria-valuemax="100">';
        content+='    <div class="progress-bar" style="width: '+degree+'%">'+degree+'%</div>';
        content+='</div>';
        return content;
    }

    static progress()
    {
        let degree = Math.round( TestController.count / TestController.data.cards.length*100);
        let content="";
        content+='<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" ria-valuemin="0" aria-valuemax="100">';
        content+='    <div class="progress-bar" style="width: '+degree+'%">'+degree+'%</div>';
        content+='</div>';
        return content;
    }

    static res(count)
    {
        let result = "";

        if(Test.type==2)
            result +='<formula>';
        if(Test.type==3)
            result+='<pre style="border:0; "><code  class="'+Test.language+'">';

        for(let i=0;i<count;i++)
        {
            if(Test.type==2)
                result +=Test.contentArr[i];
            else
                result +=Test.contentArr[i];

        }
        for(let i=count;i<Test.contentArr.length;i++)
        {

            if(i%2==0)
                result +=Test.contentArr[i];
            else
            {

                if (i==count || (i==1 && count == 0))
                    if(Test.type==3)
                        result +="[...]";//для кода
                    else
                        result +="[......]";
                else
                    if(Test.type==3)
                        result +="...";//для кода
                    else
                        result +="......";
            }



        }

        if(Test.type==2)
            result +='</formula>';
        if(Test.type==3)
            result +='</code></pre>';

        return result
    }
    static shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    static variant(count)
    {
        let result = "";

        result +='<h4 class="m-1" style="font-weight:bold">Варианты</h4>';
        let random = [];
        let massiv_value = Test.contentArr[TestController.count_variant];

        if(Test.type==3)
        {


            let content=[];
            let j=0;
            for(let i=count;i<Test.contentArr.length;i++)
            {
                let inner_value = Test.contentArr[i];
                let text='';
                if(i%2==1)
                {
                    if(inner_value == massiv_value)
                        text +='<button class="my_btn_prog" onclick="TestController.answer('+i+')" >';
                    else
                        text +='<button class="my_btn_prog" onclick="TestController.answer('+i+')" >';
                    text += '<pre style="border:0;margin: 0; padding: 0"><code style="margin: 0; padding: 0" class="'+Test.language+'">'+Test.contentArr[i]+'</code></pre>';
                    text += '</button>';
                }
                content[j]=text;
                j++;
            }
            Test.shuffle(content);
            for(let i=0;i<content.length;i++)
            {
                result+=content[i];
            }
        }
       else if(Test.type==2)
        {

            let content=[];
            let j=0;
            for(let i=count;i<Test.contentArr.length;i++)
            {
                let inner_value = Test.contentArr[i];
                let text='';
                if(i%2==1)
                {
                    if(inner_value == massiv_value)
                        text +='<button class="my_btn right" onclick="TestController.answer('+i+')">';
                    else
                        text +='<button class="my_btn wrong" onclick="TestController.answer('+i+')">';
                    text +='<formula >'+Test.contentArr[i]+'</formula>';
                    text += '</button>';
                }
                content[j]=text;
                j++;
            }
            Test.shuffle(content);
            for(let i=0;i<content.length;i++)
            {
                result+=content[i];
            }

        }
        else
        {

            let content=[];
            let j=0;
            for(let i=count;i<Test.contentArr.length;i++)
            {
                let inner_value = Test.contentArr[i];
                let text='';
                if(i%2==1)
                {
                    //text +='<button class="btn btn-primary  m-1"  onclick="TestController.answer(\"'+Test.contentArr[i]+'\")">';
                    if(inner_value == massiv_value)
                        text +='<button class="my_btn right"  onclick="TestController.answer('+i+')">';
                    else
                        text +='<button class="my_btn wrong"  onclick="TestController.answer('+i+')">';
                    text +=Test.contentArr[i];
                    text += '</button>';
                }
                content[j]=text;
                j++;
            }
            Test.shuffle(content);
            for(let i=0;i<content.length;i++)
            {
                result+=content[i];
            }
        }

        result+='</ul>';
        return result
    }
    static buttons(last_card,count)
    {
        let content="";

        if (Test.contentArr.length==count)
        {

            if(last_card)
            {

                //content+='<button type="button" class="btn btn-primary m-1"  onclick="TestController.rew()">Отзыв</button>';
                content+='<button type="button" class="btn btn-primary m-1"  onclick="TestController.result()">Результат</button>';
            }
            else
                content+='<button type="button" class="btn btn-primary " onclick="TestController.next_card()">Далее</button>';
        }
        return content;
    }
    static review(result)
    {
        let content ="";
        content+='<h2 class="m-lg-3" style="font-weight:bold">Результат</h2>';
        content+='<label  class="form-label m-4">'+result+'</label>';
        content+='<button type="button" class="btn btn-primary m-1"  onclick="TestController.end()">Закончить</button>';
        content+='<h2 class="m-lg-3" style="font-weight:bold">Отзыв</h2>';
        content +='<div class="mb-3">';
        content +='<label  class="form-label m-4">Пожалуйста, оставьте отзыв, пожелание или предложение, мы обязательно их учтем</label>';
        content +='<textarea  class="form-control m-4" id="review" rows="3"></textarea>';
        content +='<button onclick="TestController.review_action()" type="submit" class="btn btn-primary m-4">Отправить</button>';
        content +='</div>';
        return content;
    }





}
