import { DataFilterExtension } from '@deck.gl/extensions';
import useViewportFeatures from './useViewportFeatures';
import { applyFilter } from './Filter';
import { debounce } from '../utils/debounce';

export default function useCartoLayerFilterProps(source, uniqueId = 'cartodb_id') {
    const [onViewportLoad] = useViewportFeatures(source, uniqueId);

    return {
        onViewportLoad: debounce(onViewportLoad),
        getFilterValue: applyFilter({ filters: source?.filters, type: 'number' }),
        filterRange: [1, 1],
        extensions: [new DataFilterExtension({ filterSize: 1 })],
        updateTriggers: {
            getFilterValue: source?.filters
        },
    };
};