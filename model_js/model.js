

class Model
{
    static get_chapters()//список глав
    {
        const xhttp = new XMLHttpRequest();
        let user_id = localStorage.getItem("id");
        xhttp.open("GET", "../index.php?action=find_chapters&user="+user_id, false);
        xhttp.send();
        return xhttp.responseText;
    }
    static get_card(card_id)//получаем карту
    {
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", "../index.php?action=get_card&card_id="+card_id, false);
        xhttp.send();
        return xhttp.responseText;
    }
    static get_topic(topic_id)//получаем карту
    {
        const xhttp = new XMLHttpRequest();

        xhttp.open("GET", "../index.php?action=get_topic&topic_id="+topic_id, false);
        xhttp.send();

        return xhttp.responseText;
    }
    static get_courses()//список глав
    {
        const xhttp = new XMLHttpRequest();
        let user_id = localStorage.getItem("id");
        xhttp.open("GET", "../index.php?action=find_courses&user="+user_id, false);
        xhttp.send();
        return xhttp.responseText;
    }
    static ajax(data,ref)
    {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../index.php?action="+ref, false);
        let formData = new FormData();
        formData.append("data_json", data);
        xhttp.send(formData);
        return xhttp.responseText;
    }
    static add_chapter(data_json)//добавляем главу
    {
        Model.ajax(data_json,"add_chapter");
    }
    static add_topic(data_json)
    {
        Model.ajax(data_json,"add_topic");
    }
    static add_card(data_json)
    {
        alert(Model.ajax(data_json,"add_card"));

    }
    static redact_card(data_json)
    {
        alert( Model.ajax(data_json,"redact_card"));

    }
    static add_lesson(data_json)
    {
       Model.ajax(data_json,"add_lesson");

    }
    static add_try(data_json)
    {
        Model.ajax(data_json,"add_try");
    }
    static get_lessons(data_json)
    {
        return Model.ajax(data_json,"get_lessons");
    }
    static addImg(card_id,file)
    {

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../index.php?action=add_img", false);
        let formData = new FormData();
        formData.append("file[]", file);
        formData.append("card_id", card_id);
        xhttp.send(formData);

    }
    static addCoursImg(card_id,file)
    {

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../index.php?action=add_cours_img", false);
        let formData = new FormData();
        formData.append("file[]", file);
        formData.append("cours_id", card_id);
        xhttp.send(formData);
        return xhttp.responseText;
    }
    static add_cours(data_json)
    {
        return Model.ajax(data_json,"add_cours");
    }
}