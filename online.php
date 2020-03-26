<?php
  /*
    ********************************************************************
    *         Название:  Sad Raven's Online Counter                    *
    ********************************************************************
    *           Версия:  1.0                                           *
    *        Стоимость:  бесплатный скрипт                             *
    *       Требования:  PHP4 и выше                                   *
    *        Платформа:  любая                                         *
    *             Язык:  русский                                       *
    *            Автор:  Sad Raven (http://www.sad-raven.ru)           *
    ********************************************************************
    *           Создан:  15 июня 2002                                  *
    ********************************************************************
  */

        $data="online.dat";
        $time=time();
        $past_time=time()-600;

        $readdata=fopen($data,"r") or die("Не могу открыть файл $data");
        $data_array=file($data);
        fclose($readdata);

        if (getenv('HTTP_X_FORWARDED_FOR'))
               $user = getenv('HTTP_X_FORWARDED_FOR');
        else
             $user = getenv('REMOTE_ADDR');

        $d=count($data_array);
        for($i=0;$i<$d;$i++)
                {
               list($live_user,$last_time)=explode("::","$data_array[$i]");
               if($live_user!=""&&$last_time!=""):
               if($last_time<$past_time):
                        $live_user="";
                        $last_time="";
                endif;
                if($live_user!=""&&$last_time!="")
                        {
                        if($user==$live_user)
                                {
                                $online_array[]="$user::$time\r\n";
                                }
                        else
                                $online_array[]="$live_user::$last_time";
                        }
                endif;
                }

        if(isset($online_array)):
        foreach($online_array as $i=>$str)
                {
                if($str=="$user::$time\r\n")
                        {
                        $ok=$i;
                        break;
                        }
                }
        foreach($online_array as $j=>$str)
                {
                if($ok==$j) { $online_array[$ok]="$user::$time\r\n"; break;}
                }
       endif;

        $writedata=fopen($data,"w") or die("Не могу открыть файл $data");
        flock($writedata,2);
        if($online_array=="") $online_array[]="$user::$time\r\n";
        foreach($online_array as $str)
                fputs($writedata,"$str");
        flock($writedata,3);
        fclose($writedata);

        $readdata=fopen($data,"r") or die("Не могу открыть файл $data");
        $data_array=file($data);
        fclose($readdata);
        $online=count($data_array);

        echo "Listeners : $online";
?>
