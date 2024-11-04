<?php 
session_start();

include("connection.php");
include("functions.php");

if($_SERVER['REQUEST_METHOD'] == "POST")
{
    //something was posted
    $user_name = $_POST['user_name'];
    $password = $_POST['password'];

    if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
    {
        //save to database
        $user_id = random_num(20);
        $query = "insert into users (user_id,user_name,password) values ('$user_id','$user_name','$password')";

        mysqli_query($con, $query);

        header("Location: login.php");
        die;
    }
    else
    {
        echo "Please enter some valid information!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Signup</title>
</head>
<body>

    <style type="text/css">
    
    /* Updated CSS for centering and styling */
    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #141414; /* Dark background */
        color: #ffffff; /* White text for readability */

        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Full viewport height to center vertically */
    }

    #box {
        background-color: #1e1e1e; /* Darker grey for box */
        width: 350px;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5); /* Soft shadow for depth */
        text-align: center;
    }

    #text {
        height: 35px;
        border-radius: 8px;
        padding: 10px;
        border: solid thin #444; /* Dark grey border */
        background-color: #2c2c2c; /* Dark input background */
        color: #ddd; /* Lighter text inside inputs */
        width: 100%;
        margin-bottom: 20px;
        box-sizing: border-box;
    }

    #button {
        padding: 15px;
        width: 100%;
        color: white;
        background-color: #0066ff; /* Blue button to match the theme */
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        font-size: 16px;
    }

    #button:hover {
        background-color: #0052cc; /* Darker blue on hover */
    }

    a {
        color: #0066ff; /* Matching blue for links */
        text-decoration: none;
        font-size: 14px;
    }

    a:hover {
        text-decoration: underline;
    }

    </style>

    <div id="box">
        
        <form method="post">
            <div style="font-size: 24px;margin: 10px;color: white;">Signup</div>

            <input id="text" type="text" name="user_name" placeholder="Username"><br><br>
            <input id="text" type="password" name="password" placeholder="Password"><br><br>

            <input id="button" type="submit" value="Signup"><br><br>

            <a href="login.php">Click to Login</a><br><br>
        </form>
    </div>
</body>
</html>

