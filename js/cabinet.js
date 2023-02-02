onload();
let last_details;
function onload()
{


    let data =JSON.parse(get_chapters());

    document.getElementById("main").innerHTML=form(data);
    let id = localStorage.getItem("last_details");
    document.getElementById(id).open=true;

}
function remember(arg)
{
    let elements= document.getElementsByTagName("details");
    for (const element of elements) {

        if(Number(element.id) !== Number(arg.id))
            element.open=false;
    }
    localStorage.setItem("last_details", arg.id);
}
function chapter(data)//список тем в главе
{
    let content ='';
        content +='<details id="'+data.id+'" onclick="remember(this)"><summary>' ;
        content +='<div class="my_item"><span >'+data.name+'</span>' ;
        content +='<a href="#" onclick="add_topic('+data.id+')" >Добавить тему</a>';
        content +='<a href="#" >Удалить</a></div></summary>';


        for (let i = 0; i< data.topics.length; i++)
        {
            content +=topic(data.topics[i]);
        }
    content +='</details>';

    return content;
}

function topic(data)//список карт в теме
{
    let content ='';
    content +='<div class="my_item-1"><span >'+data.name+'</span>' ;
    content +='<a href="#" onclick="card_form('+data.id+')" >Добавить карту</a>';
    content +='<a href="#" >Удалить</a></div>';

    for (let i = 0; i< data.cards.length; i++)
    {
        content+=card(data.cards[i]);
    }
    content+='</ul >';
    content +='</li>';
    return content;
}
function card(data)//список
{
    let content ='';
    content +='<div class="my_item-2"><span >'+data.name+'</span>' ;


    content +='<a href="#" id="redact" onclick="card_form_content('+data.id+')" >Редактировать</a>';
    content +='<a href="#" >Удалить</a></div>';
    content +='</li>';

    return content;
}

function form(data)
{
    let content ='';
    content+='<div class="row">';

    content+='<div class="col">';


    for (let i = 0; i< data.length; i++)
    {

        content+=chapter(data[i]);

    }


    content+='<a onclick="add_chapter()" class="nav-link active" aria-current="page" href="#">Создать главу</a>';
    content+='</div >';

    content+='<div id="card_form" class="col">';

    content+='</div >';

    content+='</div >';

    return content;
}
function card_form(id)
{
    let content ='';
    content +='<div>';
    content+='<p>Название</p>';
    content +='<input id="card_name">';
    content+='<p>Содержание</p>';
    content +='<textarea id="card_content"> </textarea>';
    content +='<br>';
    content +='<button onclick="add_card('+id+')">Добавить</button>';
    content +='</div>';
    document.getElementById("card_form").innerHTML=content;
}
function card_form_content(data)
{
    let card =JSON.parse(get_card(data)) ;
    let content ='';
    content +='<div>';
    content+='<p>Название</p>';
    content +='<input id="card_name" value="'+card.name+'" >';
    content+='<p>Содержание</p>';
    content +='<textarea id="card_content"> '+card.content+'</textarea>';
    content +='<br>';
    content +='<button onclick="redact_card('+card.id+')">Добавить</button>';
    content +='</div>';
    document.getElementById("card_form").innerHTML=content;
}
//действия

function add_chapter()//добавляем главу
{
    let chapter_name = prompt('Введите название');
    let user_id = localStorage.getItem("id");
    let data={
        user_id:user_id,
        chapter_name:chapter_name
    };
    let data_json = JSON.stringify(data);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=add_chapter", false);
    let formData = new FormData();
    formData.append("data_json", data_json);
    xhttp.send(formData);
    onload();
    return xhttp.responseText;
}

function get_chapters()//список глав
{
    const xhttp = new XMLHttpRequest();
    let user_id = localStorage.getItem("id");
    xhttp.open("GET", "../index.php?action=find_chapters&user="+user_id, false);
    xhttp.send();
    return xhttp.responseText;
}

function get_card(card_id)//получаем карту
{
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "../index.php?action=get_card&card_id="+card_id, false);
    xhttp.send();

    return xhttp.responseText;
}

function add_topic(chapter_id)
{
    let topic_name = prompt('Введите название');

    let data={
        chapter_id:chapter_id,
        topic_name:topic_name
    };
    let data_json = JSON.stringify(data);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=add_topic", false);
    let formData = new FormData();
    formData.append("data_json", data_json);
    xhttp.send(formData);
    onload();
    alert(xhttp.responseText) ;
}

function add_card(id)
{
    let name=document.getElementById("card_name").value;
    let text=document.getElementById("card_content").value;

    let data={
        topic_id:id,
        card_name:name,
        card_text:text
    };
    let data_json = JSON.stringify(data);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=add_card", false);
    let formData = new FormData();
    formData.append("data_json", data_json);
    xhttp.send(formData);
    onload();

}

function redact_card(id)
{
    let name=document.getElementById("card_name").value;
    let text=document.getElementById("card_content").value;

    let data={
        id:id,
        card_name:name,
        card_text:text
    };
    let data_json = JSON.stringify(data);

    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../index.php?action=redact_card&card_id="+id, false);
    let formData = new FormData();
    formData.append("data_json", data_json);
    xhttp.send(formData);
    onload();


}

