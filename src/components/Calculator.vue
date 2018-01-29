<template>
  <div>
    <div class="container-fluid head_app">
      <h1 align="center" class="text-white head_logo" v-if="!showRes">Currency Rate</h1>
      <h3 align="center" class="result" v-if="showRes">{{count}} x {{crypto}} = {{result}} {{valuta}}</h3>
      <div class="rows">

        <input type="text" v-model="count" class="count">
        <select v-model="crypto" class="">
          <option v-for="cryp in crypts">{{cryp}}</option>
        </select>
        <select v-model="valuta" class="">
          <option v-for="val in valuts">{{val}}</option>
        </select>
        <button @click="convert(count,crypto,valuta)" class="">Convert</button>

      </div>
    </div>
    <div class="container">
      <button @click="more(valuta)" class="other">Other crypto</button>
      <div class="row">
        <div v-for="dep in dependens" class="col-xl-4">
          <div class="card ">
            <div class="card-body">
              <span class="crypto_name rounded-circle">{{dep.name}}</span> - {{dep.cost}} {{valuta}}
            </div>
          </div>
        </div>
      </div>
    </div>
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
      cost: 0,
      showRes: false
    }
  },
  methods:{
   convert(count, crypto, valuta){
    this.showRes = true;
    this.str = this.crypto + '-' + this.valuta;
    this.$http.get(this.api + this.str).then(function(response){
      console.log(response);
      this.result = response.body.ticker.price;
      this.result = this.count * this.result;
    }, function(error){
      console.log(error);
    }),
    this.more();
    this.save();
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
  },
  save(){
    eventBus.$emit("userchange", this.crypto);
  }
}
}
</script>

<style>
.crypto_name{
  background: #ff4081;
  padding: 10px;
  color:white;
  font-size: 10px;
  cursor: pointer;
  /*border-radius: 50%;*/
}
.crypto_name:hover{
  background: #3f51b5;
}
.head_app{
  height:325px;
  background: #3f51b5;
  font-family: 'Tahoma';
}
.head_logo{
  padding-top: 80px;
}
.rows{
  padding-top: 50px;
  width:500px;
  margin: 0 auto;
}
input,select,button{
  height:44px;
  border-radius: 3px;
  color:#555555;
}
button{
  background: #ff4081;
  outline:none;
  color:white;
  border:1px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  width:98px;
}
button:hover{
  transition: 0.5s;
  background: #ea0e59;
}
.count{
  width:78px;
}
select{
  width:150px;
}
.other{
  width: 200px;
  margin:30px;
}
.result{
  padding-top:80px;
  color:white; 
  font-size: 40px;
}
.card{
  margin:10px;
}
</style>