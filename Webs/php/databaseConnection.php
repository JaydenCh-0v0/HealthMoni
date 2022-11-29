<?php

session_start();
include "connect.php";

    if(isset($_POST['uname']) && isset($_POST['upass'])){
        function validate($data){
            $data = trim($data);
            $data = stripcslashes($data);
            $data = htmlspecialchars($data);
            return $data;
        }
        
        $uname = validate($_POST['uname']);
        $pass = validate($_POST['upass']);
        if(empty($uname)){
            header("Location: ../html/index.html");
            exit();
        }else if(empty($pass)){
            header("Location: ../html/index.html");
            exit();
        }else{
            
            $sql = "SELECT * FROM pass WHERE user_id='$uname' AND pin='$pass'";
            $result = $conn->query($sql);


            if ($result->num_rows == 1){
                $row = $result->fetch_assoc();
                if($row['user_id'] == $uname && $row['pin'] == $pass){
                    $_SESSION['user_name'] = $row['user_id'];
                    $_SESSION['name'] = $row['user_id'];
                    $_SESSION['id'] = $row['user_id'];
                    header("Location: ../html/home.php");
                    exit();
                }else{
                    header("Location: ../html/index.html");
                    exit();
                }
            }else{
                header("Location: ../html/index.html");
                exit();
            }
        }
    }else{
        header("Location: ../html/index.html");
        exit();
    }











?>