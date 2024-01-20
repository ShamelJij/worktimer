$(document).ready(function () {
  let timerCount = 0;

  // Function to add a new timer section
  function addTimerSection() {
    timerCount++;
    const timerSection = `
            <div class="card timer-section m-1" id="timer-${timerCount}">
                <div class="card-body">
                    <h5 class="card-title">Timer ${timerCount}</h5>
                    <button class="btn btn-success start-btn m-1">Start</button>
                    <button class="btn btn-warning start-pause-btn m-1">Start Pause</button>
                    <button class="btn btn-info stop-pause-btn m-1">Stop Pause</button>
                    <button class="btn btn-danger stop-btn m-1">Stop and save</button>
                    <div class="progress-bar-container work-progress m-1" id="work-${timerCount}">
                    </div>
                    <div class="progress-bar-container pause-progress m-1" id="pause-${timerCount}">
                    </div>
                    <button class="btn btn-secondary close-btn m-1">Close</button>
                </div>
            </div>
        `;

    const timerForm = `
            <div class="m-1" id="timerForm-${timerCount}">
                <form class="border border-primary">
                    <div class="row">
                        <div class="form-group col m-2">
                            <label for="workHours">Stunden</label>
                            <input type="number" class="form-control" id="workHours-${timerCount}" aria-describedby="workLimitHelp-${timerCount}"
                                min="0" max="10">
                        </div>
                        <div class="form-group col m-2">
                            <label for="workMinutes">Minuten</label>
                            <input type="number" class="form-control" id="workMinutes-${timerCount}" aria-describedby="workLimitHelp-${timerCount}"
                                min="0" max="59">
                        </div>
                        <div class="form-group col m-2">
                            <label for="workSeconds">Sekunden</label>
                            <input type="number" class="form-control" id="workSeconds-${timerCount}" aria-describedby="workLimitHelp-${timerCount}"
                                min="0" max="59">
                        </div>
                    </div>
                    <small id="workLimitHelp-${timerCount}" class="form-text text-muted m-2">Geben Sie den Dauer in
                        Stunden:Minuten:Sekunden</small>
                    <button id="startTimerBtn-${timerCount}" class="btn btn-primary create-timer m-2">Erstellen</button>
                </form>
            </div>
        `;

    $("#timers-container").append(timerForm);

    $(`#timerForm-${timerCount} .create-timer`).on("click", function (event) {
      event.preventDefault();
      let workTimeIsLegit = true;
      const workHours = parseInt($(`#workHours-${timerCount}`).val());
      const workMinutes = parseInt($(`#workMinutes-${timerCount}`).val());
      const workSeconds = parseInt($(`#workSeconds-${timerCount}`).val());
      if (
        isNaN(workHours) ||
        isNaN(workMinutes) ||
        isNaN(workSeconds) ||
        workHours < 1 ||
        workHours > 10 ||
        workMinutes < 0 ||
        workMinutes > 59 ||
        workSeconds < 0 ||
        workSeconds > 59
      ) {
        workTimeIsLegit = false;

        $(`#workLimitHelp-${timerCount}`)
          .removeClass("text-muted")
          .addClass(" text-danger");
        $(`#workLimitHelp-${timerCount}`).text(
          "Arbeitzeiten Eingaben sind falsch!"
        );
      }

      if (workTimeIsLegit === true) {
        $("#timers-container").append(timerSection);
        $(`#timerForm-${timerCount}`).remove();
      }
      // Event listeners for timer buttons
      $(`#timers-container`).on("click", `.start-btn`, function () {
        console.log("start-btn");
        const workBar = `
                        <label>Work Progress: <span id="countDown-${timerCount}" class="small m-2"></span></label>
                        <div id="progressDiv-${timerCount}" class="progress">
                            <div id="progressBar-${timerCount}" class="progress-bar timer-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
        `;

        //$(`#work-${timerCount}`).append(workBar);
        if ($(`#work-${timerCount} .progress`).length === 0) {
          $(`#work-${timerCount}`).append(workBar);
          $(`#timer-${timerCount} .start-btn`).remove();
          startTimer(workHours, workMinutes, workSeconds);
        }
      });
    });

    $(`#timer-${timerCount} .start-pause-btn`).on("click", function () {
      const pauseBar = `
                        <label>Pause Progress: ${pauseProgress}</label>
                        <div class="progress">
                            <div class="progress-bar pause-progress" role="progressbar" style="width: 0%;" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
        `;
      if ($(`#pause-${timerCount} .progress`).length === 0) {
        $(`#pause-${timerCount}`).append(pauseBar);
      }
      $(`#timer-${timerCount} .start-pause-btn`).attr("disabled", true);
      $(`#timer-${timerCount} .stop-pause-btn`).removeAttr("disabled", true);
    });

    $(`#timer-${timerCount} .stop-pause-btn`).on("click", function () {
      $(`#timer-${timerCount} .stop-pause-btn`).attr("disabled", true);
      $(`#timer-${timerCount} .start-pause-btn`).removeAttr("disabled", true);
      // Handle stop pause button click
    });

    $(`#timer-${timerCount} .stop-btn`).on("click", function () {
      // Handle stop button click
      // You can implement timer stop logic here
    });

    $(`#timer-${timerCount} .close-btn`).on("click", function () {
      // Handle close button click
      $(`#timer-${timerCount}`).remove();
    });
  }

  function startTimer(inputHours, inputMinutes, inputSeconds) {
    var hours = inputHours;
    var minutes = inputMinutes;
    var seconds = inputSeconds;
    console.log(inputHours);
    console.log(inputMinutes);
    console.log(inputSeconds);
    var totalTime = hours * 3600 + minutes * 60 + seconds;
    var interval = setInterval(function () {
      if (totalTime <= 0) {
        clearInterval(interval);
        $(`#countDown-${timerCount}`).innerHTML = "Feierabend!";
      } else {
        var hoursRemaining = Math.floor(totalTime / 3600);
        var minutesRemaining = Math.floor((totalTime % 3600) / 60);
        var secondsRemaining = totalTime % 60;

        $(`#countDown-${timerCount}`).text(
          hoursRemaining +
            "h " +
            minutesRemaining +
            "m " +
            secondsRemaining +
            "s"
        );

        var progressPercentage =
          ((hours * 3600 + minutes * 60 + seconds - totalTime) /
            (hours * 3600 + minutes * 60 + seconds)) *
          100;
        console.log(Math.floor(progressPercentage));
        console.log(totalTime);
        $(`#progressBar-${timerCount}.timer-progress`).css(
          "width",
          Math.floor(progressPercentage) + "%"
        );
        totalTime--;
      }
    }, 1000);
  }

  // Event listener for adding a new timer
  $("#addTimerBtn").on("click", function () {
    addTimerSection();
  });

  // Add an initial timer section
  //addTimerSection();
});
