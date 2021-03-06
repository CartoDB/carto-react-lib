import { getScatter } from '../../src/models/ScatterPlotModel';
import { Methods, executeTask } from '@carto/react-workers';

jest.mock('@carto/react-workers', () => ({
  executeTask: jest.fn(),
  Methods: {
    VIEWPORT_FEATURES_SCATTERPLOT: 'viewportFeaturesScatterPlot'
  }
}));

const features = (xColumn, yColumn) => [
  {
    [xColumn]: 1,
    [yColumn]: 2
  },
  {
    [xColumn]: 2,
    [yColumn]: 4
  },
  {
    [xColumn]: 3,
    [yColumn]: 6
  }
];

describe('getScatter', () => {
  test('should throw with array data', async () => {
    await expect(getScatter({ data: [] })).rejects.toThrow(
      'Array is not a valid type to get scatter'
    );
  });

  describe('should correctly handle viewport features', () => {
    const scatterPlotParams = {
      xAxisColumn: 'x',
      yAxisColumn: 'y',
      filters: {},
      dataSource: 'whatever-data-source'
    };

    test('correctly returns data', async () => {
      const viewportFeatures = features('x', 'y');
      const values = viewportFeatures.map((f) => [f.x, f.y]);
      executeTask.mockImplementation(() => Promise.resolve(values));

      const histogram = await getScatter(scatterPlotParams);
      expect(histogram).toEqual(values);
    });

    test('correctly called', async () => {
      const { filters, xAxisColumn, yAxisColumn, dataSource } = scatterPlotParams;
      await getScatter(scatterPlotParams);
      expect(executeTask).toHaveBeenCalledWith(
        dataSource,
        Methods.VIEWPORT_FEATURES_SCATTERPLOT,
        { filters, xAxisColumn, yAxisColumn }
      );
    });
  });

  // test('should filter viewport features - "viewportFilter" prop is true', async () => {
  //   const viewportFeatures = features('x', 'y');
  //   const values = viewportFeatures.map((f) => [f.x, f.y]);
  //   executeTask.mockImplementation(() => Promise.resolve(values));
  //   const params = {
  //     type: SourceTypes.SQL,
  //     xAxisColumn: 'x',
  //     yAxisColumn: 'y',
  //     viewportFilter: true,
  //     viewportFeatures
  //   };
  //   const scatterData = await getScatter(params);
  //   expect(scatterData).toEqual(values);
  // });
});
