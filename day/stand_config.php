<?php

//Table header
$title="Таблица результатов";

//First contest id
$fromcont = 327;

//Last contest id
$tocont = 327;

//Exam contest id
$exam_contest_id = 15312;

//Wrong verdicts
//$wrong_verdicts = array("WA", "TL", "RT", "ML", "PE");

//Columns
//was: 
$columns = array("rank", "name", "solved", "attempts");


//Enable last submissions list
$enable_last_submissions = true;

//How many sunmissions do you want to show
$show_count = 30;

//Enable style-violation submissions list
$enable_ac_list = true;

//Exam mode
$exam_mode = false;

//Show only exam contest
$exam_only = false;

//Check whether problem is obligatory for student
//arguments:
// id - ejudge contest id
// problem name - ejudge short problem name
// user name - edjuge user name, e.g. "(A2) Vasiliy Pupkin"
//return value:
// true if it's obligatory, false otherwise
function is_obligatory($id, $sname, $uname)
{
    $good = array("distance1", "lcs2", "sparse", "rvq", "bst1", "bst2", "sum", "movetofront", "chocolate", "coolnumbers",
    	"trader", "nice-tilings", "game", "kth-choose", "kth-sum", "kth-coolnumber", "segments-2", "piglet",
    	"convex", "diameter", "theodore", "bridges", "points", "pairs", "distance-4", "unionday", "path", "cutting", 
    	"mst", "cubes"
    	);
    return (in_array($sname, $good));
}

//Check whether problem is auto-accepted for student
//arguments:
//  id - ejudge contest id
//  problem name - ejudge short problem name
//  user name - ejudge user name, e.g. "(A2) Vasiliy Pupkin"
//return value:
//  true if it's auto-accepted, false otherwise
function is_auto_accepted($id, $sname, $uname) {
    return 0;
    $auto_3 = array("");
    $problems_3 = array("");
    return in_array($sname, $problems_3) && in_array($uname, $auto_3);
}

//Transform ejudge contest id and ejudge contest name to table column header
//arguments:
//  id - ejudge contest id
//  name - ejudge contest name
//return value:
//  contest name in table header
function get_contest_name($id, $name) {
    return $name;
    // return "День ".substr($id, 3, 2);
}

//Transform ejudge short problem name to table column header
//arguments:
//  name - ejudge short problem name
//return value:
//  problem name in table header
function get_short_problem_name($name) {
    return $name;
    // return (strlen($name) <= 5) ? $name : substr($name, 0, 3)."~".substr($name, -1);
}

//Get formatting of cell with remaining obligatory problems (css class string)
//arguments:
//  cnt - total number of remaining obligatory problems
//return value:
//  style class string of cell
function get_remaining_formatting($cnt) {
    return "remain_".min(4, (int) (($cnt + 4) / 5));
}

//Get formatting of cell with mark (css class string)
//arguments:
//  mark - mark returned by function get_mark
//return value:
//  style class string of cell
function get_mark_formatting($mark) {
	return "exam_".$mark[0];
}

//Get mark for mark cell
//arguments:
//  rem_cnt - total number of remaining obligatory problems
//  cnt - total number of solved problems in exam contest
//result:
//  exam mark
function get_mark($cnt, $rem_cnt) {
    $marks = array("2", "2+", "3-", "3", "3+", "4-", "4", "4+", "5-", "5", "5+");
    return $marks[min($cnt, count($marks) - 1)];
}

//Compare two users, this function determines order of users in table
//user has following parametres: solved, remain_total, attempts
//arguments:
//  user_1 and user_2 - two users
//return value:
//  true, if first user should be on higher position in table, false otherwise

function cmp($u1, $u2) {
    /*if ($u1["exam_solved"] < $u2["exam_solved"]) return 1;
    if ($u1["exam_solved"] > $u2["exam_solved"]) return -1;
    if (count($u1["remaining"]) > count($u2["remaining"])) return 1;
    if (count($u1["remaining"]) < count($u2["remaining"])) return -1;*/
    if ($u1["solved"] < $u2["solved"]) return 1;
    if ($u1["solved"] > $u2["solved"]) return -1;
    if ($u1["attempts"] < $u2["attempts"]) return -1;
    if ($u1["attempts"] > $u2["attempts"]) return +1;
    return 0;
}

function cmp1($u1, $u2) {
    if ($u1["all_result"] < $u2["all_result"]) return 1;
    if ($u1["all_result"] > $u2["all_result"]) return -1;
    if ($u1["solved"] < $u2["solved"]) return 1;
    if ($u1["solved"] > $u2["solved"]) return -1;
    if ($u1["all_promt"] > $u2["all_promt"]) return 1;
    if ($u1["all_promt"] < $u2["all_promt"]) return -1;
    return 0;
}
?>
