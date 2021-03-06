import React from "react";
import propTypes from "prop-types";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import { Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

const plugins = [
  {
    beforeDraw: function (chart) {
      var { ctx } = chart;

      if (chart.config.options.elements.center) {
        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || "Verdana";
        var txt = centerConfig.text;
        var color = centerConfig.color || "#000";
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated =
          (sidePadding / 100) * (chart.innerRadius * 2);

        ctx.font = "3.5vh " + fontStyle;

        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = chart.innerRadius * 2;

        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;

        if (minFontSize === undefined) {
          minFontSize = 20;
        }

        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }

        // Set font settings to draw it correctly.
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;

        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }

        var words = txt.split(" ");
        var line = "";
        var lines = [];

        // Break words up into multiple lines if necessary
        for (var word of words) {
          var lineWithWord = line + word + " ";
          var wordWidth = ctx.measureText(lineWithWord).width;

          if (wordWidth > elementWidth) {
            lines.push(line);
            line = word + " ";
          } else {
            line = lineWithWord;
          }
        }

        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;

        for (var lineToFill of lines) {
          ctx.fillText(lineToFill, centerX, centerY);
          centerY += lineHeight;
        }

        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    },
  },
];

function BalanceChart(props) {

  const { data, style } = props;
  const legendFontSize = props.legendFontSize || 14;
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "85%",
    borderRadius: 30,
    hover: { mode: null },
    tooltips: { enabled: false },
    elements: {
    },
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "white",
          font: {
            weight: "bold",
            size: legendFontSize,
          },
          boxWidth: legendFontSize,
        },
        onClick: function () {
          // Do nothing to override the parent function
        },
      },
    },
  };

  return (
    <>
      { data.datasets[0].data.length > 0 ? (
        <Doughnut data={data} options={options} plugins={plugins} style={style} />
      ) : (
        <Alert color="warning">
         <FontAwesomeIcon icon={faCoins} /> No tokens found !
        </Alert>
      )}
    </>
  );
}

BalanceChart.propTypes = {
  legendFontSize: propTypes.number,
  data: propTypes.object.isRequired,
  style: propTypes.object.isRequired
};

export default BalanceChart;
