<?php
class GoogleOut{
    static function request()
    {
        $params = array(
            'client_id'     => '946086932816-bi3mmn67dc61nk926v77lgfoaehokaf3.apps.googleusercontent.com',
            'redirect_uri'  => 'https://studycard.ru/index.php?action=google',
            'response_type' => 'code',
            'scope'         => 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
            'state'         => '123'
        );

        $url = 'https://accounts.google.com/o/oauth2/auth?' . urldecode(http_build_query($params));
        header('Location: '.$url);
    }
    static function answer()
    {
        if (!empty($_GET['code'])) {

            // Отправляем код для получения токена (POST-запрос).
            $params = array(
                'client_id'     => '946086932816-bi3mmn67dc61nk926v77lgfoaehokaf3.apps.googleusercontent.com',
                'client_secret' => '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',
                'redirect_uri'  => 'https://studycard.ru/index.php?action=google',
                'grant_type'    => 'authorization_code',
                'code'          => $_GET['code']
            );

            $ch = curl_init('https://accounts.google.com/o/oauth2/token');
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_HEADER, false);
            $data = curl_exec($ch);
            curl_close($ch);

            $data = json_decode($data, true);
            if (!empty($data['access_token'])) {
                // Токен получили, получаем данные пользователя.
                $params = array(
                    'access_token' => $data['access_token'],
                    'id_token'     => $data['id_token'],
                    'token_type'   => 'Bearer',
                    'expires_in'   => 400000
                );

                $info = file_get_contents('https://www.googleapis.com/oauth2/v1/userinfo?' . urldecode(http_build_query($params)));
                $info = json_decode($info, true);
                return $info;

            }

        }
    }
    static function add($data)
    {
        /*echo '
                  <script>
                    alert("'.$data["email"].'");                            
                </script>';*/
        if (database::select_one_stat("id","user","WHERE email ='".$data["email"]."'")!=null)
        {
            $id = database::select_one_stat("id","user","WHERE email ='".$data["email"]."'");
            $admin = database::select_one_stat("admin","user","WHERE email ='".$data["email"]."'");
            $rewiev = User::iSrewiev($id);

            $result = "Добро пожаловать";

            echo '
                  <script>
                    localStorage.setItem("id",'.$id.');
                    localStorage.setItem("admin",'.$admin.');
                    localStorage.setItem("rewiev",'.$rewiev.');                             
                </script>';
            $_SESSION["id"]=$id;

            if(isset($_SESSION["back"]))
            {
                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../";</script>';
        }
        else
        {
            $database = new Database();

            $database->connect();

            $name = explode("@", $data["email"]);
            $sql = "INSERT INTO user (name, email) VALUES ('".$name[0]."','".$data["email"]."')";

            $result = $database->conn->query($sql);
            // Check
            if ($database->conn->error)
            {
                die("failed: " . $database->conn->error);
            }
            //$result = "Добро пожаловать";

            $id = database::select_one_stat("id","user","WHERE email ='".$data["email"]."'");
            $admin = database::select_one_stat("admin","user","WHERE email ='".$data["email"]."'");
            $rewiev = User::iSrewiev($id);
            echo '<script>
                    localStorage.setItem("id",'.$id.');
                    localStorage.setItem("admin",'.$admin.');
                    localStorage.setItem("rewiev",'.$rewiev.');
                    
                </script>';
            $_SESSION["id"]=$id;

            if(isset($_SESSION["back"]))
            {

                echo '<script>location.href="'.$_SESSION["back"].'";</script>';
            }
            else
                echo '<script>location.href="../";</script>';

        }
        ;
        return $result;
    }


}
