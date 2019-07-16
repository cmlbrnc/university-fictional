<?php

add_action('rest_api_init', 'universityLikeRoutes');

function universityLikeRoutes()
{
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => WP_REST_SERVER::CREATABLE,
        'callback' => 'createLike'

    ));
    register_rest_route('university/v1', 'manageLike', array(
        'methods' => WP_REST_SERVER::DELETABLE,
        'callback' => 'deleteLike'

    ));
}

function createLike($data)
{

    // if(current_user_can('publish_note')) {} ///can perform publish note  ? 
    if (is_user_logged_in()) {

        $professor = sanitize_text_field($data['professorId']);

        $existQuery = new WP_Query(array(



            'post_type'=> 'like',
            'author'=>get_current_user_id(),
            'meta_query'=> array(array(

                'key'=>'liked_professor_id',
                'compare'=>'=',
                'value'=>$professor
            ))

        ));
        
        
        if($existQuery->found_posts==0 && get_post_type($professor)=='professor') {

            return wp_insert_post(array(
                'post_type' => 'like',
                'post_status' => 'publish',
                'post_title' => 'Our PHP Create Post sec Test',
                'post_content' => 'Hello world 123',
                'meta_input' => array(
                    'liked_professor_id' => $professor
    
                )
            ));

        }else {

            die("Invalid professer_id");

        }

      
    }
    else {
        die("Only logged in users can create a like.");
    }
}
function deleteLike($data)
{

    $likeId=  $professor = sanitize_text_field($data['like']);
    if(get_current_user_id()==get_post_field('post_author',$likeId) AND get_post_type($likeId)=='like')
    {
        wp_delete_post($likeId,true);

        return 'Congrats,like deleted.';

    }else {
        die ("You do not have permession to delete that.");
    }




}
