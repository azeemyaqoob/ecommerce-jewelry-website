<!DOCTYPE html>
<html>
<head>
    <title>Contact Form Submission</title>
</head>
<body>
    <h1>New Contact Form Submission</h1>
    <p><strong>Name:</strong> {{ $contact['name'] }}</p>
    <p><strong>Email:</strong> {{ $contact['email'] }}</p>
    <p><strong>Phone:</strong> {{ $contact['phone'] }}</p>
    <p><strong>Comment:</strong> {{ $contact['comment'] }}</p>
</body>
</html>
