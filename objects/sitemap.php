<?php
require_once "database.php";

class Sitemap
{
    public function main()
    {
        $cont = $this->content();
        echo $cont;
        $this->write($cont);
    }
    private function write($text)
    {
        $filename = 'sitemap.xml';
        // Открываем файл, флаг W означает - файл открыт на запись
        $f_hdl = fopen($filename, 'w');
        // Записываем в файл $text
        fwrite($f_hdl, $text);

        // Закрывает открытый файл
        fclose($f_hdl);
        echo "файл обновлен";

    }
    private function cours()
    {
        $text="";

        $translit_massiv = database::select_stat("translit","cours");
        foreach ($translit_massiv as $translit)
        {
                $text.= "<url>\n";
                $text.="<loc>https://studycard.ru/".$translit."</loc>\n";
                $text.="<lastmod>2023-01-01</lastmod>\n";
                $text.= "</url>\n";

        }
        return $text;
    }

    private function topic()
    {
        $text="";

        $id_massiv = database::select_stat("id","topic");

        foreach ($id_massiv as $id)
        {
            $topic=new Topic($id);
            $cours = new CoursObj($topic->cours);
            $text.= "<url>\n";
            $text.="<loc>https://studycard.ru/".$cours->translit."/".$topic->translit."</loc>\n";
            $text.="<lastmod>2023-01-01</lastmod>\n";
            $text.= "</url>\n";

        }
        return $text;
    }

    private function content()
    {
        $content="";
        $content.= "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        $content.= "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n";
        $content.="<url>\n";
        $content.="<loc>https://studycard.ru</loc>\n";
        $content.="<lastmod>2023-01-01</lastmod>\n";
        $content.="</url>\n";
        $content.=$this->cours();
        $content.=$this->topic();
        $content.= "</urlset>\n";

        return $content;
    }
}
