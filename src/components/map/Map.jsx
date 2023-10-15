import React, { Component } from "react";
import { Map, TileLayer, Popup, Marker, Polygon } from "react-leaflet";
import axios from "axios";

import seacrhIcon from "./search.svg";
import loadIcon from "./Subtract.svg";
import styles from "./styles.module.scss";

class MapExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      userLocation: null,
      searchQuery: "",
      polygonCoordinates: this.props.polygonCoordinates,
      selectedFile: null,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMarkerReset = this.handleMarkerReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleUploadFile = () => {
    const { selectedFile } = this.state;

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      axios
        .post("http://213.159.214.106:5000//upload file", formData, {
          "Content-Type": "multipart/form-data", // Adjust the content type for file uploads.
          "Access-Control-Allow-Origin": "*", // Replace with the appropriate origin.
        })
        .then((response) => {
          console.log("Файл успешно загружен:", response);
          this.props.setRes(response.data);
        })
        .catch((error) => {
          console.error("Ошибка загрузки файла:", error);
        });
    } else {
      console.log("Не выбран файл для загрузки.");
    }
  };

  handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    this.setState({ selectedFile }, () => {
      this.handleUploadFile();
    });
  };

  handleSubmit = async () => {
    const { polygonCoordinates, searchQuery } = this.state;

    if (polygonCoordinates.length > 0 || searchQuery !== "") {
      const postData = {
        coords: polygonCoordinates,
        locality: searchQuery,
      };

      await axios
        .post("http://213.159.214.106:5000/processing", postData)
        .then((response) => {
          this.props.setRes(response.data);
        })
        .catch((error) => {
          this.props.setRes(error);
        });
    } else {
      console.log("Поля не заполнены");
    }
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        this.setState({ userLocation: { lat: latitude, lng: longitude } });
      },
      (error) => {
        console.error("Error getting user location: ", error);
      }
    );
  }
  handleInput(e) {
    this.setState({ searchQuery: e.target.value });
  }

  handleClick(e) {
    const newMarker = {
      position: e.latlng,
      key: Date.now(),
    };

    this.setState((prevState) => ({
      markers: [...prevState.markers, newMarker],
    }));

    // Добавить координаты маркера в полигон
    this.setState((prevState) => ({
      polygonCoordinates: [...prevState.polygonCoordinates, newMarker.position],
    }));
    this.props.setPolygonCoordinates(this.state.polygonCoordinates);
  }
  handleMarkerClick(key) {
    this.setState((prevState) => ({
      markers: prevState.markers.filter((marker) => marker.key !== key),
      polygonCoordinates: prevState.markers.map((marker) => marker.position),
    }));
    this.props.setPolygonCoordinates(this.state.polygonCoordinates);
  }
  handleMarkerReset() {
    this.setState(() => ({
      markers: [],
      polygonCoordinates: [],
    }));
    this.props.setPolygonCoordinates(this.state.polygonCoordinates);
  }
  handleSearch() {
    const { searchQuery } = this.state;
    this.props.setSearchParam(searchQuery);
    axios
      .get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery}`
      )
      .then((response) => {
        if (response.data && response.data[0]) {
          const result = response.data[0];
          console.log(result);
          const newMarker = {
            position: {
              lat: parseFloat(result.lat),
              lng: parseFloat(result.lon),
            },
            key: Date.now(),
          };

          // Add the new marker to the map
          this.setState((prevState) => ({
            markers: [],
            polygonCoordinates: [],
          }));

          // Update the center of the map to the new location
          this.setState({ userLocation: newMarker.position });
        } else {
          console.log("No results found for the search query.");
        }
      })
      .catch((error) => {
        console.error("Error searching: ", error);
      });
  }

  render() {
    const { userLocation, searchQuery } = this.state;

    return (
      <div className={styles.map}>
        <div className={styles.navBar}>
          <div className={styles.search}>
            <input
              className={styles.search_inp}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                this.setState({ searchQuery: e.target.value });
              }}
              placeholder="Search for a location"
            />
            <button className={styles.search_btn} onClick={this.handleSearch}>
              <img src={seacrhIcon} />
            </button>
          </div>

          <Map
            className={styles.map}
            center={userLocation || this.props.center}
            zoom={this.props.zoom}
            onClick={this.handleClick}
          >
            <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />

            {this.state.markers.map((marker) => (
              <Marker
                key={marker.key}
                position={marker.position}
                onClick={() => this.handleMarkerClick(marker.key)}
              >
                <Popup position={marker.position}>
                  Marker location:{" "}
                  <pre>{JSON.stringify(marker.position, null, 2)}</pre>
                </Popup>
              </Marker>
            ))}
            <Polygon
              positions={this.state.polygonCoordinates}
              color="#11C5E5"
            />
          </Map>
          <div className={styles.buttons}>
            <label className={styles.upload_label}>
              Добавить данные для обработки{" "}
              <img className={styles.upload_icon} src={loadIcon} />
              <input
                className={styles.upload_inp}
                onChange={this.handleFileChange}
                type="file"
              ></input>
            </label>
            <div className={styles.flexRow}>
              <button className={styles.submit_btn} onClick={this.handleSubmit}>
                Начать анализ
              </button>{" "}
              <button
                className={styles.reset_btn}
                onClick={this.handleMarkerReset}
              >
                Сброс
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MapExample;
