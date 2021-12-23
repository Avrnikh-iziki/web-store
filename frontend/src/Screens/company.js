import React, { useEffect, useState } from 'react';
import './company.css';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import Fotter from '../components/Fotter';
import axios from 'axios'
import Loadingpopup from '../popup/Loadingpopup'


const Company = () => {
    const [position, setPosition] = useState([31.6233775, -8.0636727])
    const [companydes, setcompanydes] = useState("")
    const [videourl, setvideourl] = useState("")
    const [name, setname] = useState("")
    const [employer, setemployer] = useState([])


    useEffect(() => {
        try {
            axios
                .get("/api/company")
                .then(res => {
                    const { company } = res.data;
                    if (company !== undefined) {
                        setcompanydes(company[0].description)
                        setvideourl(company[0].imageUrl)
                        setname(company[0].name)
                    }
                })

            axios
                .get("/api/employer")
                .then((res) => {
                    const { employer } = res.data
                    if (employer) {
                        setemployer(employer)
                    }
                })

        } catch (err) {
            throw (err)
        }
    }, [])

    const duckIcon = (image, a, b) => new L.Icon({
        iconUrl: image,
        iconSize: [a, b]
    });
    const LocationMarker = () => {
        const map = useMapEvents({
            click() { map.locate() },
            locationfound(e) {
                setPosition(e.latlng)
                map.flyTo(e.latlng, map.getZoom())
            },
        })
        return position === null
            ? null
            : (
                <>
                    <Marker position={position} icon={duckIcon('/Gimage/red_marker.png', 40, 30)} >
                        <Popup > you are her</Popup>
                    </Marker>
                    <Marker position={[31.6233775, -8.0636727]} icon={duckIcon('/Gimage/b_marker.png', 30, 25)}  >
                        <Popup>A v r n i k h</Popup>
                    </Marker>
                </>
            )
    }
    return ((employer === "" || videourl === "")
        ? < Loadingpopup />
        : <div>
            <div className="map">

                <MapContainer
                    center={position}
                    zoom={5}
                    minZoom={3}
                    scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <LocationMarker />
                </MapContainer>
            </div>

            <div className=" container company">
                <hr />
                <h3>how we are !</h3>
                <div className="des-and-video" >
                    <div className="video" >
                        <img src={videourl} alt="company" className="ima" />
                    </div>
                    <div className="des">
                        <h3>{name}</h3>
                        {companydes}
                    </div>
                </div>
                <hr />

                <h3>Our Team</h3>
                < div className="team" id="test">
                    {
                        employer.map((el, index) =>
                            <div className="team-iner" key={index}>
                                <div className="div-co">
                                    <div className="team-photo">
                                        <div className="be-image" style={{ backgroundImage: `url(${el.imageUrl})`, backgroundSize: "100% 100%" }}>
                                        </div>
                                    </div>
                                </div>
                                <div className="team-detail">
                                    <p>{el.name}</p>
                                    {el.description}
                                </div>
                            </div>)
                    }
                </div>
            </div>
            <Fotter />
        </div>
    )
}
export default Company