$(document).ready( function() { 
 });


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
				html+=item.title + ' in ' + item.location + '<span class ="float-right"> ad by <span class = "alert-link">'+ item.company + '</span> <span class="badge badge-info">'+item.createdOn+'</span> </span>';
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

	getUser();
	//GetJobs
	$.ajax({
		url: '/profile',
		contentType: 'application/json',
		success: function(res){
			console.log(res);

			//--------empty page----------//
			$('#partials').empty();
			$('#editdelete').empty();
			$('#accordion').empty();
			$('#showedJobs').empty();
			$('#category').empty();
			$('#postajob').empty();
			$('#thanks').empty();
			$('.modal-backdrop').remove();
			$('#postajobdiv').remove();


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
				html+='<div class = "col-sm-6"><br> <button id="deletebutton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#'+item._id+'delete"> <i class="fa fa-trash" aria-hidden="true"></i> Delete Post </button></div>';
				 html+='<div class = "col-sm-6"><br> <button id="editbutton" type="button" class="btn btn-primary" data-toggle="modal" data-target="#'+item._id+'edit"> <i class="fa fa-pencil" aria-hidden="true"></i> Edit Post </button> </div> </div> </div> </div>';
				 html+='<div id = "editdelete'+item._id+'"></div>';
				$('#accordion').append(html);

				//---------create delete job model------------//
				var model = '';
				//add all the code to a html var to make the js look cleaner than one line
				model+= '<div class="modal fade" id="'+item._id+'delete" tabindex="-1" role="dialog" aria-labelledby="deleteJob'+item._id+'lable" aria-hidden="true">';
				model+= '<div class="modal-dialog" role="document">';
				model+= '<div class="modal-content"><div class="modal-header">';
				model+= '<h5 class="modal-title" id="'+item.title+'delete">Delete Job</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				model+= '<span aria-hidden="true">&times;</span> </button> </div>';
				model+= '<div class="modal-body" id = "delete-model"> Are you sure you want to delete '+ item.title +' ? </div><div class="modal-footer">';
				model+= '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
				model+= '<span onclick = deleteJob("'+item._id+'") type="button" class="btn btn-primary">Delete</span>';
				model+= '</div></div></div></div>';
				$('#editdelete'+item._id+'').append(model);
				
				//----------create edit job model------------//

        		var editModel = '';
        		editModel+= '<div class="modal fade" id="'+item._id+'edit" tabindex="-1" role="dialog" aria-labelledby="editJob'+item._id+'lable" aria-hidden="true">';
				editModel+= '<div class="modal-dialog" role="document">';
				editModel+= '<div class="modal-content"><div class="modal-header">';
				editModel+= '<h5 class="modal-title" id="'+item._id+'edit">Edit Job</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				editModel+= '<span aria-hidden="true">&times;</span> </button> </div>';
				editModel+= '<div class="modal-body" id = "delete-model">';
				editModel+= '<form id = "editForm"><div class = "form-row"><div class = "form-group col-sm-6"><label for = "title">Job Title</label>';
                editModel+= '<input class="form-control" type="text" id = "title'+item._id+'"  name="title" /></div><div class = "form-group col-sm-6">';
  				editModel+='<label for = "category">Category</label><select id = "category'+item._id+'" class="form-control" type="text" name="category"><option> Arts & Entertainment </option>';
                editModel+='<option> Accouting </option><option> Beauty & Wellness </option><option> Engineering </option><option> Education </option><option> Health </option>';
                editModel+='<option> Retail </option><option> Sports </option><option> Technology </option><option> Veterinary </option></select></div></div>';
                editModel+='<div class = "form-row"><div class = "form-group col-sm-6"><label for = "location">Location</label><input class="form-control" type="text" id = "location'+item._id+'" name="location"/></div>';
                editModel+='<div class = "form-group col-sm-6"><label for = "company">Company Name</label><input class="form-control" type="text" id="company'+item._id+'" name="company"/></div></div>';
                editModel+='<div class = "form-row"><div class = "form-group col-sm-12"><label for = "description">Job Description</label><textarea rows = "6" class="form-control" type="text" id="description'+item._id+'" name="description"></textarea></div>';
                editModel+='</div><div class = "form-row"><div class = "form-group col-sm-6"><label for = "apply">How to apply</label><input class="form-control" class="form-control" type="text" id="apply'+item._id+'" name="apply"/></div>';
                editModel+='<div class = "form-group col-sm-6"><label for = "website">Website</label><input class="form-control" type="url" id="website'+item._id+'" name="website" placeholder="http://..." />'; 
				editModel+='<span onclick = editJob("'+item._id+'") type="button" class="btn btn-primary">Delete</span></form></div></div>';
				editModel+= '</div><div class="modal-footer">';
				editModel+= '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
				editModel+= '';
				editModel+= '</div></div></div></div>';
				$('#editdelete'+item._id+'').append(editModel);

				$('input[id="title'+item._id+'"]').val(item.title);
				$('select[id = "category'+item._id+'"]').val(item.category);
				$('input[id = "location'+item._id+'"]').val(item.location);
				$('input[id="company'+item._id+'"]').val(item.company);
				$('textarea[id="description'+item._id+'"]').val(item.description);
				$('input[id="apply'+item._id+'"]').val(item.apply);
				$('input[id="website'+item._id+'"]').val(item.website);
			})
		}
	});

};


function getUser(){
	$.ajax({
		url: '/user',
		type: 'GET',
		contentType: 'application/json',
		success: function(user){

			console.log(user);
			$.each(user, function(index, user){

				$('#profile').empty();

				var profile = '';

				profile+= '<h1> Your Profile</h1></div><div class = "row"><div class = "col-md-6"><p class = "lead">First Name: '+user.firstName+'</p></div><div class = "col-md-6">';
				profile+= '<button type="button" class="btn btn-success" data-toggle="modal" data-target="#editUser">Change Email</button></div></div><div class = "row"><div class = "col-md-6"><p class = "lead">Last Name: '+user.lastName+'</p></div><div class = "col-md-6"><button type="button" class="btn btn-danger"data-toggle="modal" data-target="#deleteUser">Delete Account</button></div></div>';
				profile+= '<div class = "row"><div class = "col-md-6"><p class = "lead">Email: '+user.email+'</p></div>';

				//--------------------Delete User Model---------------------//

				var model = '';
				//add all the code to a html var to make the js look cleaner than one line
				model+= '<div class="modal fade" id="deleteUser" tabindex="-1" role="dialog" aria-labelledby="deleteUserlable" aria-hidden="true">';
				model+= '<div class="modal-dialog" role="document">';
				model+= '<div class="modal-content"><div class="modal-header">';
				model+= '<h5 class="modal-title" id="deleteUser">Delete Profile</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				model+= '<span aria-hidden="true">&times;</span> </button> </div>';
				model+= '<div class="modal-body" id = "delete-model"> Are you sure you want to delete your account? <br> All jobs assosiated with this accountt will also be deleted </div><div class="modal-footer">';
				model+= '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
				model+= '<span onclick = deleteUser("'+user._id+'") type="button" class="btn btn-primary">Delete</span>';
				model+= '</div></div></div></div>';

				var editModel = '';
				//add all the code to a html var to make the js look cleaner than one line
				editModel+= '<div class="modal fade" id="editUser" tabindex="-1" role="dialog" aria-labelledby="editUserlable" aria-hidden="true">';
				editModel+= '<div class="modal-dialog" role="document">';
				editModel+= '<div class="modal-content"><div class="modal-header">';
				editModel+= '<h5 class="modal-title" id="editUser">Edit Email</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close">';
				editModel+= '<span aria-hidden="true">&times;</span> </button> </div>';
				editModel+= '<div class="modal-body" id = "edit-model"> <form id = "editForm"><div class = "form-row"><div class = "form-group col-sm-6"><label for = "email">New Email</label>';
                editModel+= '<input class="form-control" type="email" id = "email'+user._id+'"  name="email" /></div> </div><div class="modal-footer">';
				editModel+= '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>';
				editModel+= '<span onclick = editUser("'+user._id+'") type="button" class="btn btn-primary">Edit</span>';
				editModel+= '</div></div></div></div>';

				$('#usermodels').append(model);
				$('#usermodels').append(editModel);

				$('#profile').append(profile);
			})

		}
	});
}

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

function editJob(itemId){

	var formData = {
		'title': $('input[id="title'+itemId+'"]').val(),
		'category': $('select[id="category'+itemId+'"]').val(),
		'location': $('input[id="location'+itemId+'"]').val(),
		'company': $('input[id="company'+itemId+'"]').val(),
		'description': $('textarea[id="description'+itemId+'"]').val(),
		'apply': $('input[id="apply'+itemId+'"]').val(),
		'website': $('input[id="website'+itemId+'"]').val(),
    };
    console.log(formData);

  $.ajax({
    url: 'api/jobs/'+itemId+'',
    type: 'PUT',
    data: formData,
    dataType: 'json',
    success: function(res) {
    	console.log(res);
        userJobs();
    	}
	});
};

function deleteUser(UserId) {
	//GetJobs
	$.ajax({
    url: 'api/user/'+UserId+'',
    type: 'DELETE',
    success: function(result) {
        window.location = '/';
    	}
	});
};

function editUser(userId){

	var formData = {
		'email': $('input[id="email'+userId+'"]').val(),
    };

  $.ajax({
    url: 'api/user/'+userId+'',
    type: 'PUT',
    data: formData,
    dataType: 'json',
    success: function(res) {
    	console.log(res);
        userJobs();
    	}
	});
};