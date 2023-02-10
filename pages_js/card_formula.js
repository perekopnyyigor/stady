class CardFormula
{
    static data;
    static onload(id)
    {
        let content = '';
         content+='<p>Название формулы</p>';
         content+='<input oninput=\'CreateCardController.update()\' id="card_name">';
         content+='<p>Задание</p>';
         content +='<textarea oninput=\'CreateCardController.update()\' id="task" style="width: 80%; height: 100px"></textarea>';
         content+='<p>Структура формулы</p>';
         content += "<textarea style=\"width: 80%; height: 100px\" id='card_content' oninput='CreateCardController.update()'></textarea>";
         content +='<input id="topic_id" type="hidden" value="'+id+'">';
         content +="<div id='view'></div>";
         content +='<button onclick="CardFormulsController.createCard()">Добавить</button>';
        content += '<button onclick="CardFormulsController.click()">Выделить</button>';
        content += '<button onclick="CardFormulsController.check()">check</button>';


         document.getElementById("redactor").innerHTML=content;


    }
    static get_card_data()
    {
        let name=document.getElementById("card_name").value;
        let text=document.getElementById("card_content").value;
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
            type:2
        };
        return  JSON.stringify(data);
    }
    static redact(data_js)
    {

        let data=JSON.parse(data_js);
        CardFormula.data =data;
        let content = '';
        content+='<p>Название формулы</p>';
        content+='<input oninput=\'CardFormulsController.update()\' id="card_name" value="'+data.name+'">';
        content+='<p>Задание</p>';
        content +='<textarea oninput=\'CardFormulsController.update()\' id="task" style="width: 80%; height: 100px">'+data.task+'</textarea>';
        content+='<p>Структура формулы</p>';
        content += "<textarea style=\"width: 80%; height: 100px\" id='card_content' oninput='CardFormulsController.update()'>"+data.content_mark+"</textarea>";
        content +='<input id="card_id" type="hidden" value="'+data.id+'">';
        content +="<div id='view'></div>";
        content +='<button onclick="CardFormulsController.redactCard()">Изменить</button>';
        content += '<button onclick="CardFormulsController.click()">Выделить</button>';
        content += '<button onclick="CardFormulsController.check()">check</button>';



        document.getElementById("redactor").innerHTML=content;
        CreateCardController.update();
    }


    static card_change_data() {
        let name = document.getElementById("card_name").value;
        let text_mark = document.getElementById("card_content").value;
        let hints = document.getElementsByName("hint");
        let hint_string="";
        for (let i =0;i<hints.length;i++)
            hint_string+=hints[i].value+"{p}";
        let task=document.getElementById("task").value;
        alert(name);
        let id = document.getElementById("card_id").value;
        let data = {
            id: id,
            card_name: name,
            card_mark: text_mark,
            hint: hint_string,
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
        let hintArr=CardFormula.data.hint.split('{p}');
        let j=0;

        for(let i=count;i<contentArr.length;i++)
        {

            if(i%2==1)
            {
                if(j==hint)
                {
                    result +='<br><label><div onclick="Controller.answer('+i+')"><formula>'+contentArr[i]+'</formula></div><label>';
                    result +='<div>Подсказка: <input name="hint" value="..."></div>';
                    hint=-10;
                }
                else
                {
                    result +='<br><label><div onclick="Controller.answer('+i+')"><formula>'+contentArr[i]+'</formula></div><label>';
                    result +='<div>Подсказка: <input name="hint" value="'+hintArr[j]+'"></div>';
                    j++;
                }
            }


        }
        return result
    }


}