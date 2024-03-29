import $ from 'jquery';

class Search {

    // 1. describe and create/initiate our object
    constructor() {
        this.addSearchHTML();
        this.resultsDiv = $("#search-overlay__results");
        this.openButton = $(".js-search-trigger");
        this.closeButton = $(".search-overlay__close");
        this.searchOverlay = $(".search-overlay");
        this.seachField = $("#search-term");
        this.events();
        this.isOverlayOpen = false;
        this.isSpinnerVisible = false;
        this.previousValue;
        this.typingTimer;
    }

    events() {
        this.openButton.on("click", this.openOverlay.bind(this));
        this.closeButton.on("click", this.closeOverlay.bind(this));
        $(document).on("keydown", this.keyPressDispatcher.bind(this));
        this.seachField.on("keyup", this.typingLogic.bind(this));
    }
    typingLogic() {

        if (this.seachField.val() != this.previousValue) {

            clearTimeout(this.typingTimer); //Clear timeout because typing doesnt finish, use bind(this ) in the event . other this refer to element search field
            if (this.seachField.val()) {

                if (!this.isSpinnerVisible) {

                    this.resultsDiv.html('<div class="spinner-loader"></div>');
                    this.isSpinnerVisible = true;

                }

                this.typingTimer = setTimeout(this.getResults.bind(this), 750);

            } else {
                this.resultsDiv.html('');
                this.isSpinnerVisible = false;
            }


        }



        this.previousValue = this.seachField.val();
    }
    getResults() {


        $.getJSON(universityData.root_url + '/wp-json/university/v1/search?term=' + this.seachField.val(), (results) => {
            this.resultsDiv.html(`

            <div class="row">
            <div class="one-third">
              <h2 class="search-overlay__section-title">General Information</h2>

              ${results.generalInfo.length ? '<ul class="link-list min-list">' : '<p>No result...</p>'}
 
              ${results.generalInfo.map(item => `<li><a href="${item.permalink}">${item.title}</a> ${item.postType == 'post' ? `by ${item.authorName}` : ''}</li>`).join('')}
      
                 ${results.generalInfo.length ? '</ul>' : ''} 
               

            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Programs</h2>
              ${results.programs.length ? '<ul class="link-list min-list">' : `<p>No programs match that search.<a href="${universityData.root_url}/programs">View all programs</a></p>`}
 
              ${results.programs.map(item => `<li><a href="${item.permalink}">${item.title}</a> </li>`).join('')}
      
                ${results.programs.length ? '</ul>' : ''} 


            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Professors</h2>
              ${results.professors.length ? '<ul class="professor-cards">' : '<p>No match that search.</p>'}
 
              ${results.professors.map(item => `

              <li class="professor-card__list-item">
              <a href="${item.permalink}" class="professor-card">
               <img src="${item.image}" alt="" class="professor-card__image">

                <span class="professor-card__name">${item.title}</span> </a></li>
                
                `).join('')}
      
                ${results.professors.length ? '</ul>' : ''} 

            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Campuses</h2>
              ${results.campuses.length ? '<ul class="link-list min-list">' : `<p>No campuses match that search.<a href="${universityData.root_url}/campuses">View all campuses</a></p>`}
 
              ${results.campuses.map(item => `<li><a href="${item.permalink}">${item.title}</a> </li>`).join('')}
      
                ${results.campuses.length ? '</ul>' : ''} 
            </div>
            <div class="one-third">
              <h2 class="search-overlay__section-title">Events</h2>
              ${results.events.length ? '' : `<p>No events match that search.<a href="${universityData.root_url}/events">View all events</a></p>`}
 
              ${results.events.map(item => `


              <div class="event-summary">
  <a class="event-summary__date t-center" href="${item.permalink}">
    <span class="event-summary__month">
      ${item.month}
    </span>
    <span class="event-summary__day">     ${item.day}</span>
  </a>
  <div class="event-summary__content">
    <h5 class="event-summary__title headline headline--tiny">
      <a href="${item.permalink}?>">${item.title}</a></h5>
    <p>"${item.description}
        <a href="${item.permalink}" class="nu gray"> Learn more</a></p>
  </div>
</div>


              `).join('')}
      
                ${results.events.length ? '</ul>' : ''} 

            </div>
          </div>
            
            
            
            `);
            this.isSpinnerVisible = false;
        })

        /*  posts=>{} == function(){}.bind()
         ES6 arrow method will not change value at its keyword. 

         using `` backticks for html template

         The example of the asyncroning 
        */


        /*   $.when(
              $.getJSON(universityData.root_url+'/wp-json/wp/v2/posts?search='+this.seachField.val()),
              $.getJSON(universityData.root_url+'/wp-json/wp/v2/pages?search='+this.seachField.val())
          ).then((posts,pages)=>{
  
              var combinedResults=posts[0].concat(pages[0]);
              this.resultsDiv.html(`
              <h2 class="search-overlay__section-title">General Information </h2>
              
              
           ${combinedResults.length ? '<ul class="link-list min-list">' : '<p>No result...</>'}
   
          ${combinedResults.map(item=>`<li><a href="${item.link}">${item.title.rendered}</a> ${ item.type=='post' ? `by ${item.authorName}`:''}</li>`).join('')}
  
             ${combinedResults.length ? '</ul>' : ''} 
              `);
              this.isSpinnerVisible=false;
  
          },() =>{ this.resultsDiv.html('<p>Unexcepted error!please try later...</p>')}); 
        
      
  
   */



    }
    keyPressDispatcher(event) {

        if (event.keyCode == 83 && !this.isOverlayOpen && !$("input,textarea").is(':focus')) {
            this.openOverlay();
        }
        if (event.keyCode == 27 && this.isOverlayOpen) {
            this.closeOverlay();
        }
    }
    openOverlay() {

        this.searchOverlay.addClass("search-overlay--active");
        $('body').addClass("body-no-scroll");
        this.seachField.val('');
        setTimeout(() => this.seachField.focus(), 301);
        console.log("our open method just ran!");

        this.isOverlayOpen = true;

        return false; // prevent a and lin element

    }
    closeOverlay() {
        this.searchOverlay.removeClass("search-overlay--active");
        $('body').removeClass("body-no-scroll");
        console.log("our open method just close!");

        this.isOverlayOpen = false;
    }

    addSearchHTML() {
        $("body").append(`
        
        <div class="search-overlay">
        <div class="search-overlay__top">
          <div class="container">
            <i class="fa fa-search search-overlay__icon" aria-hidden="true"></i>
            <input type="text" class="search-term" placeholder="What are you looking for?" id="search-term">
            <i class="fa fa-window-close search-overlay__close" aria-hidden="true"></i>
       
          </div>
        </div>
        <div class="container">
          <div id="search-overlay__results"></div>
        </div>
      </div>        `);
    }
}

export default Search;