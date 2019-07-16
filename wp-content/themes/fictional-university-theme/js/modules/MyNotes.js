import $ from 'jquery';

class MyNotes{
    constructor(){


        this.events();
 
       

    }

    events() {

        $("#my-notes").on("click",'.delete-note',this.deleteNote);
        $("#my-notes").on("click",'.edit-note',this.editNote.bind(this));  //other js set what ever is clicked on 
        $("#my-notes").on("click",'.update-note',this.updateNote.bind(this)); 
        $(".submit-note").on("click",this.createNote.bind(this)); 
        
        

    }
    editNote(e) {
        var thisNote =$(e.target).parents("li");
        if(thisNote.data("state")=="editable"){
               //make read only
            this.makeNoteReadOnly(thisNote);
        } else {
            //make editable
            this.makeNoteEditable(thisNote);
        }
       
    }
    makeNoteEditable(thisNote){

        thisNote.find(".edit-note").html('<i class="fa fa-times" aria-hidden="true"></i>Cancel');
        thisNote.find(".note-title-field,.note-body-field").removeAttr("readonly").addClass("note-active-field");
        thisNote.find(".update-note").addClass("update-note--visible");
        thisNote.data("state","editable");

    }

    makeNoteReadOnly(thisNote){
        thisNote.find(".edit-note").html(` <i class="fa fa-pensil" aria-hidden="true"></i>Edit `);
        thisNote.find(".note-title-field,.note-body-field").attr("readonly","readonly").removeClass("note-active-field");
        thisNote.find(".update-note").removeClass("update-note--visible");
        thisNote.data("state","cancel");

    }

    deleteNote(event){
      var thisNote= $(event.target).parents("li");
      $.ajax({
          beforeSend:(xhr)=> {
              xhr.setRequestHeader('X-WP-Nonce',universityData.nonce);
          },
          url:universityData.root_url+'/wp-json/wp/v2/note/'+thisNote.data('id'),//we named data-id but you dont need to add data
          type:'DELETE',
          success:(response)=> {

            thisNote.slideUp();
            console.log("Congrats");
            console.log(response);
            if(response.userNoteCount<5) {//make 5 global 
                $(".note-limit-message").removeClass("active");
            }


          },
          error:(response)=> {
              console.log("Sorry");
          }
      });
    }
    updateNote(event){
      var thisNote= $(event.target).parents("li");
      var ourUpdatedPost = {
          'title':thisNote.find(".note-title-field").val(),
          'content':thisNote.find(".note-body-field").val()

      }   //set it to object
      $.ajax({
          beforeSend:(xhr)=> {
              xhr.setRequestHeader('X-WP-Nonce',universityData.nonce);
          },
          url:universityData.root_url+'/wp-json/wp/v2/note/'+thisNote.data('id'),//we named data-id but you dont need to add data
          type:'POST',
          data:ourUpdatedPost,
          success:(response)=> {

           this.makeNoteReadOnly(thisNote);
            console.log("Congrats");
            console.log(response);

          },
          error:(response)=> {
              console.log("Sorry");
          }
      });
    }
    createNote(event){
      
      var ourNewNote = {
          'title':$(".new-note-title").val(),
          'content':$(".new-note-body").val(),
          'status':'publish'

      }   //set it to object
      $.ajax({
          beforeSend:(xhr)=> {
              xhr.setRequestHeader('X-WP-Nonce',universityData.nonce);
          },
          url:universityData.root_url+'/wp-json/wp/v2/note/',
          type:'POST',
          data:ourNewNote,
          success:(response)=> {

            $(".new-note-title,.new-note-body").val('');
            $(`

            <li data-id="${response.id}">
            <input readonly type="text" class="note-title-field" value="${response.title.raw}">
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
            <textarea  readonly class="note-body-field"> ${response.content.raw}

           </textarea>

           <span class="update-note btn btn--blue btn--small">
                <i class="fa fa-arrow-right" aria-hidden="true">
                   Save
                </i>
            </span>


        </li>
            
            
            
            `).prependTo("#my-notes").hide().slideDown();

            console.log("Congrats");
            console.log(response);
         
          },
          error:(response)=> {
            
              if(response.status==200){

                $(".note-limit-message").addClass("active");


              }
              console.log("Sorry");
              console.log(response);
          }
      });
    }
}

export default MyNotes;