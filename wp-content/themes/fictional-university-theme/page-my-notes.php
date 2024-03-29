<?php


if (!is_user_logged_in()) {

    wp_redirect(esc_url(site_url('/')));
    exit; //cant use server resources...
}


get_header();



while (have_posts()) {
    the_post();
    pageBanner();

    ?>



    <div class="container container--narrow page-section">

     <div class="create-note">
         <h2 class="headline headline--medium">Create New Note</h2>
         <input placeholder="Title" class="new-note-title">
         <textarea placeholder="Your note here..." class="new-note-body"></textarea>
         <span class="submit-note">Create Note</span>
         <span class="note-limit-message">Note limit reached:delete an existing note</span>

     </div>






        <ul class="min-list link-list" id="my-notes">
            <?php
            $userNotes = new WP_Query(array(
                'post_type' => 'note',
                'post_per_page' => -1,
                'author' => get_current_user_id()
            ));

            while ($userNotes->have_posts()) {
                $userNotes->the_post(); ?>

                <li data-id="<?php the_ID(); ?>">
                <!-- <p><?php //echo esc_html(get_the_content())  //escape  ?></p> -->
                    <input readonly type="text" class="note-title-field" value="<?php
                     echo str_replace('Private: ','',esc_attr(get_the_title())) ?>">
                    <span class="edit-note">
                        <i class="fa fa-pencil" aria-hidden="true">
                          
                        </i>
                        Edit
                    </span>
                    <span class="delete-note">
                        <i class="fa fa-trash-o" aria-hidden="true">
                         
                        </i>
                        Delete
                    </span>
                    <textarea  readonly class="note-body-field"> <?php echo esc_textarea(get_the_content()); ?>

                   </textarea>

                   <span class="update-note btn btn--blue btn--small">
                        <i class="fa fa-arrow-right" aria-hidden="true">
                           Save
                        </i>
                    </span>


                </li>

            <?php
            }

            ?>
        </ul>

    </div>
<?php
}

get_footer();

?>