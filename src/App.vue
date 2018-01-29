<template>
  <div id="app">

    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/"><a class="navbar-brand text-white" href="#">Currency</a></router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/"><a class="nav-item nav-link active text-white" href="#">Home <span class="sr-only">(current)</span></a></router-link>
          <router-link to="/markets"><a class="nav-item nav-link text-white" href="#">Markets</a></router-link>
        </div>
      </div>
    </nav>
    
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      api: 'https://api.cryptonator.com/api/ticker/',
      valuta: 'USD',
      crypto: 'BTC',
      count: 1,
      str:'',
      result:'',
      crypts: ['BTC','ETH','XRP','BCH','ADA','LTC','XLM','XEM','EOS','NEO','DASH','XMR','TRX','BTG','ETC','LSK','VEN'],
      valuts: ['USD','AUD','EUR','CAD','BRL','JPY','RUB','PLN','IDR'],
      dependens: [],
      name: '',
      cost: 0
    }
  },
  methods:{
   convert(count, crypto, valuta){
    this.str = this.crypto + '-' + this.valuta;
    this.$http.get(this.api + this.str).then(function(response){
      console.log(response);
      this.result = response.body.ticker.price;
      this.result = this.count * this.result;
    }, function(error){
      console.log(error);
    })
  },
  more(valuta){
    this.dependens = [];
    console.log(this.crypts);
    for(var i = 0; i < this.crypts.length; i++){
      this.str = this.crypts[i] + '-' + this.valuta;
      this.$http.get(this.api + this.str).then(function(response){
        console.log(response);
        this.cost = response.body.ticker.price;
        this.name = response.body.ticker.base;
        this.dependens.push({cost: this.cost, name: this.name});
        console.log(this.dependens);
      }, function(error){
        console.log(error);
      })
    } 
  }
}
}
</script>

<style>
.navbar{
  height:82px;
  background: #3445a2;
  font-family: 'Tahoma';
  font-size: 14px;
  padding-left: 100px;
}
a:hover{
  text-decoration:none;
}


</style>
