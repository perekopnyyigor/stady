class CabinetController
{
    onload()
    {
        //Получаем данный
        let chapter = Model.get_chapters();
        //Создаем кабинет
        let cabinet = new Cabinet();
        cabinet.start();
        //Создаем список карт
        let createCard = new CreateCard();
        createCard.start(chapter);
    }
    static myCoursOnload()
    {

        let courses = Model.get_courses();
        MyCours.onload(courses);
    }
    static createCard()
    {
        let chapter = Model.get_chapters();
        alert(chapter);
        let createCard = new CreateCard();
        createCard.start(chapter);
    }
    static createCours()
    {
        CoursController.onload();
    }
    static boxes()
    {
        let lesson={
            user_id:localStorage.getItem("id"),
        };
        let data_js = JSON.stringify(lesson);
        let data = Model.get_lessons(data_js);
        document.getElementById("name").innerHTML="Обучение";
        Boxes.onload(data);
    }
    static calendar()
    {
        let lesson={
            user_id:localStorage.getItem("id"),
        };
        let data_js = JSON.stringify(lesson);

        let data = Model.get_lessons(data_js);
        document.getElementById("name").innerHTML="Календарь";
        Calendar.onload(data);
    }
}