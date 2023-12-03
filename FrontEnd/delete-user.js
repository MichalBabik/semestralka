$(document).ready(function () {
    // Handle form submission
    $("#delete").submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get values from form inputs
        const email = $("#email-delete").val();
        const password = $("#password-delete").val();

        // Create an object with the data to be sent
        const data = {
            email: email,
            password: password
        };

        // Make an AJAX request to delete the user
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/api/user/deleteAccount/" + email,
            contentType: "application/json",
            data: JSON.stringify(data),
            error: function (error) {
                // Handle error response
                if (error.status === 404) {
                    alert("User not found");
                } else {
                    alert("An error occurred");
                }
            }
        });
    });
});