
var quesArr = []//store questions
var userArr = []//store users answers
var arr = [];//random questions
var k //question number
var ansOptions = [] //random options
var score = 0
var c //total time for quiz
var stopwatch;
var api
var qlen
var apiName

$(document).ready(function () {
    getUrl()

});

function createQues() {
    var no = quesArr[arr[k]]

    $('.quizarea').html('<h3 >Q.' + Number(k + 1) + "&nbsp;&nbsp;" + no.question + '</h3>').addClass('mt-5 ml-2')

    let a = 0
    $('.optionArea').html('<div></div>');
    for (i = 1; i < 5; i++) {


        $('.optionArea div').append('<input class="ml-2 options mt-4" name="option" type= "radio">')
        if (i == ansOptions[k]) {
            $('.options ').eq(i - 1).after('<span> ' + no.answers[0] + '</span><br>');
        }
        else {
            $('.options ').eq(i - 1).after('<span> ' + no.answers[1][a] + '</span><br>');
            a++
        }
    }
    if (!afterSubmit()) {
        $('.optionArea').append('<button class="btn m-2 mt-4 previous difficulty btn-dark">Previous</button>');
        $('.optionArea').append('<button class="btn m-2 mt-4 next difficulty btn-dark">Next</button>');
        $('.optionArea').append('<button class="btn mr-5 mt-4 submit difficulty btn-dark float-right">Submit</button>');
    }



    k++

    submit()
    next()
    previous()


}

function timer() {
    if (!$(`div`).hasClass('clock')) {
        addClock()
        stopwatch = setInterval(() => {
            if (c >= 0) {
                c--
                $('.clock .timer').html(`${c} seconds left`);
            }
            const secondsDegrees = ((60 - c / 60) * 360) + 90;

            $('.second-hand').css({ 'transform': 'rotate(' + secondsDegrees + 'deg)' });

            if (c < 0) {

                clearInterval(stopwatch)
                alert("time up")
                submitIt()
            }

        }, 1000);
    }

}

function checkAns() {
    for (i = 0; i < qlen; i++) {
        if (ansOptions[i] == (userArr[i] + 1)) {
            score++
            $(`.quesNav a`).eq(i).addClass(`text-success`)
        }
        else if (userArr[i] == null)
            $(`.quesNav a`).eq(i).addClass(`text-warning`)
        else $(`.quesNav a`).eq(i).addClass(`text-danger`)
    }

    $(`.optionArea span`).eq(userArr[k - 1]).addClass(`text-danger font-weight-bold`)
    $(`.optionArea span`).eq(ansOptions[k - 1] - 1).removeClass('text-danger').addClass(`text-success font-weight-bold`)
}

function showscore() {
    $('.clockDiv').remove();
    $(`.space`).show();
    $('.quizarea').addClass(`jumbotron`).html(`<h1>Your score : ${score}</h1>`);
    $('.optionArea').html(`<button class ="btn btn-dark"  ><a style href="./index.html">Try again</a></button>`);
    $(`.btn a`).addClass(`nostyle`);
}

function filloption() {
    if (userArr.length >= k) {
        $("[name='option']").eq(userArr[k - 1]).prop("checked", true);
    }
}

function saveoption() {
    for (i = 0; i < 4; i++) {
        if ($('[name="option"]').eq(i).is(':checked')) {
            $(`.quesNav input`).eq(k - 1).prop('checked', true)
            $(`.quesNav a`).eq(k - 1).addClass('text-primary')
            userArr[k - 1] = i
        }

    }
}

function loadArr() {
    qlen = quesArr.length
    while (arr.length < qlen) {
        var r = Math.floor(Math.random() * qlen);
        if (arr.indexOf(r) === -1) arr.push(r);
        if (ansOptions.length < qlen) {
            var r2 = Math.floor(Math.random() * 4) + 1;
            ansOptions.push(r2)
        }

    }
    console.log(ansOptions)
}

function submit() {
    $('.submit').on('click', submitIt)
}//submit answers\\


function next() {
    $('.next').click(function (e) {
        e.preventDefault();
        saveoption()
        if (k < qlen) {
            createQues()
            filloption()
        }
    });
}//next question

function previous() {
    $('.previous').click(function (e) {
        e.preventDefault();
        saveoption()
        if (k > 1) {
            k -= 2;
            createQues()
            filloption()
        }
    });
}//previous question

function submitIt() {
    saveoption()
    filloption()
    checkAns()
    showscore()
    clearInterval(stopwatch)
}

function getUrl() {
    $(`#easy`).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple`
    });

    $(`#medium`).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple`
    });
    $(`#hard`).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&difficulty=hard&type=multiple`
    });
    $(`.sidebar li`).eq(0).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=18&type=multiple`
    });
    $(`.sidebar li`).eq(1).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=15&type=multiple`
    });
    $(`.sidebar li`).eq(2).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=19&type=multiple`
    });
    $(`.sidebar li`).eq(3).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=11&type=multiple`
    });
    $(`.sidebar li`).eq(4).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=21&type=multiple`
    });
    $(`.sidebar li`).eq(5).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=12&type=multiple`
    });
    $(`.sidebar li`).eq(6).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=14&type=multiple`
    });
    $(`.sidebar li`).eq(7).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=9&type=multiple`
    });
    $(`.sidebar li`).eq(8).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=10&type=multiple`
    });
    $(`.sidebar li`).eq(9).click(function (e) {
        e.preventDefault();
        api = `https://opentdb.com/api.php?amount=10&category=23&type=multiple`
    });
    $(`.api`).click(function (e) {
         apiName = $(this).text()
        e.preventDefault();});
    $(`.api`).click(function(){
        fetchQuizAjax();})
          

}

function addClock() {
    if (!$(`div`).hasClass('clock'))
        $(`.row-1`).append(`<div class="col-2 clockDiv">

    <div class="clock mt-3">
        <div class="clock-face">
            <div class="hand second-hand"></div>
        </div>
        <div class="timer mt-5"></div>
    </div>`);

}

function quesNav() {
    if ((!$(`div`).hasClass(`quesNav`)) || $('.quesNav').is(':empty')) {
        $(`.row-1`).append(`<div class="quesNav col-3 ml-5 mt-5 bg-light rounded "><span class="head">Questions</span><br></div>`)
        for (i = 0; i < qlen; i++) {
            if ((i + 1) % 5 == 0)
                $(`.quesNav`).append(`<a>Q${i + 1}.</a><input type="radio" class="my-3 "></input><br>`);
            else
                $(`.quesNav`).append(`<a>Q${i + 1}.</a><input class="my-3 mr-3" type="radio"></input>`);


        }
        $('.quesNav input').attr("disabled", true)

    }
    quesClick()
}

function quesClick() {
    $('.quesNav a').on('click', function () {
        saveoption()
        k = Number($(this).index('.quesNav a'))

        createQues()
        filloption()
        if (afterSubmit()) {
            checkAns()
        }
    });
}

function afterSubmit() {
    return $(`.quesNav a`).eq(0).hasClass('text-success') || $(`.quesNav a`).eq(0).hasClass('text-danger')
}

function refreshquiz() {
    $('.quesNav').remove()
    $('.space,#easy,#medium,#hard').hide();
    $('.quizarea').removeClass('jumbotron')
    k = 0
    score = 0
    userArr = []
}

function startQuizHere() {
    
        clearInterval(stopwatch)
        $('.clockDiv').remove();
        $(`.quesNav`).remove()
        $(`.space`).show();
        $(`.jumbotron`).empty();
        $('.quizarea').addClass(`jumbotron`)
        $(`.jumbotron`).html(`<h3>Press start to begin the Quiz</h3>`).removeClass('text-center').css("padding-top", "30px")
        $(`.jumbotron`).append(`<ul><li>Category&nbsp;&nbsp;: &nbsp;${apiName}</li>
                                <li>Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: &nbsp;120 seconds</li> 
                                <li>Questions :&nbsp;&nbsp;10</li><ul>`)
        $(`.jumbotron ul `).css('font-size', '20px').addClass(`mt-5`).css('padding-left', '0px')
        $(`.jumbotron li`).addClass(`mt-4`);
        $('.optionArea').empty().append('<button class="btn m-2 mt-4 previous difficulty back btn-dark">Back</button>');
        $('.optionArea').append('<button class="btn m-2 mt-4 previous difficulty start btn-dark">Start</button>');
        $('.start').click(function () {
            refreshquiz()
            loadArr()
            createQues()
            c = 100
            timer()
            quesNav()
            getUrl()
        })



    

}

function fetchQuizAjax() {


    $.ajax({
        type: "GET",
        url: api,

        success: function (response) {
            let data = response.results
            for (i = 0; i < data.length; i++) {
                quesArr[i] = ({ "question": data[i].question, "answers": [data[i].correct_answer, data[i].incorrect_answers] })
            }
            console.log(response)
             


        },
       
    });
    $( document ).ajaxComplete(function() {console.log('ajaxcomplete')
        startQuizHere()
      });
}