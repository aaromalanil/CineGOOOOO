import React, { useEffect, useState } from "react";

import { Col, Row, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { GetAllMovies } from "../../apicalls/movies";
import { useNavigate } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllMovies();
      if (response.success) {
        setMovies(response.data);
        getData();
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
    <div>
      <input
        type="text"
        className="Search-input"
        placeholder="Search for movies"
      />
      <Row gutter={20} className="mt-2">
        {movies.map((movie) => (
          <Col span={6}>
            <div
              className="card flex flex-col gap-1 cursor-pointer btn-border"
              onClick={() => navigate("/movie/${movie._id}")}
            >
              <img src={movie.poster} height={200} />
              <div className="flex justify-center p-1 bg-primary">
                <h1 className="text-md uppercase text-white">{movie.title}</h1>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Home;
