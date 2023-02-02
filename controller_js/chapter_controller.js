class ChapterController
{
    static onload(cours_id)
    {
        let data={
            cours_id:cours_id,
        };

        let res = Model.ajax(JSON.stringify(data),"get_chapters");


        document.getElementById("main").innerHTML = Chapter.main(res);
    }
}