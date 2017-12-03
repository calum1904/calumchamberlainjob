function getReq() {
	//GetJobs
	$.ajax({
		url: '/jobs',
		contentType: 'application/json',
		success: function(res){
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


function userJobs() {
	//GetJobs
	$.ajax({
		url: '/profile',
		contentType: 'application/json',
		success: function(res){
			console.log(res);

			//--------empty page----------//
			$('.deletejob').empty();
			$('#accordion').empty();
			$('#showedJobs').empty();
			$('#category').empty();
			$('#postajob').empty();
			$('#thanks').empty();


			$('#showedJobs').append('These are your Job Listings');
			$('#thanks').append('Thanks for posting your jobs with us');
			$.each(res, function(index, item){		

				var html = '';
				//add all the code to a html var to make the js look cleaner than one line
				html+='<div class = "card">';
				html+='<div class="card-header" role="tab" id="'+item._id+'job">';
				html+='<h5 class = "mb-0">';
				html+='<a data-toggle="collapse" href="#collapse'+item._id+'" aria-expanded="true" aria-controls="collapse'+item._id+'">';
				html+=item.title + ' in ' + item.location + '<span class ="float-right"> ad by <span class = "alert-link">'+ item.company +'  ' + ' </span> </span>';
				html+='</a> </h5> </div>';
				html+='<div id="collapse'+item._id+'" class="collapse" role="tabpanel" aria-labelledby="'+item._id+'job" data-parent="#accordion">';
				html+='<div class="card-body">';
				html+='<div class = "row"><div class = "col-sm-12" id = "description">';
				html+=item.description;
				html+='</div> </div> <div class="row"> <div class = "col-sm-6"><br>';
				html+='How to Apply: ' + item.apply + '</div>';
				html+='<div class = "col-sm-6"><br> Website: <a href="'+item.website+'">'+item.website+'</a> </div> ';
				html+='<div class = "col-sm-6"><br> <div id ="deleteJob"><button id="deletebutton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#'+item._id+'"> <i class="fa fa-trash" aria-hidden="true"></i> Delete Post </button></div> </div>';
				 html+='<div class = "col-sm-6"><br> <a href="#edit"> <i class="fa fa-pencil" aria-hidden="true"></i> Edit Post </a> </div> </div> </div> </div>';
				$('#accordion').append(html);

				//---------create delete job model---------//
				var model = '';
				//add all the code to a html var to make the js look cleaner than one line
				model+= '<div class="modal fade" id="'+item._id+'" tabindex="-1" role="dialog" aria-labelledby="deleteJob'+item._id+'lable" aria-hidden="true">'
				model+= '<div class="modal-dialog" role="document">'
				model+= '<div class="modal-content"><div class="modal-header">'
				model+= '<h5 class="modal-title" id="'+item.title+'">Delete Job</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">'
				model+= '<span aria-hidden="true">&times;</span> </button> </div>'
				model+= '<div class="modal-body" id = "delete-model"> Are you sure you want to delete '+ item.title +' ? </div><div class="modal-footer">'
				model+= '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
				model+= '<span onclick = deleteJob("'+item._id+'") type="button" class="btn btn-primary">Delete</span>'
				model+= '</div></div></div></div>'
				model+= ''
				$('#deletejob').append(model);

				var span = '<span onclick = deletejob("'+item._id+'") type="button" class="btn btn-primary">Delete</span>'

			});
		}
	});
};

function deleteJob(itemId) {
	//GetJobs	
	$.ajax({
    url: 'api/jobs/'+itemId+'',
    type: 'DELETE',
    success: function(result) {
        userJobs();
    	}
	});
};