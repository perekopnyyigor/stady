class CardCode
{
    static data;
    static onload(id)
    {
        let content = '';
         content+='<p>Название формулы</p>';
         content+='<input id="name">';
        content+='<p>Задание</p>';
        content +='<textarea id="task" style="width: 80%; height: 100px"></textarea>';
         content+='<p>Структура формулы</p>';
         content += "<textarea style=\"width: 80%; height: 100px\" id='redactor' oninput='CardCodeController.onchange()'></textarea>";
         content +='<input id="topic_id" type="hidden" value="'+id+'">';
         content +='<pre><code id="view" class="language-javascript"></code></pre>';
         content +='<button onclick="CardCodeController.createCard()">Добавить</button>';
        content += '<button onclick="CardCodeController.click()">Выделить</button>';
        content += '<button onclick="CardCodeController.check()">check</button>';


        content += '<pre><code id="result" class="language-javascript"></code></pre>';
        content += '<pre><code id="variant" class="language-javascript"></code></pre>';
         document.getElementById("card_form").innerHTML=content;

    }

    static get_card_data()
    {
        let name=document.getElementById("name").value;
        let text=document.getElementById("redactor").value;
        let id = document.getElementById("topic_id").value;
        let task=document.getElementById("task").value;
        let hints = document.getElementsByName("hint");
        let hint_string="";
        for (let i =0;i<hints.length;i++)
            hint_string+=hints[i].value+"{p}";
        let data={
            topic_id:id,
            card_name:name,
            card_mark:text,
            hint: hint_string,
            task:task,
            type:3
        };
        return  JSON.stringify(data);
    }
    static redact(data_js)
    {

        let data=JSON.parse(data_js);
        CardCode.data =data;
        let content = '';
        content+='<p>Название фрагмента</p>';
        content+='<input id="name_card" value="'+data.name+'">';
        content+='<p>Задание</p>';
        content +='<textarea id="task" style="width: 80%; height: 100px">'+data.task+'</textarea>';
        content+='<p>Фрагмент кода</p>';
        content += "<textarea style=\"width: 80%; height: 200px\" id='redactor' oninput='CardCodeController.onchange()'>"+data.content_mark+"</textarea>";
        content +='<input id="card_id" type="hidden" value="'+data.id+'">';

        content +='<pre><code id="view" class="language-javascript"></code></pre>';
        content +='<button onclick="CardCodeController.redactCard()">Изменить</button>';

        content += '<button onclick="CardCodeController.click()">Выделить</button>';
        content += '<button onclick="CardCodeController.check()">check</button>';


        content += '<pre><code id="result" class="language-javascript"></code></pre>';
        content += '<div id="variant"></div>';
        document.getElementById("card_form").innerHTML=content;
        CardCodeController.onchange();
    }

    static card_change_data() {
        let name = document.getElementById("name_card").value;
        let text_mark = document.getElementById("redactor").value;

        let hints = document.getElementsByName("hint");
        let hint_string="";
        for (let i =0;i<hints.length;i++)
            hint_string+=hints[i].value+"{p}";
        let task=document.getElementById("task").value;
        let id = document.getElementById("card_id").value;
        let data = {
            id: id,
            card_name: name,
            hint: hint_string,
            card_mark: text_mark,
            task:task

        };
        return  JSON.stringify(data);
    }
    static res(contentArr,count)
    {
        let result = "";
        for(let i=0;i<count;i++)
        {

            result +=contentArr[i];

        }
        for(let i=count;i<contentArr.length;i++)
        {
            if(i%2==0)
                result +=contentArr[i];
            else
                result +="...";
        }
        return result
    }
    static variant(contentArr,count,hint)
    {
        let result = "";
        let hintArr=CardCode.data.hint.split('{p}');
        let j=0;
        for(let i=count;i<contentArr.length;i++)
        {

            if(i%2==1)
            {
                if(j==hint)
                {
                    result +='<pre><code id="result" class="language-javascript">'+contentArr[i]+'</code></pre>';
                    result +='<div>Подсказка: <input name="hint" value="..."></div>';
                    hint=-10;
                }
                else
                {
                    result +='<pre><code id="result" class="language-javascript">'+contentArr[i]+'</code></pre>';
                    result +='<div>Подсказка: <input name="hint" value="'+hintArr[j]+'"></div>';
                    j++;
                }
            }



        }
        return result
    }

}