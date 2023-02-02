class CoursController
{
    static onload()
    {
        let user_id = localStorage.getItem("id");

        let data={
            user_id:user_id,
        };

        let res = Model.ajax(JSON.stringify(data),"get_cours");

        document.getElementById("main").innerHTML = Cours.main(res);
    }
    static courseForm()
    {
        document.getElementById("form").innerHTML = Cours.form();
    }
    static addCours()
    {
        let cours_name = document.getElementById("course_name").value;
        let description = document.getElementById("description").value;
        let user_id = localStorage.getItem("id");
        let data={
            user_id:user_id,
            cours_name:cours_name,
            description:description
        };
        let res = Model.ajax(JSON.stringify(data),"add_cours");
        CoursController.onload();
    }
    static openChapter(cours_id)
    {
        let data={
            cours_id:cours_id,
        };
        let res_json = Model.ajax(JSON.stringify(data),"get_one_cours");
        let res = JSON.parse(res_json);
        document.getElementById("form").innerHTML = Cours.content_form(res);
    }
    static redactCours()
    {
        let cours_name = document.getElementById("course_name").value;
        let description = document.getElementById("description").value;
        let cours_id = document.getElementById("cours_id").value;
        let data={
            cours_id:cours_id,
            cours_name:cours_name,
            description:description
        };

        let res = Model.ajax(JSON.stringify(data),"redact_cours");
        CoursController.onload();
        CoursController.openChapter(cours_id);
    }
    static addImg()
    {
        let img = document.getElementsByName("file")[0].files[0];
        let cours_id = document.getElementById("cours_id").value;

        let res = Model.addCoursImg(cours_id,img);
        CoursController.onload();
        CoursController.openChapter(cours_id);
    }
    static deleteCours(id)
    {
        let del = confirm("Вы действительно хотите удалить курс");
        if (del)
        {

            let data={
                cours_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_cours");
        }
        CoursController.onload();
    }
}