<?php
class Try_
{
    public $id;
    public $degree;
    public $data;

    public function __construct($id)
    {
        $this->id = $id;
        $this->degree = database::select_one_stat("greed", "try", "Where id=".$id);
        $this->dat = database::select_one_stat("date", "try", "Where id=".$id);
    }
}
