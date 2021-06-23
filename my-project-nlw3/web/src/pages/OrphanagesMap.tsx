import React, { useEffect, useState } from 'react';
import { Map, TileLayer , Marker, Popup } from 'react-leaflet';

import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight} from 'react-icons/fi';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanagesMap.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}

function OrphanagesMap(){

    // useState - Armazena as informações que serão manipuladas pelo meu componente
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    // console.log(orphanages);


    useEffect(() => {
        api.get('/orphanagesList')
            .then(response => {
                // console.log(response.data);
                // const orphanages = response.data;
                setOrphanages(response.data);
            });
    }, []);


    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato no mapa.</h2>
                    <p>Muitas crianças estão esperando a sua visita :D</p>
                </header>

                <footer>
                    <strong>Sapucaia do Sul</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            
            <Map
            center={[-29.8421919,-51.14664]}
            zoom={15} 
            style={{ width:'100%', height:'100%' }}
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                {/* Precisa de um token de acesso do mapbox, para usar o MapBox */}
                {/* <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                /> */}

                {orphanages.map(orphanage => {
                    // -29.8434157,-51.1418192
                    return (
                        <Marker 
                        icon={mapIcon}
                        position={[orphanage.latitude , orphanage.longitude]}
                        key={orphanage.id}
                        >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanagesList/${orphanage.id}`}>
                                <FiArrowRight size={20} color="#FFF" />
                            </Link>
                        </Popup>
                        </Marker>
                    )})
                }
               
            </Map>
            
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size ={32} color="FFF" />
            </Link> 
        </div>
    );
}

export default OrphanagesMap;