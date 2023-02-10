
class Cabinet
{
    menu_arr = [
        {"name":"Cоздать курс","function":"CabinetController.createCours()"},

        {"name":"Обучение","function":"CabinetController.boxes()"},
        {"name":"Календарь","function":"CabinetController.calendar()"}
        ];
    start()
    {
        this.menu();
        CabinetController.boxes();
    }
    menu()
    {
        let content="";

        content += '<div class="list-group d-none d-md-block">';
        content += '<a href="#" class="list-group-item list-group-item-action active">';
        content += '<h5 style="font-weight:bold" >Выберите пункт</h5></a>';
        let i=1;
        if(localStorage.getItem("admin")==1)
            i=0;
        for ( i; i < this.menu_arr.length; i++)
            content += this.menu_punkt(this.menu_arr[i]);
        content += '</div>';
//---------------------------------------------------------------------------------
        content += '<div class="dropdown d-block d-md-none">';
        content += '    <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">';
        content += '        Выберите пункт';
        content += '    </button>';
        i=1;
        if(localStorage.getItem("admin")==1)
            i=0;
        content += '    <div class="dropdown-menu">';
                for ( i; i < this.menu_arr.length; i++)
                content += this.menu_punkt(this.menu_arr[i]);
        content += '</div></div>';

        document.getElementById("menu").innerHTML=content;
    }
    menu_punkt(menu)
    {
        let content ='';

        content += '<a href="#" class="list-group-item list-group-item-action" onclick="'+menu.function+'">';
        content += '<h5 style="font-weight:bold" className="m-lg-3 p-0">'+menu.name+'</h5>';
        content += '</a>';
        return content;

    }

}

let cab = new Cabinet();
cab.start();