<div class="container">
  <div class="row">
    <div class="col-sm-offset-6 col-sm-6 col-md-offset-7 col-md-5 shop-e-receipt-text">

      <p>Thank you for your order. This is your order confirmation. Please make a note of your order number in case you need to contact us with any questions. We will email you a receipt within the next three working days.</p>

      <div>Order No: {{order.id}}</div>

      {{#each items}}
        <div>
          <p>{{this.title}}</p>
          <p class="pull-right shop-e-reciept-price">{{this.price}}</p>
          <p>Qty {{this.quantity}}</p>
        </div>
      {{/each}}

      <div>Subtotal<span class="pull-right shop-e-reciept-price">{{order.totals.subtotal.formatted}}</span></div>
      <!-- <div>VAT<span class="pull-right shop-e-reciept-price">{{order.totals.tax.formatted}}</span></div> -->
      <div>Shipping {{order.shipping.title}} <span class="pull-right shop-e-reciept-price">{{order.correct_shipping_price}}</span></div>
      <div>Total<span class="pull-right shop-e-reciept-price">{{order.total_withouttaxonproducts_buttaxonshipping_formatted}}</span></div>

      <div>
        <p>Shipping Address &gt;</p>
        <p>{{order.ship_to.data.first_name}} {{order.ship_to.data.last_name}}</p>
        <p>{{order.ship_to.data.address_1}} {{order.ship_to.data.address_2}}</p>
        <p>{{order.ship_to.data.city}}</p>
        <p>{{order.ship_to.data.postcode}}</p>
        <p>{{order.ship_to.data.country.value}}</p>
      </div>
    </div>
  </div>
</div>
