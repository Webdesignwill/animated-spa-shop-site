{{#unless productsEmpty}}
<div class="row">
  <div class="col-sm-5">
    {{#if showProduct0}}
      <div class="col-sm-4">
        {{! @TODO: Write Handlebar image helper}}
        <img src="/assets/img/header/checkout/bmp_250x.jpg" alt="">
      </div>
      <div class="col-sm-8">

        <h3>{{products.[0].title}}</h3>
        <div class="header-checkout-sizes">
          {{#each productSizes.[0]}}
            <span>{{this.size}} {{this.qty}}</span>
          {{/each}}
        </div>
        <div class="header-checkout-qty">Qty {{productQtys.[0]}}</div>
      </div>
    {{/if}}
  </div>
  <div class="col-sm-5">
    {{#if showProduct1}}
      <div class="col-sm-4">
        <img src="/assets/img/header/checkout/cb_250x.jpg" alt="">
      </div>
      <div class="col-sm-8">

        <h3>{{products.[1].title}}</h3>
        <div class="header-checkout-sizes">
          {{#each productSizes.[1]}}
            <span>{{this.size}} {{this.qty}}</span>
          {{/each}}
        </div>
        <div class="header-checkout-qty">Qty {{productQtys.[1]}}</div>
      </div>
    {{/if}}
  </div>
</div>

<div class="row checkout-row-2">
  <div class="col-sm-5">
    {{#if showBuyButton}}
      {{#if shippingSlug}}
        <div class="col-sm-8 col-sm-offset-4">
          <p class="checkout-shipping">Shipping | {{shippingSlug}} {{shippingPrice}}</p>
        </div>
      {{/if}}
    {{/if}}
  </div>
  <div class="col-sm-5">
    {{#if showBuyButton}}
      <div class="col-xs-12">
        <p class="checkout-total">Total = {{subtotal}}</p>
      </div>
    {{/if}}
  </div>
  <div class="col-sm-2">
    {{#if showBuyButton}}
      <a href="/#!/shop/shipping" id="checkout-button-buy">Checkout</a>
    {{/if}}
  </div>
  <div class="col-sm-2 col-sm-offset-10">
    {{#if showBuyButton}}
      <button id="checkout-button-empty-cart">Empty cart</button>
    {{/if}}
  </div>
</div>
{{/unless}}
