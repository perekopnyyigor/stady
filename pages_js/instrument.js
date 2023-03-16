class Instrument
{


    static form()
    {
        let content='';

        let list = Instrument.List();
        content += Instrument.createList(list,"HTML");

        list = Instrument.ListFormula();
        content += Instrument.createList(list,"Формула");

        list = Instrument.ListTreatment();
        content += Instrument.createListTreatment(list,"Работа с текстом");



        return content;

    }
    static createListTreatment(list,name)
    {
        let content="";

        content +='<details><summary>';
        content += '<div class="my_item">'+name+'</div>';
        content +='</summary>';
        let style = 'background-color: white;'
        for (let i=0;i<list.length;i++)
            content += '<button class="my_item-1" style="'+style+'" onclick="InstrumentController.treatment('+list[i].text+')">'+list[i].name+'</button>';
        content +='</details>';
        return content;
    }
    static createList(list,name)
    {
        let content="";
        content +='<details><summary>';
        content += '<div class="my_item">'+name+'</div>';
        content +='</summary>';
        for (let i=0;i<list.length;i++)
            content += '<div class="my_item-1" onclick="InstrumentController.click(\''+list[i].text+'\')">'+list[i].name+'</div>';
        content +='</details>';
        return content;
    }
    static List()
    {
        let list=[];
        list[0]={name:"таблица",text:"<table>\\n<tr><td>...</td><td>...</td></tr>\\n<tr><td>...</td><td>...</td></tr>\\n</table>"};
        list[1]={name:"список",text:"<ul>\\n<li>...</li>\\n<li>...</li>\\n<li>...</li>\\n</ul>"};
        list[2]={name:"формула",text:"<formula></formula>"};
        return list;
    }
    static ListFormula()
    {
        let list=[];
        list[0]={name:"<formuls>x^2</formuls>",text:"x^2"};
        list.push({name:"<formuls>\\cfrac{a}{b}</formuls>",text:"\\\\cfrac{}{}"});
        list.push({name:"<formuls>\\sqrt{a}</formuls>",text:"\\\\sqrt{}"});
        list.push({name:"<formuls>\\sin t</formuls>",text:"\\\\sin "});
        list.push({name:"<formuls>\\cos t</formuls>",text:"\\\\cos "});
        list.push({name:"<formuls>\\Big( x \\Big)</formuls>",text:"\\\\Big(  \\\\Big) "});
        return list;
    }
    static ListTreatment()
    {
        let list=[];
        list[0]={name:"Выделить",text:1};
        list.push({name:"Формула",text:2});
        list.push({name:"Выделить формулу",text:3});
        list.push({name:"Разбить предложение",text:4});
        list.push({name:"Удалить выделенное",text:5});
        list.push({name:"Левая часть списка",text:6});
        list.push({name:"Правая часть списка",text:7});
        list.push({name:"Обработка формулы",text:8});
        return list;
    }


}