"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useEffect } from "react"

// Fix icon mặc định của Leaflet bị lỗi trong Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function MapView() {
    const markers = [
        { id: 1, name: "Nguyễn Văn A", crime: "Giết người", coords: [10.776, 106.700] },
        { id: 2, name: "Trần Văn B", crime: "Cướp tài sản", coords: [21.027, 105.834] },
        { id: 3, name: "Lê Thị C", crime: "Buôn bán ma túy", coords: [16.047, 108.206] },
        { id: 4, name: "Phạm Văn D", crime: "Trộm cắp", coords: [10.045, 105.746] },
    ]

    useEffect(() => {
        // Cập nhật kích thước map khi render lần đầu
        setTimeout(() => window.dispatchEvent(new Event("resize")), 300)
    }, [])

    return (
        <MapContainer
            center={[16.047, 108.206]}
            zoom={6}
            scrollWheelZoom={true}
            className="h-full w-full rounded-lg"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {markers.map((m) => (
                <Marker key={m.id} position={m.coords as [number, number]}>
                    <Popup>
                        <div className="text-sm">
                            <b>{m.name}</b>
                            <br />
                            Tội danh: {m.crime}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
