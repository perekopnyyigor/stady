class Instrument
{


    static form()
    {
        let content='';

        let list = Instrument.List();
        content += Instrument.createList(list,"HTML");

        list = Instrument.ListFormula();
        content += Instrument.createList(list,"Формула");


        return content;

    }
    static createList(list,name)
    {
        let content="";
        content += '<div class="my_item">'+name+'</div>';
        for (let i=0;i<list.length;i++)
            content += '<div class="my_item-1" onclick="InstrumentController.click(\''+list[i].text+'\')">'+list[i].name+'</div>';

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

        return list;
    }


}