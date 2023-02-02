class CreateCardController
{
    static contentArr=[];
    static openCardForm(id)
    {
        let createCard = new CreateCard();
        createCard.card_form(id);
    }
    static reload(cours_id)
    {
        let data={
            cours_id:cours_id
        };

        let res = Model.ajax(JSON.stringify(data),"get_chapters");
        let createCard = new CreateCard();
        createCard.start(res);
    }
    static openCardFormContent(id)
    {
        let data = Model.get_card(id);

        let createCard = new CreateCard();
        createCard.card_form_content(data);

    }
    static createChapter()
    {
        let data = CreateCard.get_chapter_name();
        Model.add_chapter(data);

        CreateCardController.reload(CreateCard.cours_id);
    }
    static createTopic(chapter_id)
    {

        let data = CreateCard.get_topic_name(chapter_id);
        Model.add_topic(data);


        CreateCardController.reload(CreateCard.cours_id);
    }

    static createCard()
    {
        let data = CreateCard.get_card_data();
        Model.add_card(data);

        CreateCardController.reload(CreateCard.cours_id);
    }
    static redactCard()
    {
        let data = CreateCard.card_change_data();
        Model.redact_card(data);

        CreateCardController.reload(CreateCard.cours_id);
    }
    static addImg()
    {
        let img = CreateCard.getImgData();
        let card_id = CreateCard.getIdCard();
        Model.addImg(card_id,img);

    }
    static cardFormula(id)
    {

        CardFormula.onload(id);
    }
    static cardCode(id)
    {

        CardCode.onload(id);
    }
    static click()
    {
        let select = window.getSelection();
        let redact = document.getElementById("card_content");
        let startPos = redact .selectionStart;
        let endPos = redact .selectionEnd;
        let content=redact.value;

        let srt1 = content.substring(0,startPos);
        let srt2 = content.substring(endPos , content.length);
        let result = srt1 + "{m}"+select +"{m}"+srt2;
        redact.value=result ;
    }
    static check()
    {
        let redact = document.getElementById("card_content");
        let content=redact.value;
        CreateCardController.contentArr=content.split('{m}');

        document.getElementById("result").innerHTML=CreateCard.res(CreateCardController.contentArr,0);
        document.getElementById("variant").innerHTML=CreateCard.variant(CreateCardController.contentArr,0);
    }
    static deleteCard(id)
    {
        let del = confirm("Вы действительно хотите удалить карту");
        if (del)
        {

            let data={
                card_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_card");
        }
        CreateCardController.reload(CreateCard.cours_id);
    }
    static deleteTopic(id)
    {
        let del = confirm("Вы действительно хотите удалить тему и все карты");
        if (del)
        {

            let data={
                topic_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_topic");
        }
        CreateCardController.reload(CreateCard.cours_id);
    }
    static deleteChapter(id)
    {
        let del = confirm("Вы действительно хотите удалить главу и все темы");
        if (del)
        {

            let data={
                chapter_id:id,
            };

            let data_json =  JSON.stringify(data);
            Model.ajax(data_json,"delete_chapter");
        }
        CreateCardController.reload(CreateCard.cours_id);
    }

}