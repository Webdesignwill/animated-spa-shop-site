<div class="container-fluid">
  <div class="row">
    <div class="col-sm-6 shop-shipping-image hidden-mobile"></div>
    <div class="col-sm-6 text-center shop-shipping-text">
      <div class="row">
        <div class="col-sm-offset-2 col-sm-8">
          <h3>Choose your destination</h3>
          <p>If you place your order before 1pm UK time, we aim for your delivery to be with you on the next business day in the UK, within 3 business days across Europe and the US, and within 5 business days for the rest of the world.<br><br>
      Please note that at launch it might take slightly longer as we process a high volume of orders. As soon as your shipment is processed you’ll get an email confirmation and a tracking number.<br><br>
      The shipping costs below do not include any local taxes, customs, or import duties that you may have to pay.
          </p>
          <div class="shop-button-wrapper">
            <button id="shop-shipping-button-continue" class="hidden text-button" href="/#!/shop/details">Continue</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-offset-1 col-sm-10">
          <ul class="no-margin">
            {{#each shipping}}
              <li><a href="#" data-shipping-slug="{{this.slug}}">{{this.title}}<br>{{this.price.value}}</a></li>
            {{/each}}
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
