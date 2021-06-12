class team{
    constructor(name,rating,schema,defend,control,attack,id_table,point,win,lose,draw,difference,games,color){
        this.name = name;
        this.rating = rating;
        this.schema = schema;
        this.defend = defend;
        this.control = control;
        this.attack = attack;
        
        this.id_table = id_table;
        this.point = point;
        this.win = win;
        this.lose = lose;
        this.draw = draw;
        this.games = games;
        this.difference = difference;

        this.color = color;
    }
}

function randint(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var array_team = [];

var id_team = 0;

$('#enter').bind('click',function(){
    if($('#input_team-name').val() != "" &&
    $('#input_team-team').val() != "" &&
    $('#input_team-schema').val() != "" &&
    $('#input_team-defend').val() != "" &&
    $('#input_team-control').val() != "" &&
    $('#input_team-attack').val() != "")
    {
        let team_name = $('#input_team-name').val();
        let team_rating = $('#input_team-rating').val();
        let team_schema = $('#input_team-schema').val();
        let team_defend = $('#input_team-defend').val();
        let team_control = $('#input_team-control').val();
        let team_attack = $('#input_team-attack').val();

        let color;
        if($('#input_team-color').val() != "")
        {
            color = $('#input_team-color').val();
        }
        else
        {
            color = "#000000";
        }


        array_team.push(new team(team_name,team_rating,team_schema,team_defend,team_control,team_attack,id_team,0,0,0,0,0,0));
        $('#table_team').append(`
        <tr>
            <td>`+team_name+`</td>
            <td>`+team_rating+`</td>
            <td>`+team_schema+`</td>
            <td>`+team_defend+`</td>
            <td>`+team_control+`</td>
            <td>`+team_attack+`</td>
            <td id="point_`+id_team+`">0</td>
            <td id="win_`+id_team+`">0</td>
            <td id="lose_`+id_team+`">0</td>
            <td id="draw_`+id_team+`">0</td>
            <td id="differ_`+id_team+`">0</td>
            <td id="games_`+id_team+`">0</td>
            <td style="background-color:`+color+`"></td>
        </tr>`);
        id_team++;
    }
    else
    {
        alert('Заполни поле дебил')
    }
});

var isExponentTwo = (num) => num & (num - 1) ? false : true;

$('#random').bind('click', function() {
	if($('#rand_num').val() != "" && parseInt($('#rand_num').val()) > 0) {
		let n = parseInt($('#rand_num').val());
		let array_schems = ['4-3-3','4-4-2','4-5-1','5-3-2','3-4-3','3-5-2'];
		for (let i = 0; i != n; ++i) {
			let name = 'team' + (i + 1);
			let num = randint(0, array_schems.length - 1);
			let schem = array_schems[num];
			let rating = randint(80, 150);
			let defend = randint(15, 35);
			let control = randint(20, 40);
			let attack = randint(20, 40);
			array_team.push(new team(name, rating, schem, defend, control, attack, i,0, 0, 0, 0, 0, 0, '#000000'));
			$('#table_team').append(`
			<tr>
				<td>`+name+`</td>
				<td>`+rating+`</td>
				<td>`+schem+`</td>
				<td>`+defend+`</td>
				<td>`+control+`</td>
				<td>`+attack+`</td>
				<td id="point_`+i+`">0</td>
				<td id="win_`+i+`">0</td>
				<td id="lose_`+i+`">0</td>
				<td id="draw_`+i+`">0</td>
				<td id="differ_`+i+`">0</td>
				<td id="games_`+i+`">0</td>
				<td style="background-color:#000000"></td>
			</tr>`);
		}
	} else {
		alert('некорректное число команд...');
	}
})

$('#done_save').bind('click',function(){
    if($('#all_data').val() != "")
    {
        let input_data = $('#all_data').val();
        let path_input_data = input_data.split('|');
        let color;
        if(path_input_data[path_input_data.length-1] != undefined)
        {
            color = path_input_data[path_input_data.length-1];
        }
        else
        {
            color = "#000000";
        }
        array_team.push(new team(path_input_data[0],path_input_data[1],path_input_data[2],path_input_data[3],path_input_data[4],path_input_data[5],id_team,0,0,0,0,0,0,color));
        $('#table_team').append(`
        <tr>
            <td>`+path_input_data[0]+`</td>
            <td>`+path_input_data[1]+`</td>
            <td>`+path_input_data[2]+`</td>
            <td>`+path_input_data[3]+`</td>
            <td>`+path_input_data[4]+`</td>
            <td>`+path_input_data[5]+`</td>
            <td id="point_`+id_team+`">0</td>
            <td id="win_`+id_team+`">0</td>
            <td id="lose_`+id_team+`">0</td>
            <td id="draw_`+id_team+`">0</td>
            <td id="differ_`+id_team+`">0</td>
            <td id="games_`+id_team+`">0</td>
            <td style="background-color:`+color+`"></td>
        </tr>`);
        id_team++;
        $('#all_data').val('');
    }
    else
    {
        alert('Заполни поле дебил');
    }
})

// Chelsea|124.8|3-5-2|25.5|27.5|25
// Man. City|93.8|3-5-2|25|15|31
// name_team_1 sc||e : name_team_2 sc||e -> win_team

$('#UCL').bind('click', function(){
	if(confirm("Are you sure?")) {
		if (isExponentTwo(array_team.length) && array_team.length >= 2) {
			let array_template = [];
			let array_result = array_team;
			let check = true;
			let num = 0;			
			while (check) {
				let n = array_result.length;
				num++;
				$('#work_place').append(`<p>`+num+`</p>`);
				for (let i = 0; i != n / 2; i++) {
					let result = game(array_result[i], array_result[n - 1 - i]);
					let differ = result[0]-result[1];
					if (differ > 0) {
						array_template.push(array_result[i]);
					} else if (differ < 0) {
						array_template.push(array_result[n - i - 1]);
					} else {
						let flag = true;
						let new_result;
						while (flag) {
							new_result = game(array_result[i], array_result[n - i - 1]);
							let d = new_result[0] - new_result[1];
							if (d > 0) {
								array_template.push(array_result[i]);
								flag = false;
							} else if (d < 0) {
								array_template.push(array_result[n - i - 1]);
								flag = false;
							}
						}
						result = new_result;
					}
					$('#work_place').append(`<p style='border:1px solid black'><l style="color:`+array_result[i].color+`">`+array_result[i].name+`</l> `+result[0]+` : `+result[1]+` <l style="color:`+array_result[n - i - 1].color+`">`+array_result[n - i - 1].name+`</l></p>`);
				}
				array_result = array_template;
				array_template = [];
				if (array_result.length == 1) {
					check = false;
				}
			}
			$('#work_place').append(`<p>Champions!!!</p>`);
			$('#work_place').append(`<p style='border:2px solid red'><l style="color:`+array_result[0].color+`">`+array_result[0].name+`</l> </p>`)
		} else {
			alert('Количество команд не соответсвует требованиям турнира...');
		}
	}
})
$('.done').bind('click',function(){
    if(confirm("Уверен?"))
    {
        for(let i = 0;i != array_team.length-1;i++)
        {
            for(let j = i+1; j != array_team.length;j++)
            {
                let result = game(array_team[i],array_team[j]);

                array_team[i].games++;
                array_team[j].games++;
                $('#games_'+array_team[i].id_table).text(array_team[i].games);
                $('#games_'+array_team[j].id_table).text(array_team[j].games);
                
                let differ = result[0]-result[1];

                array_team[i].difference += differ;
                array_team[j].difference -= differ;

                $('#differ_'+array_team[i].id_table).text(array_team[i].difference);
                $('#differ_'+array_team[j].id_table).text(array_team[j].difference);

                if(result[0] > result[1])
                {
                    array_team[i].win++;
                    array_team[i].point += 3;
                    $('#win_'+array_team[i].id_table).text(array_team[i].win);
                    $('#point_'+array_team[i].id_table).text(array_team[i].point);

                    array_team[j].lose++;
                    $('#lose_'+array_team[j].id_table).text(array_team[j].lose);

                }
                else if (result[0] < result[1])
                {
                    array_team[j].win++;
                    array_team[j].point += 3;
                    $('#win_'+array_team[j].id_table).text(array_team[j].win);
                    $('#point_'+array_team[j].id_table).text(array_team[j].point);

                    array_team[i].lose++;
                    $('#lose_'+array_team[i].id_table).text(array_team[i].lose);
                }
                else
                {
                    array_team[i].point++;
                    array_team[j].point++;
                    $('#point_'+array_team[i].id_table).text(array_team[i].point);
                    $('#point_'+array_team[j].id_table).text(array_team[j].point);


                    array_team[i].draw++;
                    array_team[j].draw++;
                    $('#draw_'+array_team[i].id_table).text(array_team[i].draw);
                    $('#draw_'+array_team[j].id_table).text(array_team[j].draw);
                }

                $('#work_place').append(`<p style='border:1px solid black'><l style="color:`+array_team[i].color+`">`+array_team[i].name+`</l> `+result[0]+` : `+result[1]+` <l style="color:`+array_team[j].color+`">`+array_team[j].name+`</l></p>`);

            }
        }

        array_team.sort(function(x,y){
            if(x.point != y.point)
                return y.point-x.point;
            else {
                return y.difference-x.difference;
            }
        });

        $('#table_team').empty();
        $('#table_team').append(`
            <tr>
                <th>Название</th>
                <th>Рейтинг</th>
                <th>Схема</th>
                <th>Защита</th>
                <th>Контроль</th>
                <th>Атака</th>
                <th>Очки</th>
                <th>Победы</th>
                <th>Проигрыш</th>
                <th>Ничья</th>
                <th>Разница</th>
                <th>Игры</th>
            <tr>`);

        for(let i =0 ; i != array_team.length;++i)
        {
            $('#table_team').append(`
        <tr>
            <td>`+array_team[i].name+`</td>
            <td>`+array_team[i].rating+`</td>
            <td>`+array_team[i].schema+`</td>
            <td>`+array_team[i].defend+`</td>
            <td>`+array_team[i].control+`</td>
            <td>`+array_team[i].attack+`</td>
            <td id="point_`+array_team[i].id_table+`">`+array_team[i].point+`</td>
            <td id="win_`+array_team[i].id_table+`">`+array_team[i].win+`</td>
            <td id="lose_`+array_team[i].id_table+`">`+array_team[i].lose+`</td>
            <td id="draw_`+array_team[i].id_table+`">`+array_team[i].draw+`</td>
            <td id="differ_`+array_team[i].id_table+`">`+array_team[i].difference+`</td>
            <td id="games_`+array_team[i].id_table+`">`+array_team[i].games+`</td>
        </tr>`);
        }
    }
})



/*
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
*/


function game(team_1,team_2)
{
    let goal_team_1 = 0;
    let goal_team_2 = 0;

    if (Math.abs(team_1.rating-team_2.rating) >= 50)
    {
        if (team_1.rating > team_2.rating)
            goal_team_1 += randint(0, 5)
        else
            goal_team_2 += randint(0, 5)
    }
    else if (Math.abs(team_1.rating-team_2.rating) >= 40)
    {
        if (team_1.rating > team_2.rating)
            goal_team_1 += randint(0, 4)
        else
            goal_team_2 += randint(0, 4)
    }
    else if (Math.abs(team_1.rating-team_2.rating) >= 30)
    {
        if (team_1.rating > team_2.rating)
            goal_team_1 += randint(0, 3)
        else
            goal_team_2 += randint(0, 3)
    }
    else if (Math.abs(team_1.rating-team_2.rating) >= 20)
    {
        if (team_1.rating > team_2.rating)
            goal_team_1 += randint(0, 2)
        else
            goal_team_2 += randint(0, 2)
    }
    else if (Math.abs(team_1.rating-team_2.rating) >= 10)
    {
        if (team_1.rating > team_2.rating)
            goal_team_1 += randint(0, 1)
        else
            goal_team_2 += randint(0, 1)
    }
    //голы за выбор схемы
    if (parseInt(team_1.schema[0]) < parseInt(team_2.schema[2])){
        differ = parseInt(team_2.schema[2]) - parseInt(team_1.schema[0])
        goal_team_2 += randint(0, differ)
    }
    if (parseInt(team_1.schema[2]) > parseInt(team_2.schema[0]))
    {
        differ = parseInt(team_1.schema[2]) - parseInt(team_2.schema[0])
        goal_team_1 += randint(0, differ)
    }
    //голы за характеристики
    if (Math.abs(team_1.defend-team_2.attack) >= 10)
    {
        if (team_1.defend > team_2.attack)
            goal_team_2 -= randint(0, 5)
        else
            goal_team_2 += randint(0, 5)
    }
    else if(Math.abs(team_1.defend-team_2.attack) >= 8)
    {
        if (team_1.defend > team_2.attack)
            goal_team_2 -= randint(0, 4)
        else
            goal_team_2 += randint(0, 4)
    }
    else if(Math.abs(team_1.defend-team_2.attack) >= 6)
    {
        if (team_1.defend > team_2.attack)
            goal_team_2 -= randint(0, 3)
        else
            goal_team_2 += randint(0, 3)
    }
    else if(Math.abs(team_1.defend-team_2.attack) >= 4)
    {
        if (team_1.defend > team_2.attack)
            goal_team_2 -= randint(0, 2)
        else
            goal_team_2 += randint(0, 2)
    }
    else if(Math.abs(team_1.defend-team_2.attack) >= 2)
    {
        if (team_1.defend > team_2.attack)
            goal_team_2 -= randint(0, 1)
        else
            goal_team_2 += randint(0, 1)
    }

    if (Math.abs(team_2.defend-team_1.attack) >= 10)
    {
        if (team_2.defend > team_1.attack)
            goal_team_1 -= randint(0, 5)
        else
            goal_team_1 += randint(0, 5)
    }
    else if (Math.abs(team_2.defend-team_1.attack) >= 8)
    {
        if (team_1.defend > team_2.attack)
            goal_team_1 -= randint(0, 4)
        else
            goal_team_1 += randint(0, 4)
    }
    else if (Math.abs(team_2.defend-team_1.attack) >= 6)
    {
        if (team_1.defend > team_2.attack)
            goal_team_1 -= randint(0, 3)
        else
            goal_team_1 += randint(0, 3)
    }
    else if (Math.abs(team_2.defend-team_1.attack) >= 4)
    {
        if (team_1.defend > team_2.attack)
            goal_team_1 -= randint(0, 2)
        else
            goal_team_1 += randint(0, 2)
    }
    else if (Math.abs(team_2.defend-team_1.attack) >= 2)
    {
        if (team_1.defend > team_2.attack)
            goal_team_1 -= randint(0, 1)
        else
            goal_team_1 += randint(0, 1)
    }


    if (Math.abs(team_1.control-team_2.control) >= 10)
    {
        if (team_1.control > team_2.control)
            if (parseInt(team_1.schema[2]) >= parseInt(team_2.schema[0]) || team_1.attack >= team_2.attack)
                goal_team_1 += randint(0, 5)
        else if (team_1.control < team_2.control)
            if (parseInt(team_1.schema[2]) <= parseInt(team_2.schema[0]) || team_1.attack <= team_2.attack)
                goal_team_2 += randint(0, 5)
    }
    else if (Math.abs(team_1.control-team_2.control) >= 8)
        if (team_1.control > team_2.control)
            if (parseInt(team_1.schema[2]) >= parseInt(team_2.schema[0]) || team_1.attack >= team_2.attack)
                goal_team_1 += randint(0, 4)
        else if (team_1.control < team_2.control)
            if (parseInt(team_1.schema[2]) <= parseInt(team_2.schema[0]) || team_1.attack <= team_2.attack)
                goal_team_2 += randint(0, 4)
    else if (Math.abs(team_1.control-team_2.control) >= 6)
        if (team_1.control > team_2.control)
            if (parseInt(team_1.schema[2]) >= parseInt(team_2.schema[0]) || team_1.attack >= team_2.attack)
                goal_team_1 += randint(0, 3)
        else if (team_1.control < team_2.control)
            if (parseInt(team_1.schema[2]) <= parseInt(team_2.schema[0]) || team_1.attack <= team_2.attack)
                goal_team_2 += randint(0, 3)
    else if (Math.abs(team_1.control-team_2.control) >= 4)
        if (team_1.control > team_2.control)
            if (parseInt(team_1.schema[2]) >= parseInt(team_2.schema[0]) || team_1.attack >= team_2.attack)
                goal_team_1 += randint(0, 2)
        else if (team_1.control < team_2.control)
            if (parseInt(team_1.schema[2]) <= parseInt(team_2.schema[0]) || team_1.attack <= team_2.attack)
                goal_team_2 += randint(0, 2)
    else if (Math.abs(team_1.control-team_2.control) >= 2)
        if (team_1.control > team_2.control)
            if (parseInt(team_1.schema[2]) >= parseInt(team_2.schema[0]) || team_1.attack >= team_2.attack)
                goal_team_1 += randint(0, 1)
        else if (team_1.control < team_2.control)
            if (parseInt(team_1.schema[2]) <= parseInt(team_2.schema[0]) || team_1.attack <= team_2.attack)
                goal_team_2 += randint(0, 1)
    if (goal_team_1 <= 0)
        goal_team_1 = 0
    if (goal_team_2 <= 0)
        goal_team_2 = 0

    let out_array = [];
    out_array.push(goal_team_1);
    out_array.push(goal_team_2);
    return out_array;
}
