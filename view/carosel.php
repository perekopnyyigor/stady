<?php
class Carosel
{
    static function main()
    {
        echo '
       <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-1 "></div>
        <div class="col-xl-8 col-lg-8 col-md-10 ">
        <h2 class="px-4 mt-5" style="font-weight:bold">О нас</h2>
       
        
        
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">       
        <div class="carousel-inner"> 
            <div class="carousel-item active ">
               <img src="../image/on-a-table-with-copy-space.webp" data-bs-interval="5000" class="d-block w-100" alt="...">
                <div class="carousel-caption position-absolute start-0  ">
                <h4  style="font-weight: bold; color: white;">Учитесь легко</h4>
                <p style="font-weight: bold; color: white;">Собирайте определения и решения задач в тестах</p>
            </div></div>
            
            <div class="carousel-item" data-bs-interval="5000">
              <img src="../image/books-and-copy-space.webp" class="d-block w-100" alt="...">
                <div class="carousel-caption position-absolute end-0">
                <h4 style="font-weight: bold; color: black;">Учитесь быстро</h4>
                <p style="font-weight: bold; color: black;">Нарабатывайте практику в любое удобное время.</p>
            </div></div>
            
            <div class="carousel-item" data-bs-interval="5000">
               <img src="../image/different-books.webp" class="d-block w-100" alt="...">
              <div class="carousel-caption position-absolute start-0">
                <h4 style="font-weight: bold; color: black;">Главное повторение</h4>
                <p style="font-weight: bold; color: black;">Мы составим расписание для повторения и закрепления</p>
            </div></div></div>
            
             <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleSlidesOnly" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
              </button>
  
          </div>
          
         
        ';
    }
}
