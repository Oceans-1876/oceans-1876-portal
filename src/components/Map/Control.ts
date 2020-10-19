import mapboxgl from 'mapbox-gl';

export const createControl = (container: HTMLElement): mapboxgl.IControl =>
    new (class Control {
        map: mapboxgl.Map | undefined;

        _container: HTMLElement;

        onAdd(map: mapboxgl.Map) {
            this.map = map;
            this._container = container;
            this._container.classList.add('mapboxgl-ctrl');
            this._container.classList.remove('hidden');
            return this._container;
        }

        onRemove() {
            this._container.parentNode?.removeChild(this._container);
            this.map = undefined;
        }
    })();
