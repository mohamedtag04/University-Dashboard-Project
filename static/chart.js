function fetchDataAndUpdateChart( div, index,chartType) {
    if(chartType == 1){
        fetch('/get-datachart')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    updateChart(data[index],div, chartType);
                } else {
                    console.error('Data array is empty or not an array.');
                }
            })
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 2){
        fetch('/get-data-tree-instructors')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 3){
        fetch('/get-data-pass-fail-csai')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 4){
        fetch('/get-gpa-dist')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 5){
        fetch('/get-majors-dist')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 6){
        fetch('/get-students-state')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 7){
        fetch('/get-survery-average')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 8){
      fetch('/get-correlation-sectors')
        .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 9){
      fetch('/get-genders')
      .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }
    else if (chartType == 10){
      fetch('/get-genders')
      .then(response => response.json())
            .then(data => {     
                    updateChart(data,div,chartType);
                }
            )
            .catch(error => console.error('Error:', error));
    }

}

function updateChart(row,div,chartType) {
 console.log(row)
// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
 am5.ready(function() {


    var root = am5.Root.new(div);
    
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    if (chartType == 1){
        var chart = root.container.children.push(am5radar.RadarChart.new(root, {
        panX: false,
        panY: false,
        startAngle: 160,
        endAngle: 380
        }));
        
        
        var axisRenderer = am5radar.AxisRendererCircular.new(root, {
        innerRadius: -40
        });
        
        axisRenderer.grid.template.setAll({
        stroke: root.interfaceColors.get("background"),
        visible: true,
        strokeOpacity: 0.8
        });
        
        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0,
        min: 60,
        max: 100,
        strictMinMax: true,
        renderer: axisRenderer
        }));
        
        
        // Add clock hand
        // https://www.amcharts.com/docs/v5/charts/radar-chart/gauge-charts/#Clock_hands
        var axisDataItem = xAxis.makeDataItem({});
        
        var clockHand = am5radar.ClockHand.new(root, {
        pinRadius: am5.percent(15),
        radius: am5.percent(100),
        bottomWidth: 20,
        topwidth:5
        })
        
        var bullet = axisDataItem.set("bullet", am5xy.AxisBullet.new(root, {
        sprite: clockHand
        }));
        
        xAxis.createAxisRange(axisDataItem);
        
        var label = chart.radarContainer.children.push(am5.Label.new(root, {
        fill: am5.color(0xffffff),
        centerX: am5.percent(50),
        textAlign: "center",
        centerY: am5.percent(50),
        fontSize: am5.percent(100)
            }));
        let val = row.value
        // Set initial value
    axisDataItem.set("value", 0);

    // Animate to final value
    axisDataItem.animate({ key: "value", to: val, duration: 1500 });
    var label2 = chart.children.push(am5.Label.new(root, {
        text: row.class, // Set text to row.class
        fill: am5.color(0x000000),
        x: am5.percent(47),
        y: am5.percent(90), // Position the label at the bottom of the chart
        textAlign: "center",
        fontSize: 18 // Adjust the font size as needed
    }));

        bullet.get("sprite").on("rotation", function () {
        var value = axisDataItem.get("value");
        var text = Math.round(axisDataItem.get("value")).toString();
        var fill = am5.color(0x000000);
        xAxis.axisRanges.each(function (axisRange) {
            if (value >= axisRange.get("value") && value <= axisRange.get("endValue")) {
            fill = axisRange.get("axisFill").get("fill");
            }
        })
        
        label.set("text", Math.round(value).toString());
        
        clockHand.pin.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        clockHand.hand.animate({ key: "fill", to: fill, duration: 500, easing: am5.ease.out(am5.ease.cubic) })
        });
        
        
        chart.bulletsContainer.set("mask", undefined);
        
        
        var bandsData = [{
        title: "C-",
        color: "#ee1f25",
        lowScore: 60,
        highScore: 65
        }, {
        title: "C",
        color: "#f04922",
        lowScore: 65,
        highScore: 70
        }, {
        title: "C+",
        color: "#fdae19",
        lowScore: 70,
        highScore: 75
        }, {
        title: "B-",
        color: "#f3eb0c",
        lowScore: 75,
        highScore: 80
        }, {
        title: "B",
        color: "#b0d136",
        lowScore: 80,
        highScore: 85
        }, {
        title: "B+",
        color: "#54b947",
        lowScore: 85,
        highScore: 90
        }, {
        title: "A-",
        color: "#0f9747",
        lowScore: 90,
        highScore: 95
        }, {
            title: "A",
            color: "#0f9747",
            lowScore: 95,
            highScore: 100
        }
    ];
        
        am5.array.each(bandsData, function (data) {
        var axisRange = xAxis.createAxisRange(xAxis.makeDataItem({}));
        
        axisRange.setAll({
            value: data.lowScore,
            endValue: data.highScore
        });
        
        axisRange.get("axisFill").setAll({
            visible: true,
            fill: am5.color(data.color),
            fillOpacity: 0.8
        });
        
        axisRange.get("label").setAll({
            text: data.title,
            inside: true,
            radius: 15,
            fontSize: "0.9em",
            fill: root.interfaceColors.get("background")
        });

        });
        
        
        // Make stuff animate on load
        chart.appear(1000, 100);
    }

    else if (chartType == 2){
        var data = row;
        var container = root.container.children.push(
            am5.Container.new(root, {
              width: am5.percent(100),
              height: am5.percent(100),
              layout: root.verticalLayout
            })
          );
          
          // Create series
          // https://www.amcharts.com/docs/v5/charts/hierarchy/#Adding
          var series = container.children.push(
            am5hierarchy.ForceDirected.new(root, {
              singleBranchOnly: false,
              downDepth: 0,
              topDepth: 0,
              maxRadius: 40,
              minRadius: 30,
              valueField: "value",
              categoryField: "name",
              childDataField: "children",
              idField: "name",
              linkWithStrength: 0.3,
              linkWithField: "linkWith",
              manyBodyStrength: -15,
              centerStrength: 0.5
            })
          );
          
          series.get("colors").set("step", 2);
          
          series.data.setAll([data]);
          series.set("selectedDataItem", series.dataItems[0]);
          
          // Make stuff animate on load
          series.appear(1000, 100);
    }

    else if (chartType == 3){
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: false,
            panY: false,
            wheelX: "panX",
            wheelY: "zoomX",
            paddingLeft: 0,
            layout: root.verticalLayout
          }));
          
          var data = row;
          
          // Create axes
          // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
          var yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 30, // adjust this value to get the desired label frequency
            minorGridEnabled: true
           });
           
          var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            categoryField: "course",
            renderer: yRenderer,
            tooltip: am5.Tooltip.new(root, {})
          }));
          
          yRenderer.grid.template.setAll({
            location: 1
          })
          
          yAxis.data.setAll(data);
          
          var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            min: 0,
            max: 100,
            numberFormat: "#'%'",
            strictMinMax: true,
            calculateTotals: true,
            renderer: am5xy.AxisRendererX.new(root, {
              strokeOpacity: 0.1
            })
          }));
          
          
          // Add legend
          // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
          var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.p50,
            x: am5.p50
          }));
          
          
          // Add series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          function makeSeries(name, fieldName) {
            var series = chart.series.push(am5xy.ColumnSeries.new(root, {
              name: name,
              stacked: true,
              xAxis: xAxis,
              yAxis: yAxis,
              valueXField: fieldName,
              valueXShow: "valueXTotalPercent",
              categoryYField: "course"
            }));
          
            series.columns.template.setAll({
              tooltipText: "{name}, {categoryX}:{valueYTotalPercent.formatNumber('#.#')}%",
              tooltipY: am5.percent(10)
            });
            series.data.setAll(data);
          
            // Make stuff animate on load
            // https://www.amcharts.com/docs/v5/concepts/animations/
            series.appear();
          
            series.bullets.push(function () {
              return am5.Bullet.new(root, {
                sprite: am5.Label.new(root, {
                  text: "{valueXTotalPercent.formatNumber('#.#')}%",
                  fill: root.interfaceColors.get("alternativeText"),
                  centerY: am5.p50,
                  centerX: am5.p50,
                  populateText: true
                })
              });
            });
          
            legend.data.push(series);
          }
          
          makeSeries("Passed", "passed");
          makeSeries("Failed", "failed");
          chart.appear(1000, 100);
    }

    else if (chartType == 4){
        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true,
            paddingLeft: 0
          }));
          
          
          // Add cursor
          // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        //   var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        //   cursor.lineY.set("visible", false);
          
          
          // Create axes
          // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
          var xRenderer = am5xy.AxisRendererX.new(root, {
            minGridDistance: 15,
          });
          
          xRenderer.labels.template.setAll({
            rotation: -90,
            centerY: am5.p50,
            centerX: 0
          });
          
          xRenderer.grid.template.setAll({
            visible: false
          });
          
          var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.5,
            categoryField: "gpa",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
          }));
          
          var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0.3,
            renderer: am5xy.AxisRendererY.new(root, {})
            }));
          
          
          // Create series
          // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
          var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "count",
            categoryXField: "gpa",
            adjustBulletPosition: false,
            tooltip: am5.Tooltip.new(root, {
              labelText: "{valueY}"
            })
          }));
          series.columns.template.setAll({
            width: 1
          });
          
          series.bullets.push(function() {
            return am5.Bullet.new(root, {
              locationY: 1,
              sprite: am5.Circle.new(root, {
                radius: 7,
                fill: series.get("fill")
              })
            })
          })
          
          
          // Set data
          var data = row;
          data.sort((a, b) => a.gpa - b.gpa);

          xAxis.data.setAll(data);
          series.data.setAll(data);
          
          
          // Make stuff animate on load
          // https://www.amcharts.com/docs/v5/concepts/animations/
          series.appear(1000);
          chart.appear(1000, 100);
    }

    else if (chartType == 5){
      var chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(50)
      }));
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      var series = chart.series.push(am5percent.PieSeries.new(root, {
        valueField: "count",
        categoryField: "major",
        alignLabels: false,
       }));
      
      series.labels.template.setAll({
        textType: "circular",
        centerX: 0,
        centerY: 0
      });
      
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll(row);
      
      
      // Create legend
      // https://www.amcharts.com/docs/v5/charts/percent-charts/legend-percent-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 15,
        marginBottom: 15,
      }));
      
      legend.data.setAll(series.dataItems);
      
      
      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      series.appear(1000, 100);
    }

    else if (chartType == 6){
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: "panX",
        wheelY: "zoomX",
        paddingLeft: 0,
        layout: root.verticalLayout
      }));
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      var data = row
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, {
        minorGridEnabled: true
      });
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        categoryField: "major",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      xRenderer.grid.template.setAll({
        location: 1
      })
      
      xAxis.data.setAll(data);
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        min: 0,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));
      
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = chart.children.push(am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50
      }));
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      function makeSeries(name, fieldName) {
        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: name,
          stacked: true,
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: fieldName,
          categoryXField: "major"
        }));
      
        series.columns.template.setAll({
          tooltipText: "{name}, {categoryX}: {valueY}",
          tooltipY: am5.percent(10)
        });
        series.data.setAll(data);
      
        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear();
      
        series.bullets.push(function () {
          return am5.Bullet.new(root, {
            sprite: am5.Label.new(root, {
              text: "{valueY}",
              fill: root.interfaceColors.get("alternativeText"),
              centerY: am5.p50,
              centerX: am5.p50,
              populateText: true
            })
          });
        });
      
        legend.data.push(series);
      }
      
      makeSeries("At risk", "At risk");
      makeSeries("Probation", "Probation");
      makeSeries("Safe", "Safe");
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
    }

    else if (chartType == 7){
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX: true,
        paddingLeft: 0
      }));
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
    //   var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
    //   cursor.lineY.set("visible", false);
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 15,
      });
      
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: 0
      });
      
      xRenderer.grid.template.setAll({
        visible: false
      });
      
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.5,
        categoryField: "major",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {}),
        min: 0,// Start value
        max : 5
        }));

      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "average",
        categoryXField: "major",
        adjustBulletPosition: false,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));
      series.columns.template.setAll({
        width: 1
      });
      
      series.bullets.push(function() {
        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: am5.Circle.new(root, {
            radius: 9,
            fill: series.get("fill"),
            strokeWidth : 11,
          })
        })
      })
      
      
      // Set data
      var data = row;
      xAxis.data.setAll(data);
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);
    }

    else if (chartType == 8){
      var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelY: "zoomXY",
        pinchZoomX:true,
        pinchZoomY:true
      }));
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
        min: 1,
        max : 4
      }));
      
      xAxis.children.moveValue(am5.Label.new(root, {
        text: "cCPA",
        x: am5.p50,
        centerX: am5.p50
      }), xAxis.children.length - 1);
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {
          inversed: false
        }),
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      yAxis.children.moveValue(am5.Label.new(root, {
        rotation: -90,
        text: "Highschool Grade (%)",
        y: am5.p50,
        centerX: am5.p50
      }), 0);
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        calculateAggregates: true,
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "y",
        valueXField: "x",
        valueField: "value",
        seriesTooltipTarget:"bullet",
        tooltip: am5.Tooltip.new(root, {
          pointerOrientation: "horizontal",
          labelText: "[bold]{title}[/]\nHighschool grade: {valueY.formatNumber('#.#')}\nGPA: {valueX.formatNumber('#.###')}"
        })
      }));
      
      series.strokes.template.set("visible", false);
      
      
      // Add bullet
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
      var circleTemplate = am5.Template.new({});
      circleTemplate.adapters.add("fill", function(fill, target) {
        var dataItem = target.dataItem;
        if (dataItem) {
          return am5.Color.fromString(dataItem.dataContext.color);
        }
        return fill
      });
      series.bullets.push(function() {
        var bulletCircle = am5.Circle.new(root, {
          radius: 5,
          fill: series.get("fill"),
          fillOpacity: 0.9
        }, circleTemplate);
        return am5.Bullet.new(root, {
          sprite: bulletCircle
        });
        
         
      });
      
    
      // Set data
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Setting_data
      series.data.setAll(row);
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        yAxis: yAxis,
        snapToSeries: [series]
      }));
      
      
      // Add scrollbars
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      chart.set("scrollbarY", am5.Scrollbar.new(root, {
        orientation: "vertical"
      }));
      
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);
    }
    else if (chartType == 9){
      var chart = root.container.children.push(am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout
      }));
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Series
      var series = chart.series.push(am5percent.PictorialStackedSeries.new(root, {
        alignLabels: true,
        orientation: "vertical",
        valueField: "value",
        categoryField: "gender",
        svgPath: "M53.5,476c0,14,6.833,21,20.5,21s20.5-7,20.5-21V287h21v189c0,14,6.834,21,20.5,21 c13.667,0,20.5-7,20.5-21V154h10v116c0,7.334,2.5,12.667,7.5,16s10.167,3.333,15.5,0s8-8.667,8-16V145c0-13.334-4.5-23.667-13.5-31 s-21.5-11-37.5-11h-82c-15.333,0-27.833,3.333-37.5,10s-14.5,17-14.5,31v133c0,6,2.667,10.333,8,13s10.5,2.667,15.5,0s7.5-7,7.5-13 V154h10V476 M61.5,42.5c0,11.667,4.167,21.667,12.5,30S92.333,85,104,85s21.667-4.167,30-12.5S146.5,54,146.5,42 c0-11.335-4.167-21.168-12.5-29.5C125.667,4.167,115.667,0,104,0S82.333,4.167,74,12.5S61.5,30.833,61.5,42.5z"
      }));
      
      series.labelsContainer.set("width", 100);
      series.ticks.template.set("location", 0.6);
      
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/sliced-chart/#Setting_data
      series.data.setAll(row);
      
      
      // Play initial series animation
      // https://www.amcharts.com/docs/v5/concepts/animations/#Animation_of_series
      chart.appear(1000, 100);
    }
    else if (chartType == 10){

      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          focusable: true,
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true
        })
      );
      
      var easing = am5.ease.linear;
      chart.get("colors").set("step", 3);
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          maxDeviation: 0.1,
          groupData: false,
          baseInterval: {
            timeUnit: "day",
            count: 1
          },
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 80,
            minorGridEnabled: true
          }),
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      
      function createAxisAndSeries(startValue, opposite) {
        var yRenderer = am5xy.AxisRendererY.new(root, {
          opposite: opposite
        });
        var yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(root, {
            maxDeviation: 1,
            renderer: yRenderer
          })
        );
      
        if (chart.yAxes.indexOf(yAxis) > 0) {
          yAxis.set("syncWithAxis", chart.yAxes.getIndex(0));
        }
      
        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        var series = chart.series.push(
          am5xy.LineSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            valueXField: "date",
            tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "horizontal",
              labelText: "{valueY}"
            })
          })
        );
      
        //series.fills.template.setAll({ fillOpacity: 0.2, visible: true });
        series.strokes.template.setAll({ strokeWidth: 1 });
      
        yRenderer.grid.template.set("strokeOpacity", 0.05);
        yRenderer.labels.template.set("fill", series.get("fill"));
        yRenderer.setAll({
          stroke: series.get("fill"),
          strokeOpacity: 1,
          opacity: 1
        });
      
        // Set up data processor to parse string dates
        // https://www.amcharts.com/docs/v5/concepts/data/#Pre_processing_data
        series.data.processor = am5.DataProcessor.new(root, {
          dateFormat: "yyyy-MM-dd",
          dateFields: ["date"]
        });
      
        series.data.setAll(generateChartData(startValue));
      }
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        xAxis: xAxis,
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);
      
      // add scrollbar
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      createAxisAndSeries(100, false);
      createAxisAndSeries(1000, true);
      createAxisAndSeries(8000, true);
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      chart.appear(1000, 100);
      
      // Generates random data, quite different range
      function generateChartData(value) {
        var data = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 100);
        firstDate.setHours(0, 0, 0, 0);
      
        for (var i = 0; i < 100; i++) {
          var newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + i);
      
          value += Math.round(
            ((Math.random() < 0.5 ? 1 : -1) * Math.random() * value) / 20
          );
      
          data.push({
            date: newDate,
            value: value
          });
        }
        return data;
      }
      
      }
      console.log(data);
      });

}


document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart("chartdiv",0,1);
    fetchDataAndUpdateChart("chartdiv1",1,1);
    fetchDataAndUpdateChart("chartdiv2",2,1);
    fetchDataAndUpdateChart("chartdiv3",3,1);
    fetchDataAndUpdateChart("chartdiv4",4,1);
    fetchDataAndUpdateChart("chartdiv5",5,1);
    fetchDataAndUpdateChart("chartdiv6",6,1);
    fetchDataAndUpdateChart("chartdiv7",7,1);
    fetchDataAndUpdateChart("chartdiv8",8,2);
    fetchDataAndUpdateChart("chartdiv9",9,3);
    fetchDataAndUpdateChart("chartdiv10",10,4);
    fetchDataAndUpdateChart("chartdiv11",11,5);
    fetchDataAndUpdateChart("chartdiv12",12,6);
    fetchDataAndUpdateChart("chartdiv13",13,7);
    fetchDataAndUpdateChart("chartdiv14",14,8);
    fetchDataAndUpdateChart("chartdiv15",15,9);
    fetchDataAndUpdateChart("chartdiv16",16,10);
});
 