<?php get_header(); ?>
<?php



while (have_posts()) {
    the_post();

   /*  pageBanner(array(

          'title' =>'About us page'
         // 'photo'=>  get_theme_file_uri('images/italy.jpg')

        

    )); */

    pageBanner();
    
    ?>

    

    <div class="container container--narrow page-section">

        <?php

       // echo "this page id:".get_the_ID();

        
        $theParent=wp_get_post_parent_id(get_the_ID());
       // echo  "parent of this page :".$theParent; // it is not child return 0 , if(0) means not if 
        if ($theParent) :  //if return 0 it is false if it is child set the metabox 
            ?>

            <div class="metabox metabox--position-up metabox--with-home-link">
                <p><a class="metabox__blog-home-link" href="<?php echo get_the_permalink($theParent) ?>"><i class="fa fa-home" aria-hidden="true"></i> Back to <?php echo get_the_title($theParent) ?></a> <span class="metabox__main"><?php the_title() ?></span></p>
            </div>



        <?php

        endif;
      
        $testArray =get_pages(array(
            'child_of'=> get_the_ID()
        ));
        // if this page is a parent it is true , if is not parent return 0

        ?>

       

    
       <?php 
       // theparent means it a child page 
       // test array means it a parent ğage 
       // it is in the normal page all of two will return 0 this means notting list. 
       if($theParent || $testArray ):

        
        
        ?>
       <div class="page-links">
          <h2 class="page-links__title"><a href="<?php echo get_the_permalink($theParent) ?>"><?php echo get_the_title($theParent) ?></a></h2>
          <ul class="min-list">

          <?php


//listing childpages 
         if($theParent) //is it is child 
         {   
             $findChildrenOf=$theParent;  // get the parent id
            
         }
         else {  //is not parent means is it parent 

            $findChildrenOf=get_the_ID(); // the parent  id 
        }
          
            ///listting  pages of the parent 
            
          wp_list_pages(array(
              'title_li'=> NULL,
              'child_of'=> $findChildrenOf,
              'sort_column'=>'menu_order'

          ));
          
          
          ?>
         
          </ul>
        </div> 
        <?php endif; ?>

        <div class="generic-content">

            <?php the_content(); ?>

        </div>

    </div>
     




<?php
}

get_footer();

?>