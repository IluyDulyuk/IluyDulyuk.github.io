<?php
include_once("stand_config.php");
error_reporting(E_ERROR | E_PARSE | E_NOTICE); //E_WARNING is excluded because OF strtotime

if (!isset($title)) //Page title
    $title = "Page Title";

if (isset($_GET["from"]))
    $fromcont = (int)$_GET["from"];
if (isset($_GET["to"]))
    $tocont = (int)$_GET["to"];
if (isset($_GET["contest"]))
{
    $fromcont = (int)$_GET["contest"];
    $tocont = (int)$_GET["contest"];
    $contests =explode(",", $_GET["contest"]);
}

$fromcont = 2297;
$tocont   = 2297;
$contests =array(2297);

if (isset($_GET["title"]))
    $title = htmlspecialchars($_GET["title"]);
if (!isset($title))
    die("Title of page doesn't set");
if (!isset($fromcont))
    die("Number of first contest doesn't set");
if (!isset($fromcont))
    die("Number of last contest doesn't set");

if (!isset($fromcont)) //$fromcont ... $tocont - your contests
    die("\$fromcont must be set in config");
if (!isset($tocont))
    die("\$tocont must be set in config");
if ($tocont - $fromcont > 20) 
    die("Too many contests (more than 20)");

if (!isset($columns))
    $columns = array("rank", "name", "mark", "exam_solved", "remaining", "solved", "attempts");

if (!isset($wrong_verdicts)) //Ejudge verdicts considered as wrong
    $wrong_verdicts = array("RJ", "WA", "TL", "RT", "ML", "PE");

if (!isset($main_verdicts)) //Ejudge verdicts (+wrong)
    $main_verdicts = array("CF", "DQ", "OK", "AC", "PR", "RJ", "SV");

//all_verdicts by priority
$all_verdicts = array_merge($main_verdicts, $wrong_verdicts);

$special_verdicts = array("CF", "DQ", "OK", "AC", "PR");

if (!isset($enable_ac_list)) //Enable list of "Accepted for Testing" submissions
    $enable_ac_list = false;

if (!isset($enable_last_submissions)) //Enable list of last submissions
    $enable_last_submissions = false;

if ($enable_last_submissions) { //How many submmisions to show is last submissions
    if (!isset($show_count))
        $show_count = 20;
} else
    $show_count = 0;

if (!isset($exam_mode)) //Enable exam-mode
    $exam_mode = false;
if ($exam_mode) {
    if (!isset($exam_contest_id)) //Exam contest id in ejudge
        die("\$exam_contest_id must be set in config");
    if (!isset($exam_only)) //Show only exam contest in the table
        $exam_only = false;
    if (($exam_contest_id < $fromcont) || ($exam_contest_id > $tocont))
        die("\$exam_contest_id must be betweent start and end contests");
    if (!function_exists("get_mark_formatting")) //function must give formmating to the mark cell
        die("get_mark_formatting(\$mark) must exist in config");
    if (!function_exists("get_mark")) //function should calculate mark depending on parametres
        die("get_mark(\$remaing_obligatory, \$solved) must exist in config");
} else {
    $exam_contest_id = 0;
    $exam_only = false;
}

if (!function_exists("get_contest_name")) //Short contest name for table header
    die("get_contest_name(\$contestid, \$contest_short_name) must exist in config");

if (!function_exists("get_short_problem_name")) //Short problem name for table header
    die("get_short_problem_name(\$shortname) must exist in config");

if (!function_exists("is_obligatory")) //Check, whether problem is obligatory
    die("is_obligatory(\$contestid, \$shortname, \$username) must exist in config");

if (!function_exists("get_remaining_formatting"))
    die("get_remaining_formatting(\$remaining_obligatory_problems) must exist in config");

if (!function_exists("is_auto_accepted")) //Auto-accepted problems
    die("is_auto_accepted(\$contid, \$prname, \$uname) function must exist in config");

if (!function_exists("cmp")) //Compare two users
    die("cmp(\$uid1, \$uid2) must exist in config");

if (isset($_GET['hiddenproblems']))
	$hiddenproblems=",".$_GET['hiddenproblems'].",";
else
	$hiddenproblems="---";

function isnothiddenproblem($contest,$problem)
{
	global $hiddenproblems;
	return strpos($hiddenproblems,(",".$problem."@".$contest.",") ) === false;
}

$filter_str = array_key_exists("filter_str", $_REQUEST) ? htmlspecialchars($_REQUEST["filter_str"]) : ""; //Filter by substring in username
# $filter_arr = split(" ", $filter_str);
$filter_arr[0] = $filter_str;
$sid = (array_key_exists("SID", $_REQUEST) ? $_REQUEST["SID"] : "");
if (strlen($filter_str) > 0)
{
    $show_count = 2000;
}
?>

<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8" />
<meta http-equiv="content-language" content="ru-ru" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/stand_style.css" />

<link rel="icon" type="image/png" sizes="32x32" href="favicon_stand/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="favicon_stand/favicon-16x16.png">


<title><?PHP print($title) ?></title>
<meta http-equiv="Refresh" content="30" />
</head>

<body>


<?php
$users   = array();    //$users[$user]["solved"], $users[$user]["attempts"], $users[$user]["remain_total"], $users[$user]["remain_list"], remain_total - total count of remaining obligatory problems, remain_list - problem names, concatenated
$probstat = array();    //$probstat[$contid][$prob]["runs"], $probstat[$contid][$prob]["success"], $probstat[$contid][$prob]["name"]
$contname = array();    //$contname[$contid] - contest name (by id)
$cf_list  = array();    //list of check-failed submits
$last_sub = array();    //array of last submissions, submission has "time", "uid", "sname", "contid", "status"
$ac_sub   = array();    //array of "accepted for testing" submissions, same format
$runs  = array();

function submcmp($r1, $r2) {
    return $r2["time"] - $r1["time"];
}

function is_filtered($name, $filter_arr, $filter_str) {
    $ok = false;
    foreach ($filter_arr as $filter)
        if (mb_stripos(mb_strtolower($name, 'utf-8'), mb_strtolower($filter, 'utf-8')) !== false) {
            $ok = true;
            break;
        }
    if (($filter_str != "") && ($ok == false))
        return false;
    return true;
}

function print_submissions_list($runs, $header) {
    if (count($runs) == 0)
        return;
    printf("<tr><td class=\"subm_list_header\" colspan=5>".$header."</td></tr>");
    foreach ($runs as $run) {
        print("<tr>");
        print("<td class=\"contest_name\">#".$run["run_id"]."</td>");
        print("<td class=\"time\">".date("M d, H:i:s", $run["time"])."</td>"); 
        print("<td class=\"user_name\">".$run["user"]."</td>");
        print("<td class=\"contest_name\">".$run["sname"]."</td>");
        print("<td class=\"".$run["status"]."\">".$run["status"]."</td>");
        print("<td>");
        if ($run["link"] != "")
            print("<a href=\"".$run["link"]."\" target=\"_blank\">view</a>");
        print("</td>");
        print("</tr>");
    }
}

function get_source_link($sid, $contid, $runid) {
    return ($sid == "") ? "" : "get_source.html?SID=".$sid."&contest=".$contid."&run=".$runid;
}

function get_column($column, $user) {
    $result = "";
    if ($column == "remaining") {
        $list = $user["remaining"];
        $result = "<td title=\"".implode("\n", $list)."\" class=\"".get_remaining_formatting(count($list))."\">";
        $result = $result.count($list)."</td>";
    } else if ($column == "mark") {
        $mark = get_mark($user["exam_solved"], count($user["remaining"]));
        $result = "<td class=\"".get_mark_formatting($mark)."\">".$mark."</td>";
    } else if (array_key_exists($column, $user))
        $result = "<td class=\"".$column."\">".$user[$column]."</td>";
    else
        die("Invalid column name ".$column);
    return $result;
}

function get_submission($runs) {
    global $all_verdicts;
    global $special_verdicts;
    foreach ($special_verdicts as $verdict)
        foreach ($runs as $run)
            if ($verdict == $run["status"])
            {
                $run["run_id_txt"] = ", #" . $run["run_id"];
                return $run;
            }
    $maxid = -1;
    $maxrun = array("status" => "NO", "run_id_txt" => "");
    foreach ($runs as $run)
    {
        if (intval($run["run_id"]) > $maxid)
        {
            $maxid = intval($run["run_id"]);
            $maxrun = $run;
            $maxrun["run_id_txt"] = ", #" . $run["run_id"];
        }
    }
    return $maxrun;
    // return array("status" => "NO");
}

function get_text($runs, $wrong_verdicts) {
	$attempts = 0;
	foreach ($runs as $run) {
		$status = $run["status"];
		if ($status == "AC" || $status == "PR")
			return "?";
		if ($status == "OK"){
            $smile = array(
                "&#127755;",
                "&#127976;",
                "&#127979;",
                "&#127983;",
                "&#128146;",
                "&#128508;",
                "&#128509;",
            );
            $x_key = array_rand($smile, 1);
			return "$smile[$x_key]";
        }
		if (in_array($status, $wrong_verdicts))
			++$attempts;
	}
    $x = '-';
    if ($attempts < 5){
        $x = "&#9925;";
    }
    else if ($attempts >= 5 && $attempts < 10){
        $x = "&#9748;";
    }
    else if ($attempts >= 10 && $attempts < 15){
        $x = "&#9889;";
    }
    else {
        $x = "&#128167;";
    }
	return (($attempts == 0) ? "&#127760;" : "$x");
}

function get_text_attempts($runs, $wrong_verdicts) {
    $attempts = 0;
    foreach ($runs as $run) {
        $status = $run["status"];
        if ($status == "AC" || $status == "PR")
            return "?";
        if ($status == "OK")
            return "+".(($attempts == 0) ? "" : "$attempts");
        if (in_array($status, $wrong_verdicts))
            ++$attempts;
    }
    return (($attempts == 0) ? "." : "-$attempts");
}

$headers = array(
    "name" 	 => array("text" => "<form action=\""."\" class=\"filter_form\" method=\"GET\">Filter: <input type=text name=\"filter_str\" value=\"".$filter_str."\">"
				. "<input type=\"hidden\" name=\"from\" value=\"".$fromcont."\">"
				. "<input type=\"hidden\" name=\"to\" value=\"".$tocont."\">"
                                . "<input type=\"hidden\" name=\"contest\" value=\"".$_GET["contest"]."\">"
				. "<input type=\"hidden\" name=\"SID\" value=\"".$sid."\">"
				. "</form>",
					  "title" => "filter"),
    "rank"	 => array("text" => "R", "title" => "Место"),
    "mark"	 => array("text" => "M", "title" => "Текущая оценка"),
    "solved" => array("text" => "=", "title" => "Число решенных задач"),
    "exam_solved" => array("text" => "E", "title" => "Число решенных задач в зачетном контесте"),
    "remaining"   => array("text" => "L", "title" => "Оставшиеся обязательные задачи"),
    "attempts"    => array("text" => "P", "title" => "Общее число попыток")
);

$xmldata = array();
foreach ($contests as $i) {
    $xmlfile = sprintf("/home/judges/%06d/var/status/dir/external.xml", $i);

    if (file_exists($xmlfile)){
        $xmldata[$i] = simplexml_load_file($xmlfile);
    } 
}

foreach ($xmldata as $contid=>$data) {
    if ($exam_only && ($contid != $exam_contest_id))
    	continue;
    $contname[$contid] = get_contest_name($contid, $data->name);
    foreach ($data->users->user as $user=>$udata) {
        $user_id = (string) $udata["id"];
        $users[$user_id] = array("name" => (string) $udata["name"],
        						 "solved" => 0,
        						 "attempts" => 0,
        						 "remaining" => array(),
        						 "exam_solved" => 0,
                                 "flag" => 0);
    }
    foreach ($data->problems->problem as $prob=>$pdata) {
       if (!isnothiddenproblem($contid,$pdata["id"]))
           continue;

        $cur_id = (string) $pdata["id"];
        $probstat[$contid][$cur_id]["name"] = (string) $pdata["long_name"];
        $probstat[$contid][$cur_id]["sname"] = (string) $pdata["short_name"];
        $probstat[$contid][$cur_id]["success"] = 0;
        $probstat[$contid][$cur_id]["runs"] = 0;
        foreach ($data->users->user as $user=>$udata) {
            $cur_user_id = (string) $udata["id"];
            $probres[$contid][$cur_id][$cur_user_id] = 0;
            $runs[$contid][$cur_id][$cur_user_id] = array();
            if (is_auto_accepted($contid, $probstat[$contid][$cur_id]["sname"], $users[$cur_user_id]["name"]))
            	$runs[$contid][$cur_id][$cur_user_id][] = array("sname"=>$probstat[$contid][$cur_id]["sname"], "status"=>"OK");
        }
    }
}

//processing runs
$total_pending = 0;
foreach ($xmldata as $contid=>$data) {
	if ($exam_only && ($contid != $exam_contest_id))
    	continue;
    $start = strtotime($data["start_time"]);
    foreach ($data->runs->run as $run) {
        $user = (string) $run["user_id"];
        if (!is_filtered($users[$user]["name"], $filter_arr, $filter_str))
            continue;
        $prob = (int) $run["prob_id"];
        if (! isnothiddenproblem($contid,$prob))
                    continue;
        $status = $run["status"];
        $submission = array("time" 	    => $run["time"] + $start,
						"contname"  => $contname[$contid],
        					"sname"	    => $probstat[$contid][$prob]["sname"],
        					"status"    => $status,
						"user" 	    => $users[$user]["name"],
						"run_id" => $run["run_id"],
        					"link"	    => get_source_link($sid, $contid, $run["run_id"]));
        $runs[$contid][$prob][$user][] = $submission;
        if ($status != "AC" && $status != "PR")
        	$last_sub[] = $submission;
    }
}

//printing result

foreach ($users as $user=>$ures) {
    if (!is_filtered($users[$user]["name"], $filter_arr, $filter_str))
        continue;
    foreach ($probres as $contid=>$cdata)
    if (!$exam_only || ($contid == $exam_contest_id))
        foreach ($cdata as $prob=>$pdata) {
            $submission = get_submission($runs[$contid][$prob][$user]);
            $status = $submission["status"];
            if ($status == "WA") {
                $users[$user]["flag"] += (int) get_text_attempts($runs[$contid][$prob][$user], $wrong_verdicts);
                } 
            if ($status == "AC" || $status == "PR")
                $ac_sub[] = $submission;
            if ($status == "CF")
                $cf_list[] = $submission;
            if ($status == "OK") {
                $users[$user]["solved"] += 1;
                $users[$user]["attempts"] += (int) get_text_attempts($runs[$contid][$prob][$user], $wrong_verdicts);
                if ($contid == $exam_contest_id)
                    $users[$user]["exam_solved"] += 1;
            } else if (is_obligatory($contid, $probstat[$contid][$prob]["sname"], ""))
                $users[$user]["remaining"][] = $contname[$contid].": ".$probstat[$contid][$prob]["name"];
        }
}

uasort($users, "cmp");
uasort($last_sub, "submcmp");
uasort($ac_sub, "submcmp");
$last_sub = array_slice($last_sub, 0, $show_count);


print_submissions_list($cf_list, "<h1>CHECK FAILED</h1>");
print("<H1><img src=img/star.png style='vertical-align: text-bottom;'/>&nbsp;".$title."&nbsp;<img src=img/star.png style='vertical-align: text-bottom;' /></H1>");
print("<table class=\"results\">");
printf("<tr>");

foreach ($columns as $col)
    print("<td class=\"".$col."_header\"rowspan=2 title=\"".$headers[$col]["title"]."\">".$headers[$col]["text"]."</td>");

foreach ($contname as $contid=>$name)
    if (!$exam_only || ($contid == $exam_contest_id))
        print("<td colspan=\"".count($probstat[$contid])."\" class=\"contest\" title=\"".$contname[$contid]."\">".$contname[$contid]."</td>");
print("</tr><tr>");

foreach ($probstat as $contid=>$cdata)
    if (!$exam_only || ($contid == $exam_contest_id))
    	foreach ($cdata as $prob=>$pdata) {
			$sname = $probstat[$contid][$prob]["sname"];
			print("<td title=\"".$pdata["sname"].": ".$pdata["name"]."\" class=\"problem");
			print(is_obligatory($contid, $sname, "") ? "_obligatory" : "");
			print("\">".get_short_problem_name($pdata["sname"])."</td>");
		}

print("</tr>");

$user_cnt = 0;
foreach ($users as $user=>$ures) {
    if (!is_filtered($ures["name"], $filter_arr, $filter_str))
        continue;
    if ($users[$user]["solved"] + $users[$user]["attempts"] + $users[$user]["flag"] == 0)
        continue;
	$user_cnt++;
	$ures["rank"] = $user_cnt;
	print("<tr>");
    foreach ($columns as $col)
        print(get_column($col, $ures));
    foreach ($probres as $contid=>$cdata)
        if (!$exam_only || ($contid == $exam_contest_id))
	        foreach ($cdata as $prob=>$pdata) {
				$text = get_text($runs[$contid][$prob][$user], $wrong_verdicts);
				$submission = get_submission($runs[$contid][$prob][$user]);
    	        $title="title=\"".$ures["name"].", ".$probstat[$contid][$prob]["sname"]." (".$probstat[$contid][$prob]["name"].")" . $submission["run_id_txt"]. "\"";
				$class = $submission["status"];
				if (($sid != "") && ($class == "AC" || $class == "PR"))
                	$text = "<a target=\"_blank\" href=\"".$submission["link"]."\">".$text."</a>";
				print("<td class=\"verdict ".$class."\" ".$title.">".$text."</td>");
        	}
    print("</tr>");
}

print("</table>");
?>
</body>
</html>