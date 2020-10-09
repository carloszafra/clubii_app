const app = {


  deepExtend: function (a, b) {
    for (const prop in b) {
      if (typeof b[prop] === 'object') {
        a[prop] = b[prop] instanceof Array ? [] : {};
        this.deepExtend(a[prop], b[prop]);
      } else {
        a[prop] = b[prop];
      }
    }
  },
  query: function (options) {
    const config = {
      method: 'GET',
      async: true,
      header: {
        type: 'Content-type',
        value: 'application/json'
      },
      data: ''
    };

    this.deepExtend(config, options);

    return new Promise(function (resolve, reject) {
      const xhttp = new XMLHttpRequest();

      xhttp.onreadystatechange = function () {
        if (xhttp.readyState !== 4) return;

        if (xhttp.status === 200) {
          resolve(xhttp.responseText);
        } else {
          reject({
            status: xhttp.status,
            statusText: xhttp.statusText
          });
        }
      };

      xhttp.open(config.method, config.url, config.async);
      xhttp.setRequestHeader(config.header.type, config.header.value);

      if (config.method === 'GET') {
        xhttp.send();
      } else if (config.method === 'POST') {
        xhttp.send(config.data);
      }
    });
  },
  querySelector: function (selector, callback) {
    const el = document.querySelectorAll(selector);

    if (el.length) {
      callback(el);
    }
  },
  liquidify: function (el) {
    const image = el.querySelector('img'),
      imageSrc = image.getAttribute('src');

    image.style.display = 'none';
    el.style.background = `url("${imageSrc}") no-repeat center`;
    el.style.backgroundSize = 'cover';
  },
  liquidifyStatic: function (figure, image) {
    image.style.display = 'none';
    figure.style.background = `url("${image.getAttribute('src')}") no-repeat center`;
    figure.style.backgroundSize = 'cover';
  },
  dateDiff: function (date1, date2 = new Date()) {
    const timeDiff = Math.abs(date1.getTime() - date2.getTime()),
      secondsDiff = Math.ceil(timeDiff / (1000)),
      minutesDiff = Math.floor(timeDiff / (1000 * 60)),
      hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60)),
      daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
      weeksDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7)),
      monthsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * 4)),
      yearsDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7 * 4 * 12));

    let unit;

    if (secondsDiff < 60) {
      unit = secondsDiff === 1 ? 'second' : 'seconds';

      return {
        unit: unit,
        value: secondsDiff
      }
    } else if (minutesDiff < 60) {
      unit = minutesDiff === 1 ? 'minute' : 'minutes';

      return {
        unit: unit,
        value: minutesDiff
      }
    } else if (hoursDiff < 24) {
      unit = hoursDiff === 1 ? 'hour' : 'hours';

      return {
        unit: unit,
        value: hoursDiff
      }
    } else if (daysDiff < 7) {
      unit = daysDiff === 1 ? 'day' : 'days';

      return {
        unit: unit,
        value: daysDiff
      }
    } else if (weeksDiff < 4) {
      unit = weeksDiff === 1 ? 'week' : 'weeks';

      return {
        unit: unit,
        value: weeksDiff
      }
    } else if (monthsDiff < 12) {
      unit = monthsDiff === 1 ? 'month' : 'months';

      return {
        unit: unit,
        value: monthsDiff
      }
    } else {
      unit = yearsDiff === 1 ? 'year' : 'years';

      return {
        unit: unit,
        value: yearsDiff
      }
    }
  },
  existsInDOM: function (selector) {
    return document.querySelectorAll(selector).length;
  },
  plugins: {
    createTab: function (options) {
      if (app.existsInDOM(options.triggers) && app.existsInDOM(options.elements)) {
        return new XM_Tab(options);
      }
    },
    createHexagon: function (options) {
      if (app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined') {
        return new XM_Hexagon(options);
      }
    },
    createProgressBar: function (options) {
      if (app.existsInDOM(options.container)) {
        return new XM_ProgressBar(options);
      }
    },
    createDropdown: function (options) {
      if (((app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined') && options.controlToggle) || ((app.existsInDOM(options.trigger) || typeof options.triggerElement !== 'undefined') && (app.existsInDOM(options.container) || typeof options.containerElement !== 'undefined'))) {
        return new XM_Dropdown(options);
      }
    },
    createTooltip: function (options) {
      if (app.existsInDOM(options.container)) {
        return new XM_Tooltip(options);
      }
    },
    createSlider: function (options) {
      if (app.existsInDOM(options.container)) {
        return tns(options);
      }
    },
    createPopup: function (options) {
      if (app.existsInDOM(options.container) && app.existsInDOM(options.trigger)) {
        return new XM_Popup(options);
      }
    },
    createAccordion: function (options) {
      if (app.existsInDOM(options.triggerSelector) && app.existsInDOM(options.contentSelector)) {
        return new XM_Accordion(options);
      }
    },
    createChart: function (ctx, options) {
      return new Chart(ctx, options);
    }
  }
};

const customInitFunctions = () => {

  app.querySelector('.page-loader', function (el) {
    const pageLoader = el[0];

    const hidePageLoader = function () {
      pageLoader.classList.add('hidden');
    };

    window.addEventListener('load', hidePageLoader);
  });

  app.querySelector('.liquid', function (images) {
    for (const image of images) {
      app.liquidify(image);
    }
  });

  /*---------------------------
      USER AVATAR HEXAGONS
  ---------------------------*/
  app.plugins.createHexagon({
    container: '.hexagon-148-164',
    width: 148,
    height: 164,
    roundedCorners: true,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-progress-124-136',
    width: 124,
    height: 136,
    lineWidth: 8,
    roundedCorners: true,
    gradient: {
      colors: ['#41efff', '#615dfa']
    },
    scale: {
      start: 0,
      end: 1,
      stop: .74
    }
  });

  app.plugins.createHexagon({
    container: '.hexagon-border-124-136',
    width: 124,
    height: 136,
    lineWidth: 8,
    roundedCorners: true,
    lineColor: '#e7e8ee'
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-100-110',
    width: 100,
    height: 110,
    roundedCorners: true,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-120-132',
    width: 120,
    height: 132,
    roundedCorners: true,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-progress-100-110',
    width: 100,
    height: 110,
    lineWidth: 6,
    roundedCorners: true,
    gradient: {
      colors: ['#41efff', '#615dfa']
    },
    scale: {
      start: 0,
      end: 1,
      stop: .8
    }
  });

  app.plugins.createHexagon({
    container: '.hexagon-border-100-110',
    width: 100,
    height: 110,
    lineWidth: 6,
    roundedCorners: true,
    lineColor: '#e7e8ee'
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-82-90',
    width: 82,
    height: 90,
    roundedCorners: true,
    roundedCornerRadius: 3,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-100-110',
    width: 100,
    height: 110,
    roundedCorners: true,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-progress-84-92',
    width: 84,
    height: 92,
    lineWidth: 5,
    roundedCorners: true,
    roundedCornerRadius: 3,
    gradient: {
      colors: ['#41efff', '#615dfa']
    },
    scale: {
      start: 0,
      end: 1,
      stop: .8
    }
  });

  app.plugins.createHexagon({
    container: '.hexagon-border-84-92',
    width: 84,
    height: 92,
    lineWidth: 5,
    roundedCorners: true,
    roundedCornerRadius: 3,
    lineColor: '#e7e8ee'
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-68-74',
    width: 68,
    height: 74,
    roundedCorners: true,
    roundedCornerRadius: 3,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-50-56',
    width: 50,
    height: 56,
    roundedCorners: true,
    roundedCornerRadius: 2,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-progress-40-44',
    width: 40,
    height: 44,
    lineWidth: 3,
    roundedCorners: true,
    roundedCornerRadius: 1,
    gradient: {
      colors: ['#41efff', '#615dfa']
    },
    scale: {
      start: 0,
      end: 1,
      stop: .8
    }
  });

  app.plugins.createHexagon({
    container: '.hexagon-border-40-44',
    width: 40,
    height: 44,
    lineWidth: 3,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#e7e8ee'
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-30-32',
    width: 30,
    height: 32,
    roundedCorners: true,
    roundedCornerRadius: 1,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-40-44',
    width: 40,
    height: 44,
    roundedCorners: true,
    roundedCornerRadius: 1,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-dark-32-34',
    width: 32,
    height: 34,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#45437f',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-32-36',
    width: 32,
    height: 36,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#fff',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-dark-26-28',
    width: 26,
    height: 28,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#45437f',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-28-32',
    width: 28,
    height: 32,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#fff',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-dark-22-24',
    width: 22,
    height: 24,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#45437f',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-22-24',
    width: 22,
    height: 24,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#fff',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-dark-16-18',
    width: 16,
    height: 18,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: '#45437f',
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-120-130',
    width: 120,
    height: 130,
    roundedCorners: true,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-100-108',
    width: 100,
    height: 108,
    roundedCorners: true,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-124-136',
    width: 124,
    height: 136,
    roundedCorners: true,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-84-92',
    width: 84,
    height: 92,
    roundedCorners: true,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-34-36',
    width: 34,
    height: 36,
    roundedCorners: true,
    roundedCornerRadius: 1,
    fill: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-40-44',
    width: 40,
    height: 44,
    roundedCorners: true,
    roundedCornerRadius: 1,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-24-26',
    width: 24,
    height: 26,
    roundedCorners: true,
    roundedCornerRadius: 1,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-image-18-20',
    width: 18,
    height: 20,
    roundedCorners: true,
    roundedCornerRadius: 1,
    clip: true
  });

  app.plugins.createHexagon({
    container: '.hexagon-overlay-30-32',
    width: 30,
    height: 32,
    roundedCorners: true,
    roundedCornerRadius: 1,
    lineColor: 'rgba(97, 93, 250, .9)',
    fill: true
  });

  app.plugins.createTooltip({
    container: '.text-tooltip-tfr',
    offset: 4,
    direction: 'right',
    animation: {
      type: 'translate-in-fade'
    }
  });

  app.plugins.createTooltip({
    container: '.text-tooltip-tft',
    offset: 4,
    direction: 'top',
    animation: {
      type: 'translate-out-fade'
    }
  });

  app.plugins.createTooltip({
    container: '.text-tooltip-tft-medium',
    offset: 8,
    direction: 'top',
    animation: {
      type: 'translate-out-fade'
    }
  });

  app.plugins.createPopup({
    container: '.popup-video',
    trigger: '.popup-video-trigger',
    sticky: true,
    overlay: {
      color: '21, 21, 31',
      opacity: .96
    },
    animation: {
      type: 'translate-in-fade',
      speed: .3,
      translateOffset: 40
    }
  });

  app.plugins.createPopup({
    container: '.popup-picture',
    trigger: '.popup-picture-trigger',
    sticky: true,
    overlay: {
      color: '21, 21, 31',
      opacity: .96
    },
    animation: {
      type: 'translate-in-fade',
      speed: .3,
      translateOffset: 40
    }
  });

  const getLabelNumbers = function (count) {
    const labels = [];
    for (let i = 1; i <= count; i++) {
      const label = i < 10 ? `0${i}` : i.toString();
      labels.push(label);
    }

    return labels;
  };

  const getCompleterData = function (datasetsData, maxValue) {
    const completerData = (new Array(datasetsData[0].length)).fill(maxValue);

    for (let i = 0; i < datasetsData.length; i++) {
      for (let j = 0; j < datasetsData[i].length; j++) {
        completerData[j] -= datasetsData[i][j];
      }
    }

    return completerData;
  };

  /*------------------------
      ENGAGEMENTS CHART
  ------------------------*/
  app.querySelector('#engagements-chart', function (el) {
    const canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        datasets: [{
          data: [18.3, 5.2, 1.4, 3.9],
          backgroundColor: [
            '#615dfa',
            '#23d2e2',
            '#4f91ff',
            '#3ad2fe'
          ],
          hoverBackgroundColor: [
            '#615dfa',
            '#23d2e2',
            '#4f91ff',
            '#3ad2fe'
          ],
          borderWidth: 0
        }],
        labels: [
          'Reactions',
          'Comments',
          'Shares',
          'Replies'
        ]
      },
      chartOptions = {
        cutoutPercentage: 88,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          callbacks: {
            label: function (tooltipItem, data) {
              const labelText = data.datasets[0].data[tooltipItem.index] + 'K';

              return labelText;
            }
          }
        }
      };

    app.plugins.createChart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  });

  /*-------------------------------------
      VE MONTHLY REPORT RATIO CHART
  -------------------------------------*/
  app.querySelector('#ve-monthly-report-ratio-chart', function (el) {
    const canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        datasets: [{
          data: [12.5, 87.5],
          backgroundColor: [
            '#615dfa',
            '#23d2e2'
          ],
          hoverBackgroundColor: [
            '#615dfa',
            '#23d2e2'
          ],
          borderWidth: 0
        }],
        labels: [
          'Engagements',
          'Visits'
        ]
      },
      chartOptions = {
        cutoutPercentage: 74,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          callbacks: {
            label: function (tooltipItem, data) {
              const labelText = data.datasets[0].data[tooltipItem.index] + '%';

              return labelText;
            }
          }
        }
      };

    app.plugins.createChart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  });

  /*-------------------------------
      PROFILE COMPLETION CHART
  -------------------------------*/
  app.querySelector('#profile-completion-chart', function (el) {
    const canvas = el[0],
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 70, 140, 70);

    gradient.addColorStop(0, '#41efff');
    gradient.addColorStop(1, '#615dfa');

    const chartData = {
        datasets: [{
          data: [59, 41],
          backgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          hoverBackgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          borderWidth: 0
        }]
      },
      chartOptions = {
        cutoutPercentage: 88,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        animation: {
          animateRotate: false
        }
      };

    app.plugins.createChart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  });

  /*-----------------------------
      POSTS ENGAGEMENT CHART
  -----------------------------*/
  app.querySelector('#posts-engagement-chart', function (el) {
    const canvas = el[0],
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 40, 80, 40);

    gradient.addColorStop(0, '#41efff');
    gradient.addColorStop(1, '#615dfa');

    const chartData = {
        datasets: [{
          data: [87, 13],
          backgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          hoverBackgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          borderWidth: 0
        }]
      },
      chartOptions = {
        cutoutPercentage: 85,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        animation: {
          animateRotate: false
        }
      };

    app.plugins.createChart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  });

  /*-------------------------
      POSTS SHARED CHART
  -------------------------*/
  app.querySelector('#posts-shared-chart', function (el) {
    const canvas = el[0],
      ctx = canvas.getContext('2d'),
      gradient = ctx.createLinearGradient(0, 40, 80, 40);

    gradient.addColorStop(0, '#41efff');
    gradient.addColorStop(1, '#615dfa');

    const chartData = {
        datasets: [{
          data: [42, 58],
          backgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          hoverBackgroundColor: [
            gradient,
            '#e8e8ef'
          ],
          borderWidth: 0
        }]
      },
      chartOptions = {
        cutoutPercentage: 85,
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          enabled: false
        },
        animation: {
          animateRotate: false
        }
      };

    app.plugins.createChart(ctx, {
      type: 'doughnut',
      data: chartData,
      options: chartOptions
    });
  });

  /*------------------------------
      VE MONTHLY REPORT CHART
  ------------------------------*/
  app.querySelector('#ve-monthly-report-chart', function (el) {
    const datasetData1 = [20, 15, 22, 26, 12, 16, 24, 13, 17, 9, 26, 21, 14, 21, 17, 23, 30, 18, 24, 15, 28, 17, 13, 23, 16, 12, 23, 16, 24, 13, 22],
      datasetData2 = [9, 28, 6, 9, 17, 7, 16, 12, 10, 11, 12, 3, 13, 11, 8, 17, 13, 16, 5, 19, 14, 11, 26, 8, 4, 15, 16, 25, 5, 13, 12],
      canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        labels: getLabelNumbers(31),
        datasets: [{
            label: 'Engagements',
            data: datasetData1,
            maxBarThickness: 16,
            backgroundColor: '#615dfa'
          },
          {
            label: 'Visits',
            data: datasetData2,
            maxBarThickness: 16,
            backgroundColor: '#3ad2fe'
          },
          {
            data: getCompleterData([datasetData1, datasetData2], 55),
            maxBarThickness: 16,
            backgroundColor: '#e8e8ef'
          }
        ]
      },
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          displayColors: false,
          callbacks: {
            title: function () {}
          }
        },
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              display: false
            },
            ticks: {
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500
            }
          }],
          yAxes: [{
            stacked: true,
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500,
              max: 55,
              stepSize: 5
            }
          }]
        }
      };

    app.plugins.createChart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  });

  /*-----------------------------
      RC YEARLY REPORT CHART
  -----------------------------*/
  app.querySelector('#rc-yearly-report-chart', function (el) {
    const datasetData1 = [119, 142, 110, 122, 163, 139, 143, 110, 141, 121, 139, 190],
      datasetData2 = [98, 65, 132, 78, 112, 82, 100, 80, 100, 58, 48, 139],
      canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
            label: 'Reactions',
            data: datasetData1,
            fill: false,
            lineTension: 0,
            borderWidth: 4,
            borderColor: "#23d2e2",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: 'bevel',
            pointBorderColor: "#23d2e2",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 4,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#23d2e2",
            pointHoverBorderWidth: 4,
            pointRadius: 5,
            pointHitRadius: 10
          },
          {
            label: 'Comments',
            data: datasetData2,
            fill: false,
            lineTension: 0,
            borderWidth: 4,
            borderColor: "#4f91ff",
            borderCapStyle: 'bevel',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: 'bevel',
            pointBorderColor: "#4f91ff",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 4,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "#4f91ff",
            pointHoverBorderWidth: 4,
            pointRadius: 5,
            pointHitRadius: 10
          }
        ]
      },
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          displayColors: false,
          callbacks: {
            title: function () {}
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 14,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500
            }
          }],
          yAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false
            },
            ticks: {
              padding: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500,
              min: 20,
              max: 220,
              stepSize: 40
            }
          }]
        }
      };

    app.plugins.createChart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  });

  /*---------------------------
      VS PERFORMANCE CHART
  ---------------------------*/
  app.querySelector('#vs-performance-chart', function (el) {
    const datasetData1 = [140, 90, 155, 180],
      datasetData2 = [120, 25, 130, 110],
      canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        labels: ['Aug', 'Sep', 'Oct', 'Nov'],
        datasets: [{
            label: 'Views',
            data: datasetData1,
            maxBarThickness: 16,
            backgroundColor: '#615dfa'
          },
          {
            label: 'Sales',
            data: datasetData2,
            maxBarThickness: 16,
            backgroundColor: '#3ad2fe'
          }
        ]
      },
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          displayColors: false,
          callbacks: {
            title: function () {}
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500
            }
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            ticks: {
              display: false
            }
          }]
        }
      };

    app.plugins.createChart(ctx, {
      type: 'bar',
      data: chartData,
      options: chartOptions
    });
  });

  /*---------------------------
      EARNINGS REPORT CHART
  ---------------------------*/
  app.querySelector('#earnings-report-chart', function (el) {
    const datasetData = [0, 15, 0, 0, 0, 20, 10, 15, 40, 20, 25, 25, 15, 10, 20, 23, 23, 15, 30, 40, 30, 20, 25, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        labels: getLabelNumbers(31),
        datasets: [{
          label: 'Earnings',
          data: datasetData,
          lineTension: .5,
          borderWidth: 2,
          backgroundColor: 'rgba(35, 210, 226, .2)',
          borderColor: "#23d2e2",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'bevel',
          pointBorderColor: "#fff",
          pointBackgroundColor: "#23d2e2",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderColor: "#fff",
          pointHoverBackgroundColor: "#23d2e2",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 5
        }]
      },
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          displayColors: false,
          callbacks: {
            title: function () {}
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 14,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500
            }
          }],
          yAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false
            },
            ticks: {
              padding: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500,
              max: 55,
              stepSize: 5,
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          }]
        }
      };

    app.plugins.createChart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  });

  /*---------------------------
      MEMBERS REPORT CHART
  ---------------------------*/
  app.querySelector('#members-report-chart', function (el) {
    const datasetData = [8, 4, 8, 5, 10, 13, 11, 11, 13, 17, 5, 12],
      canvas = el[0],
      ctx = canvas.getContext('2d'),
      chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Members',
          data: datasetData,
          lineTension: 0,
          borderWidth: 2,
          backgroundColor: 'rgba(97, 93, 250, .1)',
          borderColor: "#615dfa",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0,
          borderJoinStyle: 'bevel',
          pointBorderColor: "#615dfa",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderColor: "#615dfa",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 5
        }]
      },
      chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodyFontFamily: "'Titillium Web', sans-serif",
          displayColors: false,
          callbacks: {
            title: function () {}
          }
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false,
              drawTicks: false
            },
            ticks: {
              padding: 14,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500
            }
          }],
          yAxes: [{
            gridLines: {
              color: "rgba(234, 234, 245, 1)",
              zeroLineColor: "rgba(234, 234, 245, 1)",
              drawBorder: false
            },
            ticks: {
              padding: 20,
              fontFamily: "'Rajdhani', sans-serif",
              fontColor: '#8f91ac',
              fontSize: 12,
              fontStyle: 500,
              max: 20,
              stepSize: 2,
              beginAtZero: true
            }
          }]
        }
      };

    app.plugins.createChart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });
  });

  /*--------------------
      HEADER SEARCH
  --------------------*/
  app.querySelector('#search-main', function (el) {
    const headerSearchDropdown = app.plugins.createDropdown({
      container: '.header-search-dropdown',
      offset: {
        top: 57,
        left: 0
      },
      animation: {
        type: 'translate-top'
      },
      controlToggle: true,
      closeOnWindowClick: false
    });

    const searchInput = el[0],
      breakpointWidth = 960;

    let previousValue = '';

    const hideSearchDropdownOnKey = function (e) {
      // ESC key pressed
      if (e.keyCode === 27) {
        headerSearchDropdown.hideDropdowns();
        previousValue = '';
        window.removeEventListener('keydown', hideSearchDropdownOnKey);
      }
    };

    const toggleSearchDropdown = function (e) {
      if (previousValue === '' && e.target.value !== '') {
        headerSearchDropdown.showDropdowns();
        window.addEventListener('keydown', hideSearchDropdownOnKey);
      } else if (e.target.value === '') {
        headerSearchDropdown.hideDropdowns();
        window.removeEventListener('keydown', hideSearchDropdownOnKey);
      }
      previousValue = e.target.value;
    };

    const interactiveInputAction = searchInput.parentElement.querySelector('.interactive-input-action');

    const hideSearchDropdown = function () {
      headerSearchDropdown.hideDropdowns();
      window.removeEventListener('keydown', hideSearchDropdownOnKey);
      previousValue = '';
    };

    if (window.innerWidth > breakpointWidth) {
      searchInput.addEventListener('input', toggleSearchDropdown);
      interactiveInputAction.addEventListener('click', hideSearchDropdown);
    }
  });

  /*----------------------
      HEADER DROPDOWNS
  ----------------------*/

  app.plugins.createDropdown({
    trigger: '.header-dropdown-trigger',
    container: '.header-dropdown',
    offset: {
      top: 64,
      right: 6
    },
    animation: {
      type: 'translate-top'
    }

  });

  app.plugins.createDropdown({
    trigger: '.header-settings-dropdown-trigger',
    container: '.header-settings-dropdown',
    offset: {
      top: 64,
      right: 22
    },
    animation: {
      type: 'translate-top'
    }
  });

  /*---------------------------
      HEADER PROGRESS BARS
  ---------------------------*/
  app.plugins.createProgressBar({
    container: '#logged-user-level',
    height: 4,
    lineColor: '#4a46c8'
  });

  app.plugins.createProgressBar({
    container: '#logged-user-level',
    height: 4,
    lineColor: '#41efff',
    scale: {
      start: 0,
      end: 100,
      stop: 62
    },
    linkText: true,
    linkUnits: 'exp',
    invertedProgress: true
  });

  app.plugins.createProgressBar({
    container: '#logged-user-level-cp',
    height: 4,
    lineColor: '#4a46c8'
  });

  app.plugins.createProgressBar({
    container: '#logged-user-level-cp',
    height: 4,
    lineColor: '#41efff',
    scale: {
      start: 0,
      end: 100,
      stop: 62
    },
    linkText: true,
    linkUnits: 'exp',
    invertedProgress: true
  });

  /*-------------------
      CONTENT GRID 
  -------------------*/
  app.querySelector('.content-grid', function (el) {
    const sidebar = {
        chat: {
          active: false,
          minWidth: 80,
          maxWidth: 300
        },
        navigation: {
          active: false,
          minWidth: 80,
          maxWidth: 300
        }
      },
      breakpointWidth = 1366;

    const updateGridPosition = function (contentGrid) {
      if (window.innerWidth > breakpointWidth) {
        const chatWidth = sidebar.chat.active ? sidebar.chat.maxWidth : sidebar.chat.minWidth,
          navigationWidth = sidebar.navigation.active ? sidebar.navigation.maxWidth : sidebar.navigation.minWidth,
          availableWidth = document.body.clientWidth - contentGrid.offsetWidth - chatWidth - navigationWidth,
          offsetX = (availableWidth / 2) + navigationWidth;

        contentGrid.style.transform = `translate(${offsetX}px, 0)`;
      } else {
        contentGrid.style.transform = `translate(0, 0)`;
      }
    };

    const updateGridPositions = function () {
      for (const grid of el) {
        updateGridPosition(grid);
      }
    };

    const setGridTransition = function (grid) {
      grid.style.transition = `transform .4s ease-in-out`;
    };

    const setGridTransitions = function () {
      for (const grid of el) {
        setGridTransition(grid);
      }
    };

    updateGridPositions();
    window.addEventListener('resize', updateGridPositions);
    // delay transition setup to avoid loading animation
    window.setTimeout(setGridTransitions, 300);

    /*-------------------
        CHAT WIDGET 
    -------------------*/
    app.querySelector('#chat-widget-messages', function (el) {
      const chatWidget = el[0],
        topOffset = 80,
        closedWidth = 80,
        openWidth = 300,
        chatWidgetMessages = chatWidget.querySelector('.chat-widget-messages'),
        chatWidgetForm = chatWidget.querySelector('.chat-widget-form'),
        chatWidgetButton = chatWidget.querySelector('.chat-widget-button'),
        closedClass = 'closed';

      const setChatMessagesDimensions = function () {
        if (chatWidget.classList.contains(closedClass)) {
          chatWidgetMessages.style.height = `${window.innerHeight - chatWidgetButton.offsetHeight - topOffset}px`;
        } else {
          chatWidgetMessages.style.height = `${window.innerHeight - chatWidgetForm.offsetHeight - chatWidgetButton.offsetHeight - topOffset}px`;
        }
      };

      const toggleChatWidget = function () {
        chatWidget.classList.toggle(closedClass);
        setChatMessagesDimensions();

        sidebar.chat.active = !chatWidget.classList.contains(closedClass);
        updateGridPositions();
      };

      const openChatWidget = function () {
        chatWidget.classList.remove(closedClass);
        setChatMessagesDimensions();

        sidebar.chat.active = true;
        updateGridPositions();
      };

      chatWidgetButton.addEventListener('click', toggleChatWidget);

      setChatMessagesDimensions();
      window.addEventListener('resize', setChatMessagesDimensions);

      app.querySelector('#chat-widget-message', function (el) {
        const chatMessageWidget = el[0],
          chatWidgetMessage = chatWidgetMessages.querySelectorAll('.chat-widget-message'),
          chatMessageWidgetHeader = chatMessageWidget.querySelector('.chat-widget-header'),
          chatMessageWidgetConversation = chatMessageWidget.querySelector('.chat-widget-conversation'),
          chatMessageWidgetCloseButton = chatMessageWidget.querySelector('.chat-widget-close-button'),
          hiddenClass = 'hidden';

        const setChatConversationDimensions = function () {
          chatMessageWidgetConversation.style.height = `${window.innerHeight - chatMessageWidgetHeader.offsetHeight - chatWidgetForm.offsetHeight - chatWidgetButton.offsetHeight - topOffset}px`;
        };

        const toggleChatMessageWidget = function () {
          chatMessageWidget.classList.toggle(hiddenClass);
        };

        const closeChatMessageWidget = function () {
          chatMessageWidget.classList.add(hiddenClass);
        };

        for (const widgetMessage of chatWidgetMessage) {
          widgetMessage.addEventListener('click', toggleChatMessageWidget);
          widgetMessage.addEventListener('click', openChatWidget);
        }

        chatWidgetButton.addEventListener('click', closeChatMessageWidget);
        chatMessageWidgetCloseButton.addEventListener('click', toggleChatMessageWidget);

        setChatConversationDimensions();
        window.addEventListener('resize', setChatConversationDimensions);
      });
    });

    /*------------------------
        NAVIGATION WIDGET 
    ------------------------*/
    app.querySelector('.navigation-widget-trigger', function (el) {
      const navigationTrigger = el[0],
        topOffset = 80,
        navigationWidget = document.querySelector('#navigation-widget'),
        navigationWidgetSmall = document.querySelector('#navigation-widget-small'),
        activeClass = 'active',
        hiddenClass = 'hidden',
        delayedClass = 'delayed';

      const setNavigationWidgetDimensions = function () {
        navigationWidget.style.height = `${window.innerHeight - topOffset}px`;
      };

      const toggleNavigationWidget = function () {
        navigationTrigger.classList.toggle(activeClass);

        navigationWidget.classList.toggle(delayedClass);
        navigationWidget.classList.toggle(hiddenClass);
        navigationWidgetSmall.classList.toggle(delayedClass);
        navigationWidgetSmall.classList.toggle(hiddenClass);

        sidebar.navigation.active = !navigationWidget.classList.contains(hiddenClass);
        updateGridPositions();
      };

      navigationTrigger.addEventListener('click', toggleNavigationWidget);

      setNavigationWidgetDimensions();
      window.addEventListener('resize', setNavigationWidgetDimensions);
    });

    /*-------------------------------
        NAVIGATION WIDGET MOBILE
    -------------------------------*/
    app.querySelector('.navigation-widget-mobile-trigger', function (el) {
      const navigationMobileTrigger = el[0],
        navigationWidgetMobile = document.querySelector('#navigation-widget-mobile'),
        navigationWidgetMobileCloseButton = navigationWidgetMobile.querySelector('.navigation-widget-close-button'),
        hiddenClass = 'hidden';

      const overlay = document.createElement('div');

      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.zIndex = 99998;
      overlay.style.backgroundColor = 'rgba(21, 21, 31, .96)';
      overlay.style.opacity = 0;
      overlay.style.visibility = 'hidden';
      overlay.style.transition = 'opacity .3s ease-in-out, visibility .3s ease-in-out';

      document.body.appendChild(overlay);

      const showOverlay = function () {
        overlay.style.opacity = 1;
        overlay.style.visibility = 'visible';
      };

      const hideOverlay = function () {
        overlay.style.opacity = 0;
        overlay.style.visibility = 'hidden';
      };

      const setNavigationWidgetMobileDimensions = function () {
        navigationWidgetMobile.style.height = `${window.innerHeight}px`;
      };

      const toggleNavigationWidgetMobile = function () {
        navigationWidgetMobile.classList.toggle(hiddenClass);

        const toggleOverlay = navigationWidgetMobile.classList.contains(hiddenClass) ? hideOverlay : showOverlay;
        toggleOverlay();
      };

      navigationMobileTrigger.addEventListener('click', toggleNavigationWidgetMobile);
      navigationWidgetMobileCloseButton.addEventListener('click', toggleNavigationWidgetMobile);
      overlay.addEventListener('click', toggleNavigationWidgetMobile);

      setNavigationWidgetMobileDimensions();
      window.addEventListener('resize', setNavigationWidgetMobileDimensions);
    });
  });

  /*-------------------
      CONTENT TABS
  -------------------*/
  app.plugins.createTab({
    triggers: '.tab-box-option',
    elements: '.tab-box-item'
  });

  /*------------------------
      CONTENT DROPDOWNS
  ------------------------*/
  app.plugins.createDropdown({
    trigger: '.widget-box-post-settings-dropdown-trigger',
    container: '.widget-box-post-settings-dropdown',
    offset: {
      top: 30,
      right: 9
    },
    animation: {
      type: 'translate-top',
      speed: .3,
      translateOffset: {
        vertical: 20
      }
    }
  });

  app.plugins.createDropdown({
    trigger: '.reaction-item-dropdown-trigger',
    container: '.reaction-item-dropdown',
    triggerEvent: 'hover',
    offset: {
      bottom: 38,
      left: -16
    },
    animation: {
      type: 'translate-bottom',
      speed: .3,
      translateOffset: {
        vertical: 20
      }
    }
  });

  app.plugins.createDropdown({
    trigger: '.reaction-options-dropdown-trigger',
    container: '.reaction-options-dropdown',
    triggerEvent: 'click',
    offset: {
      bottom: 54,
      left: -16
    },
    animation: {
      type: 'translate-bottom',
      speed: .3,
      translateOffset: {
        vertical: 20
      }
    },
    closeOnDropdownClick: true
  });

  app.plugins.createDropdown({
    trigger: '.reaction-options-small-dropdown-trigger',
    container: '.reaction-options-small-dropdown',
    triggerEvent: 'click',
    offset: {
      bottom: 30,
      left: -80
    },
    animation: {
      type: 'translate-bottom',
      speed: .3,
      translateOffset: {
        vertical: 16
      }
    },
    closeOnDropdownClick: true
  });

  app.plugins.createDropdown({
    trigger: '.post-settings-dropdown-trigger',
    container: '.post-settings-dropdown',
    offset: {
      bottom: 30,
      right: 0
    },
    animation: {
      type: 'translate-bottom',
      speed: .3,
      translateOffset: {
        vertical: 16
      }
    }
  });

  /*----------------------------
      CONTENT PROGRESS BARS
  ----------------------------*/
  /*-----------------------
      EXP TO NEXT LEVEL
  -----------------------*/
  app.plugins.createProgressBar({
    container: '#exp-to-next-level',
    height: 6,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#exp-to-next-level',
    height: 6,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 200,
      stop: 162
    },
    linkText: true,
    linkUnits: 'exp',
    invertedProgress: true,
    animateOnScroll: true
  });

  /*----------------
      BADGE ITEM
  ----------------*/
  app.plugins.createProgressBar({
    container: '#badge-bronze',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-bronze',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-silver',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-silver',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 100
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-gold',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-gold',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 500,
      stop: 461
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-platinum',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-platinum',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1000,
      stop: 461
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-traveller',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-traveller',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 5,
      stop: 4
    },
    invertedProgress: true,
    linkText: true,
    linkUnits: 'topics',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-caffeinated',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-caffeinated',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 0
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-upowered',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-upowered',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 42
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-scientist',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-scientist',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-ncreature',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-ncreature',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 100
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-warrior',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-warrior',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-liked',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-liked',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 500,
      stop: 462
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-sloved',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-sloved',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1000,
      stop: 462
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-qconq',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-qconq',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 4
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-villain',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-villain',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 89
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-age',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-age',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 730,
      stop: 605
    },
    invertedProgress: true,
    linkText: true,
    linkUnits: 'days',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-tstruck',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-tstruck',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 41
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-uexp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-uexp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 20,
      stop: 17
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-globet',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-globet',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 8
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-verifieds',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-verifieds',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-gempost',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-gempost',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 0
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-peoplesp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-peoplesp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 200,
      stop: 181
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-rulerm',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-rulerm',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 5,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-marketeer',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-marketeer',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 7
    },
    invertedProgress: true,
    linkText: true,
    linkUnits: 'items',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-tycoon',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-tycoon',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 32
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-mightiers',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-mightiers',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 26
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-phantom',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-phantom',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-forumsf',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-forumsf',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 20,
      stop: 13
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-fcultivator',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-fcultivator',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 33
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-splanner',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-splanner',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 25,
      stop: 9
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-collector',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-collector',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 5,
      stop: 2
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-prophoto',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-prophoto',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 500,
      stop: 24
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-rmachine',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-rmachine',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 41
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-bronzec',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-bronzec',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-silverc',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-silverc',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-goldc',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-goldc',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 1
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  app.plugins.createProgressBar({
    container: '#badge-platinumc',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#badge-platinumc',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 1,
      stop: 0
    },
    linkText: true,
    linkUnits: '/',
    emptyText: 'locked',
    completeText: 'unlocked!'
  });

  /*-------------------
      QUEST PREVIEW
  -------------------*/
  app.plugins.createProgressBar({
    container: '#quest-preview-nth',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-nth',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 65
    },
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-sk',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-sk',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 85
    },
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-bp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-bp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 32
    },
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-htp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-htp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 0
    },
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-sm',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-preview-sm',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 49
    },
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-sk',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-sk',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 8,
      stop: 7
    },
    linkText: true,
    linkUnits: '/'
  });

  app.plugins.createProgressBar({
    container: '#quest-fu',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-fu',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 50
    },
    linkText: true,
    linkUnits: '/'
  });

  app.plugins.createProgressBar({
    container: '#quest-nth',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-nth',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 67
    },
    linkText: true,
    linkUnits: '%'
  });

  app.plugins.createProgressBar({
    container: '#quest-sm',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-sm',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 5
    },
    linkText: true,
    linkUnits: '/'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-ps',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-ps',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 100
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-nth',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-nth',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 67
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-fu',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-fu',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 50,
      stop: 50
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-ph',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-ph',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 20,
      stop: 20
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-tr',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-tr',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 2
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-sk',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-sk',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 8,
      stop: 7
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-bp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-bp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 30,
      stop: 12
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-htp',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-htp',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 0
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#quest-line-sm',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#quest-line-sm',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 10,
      stop: 5
    },
    linkText: true,
    linkUnits: '/',
    animateOnScroll: true
  });

  /*------------------
      POLL RESULT
  ------------------*/
  app.plugins.createProgressBar({
    container: '#poll-result-1',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#poll-result-1',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 62
    },
    linkText: true,
    linkUnits: '%'
  });

  app.plugins.createProgressBar({
    container: '#poll-result-2',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#poll-result-2',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 27
    },
    linkText: true,
    linkUnits: '%'
  });

  app.plugins.createProgressBar({
    container: '#poll-result-3',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#poll-result-3',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 11
    },
    linkText: true,
    linkUnits: '%'
  });


  /*---------------------
      POST ENGAGEMENT
  ---------------------*/
  app.plugins.createProgressBar({
    container: '#post-engagement-1',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-1',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 89
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-2',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-2',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 74
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-3',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-3',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 53
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-4',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-4',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 48
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-5',
    height: 4,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#post-engagement-5',
    height: 4,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 100,
      stop: 21
    },
    linkText: true,
    linkUnits: '%',
    animateOnScroll: true
  });

  /*-----------------
      TOP COUNTRY
  -----------------*/
  app.plugins.createProgressBar({
    container: '#top-country-1',
    width: 178,
    height: 6,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#top-country-1',
    width: 178,
    height: 6,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 25362,
      stop: 25362
    },
    split: {
      parts: 30,
      gap: 2,
      color: '#fff'
    },
    linkText: true,
    linkUnits: false,
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#top-country-2',
    width: 178,
    height: 6,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#top-country-2',
    width: 178,
    height: 6,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 25362,
      stop: 18201
    },
    split: {
      parts: 30,
      gap: 2,
      color: '#fff'
    },
    linkText: true,
    linkUnits: false,
    animateOnScroll: true
  });

  app.plugins.createProgressBar({
    container: '#top-country-3',
    width: 178,
    height: 6,
    lineColor: '#e7e8ee'
  });

  app.plugins.createProgressBar({
    container: '#top-country-3',
    width: 178,
    height: 6,
    gradient: {
      colors: ['#615dfa', '#41efff']
    },
    scale: {
      start: 0,
      end: 25362,
      stop: 9567
    },
    split: {
      parts: 30,
      gap: 2,
      color: '#fff'
    },
    linkText: true,
    linkUnits: false,
    animateOnScroll: true
  });

  /*----------------------
      CONTENT SLIDERS
  ----------------------*/
  /*---------------------
      PROFILE HEADER 
  ---------------------*/
  app.plugins.createSlider({
    container: '#profile-header-social-links-slider',
    items: 4,
    fixedWidth: 32,
    gutter: 8,
    loop: false,
    nav: false,
    controlsContainer: '#profile-header-social-links-slider-controls',
    responsive: {
      481: {
        fixedWidth: 40,
        gutter: 12
      }
    }
  });

  /*-------------------------
      SECTION NAVIGATION
  -------------------------*/
  app.plugins.createSlider({
    container: '#section-navigation-slider',
    fixedWidth: 122,
    nav: false,
    loop: false,
    controlsContainer: '#section-navigation-slider-controls'
  });

  /*-------------------------
      SECTION NAVIGATION
  -------------------------*/
  app.plugins.createSlider({
    container: '#section-navigation-medium-slider',
    fixedWidth: 160,
    nav: false,
    loop: false,
    controlsContainer: '#section-navigation-medium-slider-controls'
  });

  /*------------------------
      USER STATS SLIDER
  ------------------------*/
  app.plugins.createSlider({
    container: '#user-stats-slider',
    fixedWidth: 113,
    nav: false,
    loop: false,
    controlsContainer: '#user-stats-slider-controls'
  });

  /*---------------------------
      REACTION STATS SLIDER
  ---------------------------*/
  app.plugins.createSlider({
    container: '#reaction-stats-slider',
    fixedWidth: 146,
    nav: false,
    loop: false,
    controlsContainer: '#reaction-stats-slider-controls'
  });

  /*---------------------------
      STAT BLOCK SLIDER
  ---------------------------*/
  app.plugins.createSlider({
    container: '#stat-block-slider',
    fixedWidth: 272,
    nav: false,
    loop: false,
    controlsContainer: '#stat-block-slider-controls'
  });

  /*-------------------
      STREAM SLIDER
  -------------------*/
  app.plugins.createSlider({
    container: '#stream-slider',
    fixedWidth: 184,
    gutter: 16,
    nav: false,
    controlsContainer: '#stream-slider-controls'
  });

  /*----------------
      STATS BOX
  ----------------*/
  app.plugins.createSlider({
    container: '#stats-box-slider-items',
    mode: 'gallery',
    nav: false,
    speed: 1000,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: '#stats-box-slider-controls'
  });

  /*--------------------
      REACTION STAT
  --------------------*/
  app.plugins.createSlider({
    container: '#reaction-stat-slider-items',
    nav: false,
    speed: 600,
    controlsContainer: '#reaction-stat-slider-controls'
  });

  /*-----------------
      BADGE STAT
  -----------------*/
  app.plugins.createSlider({
    container: '#badge-stat-slider-items',
    nav: false,
    loop: false,
    speed: 600,
    controlsContainer: '#badge-stat-slider-controls'
  });

  /*-------------------
      PRODUCT BOX
  -------------------*/
  app.plugins.createSlider({
    container: '#product-box-slider-items',
    mode: 'gallery',
    speed: 1000,
    autoplay: true,
    autoplayButtonOutput: false,
    controlsContainer: '#product-box-slider-controls',
    navContainer: '#product-box-slider-roster'
  });

  /*-------------------------
      USER PREVIEW STATS 
  -------------------------*/
  const createUserPreviewStatsSliders = function () {
    let i = 1;

    while (true) {
      const j = i < 10 ? `0${i}` : i;

      const upStatsSlider = app.plugins.createSlider({
        container: `#user-preview-stats-slides-${j}`,
        loop: false,
        controls: false,
        navContainer: `#user-preview-stats-roster-${j}`
      });

      if (!upStatsSlider) break;

      i++;
    }
  };

  createUserPreviewStatsSliders();

  const centerTinySlider = function (sliderInfo, itemWidth, gutterWidth) {
    sliderInfo.container.style.width = `${sliderInfo.slideCount * itemWidth + (sliderInfo.slideCount - 1) * gutterWidth}px`;
  };

  /*--------------------------------
      USER PREVIEW SOCIAL LINKS
  --------------------------------*/
  const createUserPreviewSocialLinksSliders = function () {
    let i = 1;

    while (true) {
      const j = i < 10 ? `0${i}` : i;

      const upSocialLinkSlider = app.plugins.createSlider({
        container: `#user-preview-social-links-slider-${j}`,
        items: 4,
        fixedWidth: 32,
        gutter: 8,
        loop: false,
        nav: false,
        controlsContainer: `#user-preview-social-links-slider-controls-${j}`
      });

      if (!upSocialLinkSlider) break;

      centerTinySlider(upSocialLinkSlider.getInfo(), 32, 8);

      i++;
    }
  };

  createUserPreviewSocialLinksSliders();

  /*-----------------
      FORM INPUT
  -----------------*/
  app.querySelector('.form-input', function (elements) {
    for (const el of elements) {
      if (el.classList.contains('always-active')) continue;

      const input = el.querySelector('input'),
        textarea = el.querySelector('textarea'),
        activeClass = 'active';

      let inputItem = undefined;

      if (input) inputItem = input;
      if (textarea) inputItem = textarea;

      if (inputItem) {
        inputItem.addEventListener('focus', function () {
          el.classList.add(activeClass);
        });

        inputItem.addEventListener('blur', function () {
          if (inputItem.value === '') {
            el.classList.remove(activeClass);
          }
        });
      }
    }
  });

  /*-------------------
      FORM COUNTER
  -------------------*/
  app.querySelector('.form-counter', function (counters) {
    for (const counter of counters) {
      const value = counter.querySelector('.form-counter-value'),
        increaseButton = counter.querySelector('.form-counter-control-increase'),
        decreaseButton = counter.querySelector('.form-counter-control-decrease'),
        increaseBy = counter.getAttribute('data-increase-by') ? Number.parseInt(counter.getAttribute('data-increase-by'), 10) : 1,
        minValue = counter.getAttribute('data-min') ? Number.parseInt(counter.getAttribute('data-min'), 10) : 1;

      const increaseValue = function () {
        value.innerHTML = Number.parseInt(value.innerHTML, 10) + increaseBy;
      };

      const decreaseValue = function () {
        if (Number.parseInt(value.innerHTML) === minValue) return;
        value.innerHTML = Number.parseInt(value.innerHTML, 10) - increaseBy;
      };

      increaseButton.addEventListener('click', increaseValue);
      decreaseButton.addEventListener('click', decreaseValue);
    }
  });

  /*-------------------
      FORM SWITCH
  -------------------*/
  app.querySelector('.form-switch', function (switchInputs) {
    for (const switchInput of switchInputs) {
      const toggleSwitch = function () {
        switchInput.classList.toggle('active');
      };

      switchInput.addEventListener('click', toggleSwitch);
    }
  });

  /*------------------
      FORM RATING
  ------------------*/
  app.querySelector('.form-rating', function (ratingInputs) {
    for (const ratingInput of ratingInputs) {
      const filledClass = 'filled',
        ratingItems = Array.from(ratingInput.children);

      const getStarsRating = function () {
        let rating = 0;

        for (const ratingItem of ratingItems) {
          if (ratingItem.classList.contains(filledClass)) {
            rating++;
          }
        }

        return rating;
      };

      const setStarsRating = function () {
        ratingInput.setAttribute('data-rating', getStarsRating());
      };

      const fillStar = function (item) {
        item.classList.add(filledClass);
      };

      const emptyStar = function (item) {
        item.classList.remove(filledClass);
      };

      const toggleStars = function () {
        const itemIndex = ratingItems.indexOf(this);

        for (let i = 0; i <= itemIndex; i++) {
          fillStar(ratingItems[i]);
        }

        for (let i = itemIndex + 1; i < ratingItems.length; i++) {
          emptyStar(ratingItems[i]);
        }

        setStarsRating();
      };

      for (const ratingItem of ratingItems) {
        ratingItem.addEventListener('click', toggleStars);
      }

      setStarsRating();
    }
  });

  /*------------------------
      INTERACTIVE INPUT
  ------------------------*/
  app.querySelector('.interactive-input', function (elements) {
    for (const el of elements) {
      const input = el.querySelector('input'),
        inputResetIcon = el.querySelector('.interactive-input-action'),
        activeClass = 'active';

      if (input) {
        let previousValue = '';

        const resetInputOnKey = function (e) {
          // ESC key pressed
          if (e.keyCode === 27) {
            input.value = '';
            setActiveClass();
            window.removeEventListener('keydown', resetInputOnKey);
          }
        };

        const setActiveClass = function () {
          if (previousValue === '' && input.value !== '') {
            el.classList.add(activeClass);
            window.addEventListener('keydown', resetInputOnKey);
          } else if (input.value === '') {
            el.classList.remove(activeClass);
            window.removeEventListener('keydown', resetInputOnKey);
          }
        };

        input.addEventListener('input', setActiveClass);

        if (inputResetIcon) {
          inputResetIcon.addEventListener('click', function () {
            input.value = '';
            input.focus();
            setActiveClass();
          });
        }
      }
    }
  });

  app.plugins.createTab({
    triggers: '.login-register-form-trigger',
    elements: '.login-register-form-element',
    animation: {
      type: 'slide-in-right'
    },
    onTabChange: function (activeTab) {
      const firstInput = activeTab.querySelector('input');

      firstInput.focus();
    }
  });
}
customInitFunctions();