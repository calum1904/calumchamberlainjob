function getReq() {
	//GetJobs
	$.ajax({
		url: '/jobs',
		contentType: 'application/json',
		success: function(res){
			console.log(res);
			$.each(res, function(index, item){
				var html = '';
				//add all the code to a html var to make the js look cleaner than one line
				html+='<div class = "card">';
				html+='<div class="card-header" role="tab" id="'+item._id+'job">';
				html+='<h5 class = "mb-0">';
				html+='<a data-toggle="collapse" href="#collapse'+item._id+'" aria-expanded="true" aria-controls="collapse'+item._id+'">';
				html+=item.title + ' in ' + item.location + '<span class ="float-right"> ad by <span class = "alert-link">'+ item.company + '</span> </span>';
				html+='</a> </h5> </div>';
				html+='<div id="collapse'+item._id+'" class="collapse" role="tabpanel" aria-labelledby="'+item._id+'job" data-parent="#accordion">';
				html+='<div class="card-body">';
				html+='<div class = "row"><div class = "col-sm-12" id = "description">';
				html+=item.description;
				html+='</div> </div> <div class="row"> <div class = "col-sm-6"><br>';
				html+='How to Apply: ' + item.apply + '</div>';
				html+='<div class = "col-sm-6"><br> Website: <a href="'+item.website+'">'+item.website+'</a> </div> </div> </div> </div> </div>';

				$('#accordion').append(html);
				//$('#accordion').append('<h3 id='+item.title +'><a href="#">' + item._id + ' </a></h3>');
			});
		}
	});
};

function getCat(category) {
	//GetJobs
	$.ajax({
		url: '/jobs'+category,
		contentType: 'application/json',
		success: function(res){
			console.log(res);
			$('#accordion').empty();
			$('#showedJobs').empty();
			$('#showedJobs').append(category+" Job Listings");
			$.each(res, function(index, item){

				var html = '';
				//add all the code to a html var to make the js look cleaner than one line
				html+='<div class = "card">';
				html+='<div class="card-header" role="tab" id="'+item._id+'job">';
				html+='<h5 class = "mb-0">';
				html+='<a data-toggle="collapse" href="#collapse'+item._id+'" aria-expanded="true" aria-controls="collapse'+item._id+'">';
				html+=item.title + ' in ' + item.location + '<span class ="float-right"> ad by <span class = "alert-link">'+ item.company + '</span> </span>';
				html+='</a> </h5> </div>';
				html+='<div id="collapse'+item._id+'" class="collapse" role="tabpanel" aria-labelledby="'+item._id+'job" data-parent="#accordion">';
				html+='<div class="card-body">';
				html+='<div class = "row"><div class = "col-sm-12" id = "description">';
				html+=item.description;
				html+='</div> </div> <div class="row"> <div class = "col-sm-6"><br>';
				html+='How to Apply: ' + item.apply + '</div>';
				html+='<div class = "col-sm-6"><br> Website: <a href="'+item.website+'">'+item.website+'</a> </div> </div> </div> </div> </div>';

				$('#accordion').append(html);

				});
			$("html, body").animate({ scrollTop: 0 }, "slow");
		}
	});
};