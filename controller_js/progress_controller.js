class Progress_controller
{
    static onload()
    {
        let user_id = localStorage.getItem("id");
        //--------------------------------------
        let data = {
            "id":user_id
        };

        let data_js = JSON.stringify(data);
        data_js = Model.ajax(data_js,"find_courses");
        let cours = JSON.parse(data_js);

        //--------------------------------------
        data = {
            "user_id":user_id
        };

        data_js = JSON.stringify(data);
        data_js = Model.ajax(data_js,"get_lessons");
        //alert(data_js);
        let lessons = JSON.parse(data_js);

        document.getElementById("main").innerHTML=Progress.main(cours,lessons);
    }
    static openTryes(lesson_id)
    {
        let data = {
            "lesson_id":lesson_id
        };

        let data_js = JSON.stringify(data);

        data_js = Model.ajax(data_js,"find_try");


       //Progress_controller.clean_try_list();


        let tryes = JSON.parse(data_js);
        document.getElementById(lesson_id).innerHTML=Progress.tryes(tryes);
    }
    static clean_try_list()
    {
        let try_list = document.getElementsByName("tryes");
        for (let i = 0;i<try_list.length;i++)
        {
            try_list[i].innerHTML="";
        }
    }
}