$(document).ready(function() {
    $('form').on('submit', function(e) {

        e.preventDefault();

        var proceed = true;

        $("#mailForm input[required], #mailForm textarea[required]").each(function() {
            $(this).css('border-color', '');

            if (!$.trim($(this).val())) { //if this field is empty
                $(this).css('border-color', 'red'); //change border color to red

                proceed = false; //set do not proceed flag
            }
            //check invalid email
            var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;

            if ($(this).attr("type") == "email" && !email_reg.test($.trim($(this).val()))) {
                $(this).css('border-color', 'red'); //change border color to red
                proceed = false; //set do not proceed flag

            }
        });

        if (proceed) //everything looks good! proceed...
        {

            //get input field values data to be sent to server
         var   post_data = {
                'name': $('input[name=name]').val(),
                'email': $('input[name=email]').val(),
                'message': $('textarea[name=message]').val()
            };
            $.ajax({
                type: "POST",
                url: "form-submit.php",
                data: post_data,
                success: function(data) {
                    $('.success').fadeIn(1000);
                    console.log(data);
                }
            });
            //Ajax post data to server
            // $.post('form-submit.php', post_data, function(response){
            // 	          	        	console.log(response);
            //     if(response.type == 'error'){ //load json data from server and output message
            //         output = '<div class="error">'+response.text+'</div>';
            //         console.log("fail");
            //     }else{
            //     	  console.log("success");
            //         output = '<div class="success">'+response.text+'</div>';
            //         //reset values in all input fields
            //         $("#mailForm  input[required], #mailForm textarea[required]").val('');
            //         /*$("#mailForm #contact_body").slideUp();*/ //hide form after success
            //     	$('input[type="submit"], button').attr('disabled','disabled').attr('value','Sent');
            //     }
            //     $("#mailForm #results").hide().html(output).slideDown();

            // }, 'json');
        }
    });
});
