<?php 
session_start();

include("connection.php");
include("functions.php");

$error = ""; // Variable to store error message

if($_SERVER['REQUEST_METHOD'] == "POST")
{
    //something was posted
    $user_name = $_POST['user_name'];
    $password = $_POST['password'];

    if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
    {
        //read from database
        $query = "select * from users where user_name = '$user_name' limit 1";
        $result = mysqli_query($con, $query);

        if($result)
        {
            if($result && mysqli_num_rows($result) > 0)
            {
                $user_data = mysqli_fetch_assoc($result);
                
                if($user_data['password'] === $password)
                {
                    // Correct login, redirect to homepage
                    $_SESSION['user_id'] = $user_data['user_id'];
                    header("Location: index1.html");
                    die;
                }
                else
                {
                    // Incorrect password
                    $error = "Wrong username or password!";
                }
            }
            else
            {
                // No such username
                $error = "Wrong username or password!";
            }
        }
        else
        {
            $error = "Something went wrong. Please try again later.";
        }
    }
    else
    {
        $error = "Please enter valid credentials!";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
</head>
<body>

    <style type="text/css">
    
    /* CSS styles updated here */

    body {
        margin: 0;
        padding: 0;
        font-family: 'Arial', sans-serif;
        background-color: #141414; /* Dark background */
        color: #ffffff; /* White text for readability */
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Full height for vertical centering */
    }

    #box {
        background-color: #1e1e1e; /* Darker grey for box */
        width: 350px;
        padding: 40px;
        border-radius: 10px;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.5); /* Soft shadow for depth */
        text-align: center; /* Center align the form content */
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

    .error-message {
        color: red; /* Red text for error */
        font-size: 14px;
        margin-top: 10px;
    }

    </style>

    <div id="box">
        
        <form method="post">
            <div style="font-size: 24px;margin: 10px;color: white;">Login</div>

            <input id="text" type="text" name="user_name" placeholder="Username"><br><br>
            <input id="text" type="password" name="password" placeholder="Password"><br><br>

            <!-- Error message displayed below inputs -->
            <?php if (!empty($error)): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>

            <input id="button" type="submit" value="Login"><br><br>

            <a href="signup.php">Click to Signup</a><br><br>
        </form>
    </div>
</body>
</html>
