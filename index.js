// Setup timers

let formatter = new Intl.DateTimeFormat("en-GB", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});


class DateTimer {
  timers = [];
  date = null;
  timerChild = null;
  highlightTimeMinute = 5;

  /**
   * Set new date for timer
   * @param {number} year - format YYYY
   * @param {number} month - 0 - 11
   * @param {number} day 1 - 31
   * @param {number} hour - 0 - 23
   * @param {number} minute - 0 - 59
   * @param {number} second - 0 - 59
   * @returns {Date|void}
   */
  setNewDate(year = this.date.getFullYear(), month = this.date.getMonth(), day = this.date.getDate(), hour = 0, minute = 0, second = 0) {
    if(this.timers.length === 3) return console.log('Max timers count is 3!');
    this.date = new Date(year, month, day, hour, minute, second)
    this.timers.push(this.date)
    this.createNode()
  }

  getDate() {
    return formatter.format(this.date)
  }

  getDiff() {
    let
      ms = this.date.getTime() - Date.now(),
      seconds = Math.floor(ms/1000),
      minutes = Math.floor(seconds/60),
      hours = Math.floor(minutes/60),
      days = Math.floor(hours/24),
      months = Math.floor(days/30),
      years = Math.floor(months/12)
    let diff = {
      second: seconds - (minutes * 60),
      minute: minutes - (hours * 60),
      hour: hours - (days * 24),
      day: days - (months * 30),
      month: months - (years * 12),
      year: years
    }
    let diffArray = []
    let isNegative = false
    for(let item in diff) {
      (item === 'year' || item === 'month' || item === 'day') && !diff[item] ? '' : diffArray.push(`${diff[item]} ${item}(s)`)
      isNegative = diff[item] < 0
    }
    
    return !isNegative ? diffArray.reverse().join(' ') : 'Time is over'
  }

  runTimer() {
    setInterval(() => {
      this.timerChild.textContent = `Left: ${this.getDiff()}`;
      if(((this.date.getTime() - Date.now()) / 1000 / 60) < this.highlightTimeMinute) {
        this.timerChild.classList.add('highlight')
      }
    }, 1000)
  }

  createNode() {
    let wrap = document.getElementById('timers');
    let parent = document.createElement('div');
    parent.classList.add('parent', 'flx', 'flx-column');

    let dateChild = document.createElement('span')
    dateChild.classList.add('date')
    dateChild.textContent = `Date: ${this.getDate()}`;

    this.timerChild = document.createElement('span');
    this.timerChild.classList.add('timer');
    this.timerChild.textContent = `Left: ${this.getDiff()}`;

    parent.appendChild(dateChild)
    parent.appendChild(this.timerChild);
    wrap.appendChild(parent);
    this.runTimer()
  }
}

let firstTimer = new DateTimer();
firstTimer.setNewDate(2020, 10, 10, 10, 10, 10);

let secondTimer = new DateTimer();
secondTimer.setNewDate(2020, 06, 1);

let thirdTimer = new DateTimer();
thirdTimer.setNewDate(2020, 04, 17, 16, 29, 0);
