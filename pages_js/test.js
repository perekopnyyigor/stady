class Test{
    static contentArr=[];
    static hint = [];
    static type;
    static task;
    static card(data,last_card)
    {
        Test.contentArr = data.content_mark.split('{m}');
        Test.type = data.type;
        if(data.hint!=null)
            Test.hint = data.hint.split('{p}');

        let content = '';



        content+='<h2 class="m-lg-3" style="font-weight:bold">'+ data.name+'</h2>';

        if(data.picture!=null)
        {
            for (let i=0;i<data.picture.length;i++)
                content +='<img width="200px" src="'+data.picture[i]+'">';
            //content +='<img width="200px" src="'+data.picture+'">';

        }

        if(data.task!=null)
        {
            Test.task = data.task;
            content+='<div id="task">Задание: '+ data.task+'</div>';
        }


        content+='<div class="card">';

        content+='<div id = "result" class="card-body">'+Test.res(0)+'</div>';

        content+='<div id = "hint" class="card-footer text-muted">Подсказка:'+Test.hint[0]+'</div>';

        content+='</div>';







        content+='Правильных ответов: <span id="error">'+Test.true_answers()+'</span>';
        content+='Прогресс: <span id="progress">'+Test.progress()+'</span>';
        content+='</div></div>';
        content+='<h6>Варианты</h6>';
        content+='<div id = "variant">'+Test.variant(0)+'</div>';

        content+='<div id="buttons"></div>';


        return content;
    }
    static true_answers()
    {
        let degree = (TestController.all_answers-TestController.degree)/TestController.all_answers*100;
        let content="";
        content+='<div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" ria-valuemin="0" aria-valuemax="100">';
        content+='    <div class="progress-bar" style="width: '+degree+'%">'+degree+'%</div>';
        content+='</div>';
        return content;
    }

    static progress()
    {
        let degree = TestController.count / TestController.data.cards.length*100;
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
            result+='<pre style="border:0; "><code  class="language-javascript">';

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
                result +="...";
        }

        if(Test.type==2)
            result +='</formula>';
        if(Test.type==3)
            result +='</code></pre>';

        return result
    }
    static variant(count)
    {
        let result = "";
        result += '<ul class="list-group">';
        result += '<li class="list-group-item active" aria-current="true">Варианты</li>';

        if(Test.type==3)
        {
            for(let i=count;i<Test.contentArr.length;i++)
            {
                if(i%2==1)
                {
                    result +='<a href="#" onclick="TestController.answer(\''+Test.contentArr[i]+'\')" class="list-group-item list-group-item-action">';

                    result += '<pre style="border:0;margin: 0; padding: 0"><code style="margin: 0; padding: 0" class="language-javascript">'+Test.contentArr[i]+'</code></pre>';
                    result += '</a>';
                }

            }

        }
       else if(Test.type==2)
        {
            for(let i=count;i<Test.contentArr.length;i++)
            {
                if(i%2==1)
                {
                    result +='<a href="#" class="list-group-item list-group-item-action" onclick="TestController.answer(\''+Test.contentArr[i]+'\')">';
                    result +='<formula >'+Test.contentArr[i]+'</formula>';
                    result += '</a>';
                }


            }

        }
        else
        {
            for(let i=count;i<Test.contentArr.length;i++)
            {
                if(i%2==1)
                {
                    result +='<a href="#" class="list-group-item list-group-item-action" onclick="TestController.answer(\''+Test.contentArr[i]+'\')">';
                    result +=Test.contentArr[i];
                    result += '</a>';
                }

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
                content+='<button type="button" class="btn btn-primary"  onclick="TestController.result()">Закончить</button>';
            else
                content+='<button type="button" class="btn btn-primary" onclick="TestController.next_card()">далее</button>';
        }
        return content;
    }
    static review()
    {
        let content ="";
        content+='<h2 class="m-lg-3" style="font-weight:bold">Отзыв</h2>';
        content +='<div class="mb-3">';
        content +='<label  class="form-label m-4">Пожалуйста, оставьте отзыв, пожелание или предложение, мы обязательно их учтем</label>';
        content +='<textarea  class="form-control m-4" id="review" rows="3"></textarea>';
        content +='<button onclick="TestController.review_action()" type="submit" class="btn btn-primary m-4">Отправить</button>';
        content +='</div>';
        return content;
    }





}
