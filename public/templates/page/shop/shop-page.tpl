<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6" id="shop-gallery">
      <button class="gallery-button-prev text-button">&lt;</button>
      <button class="gallery-button-next text-button">&gt;</button>
    </div>
    <div class="col-sm-4 col-sm-offset-1 text-center shop-page-text clearfix">
      <div class="row">
        <div class="col-xs-12">
          <h3 class="shop-price">{{price}}</h3>
          <h3>{{title}}</h3>
          <p class="shop-description-text">{{description}}</p>
          <ul class="list-inline ul-selectable">
            {{#each sizes}}
              <li><a href="#" data-shop-size="{{this.slug}}">{{this.title}}</a></li>
            {{/each}}
          </ul>
          <div>
            {{> counter}}
          </div>
          <div class="shop-button-wrapper">
            <button class="shop-button-buy disabled text-light" disabled data-out-of-stock-text="Out of stock">{{buttonText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{{#if isWaitingListPhase}}
<div id="shop-page-preorder">
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3 text-center">
        <h3>Join the waiting list</h3>
        <p>The Baker Miller Pink Hoodie and Condition Black Jacket will go on sale for the first time in October 2015. We have limited stock and high demand. To join the waiting list, and get exclusive early access to buy, click on the ‘join the waiting list’ button above and fill in your details.</p>
    </div>
  </div>
</div>
{{/if}}
{{#if isPreorderPhase}}
<div id="shop-page-preorder">
  <div class="container">
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3 text-center">
        <h3>Pre-order &amp; Delivery</h3>
        <p>The Baker Miller Pink Hoodie and Condition Black Jacket have now sold out. Due to our high manufacturing standards and limited production runs, these products won’t be available again until March 2016. To guarantee you get the product and size you want, pre-order now.</p>
      </div>
    </div>
  </div>
</div>
{{/if}}
