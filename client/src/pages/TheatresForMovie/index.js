import React, { useEffect, useState } from "react";

import { Col, Row, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { GetMovieById } from "../../apicalls/movies";

function TheatresForMovie() {
  const [movie, setMovie] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetMovieById(id);

      if (response.success) {
        setMovie(response.data);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    movie && (
      <div>
        {/* Movies info */}
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl">
              {movie.title}({movie.language})
            </h1>
            <h1 className="text-md">Duration:{movie.duration} mins</h1>
            <h1 className="text-md">
              Release Date:{moment(movie.releaseDate).format("MMM Do yyyy")}
            </h1>
            <h1 className="text-md">Genre:{movie.genre}</h1>
          </div>
        </div>
        <div></div>
      </div>
    )
    // <h1>Theatres</h1>
  );
}

export default TheatresForMovie;
