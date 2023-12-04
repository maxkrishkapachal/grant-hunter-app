

const Listing = (info) => {
    // console.log('info: ');
    // console.log(info);
    // console.log('info.title: ');
    // console.log(info.title);
    // console.log(`info: ${info}`);
    // console.log(`info.title: ${info.title}`);
    // console.log(`info.info.title: ${info.info.title}`);

    var websiteColour = "grant-listing-element gl-website gl-website-" + info.info.page;

    return(
        <div class="grant-listings">
            <div class="grant-listing-title">
                
            </div>
            <div class="grant-listing-filter">

            </div>
            <div class="grant-listing">
                <div class={websiteColour}>
                    <label class="website">{info.info.page}</label>
                </div>
                <div class="grant-listing element gl-title">
                    <a href={info.info.link} target="_blank" rel="noopener noreferrer">{info.info.title}</a>
                </div> 
                <div class="grant-listing-element gl-amount">
                    <label class="amount">$30,000</label>
                </div>
                <div class="grant-listing-element gl-deadline">
                    <label class="deadline">December 21 2023</label>
                </div>
            </div>
        </div>
    )
};

export default Listing;