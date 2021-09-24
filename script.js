let cities;
d3.csv('cities.csv', d3.autoType).then(data=>{
	cities = data;
	console.log(cities);


	let filtered = cities.filter(d =>{
		if (d.eu == true){
			return d;
		}
	})
	console.log(filtered)

	d3.select('.city-count').text("Number of Cities: " + filtered.length)

	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)

	svg.selectAll('circle')
	.data(filtered)
	.enter()
	.append("circle")
	.attr("cx", (d)=> d.x)
  	.attr("cy", (d)=>d.y)
  	.attr("r", function (d){
		  if (d.population < 1000000){
			  return 4;
		  }
		  else{
			  return 8;
		  }
	})
	.attr("fill", "lightBlue")

	svg.selectAll('text')
	.data(filtered)
	.enter()
	.append("text")
	.attr("x", (d)=> d.x)
	.attr("y", (d)=>d.y)
	.attr("dy", -13)
	.attr("font-size", 11)
	.attr("text-anchor", "middle")
	.text(function(d){
		if (d.population >= 1000000){
			return d.country;
		}
	});

})

let buildings;
d3.csv('buildings.csv', d3.autoType).then(data=>{
	buildings = data;
	
	let filteredBuildings = buildings.sort(function (a, b){
		return a.height_ft - b.height_ft
	});
	filteredBuildings.reverse()
	console.log(filteredBuildings);

	const width = 500;
	const height = 500;
	const svg = d3.select('.building-bar')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height)

	svg.selectAll('rect')
	.data(filteredBuildings)
	.enter()
	.append("rect")
	.attr("x", 200)
	.attr("y", (datum,index)=>70 + index*36)
	// .attr("dy", -100)
	.attr("width", (d)=>d.height_px)
	.attr("height", 30)
	.attr("fill", "#ccccff")
	.on("click", (event,d)=>{
		d3.select('.building-name').text(`${d.building}`)
		d3.select('.height').text(`${d.height_ft}`)
		d3.select('.city').text(`${d.city}`)
		d3.select('.country').text(`${d.country}`)
		d3.select('.floors').text(`${d.floors}`)
		d3.select('.completed').text(`${d.completed}`)
		// d3.select('.image').append("image").attr('src', `assets/img/${d.image}`)
		d3.select('.image').attr("src", `assets/img/${d.image}`)
	  });
	
	let texts = svg.selectAll('text')
		.data(filteredBuildings)
		.enter()
	
	texts.append("text")	
	.attr("x", 10)
	.attr("y", (datum,index)=>90 + index*36)
	.attr("font-size", 12)
	.attr("dy", 0)
	.text((d)=> d.building)

	texts.append("text")	
	// .attr("x", 260)
	.attr("y", (datum,index)=>90 + index*36)
	.attr("font-size", 12)
	.attr("x", (d)=>d.height_px + 185)
	.attr("text-anchor", "end")
	.text((d)=> d.height_ft)




})