<template>
	<div>
		<div class="container-fluid header_app">
			<h1 align="center" class="text-white head_logo">Check markets</h1>
		</div>
		<div class="container">
			<div class="rows">
				<table class="table table-striped">
					<thead>
						<tr>
							<th scope="col">Market</th>
							<th scope="col">Price</th>
							<th scope="col">Volume</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="mark in markets">
							<td>{{mark.market}}</td>
							<td>{{mark.price}} $</td>
							<td>{{mark.volume}} $</td>
						</tr>	
					</tbody>
				</table>
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			valuta: '',
			crypto: '',
			markets: []
		}
	},
	created(){
		this.$http.get('https://api.cryptonator.com/api/full/btc-usd').then(function(response){
			console.log(response);
			this.markets = response.body.ticker.markets;
		}, function(error){
			console.log(error);
		})
	}

}
</script>

<style>
.header_app{
	height:265px;
	background: #3f51b5;
	font-family: 'Tahoma';
}
</style>