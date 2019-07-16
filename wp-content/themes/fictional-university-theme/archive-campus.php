<?php get_header(); 

pageBanner(array(
    'title'=>'Our Campuses',
    'subtitle'=>'We have several conveniently located campuses.'
));


?>




<div class="container container--narrow page-section">
   <div class="acf-map">
  <ul class="link-list min-list">
    <?php
    while (have_posts()) {
        the_post(); 
        $mapLoc= get_field('map_location'); 

     
        
        
        ?>

       <div class="marker" data-lat="<?php echo $mapLoc['lat']; ?> " data-lng="<?php  echo $mapLoc['lng']; ?> ">
      <h3 ><a href="<?php the_permalink() ?>" >

      <?php
       the_title();
      ?>
      </a>

      </h3>


      <?php
       echo $mapLoc['address'];
      ?>
     
    
    </div>




    <?php
    }


   
    ?>

 
</ul>

</div>
</div>


<?php


get_footer();

?>