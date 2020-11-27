import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactEcharts from 'echarts-for-react';
import { Grid, Link, Typography, useTheme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },

  selectAllButton: {
    ...theme.typography.caption,
    cursor: 'pointer',
  },
}));

function __generateDefaultConfig(
  { tooltipFormatter, xAxisFormatter = (v) => v, yAxisFormatter = (v) => v },
  data,
  theme
) {
  return {
    grid: {
      left: theme.spacing(0),
      top: theme.spacing(0),
      right: theme.spacing(0),
      bottom: theme.spacing(0),
    },
    color: [theme.palette.secondary.main],
    legend: {
      orient: 'horizontal',
      left: theme.spacing(1),
      bottom: -theme.spacing(0.5),
      align: 'left',
      itemGap: theme.spacing(3),
      icon: 'circle',
      itemWidth: theme.spacing(1),
      itemHeight: theme.spacing(1),
      // TODO: as prop
      formatter: function (name) {
        return name.toUpperCase();
      },
      textStyle: {
        ...theme.typography.charts,
        color: theme.palette.text.primary,
        lineHeight: 1,
        verticalAlign: 'bottom',
        padding: [0, 0, 0, theme.spacing(1.5)]
      },
      inactiveColor: theme.palette.text.disabled,
    },
  };
}

function __generateSerie(name, data, theme, height, backgroundColor) {
  return [
    {
      type: 'pie',
      name,
      data: data.map(item => {
        if (item.color) {
          return {
            ...item,
            itemStyle: { color: item.color },
          }
        }
        return item;
      }),
      radius: ['59%', '70%'],
      selectedOffset: 0,
      label: {
        formatter: '{per|{d}%}\n{b|{b}}',
        show: false,
        position: 'center',
        backgroundColor: backgroundColor, // TODO: as prop
        width: (53 / 100) * height,
        rich: {
          b: {
            fontFamily: theme.typography.charts.fontFamily,
            fontSize: theme.spacing(1.75),
            lineHeight: theme.spacing(1.75),
            fontWeight: 'normal',
            color: theme.palette.text.primary,
          },
          per: {
            ...theme.typography,
            fontSize: theme.spacing(3),
            lineHeight: theme.spacing(4.5),
            fontWeight: 600,
            color: theme.palette.text.primary,
          }
        }
      },
      emphasis: {
        label: {
          show: true,
        },
      },
    },
  ];
}

const EchartsWrapper = React.memo(
  ReactEcharts,
  ({ option: optionPrev }, { option: optionNext }) => __dataEqual(optionPrev, optionNext)
);

function PieWidgetUI (props) {
  const theme = useTheme();
  const {
    name,
    data = [],
    tooltipFormatter,
    height,
    backgroundColor,
  } = props;

  const chartInstance = useRef();
  const options = useMemo(() => {
    const config = __generateDefaultConfig(
      { tooltipFormatter },
      data,
      theme
    );
    const series = __generateSerie(name, data, theme, height, backgroundColor);
    return Object.assign({}, config, { series });
  }, [
    data,
    name,
    theme,
    tooltipFormatter,
  ]);

  // console.log(chartInstance)
  // const echart = chartInstance.current.getEchartsInstance();
  // echart.on('legendselectchanged', function (params) {
  //   console.log(params);
  // });

  const clickEvent = (params) => {
    // TODO
    console.log(params);
  };

  const mouseoverEvent = (params) => {
    // TODO
  };
  
  const mouseoutEvent = (params) => {
    // TODO
  };

  const onEvents = {
    click: clickEvent,
    mouseover: mouseoverEvent,
    mouseout: mouseoutEvent,
  };

  return (
    <div>
      <EchartsWrapper
        ref={chartInstance}
        option={options}
        onEvents={onEvents}
        lazyUpdate={true}
        style={{ height }}
      />
    </div>
  );
}

PieWidgetUI.defaultProps = {
  tooltipFormatter: (v) => v,
  name: null,
  height: 200,
  backgroundColor: '#ff0000'
};

PieWidgetUI.propTypes = {
  data: PropTypes.array.isRequired,
  tooltipFormatter: PropTypes.func,
  name: PropTypes.string,
  height: PropTypes.number,
  backgroundColor: PropTypes.string,
};

export default PieWidgetUI;