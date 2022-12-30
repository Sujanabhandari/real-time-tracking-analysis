import { useEffect, useState } from 'react';
import './App.css';
import DataHeatMap from './components/DataHeatMap';
import LineGraph from './components/LineGraph';
import { getLists } from './utils/utils';
import FilterInstance from './components/FilterInstance';
import axios from 'axios';

function App() {
    const [targetId, setTargetid] = useState(null);
    const [heatMapData, setHeatMapData] = useState([]);
    const lineData = getLists(heatMapData);
    const instances = Object.keys(lineData);

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const { data } = await axios.get(
                    'http://localhost:3001/api/alldata'
                );
                setHeatMapData(data);
            } catch (error) {
                console.log(error);
            }
        };
        getEmployee();
    }, []);

    return (
        <>
            <div className="bg-primary py-5 w-auto d-flex align-items-center justify-content-center">
                <h3 className="text-white">Welcome to Dashboard</h3>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <FilterInstance
                            instances={instances}
                            setTargetid={setTargetid}
                        />
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="col">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="heatmap-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#heatmap-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="heatmap-tab-pane"
                                    aria-selected="true">
                                    Heatmap
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="linegraph-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#linegraph-tab-pane"
                                    type="button"
                                    role="tab"
                                    aria-controls="linegraph-tab-pane"
                                    aria-selected="false">
                                    Line Graph
                                </button>
                            </li>
                        </ul>
                        <div
                            className="tab-content border border-info"
                            id="myTabContent">
                            <div
                                className="tab-pane fade show active p-3"
                                id="heatmap-tab-pane"
                                role="tabpanel"
                                aria-labelledby="heatmap-tab"
                                tabIndex="0">
                                <DataHeatMap
                                    data={heatMapData}
                                    targetId={targetId}
                                />
                            </div>
                            <div
                                className="tab-pane fade"
                                id="linegraph-tab-pane"
                                role="tabpanel"
                                aria-labelledby="linegraph-tab"
                                tabIndex="0">
                                <LineGraph
                                    data={lineData}
                                    targetId={targetId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col text-secondary h5">
                        This app has two heatmap (x and y coordinates) and line
                        graph (x position over time) for several instances.
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
