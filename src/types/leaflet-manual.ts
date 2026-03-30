export interface LeafletMap {
    flyTo(latLng: [number, number], zoom: number, options?: Record<string, unknown>): void;
    flyTo(latLng: [number, number], zoom: number, options?: Record<string, unknown>): void;
    on(event: string, handler: (...args: unknown[]) => void): void;
    off(event: string, handler: (...args: unknown[]) => void): void;
    removeLayer(layer: unknown): void;
    getCenter(): { lat: number; lng: number };
    setView(center: [number, number], zoom: number): LeafletMap;
}

export interface LeafletMarker {
    setLatLng(latLng: { lat: number; lng: number } | [number, number]): void;
    bindPopup(content: string, options?: Record<string, unknown>): LeafletMarker;
    setPopupContent(content: string): LeafletMarker;
    openPopup(): void;
    getLatLng(): { lat: number; lng: number };
    on(event: string, handler: (...args: unknown[]) => void): void;
    addTo(map: LeafletMap): LeafletMarker;
}

export interface LeafletLayerGroup {
    clearLayers(): void;
    addLayer(layer: unknown): LeafletLayerGroup;
    addTo(map: LeafletMap): LeafletLayerGroup;
}

export interface LeafletWindow {
    L?: {
        marker: (...args: unknown[]) => LeafletMarker;
        icon: (...args: unknown[]) => unknown;
        divIcon: (...args: unknown[]) => unknown;
        map: (...args: unknown[]) => LeafletMap;
        tileLayer: (...args: unknown[]) => { addTo(map: LeafletMap): void };
        layerGroup: (...args: unknown[]) => LeafletLayerGroup;
        control: { zoom: (...args: unknown[]) => { addTo(map: LeafletMap): void } };
        DomEvent: { stopPropagation: (e: unknown) => void };
    };
}
