
class Cabinet
{
    static menu_arr = [
        {"name":"Cоздать курс","function":"CabinetController.createCours()","description":""},
        //{"name":"Пройденные темы","function":"CabinetController.boxes()","description":"Здесь отображается пройденные темы и периоды между повторениям"},
        {"name":"Календарь","function":"CabinetController.calendar()","description":"Здесь отображается расписание повторений"},
        {"name":"Прогресс","function":"CabinetController.progress()","description":"Здесь отображается расписание повторений"}
        ];

    static menu_start()
    {
        let content="";
        content +=Cabinet.breadcrumb();
        content +=Cabinet.button_back();
        content += '<h1 style="font-weight:bold" >Выберите пункт</h1></a>';
        let i=1;
        if(localStorage.getItem("admin")==1)
            i=0;
        for ( i; i < this.menu_arr.length; i++)
            content += Cabinet.menu_start_card(Cabinet.menu_arr[i]);
        content += '</div>';
        return content;
    }
    static breadcrumb()
    {
        let result='';

        result+='<nav style="--bs-breadcrumb-divider: url(&#34;data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'%236c757d\'/%3E%3C/svg%3E&#34;);" aria-label="breadcrumb">';

        result+='<ol class="breadcrumb">';

        result+=' <li class="breadcrumb-item my-1"><a href="../">Главная</a></li>';
        result+=' <li class="breadcrumb-item my-1"><a href="../index.php?action=cabinet">Кабинет</a></li>';

        result+='</ol>';
        result+='</nav>';

        return  result;
    }
    static button_back()
    {
        let href="../";

        let result='<a class="mx-2" style="float: left" href="'+href+'"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">';
        result+='<path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/> </svg></a>';

        return result;
    }
    static menu_start_card(punkt)
    {
        let content = '';
        content +='<a class="link-dark" href="#" style="text-decoration:none;" onclick="'+punkt.function+'" >';
        content += '<div class="shadow card   p-1 border m-2" >';
        content += '<div class="card-body">';
        content += '<h2 class="card-title">'+punkt.name+'</h2>';
        content += '<p class="card-text">'+punkt.description+'</p>';
        content += '    </div>';
        content += '</div></a>';
        return content;
    }
    static menu()
    {
        let content="";

        content += '<div class="list-group d-none d-md-block">';
        content += '<a href="#" class="list-group-item list-group-item-action active">';
        content += '<h2 style="font-weight:bold" >Кабинет</h2></a>';
        let i=1;
        if(localStorage.getItem("admin")==1)
            i=0;
        for ( i; i < this.menu_arr.length; i++)
            content += Cabinet.menu_punkt(Cabinet.menu_arr[i]);
        content += '</div>';
       return content;
    }

    static menu_punkt(menu)
    {
        let content ='';
        content += '<a href="#" class="list-group-item list-group-item-action" onclick="'+menu.function+'">';
        content += '<h3 style="font-weight:bold" className="m-lg-3 p-0">'+menu.name+'</h3>';
        content += '</a>';
        return content;
    }

}

let cab = new Cabinet();
cab.start();