$(document).ready(function () {
    // Handle form submission
    $("#update").submit(function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Get form values
        const email = $("#email-update").val();
        const password = $("#password-update").val();
        const username = $("#username-update").val();

        // Perform AJAX request to update username
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/api/user/updateUsername/" + email,
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                password: password
            }),
            error: function (xhr, status, error) {
                // Handle error
                console.error("Error updating username:", xhr.responseText);
            }
        });
    });
});

